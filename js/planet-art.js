/* ============================================================
   Cosmic Explorer — animated overlays for detail-panel cards

   Static base art is an <img class="panel-art-img"> behind a transparent
   <canvas class="panel-art-anim">. app.js calls PLANET_ART[id](canvas,
   token) on open; overlays are transparent except where an effect draws,
   so the base image shows through. Reduced motion / no entry → image alone.

   token { cancelled }: flips true on close; every frame must check it.

   Geometry: the square art is shown object-fit:contain in a 2:1 box, so
   in the 160×80 overlay it occupies the centered 80×80 region. Image
   fraction (fx,fy) maps to (40+fx*80, fy*80); every disk is at (80,40).
   ============================================================ */

(function () {
  'use strict';

  window.PLANET_ART = window.PLANET_ART || {};

  const W = 160, H = 80, CX = 80, CY = 40, OX = (W - H) / 2;
  const fx = (f) => OX + f * H;
  const fy = (f) => f * H;
  const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

  function hexToRgb(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec((hex || '').trim());
    if (!m) return { r: 205, g: 222, b: 0 };
    const n = parseInt(m[1], 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  function cssVar(name, fb) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fb;
  }
  function makeNoise(gw, gh) {
    const n = new Float32Array(gw * gh);
    for (let i = 0; i < n.length; i++) n[i] = Math.random();
    return (x, y) => {
      const xf = ((x % gw) + gw) % gw, yf = ((y % gh) + gh) % gh;
      const x0 = Math.floor(xf), y0 = Math.floor(yf), x1 = (x0 + 1) % gw, y1 = (y0 + 1) % gh;
      const tx = xf - x0, ty = yf - y0;
      const a = n[y0 * gw + x0], b = n[y0 * gw + x1], c = n[y1 * gw + x0], d = n[y1 * gw + x1];
      return (a * (1 - tx) + b * tx) * (1 - ty) + (c * (1 - tx) + d * tx) * ty;
    };
  }
  function setup(canvas) {
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    return ctx;
  }
  function runLoop(token, draw) {
    let t0 = null;
    (function frame(now) {
      if (token.cancelled) return;
      if (t0 === null) t0 = now;
      draw((now - t0) / 1000);
      requestAnimationFrame(frame);
    })(performance.now());
  }
  const ef = (dist) => (dist > 0.85 ? clamp((1 - dist) / 0.15, 0, 1) : 1);

  // sample the base image (contain layout) and mark true ring pixels so a
  // shimmer can be drawn exactly on the painted rings
  function buildRingMask(canvas, bodyR, maxR, pred) {
    const img = canvas.closest('.panel-art') && canvas.closest('.panel-art').querySelector('.panel-art-img');
    if (!img || !img.complete || !img.naturalWidth) return null;
    const off = document.createElement('canvas');
    off.width = W; off.height = H;
    const octx = off.getContext('2d');
    octx.imageSmoothingEnabled = false;
    let data;
    try { octx.drawImage(img, OX, 0, H, H); data = octx.getImageData(0, 0, W, H).data; }
    catch (e) { return null; }
    const pts = [];
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const dx = x - CX, dy = y - CY, dist = Math.hypot(dx, dy);
        if (dist < bodyR || dist > maxR) continue;
        const i = (y * W + x) * 4;
        if (data[i + 3] < 10) continue;
        if (!pred(data[i], data[i + 1], data[i + 2])) continue;
        pts.push(x, y, Math.atan2(dy, dx)); // angle = position around the ring curve
      }
    }
    if (!pts.length) return null;
    return { pts };
  }

  /* ---- Sun: pulsing corona halo + lime solar flares ---- */
  PLANET_ART.sol = function (canvas, token) {
    const ctx = setup(canvas);
    const R = 33;
    const lime = hexToRgb(cssVar('--cosmic-interactive-primary', '#cdde00'));
    const flares = [], rA = [], rH = [];
    let nextFlare = 2;
    const RISE = 0.5, HOLD = 0.4, FALL = 0.9, LIFE = RISE + HOLD + FALL;
    const angDiff = (a, b) => { const d = Math.abs(a - b) % (Math.PI * 2); return d > Math.PI ? Math.PI * 2 - d : d; };
    function spawn(t) {
      let a, h, tr = 0;
      do { a = Math.random() * Math.PI * 2; h = 10 + Math.random() * 12; tr++; }
      while (tr < 20 && (rA.some((p) => angDiff(p, a) < 0.7) || rH.some((p) => Math.abs(p - h) < 3)));
      rA.push(a); rH.push(h); if (rA.length > 3) rA.shift(); if (rH.length > 3) rH.shift();
      flares.push({ s: t, a, h, bow: (Math.random() * 2 - 1) * 0.45, lean: (Math.random() * 2 - 1) * 0.5 });
    }
    runLoop(token, (t) => {
      ctx.clearRect(0, 0, W, H);
      const pulse = 0.5 + 0.5 * Math.sin(t * Math.PI * 2 / 3);
      const g = ctx.createRadialGradient(CX, CY, R * 0.85, CX, CY, R * 1.55);
      g.addColorStop(0, 'rgba(255,205,110,0)');
      g.addColorStop(0.35, `rgba(255,198,105,${(0.1 + 0.2 * pulse).toFixed(3)})`);
      g.addColorStop(1, 'rgba(255,170,70,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(CX, CY, R * 1.55, 0, Math.PI * 2); ctx.fill();
      if (t >= nextFlare) { spawn(t); nextFlare = t + 4 + Math.random() * 4; }
      for (let i = flares.length - 1; i >= 0; i--) {
        const f = flares[i], e = t - f.s;
        if (e >= LIFE) { flares.splice(i, 1); continue; }
        let inten, lf;
        if (e < RISE) { const k = e / RISE; lf = 1 - (1 - k) * (1 - k); inten = k; }
        else if (e < RISE + HOLD) { lf = 1; inten = 1; }
        else { lf = 1; inten = 1 - (e - RISE - HOLD) / FALL; }
        const ct = Math.cos(f.a), st = Math.sin(f.a);
        const bx = CX + ct * R, by = CY + st * R, tx = -st, ty = ct;
        const tipx = bx + ct * f.h + tx * f.lean * f.h, tipy = by + st * f.h + ty * f.lean * f.h;
        const mx = (bx + tipx) / 2, my = (by + tipy) / 2;
        const cxp = mx + tx * f.bow * f.h, cyp = my + ty * f.bow * f.h;
        const N = Math.max(8, Math.ceil(f.h * 1.6));
        for (let j = 0; j <= N; j++) {
          const u = (j / N) * lf, om = 1 - u;
          const x = om * om * bx + 2 * om * u * cxp + u * u * tipx;
          const y = om * om * by + 2 * om * u * cyp + u * u * tipy;
          const a = (1 - u) * inten;
          if (a <= 0.02) continue;
          ctx.fillStyle = `rgba(${lime.r},${lime.g},${lime.b},${a.toFixed(3)})`;
          ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
        }
      }
    });
  };

  /* shared day/night terminator sweep (illuminated hemisphere rotates,
     so the night side fully crosses the disc; loops with no hard reset) */
  function terminatorDraw(d, t, R, period, maxDark) {
    const ph = t * (Math.PI * 2) / period; // light dir rotates in x-z plane
    const sp = Math.sin(ph), cp = Math.cos(ph);
    for (let y = 0; y < H; y++) {
      const ny = (y - CY) / R;
      for (let x = 0; x < W; x++) {
        const nx = (x - CX) / R;
        const r2 = nx * nx + ny * ny;
        if (r2 > 1) continue;
        const nz = Math.sqrt(1 - r2);
        const illum = -nx * sp + nz * cp; // east darkens first → sweeps E→W
        const night = clamp((0.32 - illum) / 0.6, 0, 1) * maxDark;
        if (night <= 0.01) continue;
        const idx = (y * W + x) * 4;
        d[idx] = 2; d[idx + 1] = 3; d[idx + 2] = 12;
        d[idx + 3] = Math.round(night * ef(Math.sqrt(r2)) * 255);
      }
    }
  }

  /* ---- Mercury: terminator sweeping east→west ---- */
  PLANET_ART.mercury = function (canvas, token) {
    const ctx = setup(canvas);
    runLoop(token, (t) => {
      const img = ctx.createImageData(W, H);
      terminatorDraw(img.data, t, 32, 28, 0.78);
      ctx.putImageData(img, 0, 0);
    });
  };

  /* ---- Venus: multi-layer cloud drift (more apparent) + lightning ---- */
  PLANET_ART.venus = function (canvas, token) {
    const ctx = setup(canvas);
    const R = 36;
    const n1 = makeNoise(48, 16), n2 = makeNoise(40, 14), n3 = makeNoise(32, 12);
    const flashes = [];
    let nextL = 2;
    runLoop(token, (t) => {
      const img = ctx.createImageData(W, H);
      const d = img.data;
      for (let y = 0; y < H; y++) {
        const ny = (y - CY) / R;
        for (let x = 0; x < W; x++) {
          const nx = (x - CX) / R;
          const r2 = nx * nx + ny * ny;
          if (r2 > 1) continue;
          const s1 = n1((x + 3 * t) * 0.55, y * 1.0);
          const s2 = n2((x + 6.5 * t) * 0.8 + 40, y * 0.85 + 20);
          const s3 = n3((x + 11 * t) * 1.1 + 90, y * 1.3 + 50);
          const v = s1 * 0.45 + s2 * 0.35 + s3 * 0.2 - 0.5;
          if (v <= 0) continue;
          const a = Math.min(0.3, v * 0.85) * ef(Math.sqrt(r2));
          if (a <= 0.01) continue;
          const idx = (y * W + x) * 4;
          d[idx] = 252; d[idx + 1] = 240; d[idx + 2] = 200; d[idx + 3] = Math.round(a * 255);
        }
      }
      ctx.putImageData(img, 0, 0);
      if (t >= nextL) {
        flashes.push({ s: t, x: CX + (Math.random() * 1.2 - 0.6) * R, y: CY + (0.2 + Math.random() * 0.55) * R });
        nextL = t + 1.5 + Math.random() * 3;
      }
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i], e = t - f.s;
        if (e > 0.18) { flashes.splice(i, 1); continue; }
        ctx.fillStyle = `rgba(225,238,255,${((1 - e / 0.18) * 0.85).toFixed(3)})`;
        const px = Math.round(f.x), py = Math.round(f.y);
        ctx.fillRect(px, py, 1, 1); ctx.fillRect(px - 1, py, 1, 1); ctx.fillRect(px + 1, py, 1, 1); ctx.fillRect(px, py - 1, 1, 1);
      }
    });
  };

  /* ---- Earth: clouds W→E + full terminator sweep (60s) + polar aurora ---- */
  PLANET_ART.earth = function (canvas, token) {
    const ctx = setup(canvas);
    const R = 36;
    const teal = hexToRgb(cssVar('--cosmic-text-brand-teal', '#14b8a6'));
    const noise = makeNoise(48, 16);
    runLoop(token, (t) => {
      const img = ctx.createImageData(W, H);
      const d = img.data;
      const ph = t * (Math.PI * 2) / 60, sp = Math.sin(ph), cp = Math.cos(ph);
      for (let y = 0; y < H; y++) {
        const ny = (y - CY) / R;
        for (let x = 0; x < W; x++) {
          const nx = (x - CX) / R;
          const r2 = nx * nx + ny * ny;
          if (r2 > 1) continue;
          const fade = ef(Math.sqrt(r2));
          const nz = Math.sqrt(1 - r2);
          // full-disc night (no edge taper → covers the whole globe, no points)
          const night = clamp((0.32 - (-nx * sp + nz * cp)) / 0.6, 0, 1) * 0.8;
          const cl = noise((x - 4 * t) * 0.7, y * 1.1);
          const cloudA = Math.max(0, cl - 0.62) * 0.6;
          let au = 0;
          if (Math.abs(ny) > 0.66) {
            const pf = (Math.abs(ny) - 0.66) / 0.34;
            au = pf * 0.34 * (0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 3 + x * 0.6 + (ny < 0 ? 0 : 9)))) * fade;
          }
          // straight-alpha "over" compositing: clouds, then night, then aurora glow
          let R0 = 0, G0 = 0, B0 = 0, A0 = 0;
          let sa = Math.min(0.2, cloudA) * fade;
          if (sa > 0) { const na = sa + A0 * (1 - sa); R0 = (225 * sa + R0 * A0 * (1 - sa)) / na; G0 = (238 * sa + G0 * A0 * (1 - sa)) / na; B0 = (255 * sa + B0 * A0 * (1 - sa)) / na; A0 = na; }
          sa = night;
          if (sa > 0) { const na = sa + A0 * (1 - sa); R0 = (2 * sa + R0 * A0 * (1 - sa)) / na; G0 = (4 * sa + G0 * A0 * (1 - sa)) / na; B0 = (14 * sa + B0 * A0 * (1 - sa)) / na; A0 = na; }
          sa = au;
          if (sa > 0) { const na = sa + A0 * (1 - sa); R0 = (teal.r * sa + R0 * A0 * (1 - sa)) / na; G0 = (teal.g * sa + G0 * A0 * (1 - sa)) / na; B0 = (teal.b * sa + B0 * A0 * (1 - sa)) / na; A0 = na; }
          if (A0 <= 0.004) continue;
          const idx = (y * W + x) * 4;
          d[idx] = Math.round(R0); d[idx + 1] = Math.round(G0); d[idx + 2] = Math.round(B0); d[idx + 3] = Math.round(A0 * 255);
        }
      }
      ctx.putImageData(img, 0, 0);
    });
  };

  /* ---- Mars: 20s dust-storm wash + bolder roaming dust devils ---- */
  PLANET_ART.mars = function (canvas, token) {
    const ctx = setup(canvas);
    const R = 37;
    const devils = [];
    let nextD = 1.5;
    runLoop(token, (t) => {
      const washA = 0.16 * ((1 - Math.cos(t * Math.PI * 2 / 20)) / 2); // 20s cycle
      const img = ctx.createImageData(W, H);
      const d = img.data;
      for (let y = 0; y < H; y++) {
        const ny = (y - CY) / R;
        for (let x = 0; x < W; x++) {
          const nx = (x - CX) / R;
          const r2 = nx * nx + ny * ny;
          if (r2 > 1) continue;
          const a = washA * ef(Math.sqrt(r2));
          if (a <= 0.01) continue;
          const idx = (y * W + x) * 4;
          d[idx] = 205; d[idx + 1] = 142; d[idx + 2] = 92; d[idx + 3] = Math.round(a * 255);
        }
      }
      ctx.putImageData(img, 0, 0);
      if (t >= nextD) {
        const ang = Math.random() * Math.PI * 2, rad = Math.random() * R * 0.7;
        devils.push({ s: t, x: CX + Math.cos(ang) * rad, y: CY + Math.sin(ang) * rad });
        nextD = t + 2 + Math.random() * 2.5;
      }
      for (let i = devils.length - 1; i >= 0; i--) {
        const dv = devils[i], e = t - dv.s, life = 3.0;
        if (e > life) { devils.splice(i, 1); continue; }
        const fade = e < 0.4 ? e / 0.4 : 1 - (e - 0.4) / (life - 0.4);
        const spin = e * 7;
        for (let k = 0; k < 16; k++) {
          const a2 = k * 0.7 + spin, rr = k * 0.6;
          const a = 0.8 * fade * (1 - k / 18);
          ctx.fillStyle = `rgba(214,166,116,${a.toFixed(3)})`;
          ctx.fillRect(Math.round(dv.x + Math.cos(a2) * rr), Math.round(dv.y + Math.sin(a2) * rr * 0.7), 1, 1);
        }
      }
    });
  };

  /* ---- Jupiter: band shimmer + clockwise GRS with clear breathing ---- */
  PLANET_ART.jupiter = function (canvas, token) {
    const ctx = setup(canvas);
    const R = 36;
    const gx = fx(0.61), gy = fy(0.71), gr0 = 0.07 * H;
    const noise = makeNoise(48, 16);
    runLoop(token, (t) => {
      const img = ctx.createImageData(W, H);
      const d = img.data;
      for (let y = 0; y < H; y++) {
        const ny = (y - CY) / R;
        for (let x = 0; x < W; x++) {
          const nx = (x - CX) / R;
          const r2 = nx * nx + ny * ny;
          if (r2 > 1) continue;
          const bi = Math.min(5, Math.max(0, Math.floor((ny + 1) / (2 / 6))));
          const dir = bi % 2 === 0 ? 1 : -1;
          const scroll = dir * 6 * (1 + bi * 0.15) * t;
          const hl = noise((x + scroll) * 0.7, y * 1.1 + bi * 9) - 0.6;
          if (hl <= 0) continue;
          const a = Math.min(0.18, hl * 0.55) * ef(Math.sqrt(r2));
          if (a <= 0.01) continue;
          const idx = (y * W + x) * 4;
          d[idx] = 255; d[idx + 1] = 244; d[idx + 2] = 212; d[idx + 3] = Math.round(a * 255);
        }
      }
      const spin = t * (Math.PI * 2 / 8);
      const gr = gr0 * (1 - 0.34 * ((1 - Math.cos(t * (Math.PI * 2 / 22))) / 2)); // clearer breathing
      for (let y = Math.floor(gy - gr - 1); y <= Math.ceil(gy + gr + 1); y++) {
        for (let x = Math.floor(gx - gr - 1); x <= Math.ceil(gx + gr + 1); x++) {
          if (x < 0 || x >= W || y < 0 || y >= H) continue;
          const dx = (x + 0.5 - gx) / gr, dy = (y + 0.5 - gy) / gr;
          const rr = dx * dx + dy * dy;
          if (rr > 1) continue;
          const lr = Math.sqrt(rr);
          const swirl = 0.5 + 0.5 * Math.sin(Math.atan2(dy, dx) * 2 - spin * 2 + lr * 5);
          const a = Math.min(0.5, 0.36 * (1 - lr) * swirl);
          if (a <= 0.01) continue;
          const idx = (y * W + x) * 4;
          d[idx] = 205; d[idx + 1] = 92; d[idx + 2] = 60; d[idx + 3] = Math.round(a * 255);
        }
      }
      ctx.putImageData(img, 0, 0);
    });
  };

  /* ---- Saturn: shimmer on the real ring pixels + polar hexagon ---- */
  PLANET_ART.saturn = function (canvas, token) {
    const ctx = setup(canvas);
    let mask = null;
    const bodyR = 22;
    runLoop(token, (t) => {
      if (!mask) mask = buildRingMask(canvas, bodyR, 44, (r, g, b) => r + g + b > 240);
      const img = ctx.createImageData(W, H);
      const d = img.data;
      if (mask) {
        // a highlight that swoops around the ring curve, once every 10s
        const sweep = ((t % 10) / 10) * Math.PI * 2;
        const p = mask.pts;
        for (let k = 0; k < p.length; k += 3) {
          const x = p[k], y = p[k + 1], ang = p[k + 2];
          let dA = ang - sweep;
          dA = Math.atan2(Math.sin(dA), Math.cos(dA));
          const hi = Math.exp(-Math.pow(dA / 0.85, 2));
          const a = 0.05 + 0.5 * hi;
          if (a <= 0.03) continue;
          const idx = (y * W + x) * 4;
          d[idx] = 245; d[idx + 1] = 236; d[idx + 2] = 206; d[idx + 3] = Math.round(Math.min(0.62, a) * 255);
        }
      }
      // faint rotating north-pole hexagon
      const hx = CX, hy = CY - bodyR * 0.72, hr = 5, sq = 0.45, rot = t * (Math.PI * 2 / 30);
      const vtx = [];
      for (let i = 0; i < 6; i++) { const a = rot + i * Math.PI / 3; vtx.push([hx + Math.cos(a) * hr, hy + Math.sin(a) * hr * sq]); }
      for (let e = 0; e < 6; e++) {
        const a0 = vtx[e], b0 = vtx[(e + 1) % 6];
        const steps = Math.max(2, Math.ceil(Math.hypot(b0[0] - a0[0], b0[1] - a0[1]) * 1.5));
        for (let s2 = 0; s2 <= steps; s2++) {
          const tt = s2 / steps;
          const px = Math.round(a0[0] + (b0[0] - a0[0]) * tt), py = Math.round(a0[1] + (b0[1] - a0[1]) * tt);
          if (px < 0 || px >= W || py < 0 || py >= H) continue;
          const idx = (py * W + px) * 4;
          d[idx] = 235; d[idx + 1] = 230; d[idx + 2] = 205; d[idx + 3] = Math.max(d[idx + 3], 95);
        }
      }
      ctx.putImageData(img, 0, 0);
    });
  };

  /* ---- Uranus: shimmer on the real ring pixels + clearer seasonal shift ---- */
  PLANET_ART.uranus = function (canvas, token) {
    const ctx = setup(canvas);
    let mask = null;
    const R = 27;
    runLoop(token, (t) => {
      if (!mask) mask = buildRingMask(canvas, 24, 40, (r, g, b) => r + g + b > 105 && b >= r - 10);
      const img = ctx.createImageData(W, H);
      const d = img.data;
      // seasonal pole-to-pole light shift (clearer)
      const phase = Math.sin(t * Math.PI * 2 / 40);
      for (let y = 0; y < H; y++) {
        const ny = (y - CY) / R;
        for (let x = 0; x < W; x++) {
          const nx = (x - CX) / R;
          const r2 = nx * nx + ny * ny;
          if (r2 > 1) continue;
          const seas = 0.22 * Math.max(0, phase * -ny) + 0.22 * Math.max(0, -phase * ny);
          if (seas <= 0.01) continue;
          const idx = (y * W + x) * 4;
          d[idx] = 216; d[idx + 1] = 242; d[idx + 2] = 242; d[idx + 3] = Math.round(seas * ef(Math.sqrt(r2)) * 255);
        }
      }
      // ring shimmer on top (real ring pixels)
      if (mask) {
        // highlight swooping around the ring curve, once every 10s
        const sweep = ((t % 10) / 10) * Math.PI * 2;
        const p = mask.pts;
        for (let k = 0; k < p.length; k += 3) {
          const x = p[k], y = p[k + 1], ang = p[k + 2];
          let dA = ang - sweep;
          dA = Math.atan2(Math.sin(dA), Math.cos(dA));
          const hi = Math.exp(-Math.pow(dA / 0.85, 2));
          const a = 0.05 + 0.5 * hi;
          if (a <= 0.03) continue;
          const idx = (y * W + x) * 4;
          d[idx] = 210; d[idx + 1] = 242; d[idx + 2] = 242; d[idx + 3] = Math.round(Math.min(0.6, a) * 255);
        }
      }
      ctx.putImageData(img, 0, 0);
    });
  };

  /* ---- Neptune: fast cloud streaks + clearly pulsing Great Dark Spot ---- */
  PLANET_ART.neptune = function (canvas, token) {
    const ctx = setup(canvas);
    const R = 36;
    const noise = makeNoise(48, 16);
    const gx = fx(0.67), gy = fy(0.65);
    runLoop(token, (t) => {
      const img = ctx.createImageData(W, H);
      const d = img.data;
      for (let y = 0; y < H; y++) {
        const ny = (y - CY) / R;
        for (let x = 0; x < W; x++) {
          const nx = (x - CX) / R;
          const r2 = nx * nx + ny * ny;
          if (r2 > 1) continue;
          const hl = noise((x - 12 * t) * 0.6, y * 1.2) - 0.6;
          if (hl <= 0) continue;
          const a = Math.min(0.18, hl * 0.5) * ef(Math.sqrt(r2));
          if (a <= 0.01) continue;
          const idx = (y * W + x) * 4;
          d[idx] = 175; d[idx + 1] = 202; d[idx + 2] = 255; d[idx + 3] = Math.round(a * 255);
        }
      }
      ctx.putImageData(img, 0, 0);
      const gp = 0.5 + 0.5 * Math.sin(t * Math.PI * 2 / 9); // clearer slow pulse
      ctx.fillStyle = `rgba(10,18,52,${(0.2 + 0.45 * gp).toFixed(3)})`;
      ctx.beginPath();
      ctx.ellipse(gx, gy, 5.6 + 0.6 * gp, 3.6 + 0.4 * gp, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  // Sun body id is "sol"; expose "sun" alias too.
  window.PLANET_ART.sun = window.PLANET_ART.sol;
})();
