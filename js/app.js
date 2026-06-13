/* ============================================================
   Cosmic Explorer — solar system canvas
   Stage 1: zoom/pan camera, orbital motion, asteroid belt,
   hover + click-to-approach. Deep Space mode.

   Scale model: planet radii are true relative to one another
   (Earth = 5 world px). Orbital distances are true relative AU
   on a separate scale (1 AU = 280 world px). The Sun is capped
   at 70 world px — true scale would swallow Mercury's orbit.
   ============================================================ */

(() => {
  'use strict';

  const AU = 280;                 // world px per astronomical unit
  const EARTH_RADIUS_PX = 5;      // world px for Earth's 6,371 km (navigable scale)
  const EARTH_RADIUS_KM = 6371;
  const SUN_DISPLAY_RADIUS = 70;  // capped in navigable scale — see note above
  const EARTH_YEAR_SECONDS = 120; // one Earth orbit every 2 minutes
  const KM_TO_WORLD = AU / 149597870; // true scale: same px-per-km as the AU grid
  const SUN_RADIUS_KM = 696340;

  const lerp = (a, b, t) => a + (b - a) * t;
  const smoothstep = (t) => t * t * (3 - 2 * t);
  const clamp01 = (t) => Math.max(0, Math.min(1, t));

  const COLOR = {
    void: '#020408',
    orbit: 'rgba(255, 255, 255, 0.08)',
    orbitHover: 'rgba(255, 255, 255, 0.20)',
    label: 'rgba(203, 213, 225, 0.92)',
    labelDim: 'rgba(148, 163, 184, 0.75)',
    lime: '#cdde00',
    belt: '203, 213, 225',
    cometTail: '203, 213, 225', // --cosmic-text-neutral-secondary
  };

  const PLANETS = [
    { id: 'mercury', name: 'Mercury', radiusKm: 2440,  au: 0.387,  periodDays: 88.0,
      surface: ['#b9b3a8', '#8a847a', '#55504a'] },
    { id: 'venus',   name: 'Venus',   radiusKm: 6052,  au: 0.723,  periodDays: 224.7,
      surface: ['#f2dcb1', '#dbb778', '#9c7a45'] },
    { id: 'earth',   name: 'Earth',   radiusKm: 6371,  au: 1.0,    periodDays: 365.25,
      surface: ['#a9d3f5', '#4f87d3', '#1d3f7e'] },
    { id: 'mars',    name: 'Mars',    radiusKm: 3390,  au: 1.524,  periodDays: 687.0,
      surface: ['#e0926a', '#bf5b34', '#7c3018'] },
    { id: 'jupiter', name: 'Jupiter', radiusKm: 69911, au: 5.203,  periodDays: 4332.6,
      surface: ['#e8cfa9', '#c79b6b', '#8a5f3c'], bands: true },
    { id: 'saturn',  name: 'Saturn',  radiusKm: 58232, au: 9.537,  periodDays: 10759.2,
      surface: ['#efe0b3', '#d3ba7f', '#9a8254'], bands: true,
      ring: { inner: 1.35, outer: 2.25, color: '227, 212, 168' } },
    { id: 'uranus',  name: 'Uranus',  radiusKm: 25362, au: 19.191, periodDays: 30688.5,
      surface: ['#cdeeee', '#8fcfcd', '#4d9694'] },
    { id: 'neptune', name: 'Neptune', radiusKm: 24622, au: 30.07,  periodDays: 60182,
      surface: ['#9ab8ef', '#4f74cf', '#23398a'] },
  ];

  PLANETS.forEach((p, i) => {
    p.rNav = (p.radiusKm / EARTH_RADIUS_KM) * EARTH_RADIUS_PX;
    p.rTrue = p.radiusKm * KM_TO_WORLD;
    p.r = p.rNav;
    p.orbit = p.au * AU;
    p.theta0 = (i * 2.39996) % (Math.PI * 2); // golden-angle spread
    p.x = 0;
    p.y = 0;
  });

  const SUN = {
    id: 'sol', name: 'The Sun', orbit: 0, x: 0, y: 0, isSun: true,
    rNav: SUN_DISPLAY_RADIUS, rTrue: SUN_RADIUS_KM * KM_TO_WORLD, r: SUN_DISPLAY_RADIUS,
  };

  /* ---- moons ----
     Navigable scale compresses each system's real orbit ratios
     (power 0.55) so all moons ring their planet visibly; true
     scale uses real distances and sizes. */
  PLANETS.forEach((p) => {
    const data = (window.COSMIC_MOONS || {})[p.id];
    p.moons = [];
    p.extraMoons = data ? data.extra : 0;
    if (!data) return;
    const minOrbit = Math.min(...data.moons.map((m) => m.orbitKm));
    const innerFactor = p.ring ? 2.7 : 1.9;
    data.moons.forEach((m, i) => {
      const norm = Math.pow(m.orbitKm / minOrbit, 0.55);
      const moon = {
        kind: 'moon', id: m.id, name: m.name, planet: p,
        diameterKm: m.diameterKm, orbitKm: m.orbitKm,
        periodDays: m.periodDays, discovered: m.discovered,
        orbitNav: Math.min(p.rNav * innerFactor * norm, p.rNav * 12),
        orbitTrue: m.orbitKm * KM_TO_WORLD,
        rNav: Math.max(p.rNav * (m.diameterKm / 2 / p.radiusKm), 0.7),
        rTrue: (m.diameterKm / 2) * KM_TO_WORLD,
        theta0: (i * 1.94) % (Math.PI * 2),
        x: 0, y: 0,
      };
      moon.orbit = moon.orbitNav;
      moon.r = moon.rNav;
      p.moons.push(moon);
    });
  });

  let hoveredMoonBadge = null;  // moon hovered via its card badge
  let highlightedMoon = null;   // clicked moon: stays lit until toggled/cleared

  /* ---- scale model: 0 = navigable, 1 = true relative scale ---- */
  const scaleState = { blend: 0, target: 0 };
  const maxZoom = () => Math.exp(lerp(Math.log(60), Math.log(30000), scaleState.blend));

  function applyScaleBlend() {
    const t = smoothstep(scaleState.blend);
    for (const p of [...PLANETS, ...DWARFS, SUN]) {
      p.r = Math.exp(lerp(Math.log(p.rNav), Math.log(p.rTrue), t));
      for (const m of p.moons || []) {
        m.r = Math.exp(lerp(Math.log(m.rNav), Math.log(m.rTrue), t));
        m.orbit = Math.exp(lerp(Math.log(m.orbitNav), Math.log(m.orbitTrue), t));
      }
    }
  }

  /* ---- constellations: world-space sky atlas ----
     All 88 IAU figures ring the solar system in world coordinates:
     the zodiac in ecliptic order on the inner ring, northern-sky
     figures on the upper arcs, southern on the lower. Teal = info,
     per CDS semantics. */
  const SKY = {
    zodiacRadius: 14000, zodiacSize: 2600,
    innerRadius: 20000, outerRadius: 27500, arcSize: 2200,
  };
  const SKY_EXTENT = SKY.outerRadius + SKY.arcSize * 1.4;

  const CONSTS = [];
  (function buildConstellations() {
    const data = window.COSMIC_CONSTELLATIONS || [];
    const place = (c, angle, radius, size, slotSpacing, idx) => {
      CONSTS.push({
        kind: 'constellation', id: c.id, name: c.name,
        stars: c.stars, lines: c.lines,
        x: Math.cos(angle) * radius, y: Math.sin(angle) * radius,
        size, r: size * 0.55, frameRadius: 240,
        slotSpacing, idx,
      });
    };
    const zodiac = data.filter((c) => c.group === 'zodiac');
    zodiac.forEach((c, i) => {
      const a = -Math.PI / 2 + (i / zodiac.length) * Math.PI * 2;
      place(c, a, SKY.zodiacRadius, SKY.zodiacSize, (Math.PI * 2 * SKY.zodiacRadius) / zodiac.length, i);
    });
    // upper half-plane (y negative) for the northern sky, lower for southern
    const arcs = (list, baseAngle) => {
      const inner = list.slice(0, Math.floor(list.length / 2));
      const outer = list.slice(Math.floor(list.length / 2));
      inner.forEach((c, i) => {
        const a = baseAngle + ((i + 0.5) / inner.length) * Math.PI;
        place(c, a, SKY.innerRadius, SKY.arcSize, (Math.PI * SKY.innerRadius) / inner.length, i);
      });
      outer.forEach((c, i) => {
        const a = baseAngle + ((i + 0.5) / outer.length) * Math.PI;
        place(c, a, SKY.outerRadius, SKY.arcSize, (Math.PI * SKY.outerRadius) / outer.length, i);
      });
    };
    arcs(data.filter((c) => c.group === 'north'), Math.PI);
    arcs(data.filter((c) => c.group === 'south'), 0);
  })();

  let showConstellations = false;
  let showComets = false; // Historical Comets content layer

  /* ---- historical comets: looped perihelion passes ----
     Keplerian elements come from comets.js in AU; scale to world px
     and pick randomized pass/gap timings so the sky is never always
     empty nor always crowded. */
  const COMETS = (window.COSMIC_COMETS || []).map((c) => {
    const o = c.orbit;
    const rand = (lo, hi) => lo + Math.random() * (hi - lo);
    const pass = rand(c.anim.pass[0], c.anim.pass[1]);
    const gap = rand(c.anim.gap[0], c.anim.gap[1]);
    const a = o.aAU * AU;
    const rPeri = a * (1 - o.e);
    const rEnter = (a * (1 - o.e * o.e)) / (1 + o.e * Math.cos(o.nuMax));
    return {
      kind: 'comet', id: c.id, name: c.name, info: c.info,
      fragments: !!c.fragments,
      a, e: o.e, omega: o.omega, dir: o.dir || 1, nuMax: o.nuMax,
      rPeri, rEnter,
      pass, gap, cycle: pass + gap, offset: 0,
      active: false, bright: 0, x: 0, y: 0, prevX: 0, prevY: 0, vx: 0, vy: 0,
    };
  });
  COMETS.forEach((c) => { c.offset = Math.random() * c.cycle; });
  let cometClock = 0;

  /* ---- dwarf planets: planet-like bodies, rendered smaller/dimmer ----
     Same orbital model as the eight planets (circular at semi-major
     axis); the navigable radius is boosted slightly off true scale so
     they stay findable, but kept below the planets. */
  let showDwarfs = false;
  const DWARFS = (window.COSMIC_DWARFS || []).map((d, i) => {
    const rNav = Math.max((d.radiusKm / EARTH_RADIUS_KM) * EARTH_RADIUS_PX * 1.6, 1.4);
    return {
      kind: 'dwarf', id: d.id, name: d.name, info: d.info,
      surface: d.surface, elongated: !!d.elongated, ring: !!d.ring,
      radiusKm: d.radiusKm,
      rNav, rTrue: d.radiusKm * KM_TO_WORLD, r: rNav,
      orbit: d.au * AU,
      periodDays: d.periodDays,
      theta0: (i * 1.7 + 0.9) % (Math.PI * 2),
      frameRadius: 26,
      moons: [],
      x: 0, y: 0,
    };
  });

  /* ---- Voyager probes: traced flight paths + current-position markers ----
     V1 = interactive/primary (lime), V2 = interactive/tertiary (teal). */
  let showVoyagers = false;
  const PROBE_RGB = { primary: '205, 222, 0', tertiary: '20, 184, 166' };
  const PROBES = (window.COSMIC_VOYAGERS || []).map((v) => ({
    kind: 'probe', id: v.id, name: v.name, info: v.info,
    points: v.points, rgb: PROBE_RGB[v.token] || '205, 222, 0',
  }));

  /* ---- environmental display flags (Settings card) ---- */
  let showMoons = true;        // Moon orbits toggle
  let showPlanetLabels = true; // Planet labels toggle
  let showOrbitLines = true;   // Orbit path lines toggle

  /* ---- orbit speed: labeled presets, not raw multipliers ---- */
  const SPEED_MULT = { cinematic: 1, fast: 4, orrery: 20 };
  let speedMode = 'cinematic'; // last non-paused selection
  let paused = false;

  /* ---- discovery timeline: discrete documented-history stops ---- */
  const TIMELINE_STOPS = [
    { label: 'Antiquity', caption: 'Five wandering stars and the Sun — tracked by every culture that watched the sky.', highlight: ['mercury', 'venus', 'mars', 'jupiter', 'saturn'] },
    { label: '1543', caption: 'Copernicus publishes De revolutionibus: Earth itself becomes a planet.', highlight: ['earth'] },
    { label: '1610', caption: 'Galileo’s telescope finds Jupiter’s moons — not everything orbits Earth.', highlight: ['jupiter'] },
    { label: '1655', caption: 'Huygens resolves Saturn’s mysterious “ears” into a ring.', highlight: ['saturn'] },
    { label: '1781', caption: 'Herschel spots Uranus from his garden — the solar system doubles in size.', highlight: ['uranus'] },
    { label: '1801', caption: 'Piazzi catches Ceres, the first body of the asteroid belt.', highlight: [] },
    { label: '1846', caption: 'Neptune is found exactly where Le Verrier’s mathematics said to look.', highlight: ['neptune'] },
    { label: 'Today', caption: 'Eight planets, a million-body belt, hundreds of moons — and the count keeps rising.', highlight: [] },
  ];

  // first stop at which each object is considered documented
  const REVEAL_AT = {
    sol: 0, mercury: 0, venus: 0, earth: 0, mars: 0, jupiter: 0, saturn: 0,
    uranus: 4, belt: 5, neptune: 6,

    /* constellations — first stop at/after the earliest credible record.
       Omitted ids default to 0: the Ptolemaic 48 rest on Babylonian,
       Greek, and Egyptian records, and Crux/Carina/Vela/Puppis were
       catalogued in antiquity within Centaurus and Argo Navis. */
    // Plancius 1592 + the Keyser & de Houtman twelve, 1598 (Bayer 1603)
    columba: 2, apus: 2, chamaeleon: 2, dorado: 2, grus: 2, hydrus: 2,
    indus: 2, musca: 2, pavo: 2, phoenix: 2, 'triangulum-australe': 2,
    tucana: 2, volans: 2,
    // Plancius 1612–13
    camelopardalis: 3, monoceros: 3,
    // Hevelius 1684–87
    scutum: 4, lacerta: 4, vulpecula: 4, 'canes-venatici': 4,
    'leo-minor': 4, lynx: 4, sextans: 4,
    // Lacaille 1751–54
    antlia: 4, caelum: 4, circinus: 4, fornax: 4, horologium: 4,
    mensa: 4, microscopium: 4, norma: 4, octans: 4, pictor: 4,
    pyxis: 4, reticulum: 4, sculptor: 4, telescopium: 4,
  };

  let currentStop = TIMELINE_STOPS.length - 1;
  let highlightSet = new Set();

  const isGhost = (obj) => (REVEAL_AT[obj.id] ?? 0) > currentStop;

  const canvas = document.getElementById('scene');
  const ctx = canvas.getContext('2d');
  const hint = document.getElementById('hint');
  const panel = document.getElementById('detail-panel');
  const panelScroll = document.getElementById('panel-scroll');
  const panelClose = document.getElementById('panel-close');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0;
  let H = 0;
  let DPR = 1;

  const cam = { x: 0, y: 0, zoom: 0.08 };
  const target = { x: 0, y: 0, zoom: 0.08 };
  let minZoom = 0.02;

  let hovered = null;
  let selected = null;
  let following = null;
  let followPrev = null;
  let lastMoonHover = null;

  /* ---- starfield: three parallax layers in screen space ---- */
  const STAR_LAYERS = [
    { count: 220, size: 0.7, parallax: 0.004, stars: [] },
    { count: 130, size: 1.1, parallax: 0.010, stars: [] },
    { count: 55,  size: 1.7, parallax: 0.022, stars: [] },
  ];

  function seedStars() {
    for (const layer of STAR_LAYERS) {
      layer.stars = Array.from({ length: layer.count }, () => ({
        x: Math.random(),
        y: Math.random(),
        base: 0.25 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 1.2,
      }));
    }
  }

  /* ---- asteroid belt: 2.1–3.3 AU, Kepler-scaled drift ---- */
  const BELT = Array.from({ length: 850 }, () => {
    const au = 2.1 + Math.random() * 1.2;
    return {
      orbit: au * AU,
      theta0: Math.random() * Math.PI * 2,
      periodDays: 365.25 * Math.pow(au, 1.5),
      size: 0.6 + Math.random() * 1.0,
      alpha: 0.18 + Math.random() * 0.34,
    };
  });

  function fitZoom() {
    const extent = PLANETS[PLANETS.length - 1].orbit * 2 * 1.12;
    return Math.min(W, H) / extent;
  }

  function resize() {
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth;
    H = innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    // allow zooming all the way out to the constellation shell
    minZoom = Math.min(W, H) / (2 * SKY_EXTENT * 1.04);
  }

  function resetView() {
    selected = null;
    following = null;
    hidePanel();
    target.x = 0;
    target.y = 0;
    target.zoom = fitZoom();
  }

  /* ---- detail panel ---- */
  const escapeHtml = (s) =>
    s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function renderConstellationPanel(obj) {
    const info = (window.COSMIC_CONSTELLATION_INFO || {})[obj.id];
    if (!info) return false;

    const badges = info.badges
      .map((b) => `<span class="badge badge--${b.hue}">${escapeHtml(b.text)}</span>`)
      .join('');

    const cultures = info.cultures
      .map(
        (c) => `
        <div class="culture-entry">
          <p class="tradition">${escapeHtml(c.tradition)}</p>
          <p class="prose">${escapeHtml(c.text)}</p>
        </div>`
      )
      .join('');

    const stars = info.stars
      .map(
        ([name, note]) =>
          `<tr><td>${escapeHtml(name)}</td><td>${escapeHtml(note)}</td></tr>`
      )
      .join('');

    panelScroll.innerHTML = `
      <article class="panel-content">
        <div class="badge-row">${badges}</div>
        <h2 class="object-name" id="panel-name">${escapeHtml(obj.name)}</h2>
        <p class="lede">${escapeHtml(info.lede)}</p>

        <section class="panel-section">
          <h3>The Figure</h3>
          <p class="prose">${escapeHtml(info.figure)}</p>
        </section>

        <section class="panel-section">
          <h3>First Documented</h3>
          <p class="headline">${escapeHtml(info.documented.headline)}</p>
          <p class="prose">${escapeHtml(info.documented.body)}</p>
        </section>

        <section class="panel-section">
          <h3>Across Cultures</h3>
          ${cultures}
        </section>

        <section class="panel-section">
          <h3>Use on Earth</h3>
          <p class="prose">${escapeHtml(info.uses)}</p>
        </section>

        <section class="panel-section">
          <h3>Notable Stars</h3>
          <table class="stats-table stars-table"><tbody>${stars}</tbody></table>
        </section>
      </article>`;
    return true;
  }

  function renderCometPanel(obj) {
    const info = obj.info;
    if (!info) return false;

    const badges = info.badges
      .map((b) => `<span class="badge badge--${b.hue}">${escapeHtml(b.text)}</span>`)
      .join('');

    const stats = info.stats
      .map(
        ([label, value]) =>
          `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`
      )
      .join('');

    panelScroll.innerHTML = `
      <article class="panel-content">
        <div class="badge-row">${badges}</div>
        <h2 class="object-name" id="panel-name">${escapeHtml(obj.name)}</h2>
        <p class="lede">${escapeHtml(info.lede)}</p>

        <section class="panel-section">
          <h3>Discovery</h3>
          <p class="headline">${escapeHtml(info.discovery.headline)}</p>
          <p class="prose">${escapeHtml(info.discovery.body)}</p>
        </section>

        <section class="panel-section">
          <h3>Historical Significance</h3>
          <p class="prose">${escapeHtml(info.significance)}</p>
        </section>

        <section class="panel-section">
          <h3>From Earth</h3>
          <p class="prose">${escapeHtml(info.earthObs)}</p>
        </section>

        <section class="panel-section">
          <h3>Orbit &amp; Vital Statistics</h3>
          <table class="stats-table"><tbody>${stats}</tbody></table>
        </section>
      </article>`;
    return true;
  }

  function renderDwarfPanel(obj) {
    const info = obj.info;
    if (!info) return false;

    const badges = info.badges
      .map((b) => `<span class="badge badge--${b.hue}">${escapeHtml(b.text)}</span>`)
      .join('');

    const stats = info.stats
      .map(
        ([label, value]) =>
          `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`
      )
      .join('');

    panelScroll.innerHTML = `
      <article class="panel-content">
        <div class="badge-row">${badges}</div>
        <h2 class="object-name" id="panel-name">${escapeHtml(obj.name)}</h2>
        <p class="lede">${escapeHtml(info.lede)}</p>

        <section class="panel-section">
          <h3>Discovery</h3>
          <p class="headline">${escapeHtml(info.discovery.headline)}</p>
          <p class="prose">${escapeHtml(info.discovery.body)}</p>
        </section>

        ${info.reclassification ? `
        <section class="panel-section">
          <h3>The 2006 Reclassification</h3>
          <p class="prose">${escapeHtml(info.reclassification)}</p>
        </section>` : ''}

        <section class="panel-section">
          <h3>Surface &amp; Features</h3>
          <p class="prose">${escapeHtml(info.features)}</p>
        </section>

        <section class="panel-section">
          <h3>Vital Statistics</h3>
          <table class="stats-table"><tbody>${stats}</tbody></table>
        </section>
      </article>`;
    return true;
  }

  function renderProbePanel(obj) {
    const info = obj.info;
    if (!info) return false;

    const badges = info.badges
      .map((b) => `<span class="badge badge--${b.hue}">${escapeHtml(b.text)}</span>`)
      .join('');

    const flybys = info.flybys
      .map(
        (f) => `
        <div class="culture-entry">
          <p class="tradition">${escapeHtml(f.world)}</p>
          <p class="prose">${escapeHtml(f.text)}</p>
        </div>`
      )
      .join('');

    const stats = info.stats
      .map(
        ([label, value]) =>
          `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`
      )
      .join('');

    panelScroll.innerHTML = `
      <article class="panel-content">
        <div class="badge-row">${badges}</div>
        <h2 class="object-name" id="panel-name">${escapeHtml(obj.name)}</h2>
        <p class="lede">${escapeHtml(info.lede)}</p>

        <section class="panel-section">
          <h3>Launch</h3>
          <p class="headline">${escapeHtml(info.launch)}</p>
        </section>

        <section class="panel-section">
          <h3>Mission Objectives</h3>
          <p class="prose">${escapeHtml(info.objectives)}</p>
        </section>

        <section class="panel-section">
          <h3>Flyby Discoveries</h3>
          ${flybys}
        </section>

        <section class="panel-section">
          <h3>Current Status</h3>
          <p class="headline">${escapeHtml(info.distance)}</p>
          <p class="prose">${escapeHtml(info.status)}</p>
        </section>

        <section class="panel-section">
          <h3>Vital Statistics</h3>
          <table class="stats-table"><tbody>${stats}</tbody></table>
        </section>
      </article>`;
    return true;
  }

  function renderPanel(obj) {
    if (obj.kind === 'constellation') return renderConstellationPanel(obj);
    if (obj.kind === 'comet') return renderCometPanel(obj);
    if (obj.kind === 'dwarf') return renderDwarfPanel(obj);
    if (obj.kind === 'probe') return renderProbePanel(obj);
    const info = window.COSMIC_OBJECT_INFO[obj.id];
    if (!info) return false;

    const badges = info.badges
      .map((b) => `<span class="badge badge--${b.hue}">${escapeHtml(b.text)}</span>`)
      .join('');

    const cultures = info.cultures
      .map(
        (c) => `
        <div class="culture-entry">
          <p class="tradition">${escapeHtml(c.tradition)}</p>
          <p class="prose">${escapeHtml(c.text)}</p>
        </div>`
      )
      .join('');

    const stats = info.stats
      .map(
        ([label, value]) =>
          `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`
      )
      .join('');

    panelScroll.innerHTML = `
      <article class="panel-content">
        ${info.illustration ? `<figure class="panel-illustration">${info.illustration}</figure>` : ''}
        <div class="badge-row">${badges}</div>
        <h2 class="object-name" id="panel-name">${escapeHtml(obj.name)}</h2>
        <p class="lede">${escapeHtml(info.lede)}</p>

        <section class="panel-section">
          <h3>Discovery</h3>
          <p class="headline">${escapeHtml(info.discovery.headline)}</p>
          <p class="prose">${escapeHtml(info.discovery.body)}</p>
        </section>

        <section class="panel-section">
          <h3>The Name</h3>
          <p class="prose">${escapeHtml(info.nameOrigin)}</p>
        </section>

        <section class="panel-section">
          <h3>Across Cultures</h3>
          ${cultures}
        </section>

        <section class="panel-section">
          <h3>Vital Statistics</h3>
          <table class="stats-table"><tbody>${stats}</tbody></table>
        </section>

        ${obj.moons?.length ? `
        <section class="panel-section">
          <h3>Moons</h3>
          <div class="badge-row moon-badges">
            ${obj.moons.map((m) => `<button class="badge moon-badge" data-moon="${m.id}">${escapeHtml(m.name)}</button>`).join('')}
            ${obj.extraMoons ? `<span class="badge badge--gray moon-extra">+${obj.extraMoons} more</span>` : ''}
          </div>
          <div class="moon-frame is-empty" id="moon-frame"></div>
        </section>` : ''}
      </article>`;
    return true;
  }

  function showPanel(obj) {
    if (!renderPanel(obj)) return;
    panelScroll.scrollTop = 0;
    // retrigger the content entrance animation on object change
    const content = panelScroll.querySelector('.panel-content');
    content.style.animation = 'none';
    void content.offsetHeight;
    content.style.animation = '';
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    syncMoonUI();
  }

  function hidePanel() {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
  }

  function deselect() {
    selected = null;
    following = null;
    highlightedMoon = null;
    hoveredMoonBadge = null;
    hidePanel();
  }

  /* ---- moon highlight state + card sync ---- */
  function toggleMoonHighlight(moon) {
    highlightedMoon = highlightedMoon === moon ? null : moon;
    syncMoonUI();
  }

  function moonFrameHTML(m) {
    const fmt = (n) => n.toLocaleString('en-US');
    const retro = m.periodDays < 0 ? ' — retrograde' : '';
    return `<table class="stats-table"><tbody>
      <tr><td>Diameter</td><td>${fmt(m.diameterKm)} km</td></tr>
      <tr><td>Distance from ${escapeHtml(m.planet.name)}</td><td>${fmt(m.orbitKm)} km</td></tr>
      <tr><td>Orbital period</td><td>${fmt(Math.abs(m.periodDays))} days${retro}</td></tr>
      <tr><td>Discovered</td><td>${escapeHtml(m.discovered)}</td></tr>
    </tbody></table>`;
  }

  function syncMoonUI() {
    const frame = document.getElementById('moon-frame');
    if (!frame) return;
    for (const b of panelScroll.querySelectorAll('.moon-badge')) {
      const moon = selected?.moons?.find((m) => m.id === b.dataset.moon);
      b.classList.toggle('is-active', !!moon && highlightedMoon === moon);
      b.classList.toggle('is-hover', !!moon && hovered === moon);
    }
    if (highlightedMoon && highlightedMoon.planet === selected) {
      frame.classList.remove('is-empty');
      frame.innerHTML = moonFrameHTML(highlightedMoon);
    } else {
      frame.classList.add('is-empty');
      frame.innerHTML = '<p class="moon-frame-hint">Select a moon — here or out in space — to see its profile.</p>';
    }
  }

  panelScroll.addEventListener('click', (e) => {
    const b = e.target.closest('.moon-badge');
    if (!b || !selected?.moons) return;
    const moon = selected.moons.find((m) => m.id === b.dataset.moon);
    if (moon) toggleMoonHighlight(moon);
  });
  panelScroll.addEventListener('mouseover', (e) => {
    const b = e.target.closest('.moon-badge');
    hoveredMoonBadge = (b && selected?.moons?.find((m) => m.id === b.dataset.moon)) || null;
  });
  panelScroll.addEventListener('mouseout', () => {
    hoveredMoonBadge = null;
  });

  const toScreen = (wx, wy) => ({
    x: (wx - cam.x) * cam.zoom + W / 2,
    y: (wy - cam.y) * cam.zoom + H / 2,
  });

  const toWorld = (sx, sy) => ({
    x: (sx - W / 2) / cam.zoom + cam.x,
    y: (sy - H / 2) / cam.zoom + cam.y,
  });

  /* ---- simulation clock ---- */
  let simDays = 0;
  const BASE_DAYS_PER_SECOND = reducedMotion ? 0 : 365.25 / EARTH_YEAR_SECONDS;

  function planetAngle(theta0, periodDays) {
    return theta0 - (simDays / periodDays) * Math.PI * 2;
  }

  function updatePositions() {
    for (const p of PLANETS) {
      const a = planetAngle(p.theta0, p.periodDays);
      p.x = Math.cos(a) * p.orbit;
      p.y = Math.sin(a) * p.orbit;
      for (const m of p.moons) {
        const ma = planetAngle(m.theta0, m.periodDays);
        m.x = p.x + Math.cos(ma) * m.orbit;
        m.y = p.y + Math.sin(ma) * m.orbit;
      }
    }
    for (const d of DWARFS) {
      const a = planetAngle(d.theta0, d.periodDays);
      d.x = Math.cos(a) * d.orbit;
      d.y = Math.sin(a) * d.orbit;
    }
  }

  // moons fade in as their planet grows on screen
  function moonVisibility(p) {
    return clamp01((p.r * cam.zoom - 6) / 18);
  }

  /* ---- input: pan / zoom / pinch / hover / click ---- */
  const pointers = new Map();
  let dragging = false;
  let dragMoved = 0;
  let lastPinchDist = 0;
  const mouse = { x: -1, y: -1, inside: false };

  function dismissHint() {
    hint.classList.add('is-hidden');
  }

  canvas.addEventListener('pointerdown', (e) => {
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      // synthetic/stale pointer ids can't be captured — drag still works
    }
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) {
      dragging = true;
      dragMoved = 0;
      canvas.classList.add('is-dragging');
    } else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      lastPinchDist = Math.hypot(a.x - b.x, a.y - b.y);
    }
    dismissHint();
    dismissMasthead();
  });

  canvas.addEventListener('pointermove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.inside = true;

    if (!pointers.has(e.pointerId)) return;
    const prev = pointers.get(e.pointerId);

    if (pointers.size === 2) {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const [a, b] = [...pointers.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      if (lastPinchDist > 0) {
        zoomAbout(mid.x, mid.y, dist / lastPinchDist, true);
      }
      lastPinchDist = dist;
      following = null;
      return;
    }

    if (dragging) {
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      dragMoved += Math.abs(dx) + Math.abs(dy);
      target.x -= dx / cam.zoom;
      target.y -= dy / cam.zoom;
      cam.x -= dx / cam.zoom;
      cam.y -= dy / cam.zoom;
      if (dragMoved > 4) following = null;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }
  });

  function endPointer(e) {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) lastPinchDist = 0;
    if (pointers.size === 0) {
      canvas.classList.remove('is-dragging');
      if (dragging && dragMoved <= 4) handleClick(e.clientX, e.clientY);
      dragging = false;
    }
  }

  canvas.addEventListener('pointerup', endPointer);
  canvas.addEventListener('pointercancel', endPointer);
  canvas.addEventListener('pointerleave', () => {
    mouse.inside = false;
    hovered = null;
  });

  function zoomAbout(sx, sy, factor, snap = false) {
    const newZoom = Math.min(maxZoom(), Math.max(minZoom, target.zoom * factor));
    const wx = (sx - W / 2) / target.zoom + target.x;
    const wy = (sy - H / 2) / target.zoom + target.y;
    target.zoom = newZoom;
    target.x = wx - (sx - W / 2) / newZoom;
    target.y = wy - (sy - H / 2) / newZoom;
    if (snap) {
      cam.zoom = target.zoom;
      cam.x = target.x;
      cam.y = target.y;
    }
  }

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    zoomAbout(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.0014));
    following = null;
    dismissHint();
    dismissMasthead();
  }, { passive: false });

  function hitTest(sx, sy) {
    let best = null;
    let bestDist = Infinity;
    // moons first — they are small targets close to their planet
    for (const p of PLANETS) {
      if (!showMoons || isGhost(p) || moonVisibility(p) < 0.25) continue;
      for (const m of p.moons) {
        const s = toScreen(m.x, m.y);
        const d = Math.hypot(sx - s.x, sy - s.y);
        if (d < Math.max(m.r * cam.zoom, 5) + 6 && d < bestDist) {
          best = m;
          bestDist = d;
        }
      }
    }
    if (best) return best;
    for (const p of PLANETS) {
      if (isGhost(p)) continue;
      const s = toScreen(p.x, p.y);
      const apparent = Math.max(p.r * cam.zoom, 6);
      const d = Math.hypot(sx - s.x, sy - s.y);
      if (d < apparent + 8 && d < bestDist) {
        best = p;
        bestDist = d;
      }
    }
    if (showDwarfs) {
      for (const dw of DWARFS) {
        const s = toScreen(dw.x, dw.y);
        const apparent = Math.max(dw.r * cam.zoom, 5);
        const d = Math.hypot(sx - s.x, sy - s.y);
        if (d < apparent + 8 && d < bestDist) {
          best = dw;
          bestDist = d;
        }
      }
    }
    if (showComets) {
      for (const c of COMETS) {
        if (!c.active) continue;
        const s = toScreen(c.x, c.y);
        const d = Math.hypot(sx - s.x, sy - s.y);
        const rr = c.fragments ? 14 : Math.max(2.4 + 3.2 * c.bright, 6);
        if (d < rr + 8 && d < bestDist) {
          best = c;
          bestDist = d;
        }
      }
    }
    if (showVoyagers) {
      for (const pr of PROBES) {
        const last = pr.points[pr.points.length - 1];
        const s = toScreen(last.x * AU, last.y * AU);
        const d = Math.hypot(sx - s.x, sy - s.y);
        if (d < 14 && d < bestDist) {
          best = pr;
          bestDist = d;
        }
      }
    }
    if (!best) {
      const s = toScreen(0, 0);
      if (Math.hypot(sx - s.x, sy - s.y) < Math.max(SUN.r * cam.zoom, 8) + 8) best = SUN;
    }
    if (!best && showConstellations) {
      for (const c of CONSTS) {
        if (isGhost(c)) continue;
        const s = toScreen(c.x, c.y);
        const d = Math.hypot(sx - s.x, sy - s.y);
        if (d < Math.max(c.r * cam.zoom, 18) && d < bestDist) {
          best = c;
          bestDist = d;
        }
      }
    }
    return best;
  }

  function flyTo(obj) {
    selected = obj;
    following = obj;
    const frameRadius = obj.frameRadius || (obj.isSun ? 160 : 70);
    target.zoom = Math.min(maxZoom(), Math.max(minZoom, frameRadius / obj.r));
  }

  function handleClick(sx, sy) {
    const hit = hitTest(sx, sy);
    if (hit && hit.kind === 'moon') {
      toggleMoonHighlight(hit);
    } else if (hit && (hit.kind === 'comet' || hit.kind === 'probe')) {
      // comets drift/vanish and probes sit far out — show the panel
      // without flying or following
      selected = hit;
      following = null;
      showPanel(hit);
    } else if (hit) {
      if (highlightedMoon && highlightedMoon.planet !== hit) highlightedMoon = null;
      flyTo(hit);
      showPanel(hit);
    } else {
      deselect();
    }
  }

  panelClose.addEventListener('click', deselect);

  document.getElementById('zoom-in').addEventListener('click', () => {
    zoomAbout(W / 2, H / 2, 1.6);
    dismissHint();
    dismissMasthead();
  });
  document.getElementById('zoom-out').addEventListener('click', () => {
    zoomAbout(W / 2, H / 2, 1 / 1.6);
    dismissHint();
    dismissMasthead();
  });
  document.getElementById('reset-view').addEventListener('click', resetView);

  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (selected) deselect();
      else resetView();
    }
  });

  /* ---- settings toggles ----
     Each setting can have several switch instances (desktop card,
     mobile menu overlay, mobile bottom bar) — all stay in sync. */
  const scaleHelper = document.getElementById('scale-helper');

  function wireToggle(setting, initial, onChange) {
    const els = [...document.querySelectorAll(`[data-setting="${setting}"]`)];
    let on = initial;
    const render = () => {
      for (const el of els) {
        el.setAttribute('aria-checked', String(on));
        el.classList.toggle('is-on', on);
      }
    };
    for (const el of els) {
      el.addEventListener('click', () => {
        on = !on;
        render();
        onChange(on);
      });
    }
    render();
  }

  wireToggle('scale', false, (on) => {
    scaleState.target = on ? 1 : 0;
    scaleHelper.classList.toggle('is-visible', on);
    dismissHint();
  });

  wireToggle('constellations', false, (on) => {
    showConstellations = on;
  });

  /* Environmental Settings toggles */
  wireToggle('moon-orbits', true, (on) => { showMoons = on; });
  wireToggle('planet-labels', true, (on) => { showPlanetLabels = on; });
  wireToggle('orbit-lines', true, (on) => { showOrbitLines = on; });

  /* Content Layers — placeholders; features land separately */
  wireToggle('historical-comets', false, (on) => {
    showComets = on;
    if (!on && selected?.kind === 'comet') deselect();
  });
  wireToggle('dwarf-planets', false, (on) => {
    showDwarfs = on;
    if (!on && selected?.kind === 'dwarf') deselect();
  });
  wireToggle('voyager-paths', false, (on) => {
    showVoyagers = on;
    if (!on && selected?.kind === 'probe') deselect();
  });

  /* ---- orbit speed segmented control + play/pause button ----
     The Pause segment and the inline play/pause icon are two faces of
     the same paused state; updating it re-renders every instance. */
  const playPauseBtn = document.getElementById('play-pause');
  const iconPause = playPauseBtn.querySelector('.icon-pause');
  const iconPlay = playPauseBtn.querySelector('.icon-play');
  const segBtns = [...document.querySelectorAll('.seg-btn')];

  function renderSpeed() {
    const active = paused ? 'pause' : speedMode;
    for (const b of segBtns) b.classList.toggle('is-active', b.dataset.speed === active);
    iconPause.style.display = paused ? 'none' : '';
    iconPlay.style.display = paused ? '' : 'none';
    const label = paused ? 'Resume animation' : 'Pause animation';
    playPauseBtn.setAttribute('aria-label', label);
    playPauseBtn.setAttribute('title', label);
  }

  function setSpeed(mode) {
    if (mode === 'pause') {
      paused = true;
    } else {
      speedMode = mode;
      paused = false;
    }
    renderSpeed();
  }

  for (const b of segBtns) {
    b.addEventListener('click', () => setSpeed(b.dataset.speed));
  }
  playPauseBtn.addEventListener('click', () => {
    paused = !paused;
    renderSpeed();
  });
  renderSpeed();

  /* ---- Environmental Settings popover (desktop) ---- */
  const envBtn = document.getElementById('env-settings-btn');
  const envCard = document.getElementById('env-settings-card');
  const envWrap = document.getElementById('env-settings-wrap');

  function setEnvOpen(open) {
    envCard.classList.toggle('is-open', open);
    envCard.setAttribute('aria-hidden', String(!open));
    envBtn.setAttribute('aria-expanded', String(open));
  }

  envBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setEnvOpen(!envCard.classList.contains('is-open'));
  });

  // click/tap outside the wrapper closes the card
  document.addEventListener('pointerdown', (e) => {
    if (!envCard.classList.contains('is-open')) return;
    if (envWrap.contains(e.target)) return;
    setEnvOpen(false);
  });

  /* ---- mobile chrome: masthead dismissal, menu, timeline drawer ---- */
  const mobileQuery = matchMedia('(max-width: 1024px)');
  const masthead = document.querySelector('.masthead');
  const menuBtn = document.getElementById('menu-btn');
  const menuOverlay = document.getElementById('menu-overlay');
  const timelineBtn = document.getElementById('timeline-btn');
  const timelineEl = document.getElementById('timeline');

  let mastheadDismissed = false;
  function dismissMasthead() {
    if (mastheadDismissed || !mobileQuery.matches) return;
    mastheadDismissed = true;
    masthead.classList.add('is-dismissed');
    menuBtn.classList.add('is-visible');
  }

  function setMenuOpen(open) {
    menuOverlay.classList.toggle('is-open', open);
    menuOverlay.setAttribute('aria-hidden', String(!open));
    menuBtn.setAttribute('aria-expanded', String(open));
  }

  menuBtn.addEventListener('click', () => {
    setMenuOpen(!menuOverlay.classList.contains('is-open'));
  });

  // tapping anywhere outside the open overlay (canvas included) closes it
  document.addEventListener('pointerdown', (e) => {
    if (!menuOverlay.classList.contains('is-open')) return;
    if (menuOverlay.contains(e.target) || menuBtn.contains(e.target)) return;
    setMenuOpen(false);
  });

  timelineBtn.addEventListener('click', () => {
    const open = !timelineEl.classList.contains('is-open');
    timelineEl.classList.toggle('is-open', open);
    timelineBtn.setAttribute('aria-expanded', String(open));
  });

  /* ---- discovery timeline ---- */
  const timelineTrack = document.getElementById('timeline-track');
  const timelineFill = document.getElementById('timeline-fill');
  const timelineThumb = document.getElementById('timeline-thumb');
  const timelineCaption = document.getElementById('timeline-caption');
  const timelineTicks = document.getElementById('timeline-ticks');
  const timelineLabels = document.getElementById('timeline-labels');
  const STOP_COUNT = TIMELINE_STOPS.length;

  TIMELINE_STOPS.forEach((stop, i) => {
    const pct = (i / (STOP_COUNT - 1)) * 100;
    const tick = document.createElement('span');
    tick.style.left = pct + '%';
    tick.style.setProperty('--pct', pct + '%'); // mobile vertical track
    timelineTicks.appendChild(tick);
    const label = document.createElement('span');
    label.textContent = stop.label;
    timelineLabels.appendChild(label);
  });

  function applyStop(i) {
    currentStop = Math.max(0, Math.min(STOP_COUNT - 1, i));
    const stop = TIMELINE_STOPS[currentStop];
    const pct = (currentStop / (STOP_COUNT - 1)) * 100;
    timelineFill.style.width = pct + '%';
    timelineThumb.style.left = pct + '%';
    timelineEl.style.setProperty('--timeline-pct', pct + '%'); // mobile vertical track
    timelineCaption.textContent = stop.caption;
    timelineTrack.setAttribute('aria-valuenow', String(currentStop));
    timelineTrack.setAttribute('aria-valuetext', stop.label);
    [...timelineTicks.children].forEach((t, j) => t.classList.toggle('is-past', j <= currentStop));
    [...timelineLabels.children].forEach((l, j) => l.classList.toggle('is-active', j === currentStop));
    highlightSet = new Set(stop.highlight);
    if (selected && isGhost(selected)) deselect();
  }

  function seekFromEvent(e) {
    // the mobile drawer runs the track vertically; scrub along its long axis
    const rect = timelineTrack.getBoundingClientRect();
    const t = rect.height > rect.width
      ? clamp01((e.clientY - rect.top) / rect.height)
      : clamp01((e.clientX - rect.left) / rect.width);
    applyStop(Math.round(t * (STOP_COUNT - 1)));
  }

  let scrubbing = false;
  timelineTrack.addEventListener('pointerdown', (e) => {
    scrubbing = true;
    try {
      timelineTrack.setPointerCapture(e.pointerId);
    } catch {}
    seekFromEvent(e);
  });
  timelineTrack.addEventListener('pointermove', (e) => {
    if (scrubbing) seekFromEvent(e);
  });
  timelineTrack.addEventListener('pointerup', () => { scrubbing = false; });
  timelineTrack.addEventListener('pointercancel', () => { scrubbing = false; });
  // backstop to touch-action: none — never let the browser turn an
  // active scrub into a page scroll/gesture
  timelineTrack.addEventListener('touchmove', (e) => {
    if (scrubbing) e.preventDefault();
  }, { passive: false });
  timelineTrack.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') applyStop(currentStop + 1);
    else if (e.key === 'ArrowLeft') applyStop(currentStop - 1);
    else if (e.key === 'Home') applyStop(0);
    else if (e.key === 'End') applyStop(STOP_COUNT - 1);
    else return;
    e.preventDefault();
  });

  applyStop(STOP_COUNT - 1);

  /* ---- drawing ---- */
  function drawStars(t) {
    ctx.fillStyle = '#e2e8f0';
    for (const layer of STAR_LAYERS) {
      const ox = -cam.x * cam.zoom * layer.parallax;
      const oy = -cam.y * cam.zoom * layer.parallax;
      for (const s of layer.stars) {
        const x = ((s.x * W + ox) % W + W) % W;
        const y = ((s.y * H + oy) % H + H) % H;
        // two incommensurate sines per star: an irregular atmospheric
        // shimmer rather than a rhythmic blink; phase/speed stagger
        // keeps neighbors out of sync
        const twinkle = reducedMotion ? 0 : (
          Math.sin(t * s.speed + s.phase) * 0.7 +
          Math.sin(t * s.speed * 2.7 + s.phase * 1.7) * 0.3
        ) * 0.22;
        ctx.globalAlpha = Math.max(0.05, s.base + twinkle);
        const size = layer.size * (1 + twinkle * 0.6);
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }
    }
    ctx.globalAlpha = 1;
  }

  function constellationLabelStep(c) {
    const sp = c.slotSpacing * cam.zoom;
    return sp > 150 ? 1 : sp > 75 ? 2 : 4;
  }

  function drawConstellations() {
    if (!showConstellations) return;
    ctx.lineWidth = 1;
    for (const c of CONSTS) {
      const s = toScreen(c.x - c.size / 2, c.y - c.size / 2);
      const size = c.size * cam.zoom;
      if (s.x > W + 80 || s.y > H + 80 || s.x + size < -80 || s.y + size < -120) continue;
      const ghost = isGhost(c);
      const active = !ghost && (hovered === c || selected === c);

      // undocumented at this timeline stop — present, but unknown
      ctx.strokeStyle = ghost
        ? 'rgba(20, 184, 166, 0.06)'
        : `rgba(20, 184, 166, ${active ? 0.65 : 0.30})`;
      ctx.beginPath();
      for (const [a, b] of c.lines) {
        ctx.moveTo(s.x + c.stars[a][0] * size, s.y + c.stars[a][1] * size);
        ctx.lineTo(s.x + c.stars[b][0] * size, s.y + c.stars[b][1] * size);
      }
      ctx.stroke();

      ctx.fillStyle = ghost
        ? 'rgba(226, 232, 240, 0.15)'
        : `rgba(226, 232, 240, ${active ? 1 : 0.90})`;
      const starScale = Math.min(1.6, Math.max(0.7, size / 220));
      for (const [x, y, m] of c.stars) {
        ctx.beginPath();
        ctx.arc(s.x + x * size, s.y + y * size, (m || 1.4) * starScale, 0, Math.PI * 2);
        ctx.fill();
      }

      if (ghost) continue; // no selection ring or label until documented

      if (selected === c) {
        ctx.beginPath();
        ctx.arc(s.x + size / 2, s.y + size / 2, size * 0.62 + 10, 0, Math.PI * 2);
        ctx.strokeStyle = COLOR.lime;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.7;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.lineWidth = 1;
      }

      // label LOD: thin out labels when slots get tight on screen
      if (active || c.idx % constellationLabelStep(c) === 0) {
        ctx.font = '500 11px Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = active ? COLOR.lime : 'rgba(20, 184, 166, 0.75)';
        ctx.fillText(c.name.toUpperCase(), s.x + size / 2, s.y + size + 12);
      }
    }
  }

  function drawOrbits() {
    if (!showOrbitLines) return;
    const sun = toScreen(0, 0);
    for (const p of PLANETS) {
      if (isGhost(p)) continue;
      const r = p.orbit * cam.zoom;
      if (r < 8) continue;
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, r, 0, Math.PI * 2);
      ctx.strokeStyle = (hovered === p || selected === p) ? COLOR.orbitHover : COLOR.orbit;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawBelt() {
    const margin = 60;
    const ghostFactor = REVEAL_AT.belt > currentStop ? 0.12 : 1;
    for (const a of BELT) {
      const ang = planetAngle(a.theta0, a.periodDays);
      const s = toScreen(Math.cos(ang) * a.orbit, Math.sin(ang) * a.orbit);
      if (s.x < -margin || s.x > W + margin || s.y < -margin || s.y > H + margin) continue;
      const size = Math.min(3, Math.max(0.6, a.size * cam.zoom));
      ctx.fillStyle = `rgba(${COLOR.belt}, ${a.alpha * ghostFactor})`;
      ctx.fillRect(s.x, s.y, size, size);
    }
  }

  function updateComets() {
    if (!showComets) return;
    for (const c of COMETS) {
      const p = (((cometClock - c.offset) % c.cycle) + c.cycle) % c.cycle;
      c.prevX = c.x;
      c.prevY = c.y;
      if (p < c.pass) {
        c.active = true;
        const t = p / c.pass;
        const nu = lerp(-c.nuMax, c.nuMax, t) * c.dir;
        const r = (c.a * (1 - c.e * c.e)) / (1 + c.e * Math.cos(nu));
        const ox = r * Math.cos(nu);
        const oy = r * Math.sin(nu);
        const cw = Math.cos(c.omega);
        const sw = Math.sin(c.omega);
        c.x = ox * cw - oy * sw;
        c.y = ox * sw + oy * cw;
        c.bright = clamp01((c.rEnter - r) / (c.rEnter - c.rPeri));
        c.vx = c.x - c.prevX;
        c.vy = c.y - c.prevY;
      } else {
        c.active = false;
      }
    }
  }

  function drawCometHead(s, headR, lit) {
    ctx.save();
    ctx.shadowColor = 'rgba(205, 222, 0, 0.85)';
    ctx.shadowBlur = lit ? 18 : 12 + headR * 2;
    ctx.beginPath();
    ctx.arc(s.x, s.y, headR, 0, Math.PI * 2);
    ctx.fillStyle = COLOR.lime;
    ctx.fill();
    ctx.restore();
    ctx.beginPath();
    ctx.arc(s.x, s.y, headR * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = '#f7ffd0';
    ctx.fill();
    if (lit) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, headR + 6, 0, Math.PI * 2);
      ctx.strokeStyle = COLOR.lime;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.8;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  function drawComets() {
    if (!showComets) return;
    const sun = toScreen(0, 0);
    for (const c of COMETS) {
      if (!c.active) continue;
      const s = toScreen(c.x, c.y);
      if (s.x < -240 || s.x > W + 240 || s.y < -240 || s.y > H + 240) continue;

      // tail points anti-solar; length and brightness peak near perihelion
      let dx = s.x - sun.x;
      let dy = s.y - sun.y;
      const dl = Math.hypot(dx, dy) || 1;
      dx /= dl;
      dy /= dl;
      const bright = c.bright;
      const lit = selected === c || hovered === c;

      if (c.fragments) {
        // "string of pearls": a chain of nuclei along the motion vector
        let mx = c.vx;
        let my = c.vy;
        const ml = Math.hypot(mx, my) || 1;
        mx /= ml;
        my /= ml;
        const N = 6;
        const spacing = 7;
        for (let i = 0; i < N; i++) {
          const off = (i - (N - 1) / 2) * spacing;
          const fx = s.x + mx * off;
          const fy = s.y + my * off;
          const fr = 1.6 + 1.4 * Math.abs(1 - Math.abs(off) / (spacing * N));
          const tl = 14 + 26 * bright;
          const grad = ctx.createLinearGradient(fx, fy, fx + dx * tl, fy + dy * tl);
          grad.addColorStop(0, `rgba(${COLOR.cometTail}, ${0.35 * bright + 0.12})`);
          grad.addColorStop(1, `rgba(${COLOR.cometTail}, 0)`);
          ctx.beginPath();
          ctx.moveTo(fx, fy);
          ctx.lineTo(fx + dx * tl, fy + dy * tl);
          ctx.lineWidth = 2.4;
          ctx.strokeStyle = grad;
          ctx.stroke();
          drawCometHead({ x: fx, y: fy }, fr, lit && i === Math.floor(N / 2));
        }
        ctx.lineWidth = 1;
        continue;
      }

      const tailLen = 36 + 150 * bright;
      const headR = 2.4 + 3.2 * bright;
      const tx = s.x + dx * tailLen;
      const ty = s.y + dy * tailLen;
      const w = 3 + 5 * bright;
      const grad = ctx.createLinearGradient(s.x, s.y, tx, ty);
      grad.addColorStop(0, `rgba(${COLOR.cometTail}, ${0.5 * bright + 0.18})`);
      grad.addColorStop(1, `rgba(${COLOR.cometTail}, 0)`);
      ctx.beginPath();
      ctx.moveTo(s.x - dy * w, s.y + dx * w);
      ctx.lineTo(s.x + dy * w, s.y - dx * w);
      ctx.lineTo(tx, ty);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      drawCometHead(s, headR, lit);
    }
  }

  function pointAtFraction(pts, u) {
    let total = 0;
    const segs = [];
    for (let i = 1; i < pts.length; i++) {
      const len = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
      segs.push(len);
      total += len;
    }
    if (total === 0) return pts[0];
    let target = u * total;
    for (let i = 0; i < segs.length; i++) {
      if (target <= segs[i]) {
        const t = segs[i] === 0 ? 0 : target / segs[i];
        return {
          x: pts[i].x + (pts[i + 1].x - pts[i].x) * t,
          y: pts[i].y + (pts[i + 1].y - pts[i].y) * t,
        };
      }
      target -= segs[i];
    }
    return pts[pts.length - 1];
  }

  function drawVoyagers(tSec) {
    if (!showVoyagers) return;
    for (const pr of PROBES) {
      const rgb = pr.rgb;
      const pts = pr.points.map((p) => toScreen(p.x * AU, p.y * AU));

      // traced path
      ctx.save();
      ctx.shadowColor = `rgba(${rgb}, 0.5)`;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.strokeStyle = `rgba(${rgb}, 0.55)`;
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.restore();

      // launch node + flyby waypoints with labels
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, 0.8)`;
      ctx.fill();
      for (let i = 0; i < pr.points.length; i++) {
        const wp = pr.points[i];
        if (!wp.label) continue;
        const s = pts[i];
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${rgb})`;
        ctx.fill();
        ctx.font = '500 10px Montserrat, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(${rgb}, 0.9)`;
        ctx.fillText(wp.label, s.x + 7, s.y);
      }

      // a signal blip travels the path on a loop (the "animated" trace)
      if (!reducedMotion) {
        const blip = pointAtFraction(pts, (tSec % 16) / 16);
        ctx.save();
        ctx.shadowColor = `rgba(${rgb}, 0.9)`;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(blip.x, blip.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();
      }

      // current-position marker: pulsing + clickable
      const m = pts[pts.length - 1];
      const active = selected === pr || hovered === pr;
      const pulse = reducedMotion ? 0.5 : 0.5 + 0.5 * Math.sin(tSec * 2.5);
      ctx.save();
      ctx.shadowColor = `rgba(${rgb}, 0.9)`;
      ctx.shadowBlur = 10 + 8 * pulse;
      ctx.beginPath();
      ctx.arc(m.x, m.y, 3.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${rgb})`;
      ctx.fill();
      ctx.restore();
      ctx.beginPath();
      ctx.arc(m.x, m.y, 5 + 4 * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${rgb}, ${0.45 * (1 - pulse) + 0.2})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      if (active) {
        ctx.beginPath();
        ctx.arc(m.x, m.y, 11, 0, Math.PI * 2);
        ctx.strokeStyle = `rgb(${rgb})`;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.9;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      ctx.font = '600 11px Montserrat, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = `rgb(${rgb})`;
      ctx.fillText(pr.name.toUpperCase(), m.x + 9, m.y - 7);
    }
  }

  function drawDwarfOrbits() {
    if (!showDwarfs || !showOrbitLines) return;
    const sun = toScreen(0, 0);
    ctx.save();
    ctx.setLineDash([3, 7]);
    for (const d of DWARFS) {
      const r = d.orbit * cam.zoom;
      if (r < 8) continue;
      const active = hovered === d || selected === d;
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, r, 0, Math.PI * 2);
      ctx.strokeStyle = active ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawDwarfs(tSec) {
    if (!showDwarfs) return;
    for (const d of DWARFS) {
      const s = toScreen(d.x, d.y);
      const r = Math.max(d.r * cam.zoom, 2.0);
      const pad = d.ring ? r * 2.4 : r;
      if (s.x < -pad - 30 || s.x > W + pad + 30 || s.y < -pad - 30 || s.y > H + pad + 30) continue;

      const isActive = hovered === d || selected === d;

      if (isActive) {
        ctx.save();
        ctx.shadowColor = 'rgba(205, 222, 0, 0.6)';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(205, 222, 0, 0.3)';
        ctx.fill();
        ctx.restore();
      }

      // light from the sun at the origin
      const lx = -d.x;
      const ly = -d.y;
      const len = Math.hypot(lx, ly) || 1;
      const hx = s.x + (lx / len) * r * 0.45;
      const hy = s.y + (ly / len) * r * 0.45;
      const grad = ctx.createRadialGradient(hx, hy, r * 0.1, s.x, s.y, r * 1.3);
      grad.addColorStop(0, d.surface[0]);
      grad.addColorStop(0.55, d.surface[1]);
      grad.addColorStop(1, d.surface[2]);

      // dwarf planets read dimmer than the eight planets
      ctx.globalAlpha = isActive ? 1 : 0.85;
      ctx.beginPath();
      if (d.elongated) {
        ctx.ellipse(s.x, s.y, r * 1.35, r * 0.82, -0.4, 0, Math.PI * 2);
      } else {
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
      }
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Haumea's ring
      if (d.ring && r > 3) {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(-0.4);
        ctx.scale(1, 0.34);
        ctx.beginPath();
        ctx.arc(0, 0, r * 1.9, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(226, 232, 240, 0.45)';
        ctx.lineWidth = Math.max(r * 0.18, 1);
        ctx.stroke();
        ctx.restore();
      }

      if (isActive) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, (d.elongated ? r * 1.4 : r) + 6, 0, Math.PI * 2);
        ctx.strokeStyle = COLOR.lime;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = selected === d ? 0.9 : 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // label: dimmer than planet labels, shown when framed or active
      const orbitScreen = d.orbit * cam.zoom;
      let alpha = isActive ? 1 : Math.max(0, Math.min(1, (orbitScreen - 60) / 120));
      if (alpha > 0.02) {
        ctx.font = '500 12px Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.globalAlpha = alpha;
        ctx.fillStyle = isActive ? COLOR.lime : COLOR.labelDim;
        ctx.fillText(d.name.toUpperCase(), s.x, s.y - (d.elongated ? r * 0.82 : r) - 9);
        ctx.globalAlpha = 1;
      }
    }
  }

  function drawSun() {
    const s = toScreen(0, 0);
    const r = SUN_DISPLAY_RADIUS * cam.zoom;
    const glowR = Math.max(r * 4, 24);

    const glow = ctx.createRadialGradient(s.x, s.y, r * 0.4, s.x, s.y, glowR);
    glow.addColorStop(0, 'rgba(245, 200, 75, 0.55)');
    glow.addColorStop(0.4, 'rgba(245, 200, 75, 0.16)');
    glow.addColorStop(1, 'rgba(245, 200, 75, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2);
    ctx.fill();

    const core = ctx.createRadialGradient(
      s.x - r * 0.2, s.y - r * 0.2, 0, s.x, s.y, Math.max(r, 3)
    );
    core.addColorStop(0, '#fffbe8');
    core.addColorStop(0.55, '#fde68a');
    core.addColorStop(1, '#f5a623');
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(s.x, s.y, Math.max(r, 3), 0, Math.PI * 2);
    ctx.fill();
  }

  function drawRing(p, s, r) {
    const ringColor = p.ring.color;
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(-0.35);
    ctx.scale(1, 0.38);
    const inner = r * p.ring.inner;
    const outer = r * p.ring.outer;
    const grad = ctx.createRadialGradient(0, 0, inner, 0, 0, outer);
    grad.addColorStop(0, `rgba(${ringColor}, 0)`);
    grad.addColorStop(0.15, `rgba(${ringColor}, 0.55)`);
    grad.addColorStop(0.55, `rgba(${ringColor}, 0.30)`);
    grad.addColorStop(0.85, `rgba(${ringColor}, 0.45)`);
    grad.addColorStop(1, `rgba(${ringColor}, 0)`);
    ctx.beginPath();
    ctx.arc(0, 0, outer, 0, Math.PI * 2);
    ctx.arc(0, 0, inner, 0, Math.PI * 2, true);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }

  function drawPlanet(p, tSec) {
    const s = toScreen(p.x, p.y);
    const r = Math.max(p.r * cam.zoom, 2.2);
    const pad = p.ring ? r * 2.5 : r;
    if (s.x < -pad - 40 || s.x > W + pad + 40 || s.y < -pad - 40 || s.y > H + pad + 40) return;

    if (isGhost(p)) {
      // undocumented at this timeline stop — present, but unknown
      ctx.globalAlpha = 0.15;
      ctx.beginPath();
      ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
      ctx.fillStyle = p.surface[1];
      ctx.fill();
      ctx.globalAlpha = 1;
      return;
    }

    const isActive = hovered === p || selected === p;

    if (isActive) {
      // Dark/Glow/Lime — two-layer neon falloff on the shape itself
      ctx.save();
      ctx.shadowColor = 'rgba(205, 222, 0, 0.60)';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(205, 222, 0, 0.30)';
      ctx.fill();
      ctx.shadowBlur = 40;
      ctx.shadowColor = 'rgba(205, 222, 0, 0.30)';
      ctx.fill();
      ctx.restore();
    }

    // light comes from the sun at the origin
    const lx = -p.x;
    const ly = -p.y;
    const len = Math.hypot(lx, ly) || 1;
    const hx = s.x + (lx / len) * r * 0.45;
    const hy = s.y + (ly / len) * r * 0.45;

    const grad = ctx.createRadialGradient(hx, hy, r * 0.1, s.x, s.y, r * 1.25);
    grad.addColorStop(0, p.surface[0]);
    grad.addColorStop(0.55, p.surface[1]);
    grad.addColorStop(1, p.surface[2]);
    ctx.beginPath();
    ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    if (p.bands && r > 14) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
      ctx.clip();
      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = p.surface[2];
      for (let i = -2; i <= 2; i++) {
        const yy = s.y + i * r * 0.32;
        ctx.lineWidth = r * 0.10;
        ctx.beginPath();
        ctx.moveTo(s.x - r, yy);
        ctx.quadraticCurveTo(s.x, yy + r * 0.08, s.x + r, yy);
        ctx.stroke();
      }
      ctx.restore();
    }

    if (p.ring) drawRing(p, s, r);

    if (isActive) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, (p.ring ? r * p.ring.outer : r) + 7, 0, Math.PI * 2);
      ctx.strokeStyle = COLOR.lime;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = selected === p ? 0.9 : 0.6;
      ctx.stroke();
      ctx.globalAlpha = 1;
    } else if (highlightSet.has(p.id)) {
      // timeline highlight: pulsing lime ring on the current stop's subject
      const pulse = reducedMotion ? 0.55 : 0.35 + 0.3 * Math.sin(tSec * 3);
      ctx.beginPath();
      ctx.arc(s.x, s.y, (p.ring ? r * p.ring.outer : r) + 9, 0, Math.PI * 2);
      ctx.strokeStyle = COLOR.lime;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = Math.max(0.15, pulse);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  function drawMoons(p) {
    if (!showMoons || isGhost(p) || !p.moons.length) return;
    const vis = moonVisibility(p);
    if (vis <= 0) return;
    const ps = toScreen(p.x, p.y);

    for (const m of p.moons) {
      const orbitR = m.orbit * cam.zoom;
      const isLit = highlightedMoon === m;
      const isHover = hovered === m || hoveredMoonBadge === m;

      // orbital path: faint by default, lime when the moon is clicked-active
      if (orbitR > 6 && orbitR < Math.max(W, H) * 2) {
        ctx.beginPath();
        ctx.arc(ps.x, ps.y, orbitR, 0, Math.PI * 2);
        if (isLit) {
          ctx.strokeStyle = `rgba(205, 222, 0, ${0.55 * vis})`;
          ctx.lineWidth = 1.5;
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.07 * vis})`;
          ctx.lineWidth = 1;
        }
        ctx.stroke();
        ctx.lineWidth = 1;
      }

      const s = toScreen(m.x, m.y);
      const r = Math.max(m.r * cam.zoom, 1.6);
      if (s.x < -40 || s.x > W + 40 || s.y < -40 || s.y > H + 40) continue;

      if (isLit || isHover) {
        ctx.save();
        ctx.shadowColor = 'rgba(205, 222, 0, 0.60)';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(205, 222, 0, 0.35)';
        ctx.fill();
        ctx.restore();
      }

      const grad = ctx.createRadialGradient(s.x - r * 0.3, s.y - r * 0.3, r * 0.1, s.x, s.y, r);
      grad.addColorStop(0, '#d8e0ea');
      grad.addColorStop(1, '#5d6b7e');
      ctx.beginPath();
      ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.globalAlpha = vis;
      ctx.fill();
      ctx.globalAlpha = 1;

      if (isLit || isHover) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, r + 4, 0, Math.PI * 2);
        ctx.strokeStyle = COLOR.lime;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = isLit ? 0.9 : 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.lineWidth = 1;

        ctx.font = '500 11px Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = COLOR.lime;
        ctx.fillText(m.name.toUpperCase(), s.x, s.y - r - 8);
      }
    }
  }

  function drawLabel(p) {
    if (!showPlanetLabels || isGhost(p)) return;
    const orbitScreen = p.orbit * cam.zoom;
    const isActive = hovered === p || selected === p;
    let alpha = (orbitScreen - 55) / 90;
    if (isActive) alpha = 1;
    alpha = Math.max(0, Math.min(1, alpha));
    if (alpha <= 0.02) return;

    const s = toScreen(p.x, p.y);
    const r = Math.max(p.r * cam.zoom, 2.2);
    if (r > H * 0.45) return;
    if (s.x < -80 || s.x > W + 80 || s.y < -80 || s.y > H + 80) return;

    ctx.font = '500 13px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.globalAlpha = alpha;
    ctx.fillStyle = isActive ? COLOR.lime : COLOR.label;
    const offset = p.ring ? r * p.ring.outer * 0.6 : r;
    ctx.fillText(p.name.toUpperCase(), s.x, s.y - offset - 12);
    ctx.globalAlpha = 1;
  }

  /* ---- main loop ---- */
  let lastT = performance.now();

  function frame(now) {
    const dt = Math.min(0.05, (now - lastT) / 1000);
    const tSec = now / 1000;
    lastT = now;
    if (!paused) simDays += BASE_DAYS_PER_SECOND * SPEED_MULT[speedMode] * dt;
    if (showComets && !paused) cometClock += dt;

    // scale mode crossfade (~0.9s, radii eased in log space) —
    // applied before updatePositions so orbits and positions agree
    const scaleAnimating = scaleState.blend !== scaleState.target;
    if (scaleAnimating) {
      const dir = Math.sign(scaleState.target - scaleState.blend);
      scaleState.blend = clamp01(scaleState.blend + dir * dt / 0.9);
      applyScaleBlend();
      if (following) {
        const frameRadius = following.frameRadius || (following.isSun ? 160 : 70);
        target.zoom = Math.min(maxZoom(), Math.max(minZoom, frameRadius / following.r));
      }
    }
    target.zoom = Math.min(maxZoom(), Math.max(minZoom, target.zoom));

    updatePositions();
    updateComets();

    if (following) {
      // ride along with the object's orbital motion so the camera never
      // trails it at high zoom; the lerp below only closes the approach gap
      if (followPrev && followPrev.obj === following) {
        cam.x += following.x - followPrev.x;
        cam.y += following.y - followPrev.y;
      }
      followPrev = { obj: following, x: following.x, y: following.y };

      // center the followed object in the space left of the open panel
      const shift = panel.classList.contains('is-open') && W > 900 ? (420 + 24) / 2 : 0;
      target.x = following.x + shift / target.zoom;
      target.y = following.y;
    } else {
      followPrev = null;
    }

    const k = 1 - Math.exp(-dt * 7);
    cam.x += (target.x - cam.x) * k;
    cam.y += (target.y - cam.y) * k;
    cam.zoom += (target.zoom - cam.zoom) * k;

    hovered = (mouse.inside && !dragging) ? hitTest(mouse.x, mouse.y) : null;
    canvas.classList.toggle('is-over-object', !!hovered && !dragging);

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.fillStyle = COLOR.void;
    ctx.fillRect(0, 0, W, H);

    drawStars(tSec);
    drawConstellations();
    drawOrbits();
    drawDwarfOrbits();
    drawBelt();
    drawSun();
    if (hovered === SUN || selected === SUN) {
      const s = toScreen(0, 0);
      ctx.beginPath();
      ctx.arc(s.x, s.y, Math.max(SUN.r * cam.zoom, 8) + 9, 0, Math.PI * 2);
      ctx.strokeStyle = COLOR.lime;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = selected === SUN ? 0.9 : 0.6;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    for (const p of PLANETS) drawPlanet(p, tSec);
    for (const p of PLANETS) drawMoons(p);
    for (const p of PLANETS) drawLabel(p);
    drawDwarfs(tSec);
    drawVoyagers(tSec);
    drawComets();

    // keep card badges in sync with canvas hover/highlight changes
    if (hovered !== lastMoonHover && (hovered?.kind === 'moon' || lastMoonHover)) {
      lastMoonHover = hovered?.kind === 'moon' ? hovered : null;
      syncMoonUI();
    }

    requestAnimationFrame(frame);
  }

  addEventListener('resize', () => {
    resize();
    target.zoom = Math.max(target.zoom, minZoom);
  });

  window.__cosmic = {
    cam, target, PLANETS, SUN, CONSTS, flyTo, resetView, deselect,
    scaleState, applyStop, TIMELINE_STOPS, toggleMoonHighlight,
    COMETS, DWARFS, PROBES,
    openPanel: (id) => {
      const obj = id === 'sol' ? SUN
        : PLANETS.find((p) => p.id === id)
        || DWARFS.find((d) => d.id === id)
        || COMETS.find((c) => c.id === id)
        || PROBES.find((p) => p.id === id);
      if (!obj) return;
      if (obj.kind === 'comet' || obj.kind === 'probe') {
        selected = obj;
        showPanel(obj);
      } else {
        flyTo(obj);
        showPanel(obj);
      }
    },
    get currentStop() { return currentStop; },
    get highlightedMoon() { return highlightedMoon; },
  };

  resize();
  seedStars();
  updatePositions();
  resetView();
  cam.x = target.x;
  cam.y = target.y;
  cam.zoom = target.zoom * 0.85; // gentle ease-in on load
  requestAnimationFrame(frame);
})();
