# Cosmic Explorer — Our Solar System

An interactive, museum-style tour of the solar system, built entirely with vanilla HTML, CSS, and JavaScript on the **ELE Cosmic Design System** (Deep Space mode). Pan and zoom a living map of the Sun, eight planets, 23 major moons, the asteroid belt, all 88 IAU constellations, five historical comets, five dwarf planets, and the Voyager probe trajectories — and click anything to read its story.

## The experience

- **A living solar system.** Planets orbit the Sun in real time, with an 850-body asteroid belt drifting on Kepler-scaled periods. Orbit speed is adjustable — **Cinematic** (one Earth year ≈ 2 minutes), **Fast** (≈4×), **Orrery** (≈20×) — or **Pause** it entirely.
- **Click to approach.** Selecting the Sun, a planet, a dwarf planet, a constellation, a comet, or a Voyager probe flies the camera in (where appropriate) and opens a glass detail panel — discovery history, name origin, cultural significance across civilizations, and a data table of scientific specs.
- **Stylized illustrations.** Each planet and the Sun open with a hand-built inline-SVG illustration at the top of its card — banded Jupiter and its Great Red Spot, Saturn's tilted rings, Olympus Mons on Mars, the Sun's granulated corona, and more. Museum art, not photography, filtered through the Deep Space palette.
- **Major moons.** The 23 significant moons orbit their planets and fade in as you approach. Each planet's card lists its moons as clickable badges with a stats frame (diameter, distance, period, discovery); hovering or clicking highlights the moon and its orbital path in space.
- **All 88 constellations.** Toggle the constellation overlay to reveal the full IAU sky as a celestial shell around the solar system — the zodiac ring in ecliptic order, northern figures above, southern below. Every figure is clickable, with placards covering first documentation, traditions from Babylon to the Dreamtime, earthly uses, and notable named stars.
- **True scale mode.** A toggle switches from the navigable display scale to one true scale for both sizes and distances. The Sun becomes barely a dot; the emptiness is the exhibit. Zoom extends to 30,000× so you can still find Earth.
- **Discovery timeline.** A scrubber walks through documented history — Antiquity, Copernicus (1543), Galileo (1610), Huygens (1655), Herschel (1781), Piazzi (1801), Neptune (1846), Today. Objects not yet discovered at a stop ghost out; the stop's subject pulses.

## Content layers

Four optional overlays can be toggled on independently, each clickable for full detail panels:

- **Constellations** — the 88 IAU figures (see above).
- **Historical Comets** — Halley, Hale–Bopp, Shoemaker–Levy 9, NEOWISE, and Hyakutake sweep through the inner system on a glowing lime nucleus and a fading tail that always points away from the Sun. They appear on a slow, randomized loop, so the sky is never permanently empty or crowded. Shoemaker–Levy 9 renders as its famous fragmented "string of pearls".
- **Dwarf Planets** — Ceres (in the asteroid belt) plus Pluto, Haumea, Makemake, and Eris beyond Neptune, drawn smaller and dimmer than the eight planets. Panels cover discovery, the 2006 IAU reclassification, size and mass, and notable features (Haumea even gets its egg shape and ring).
- **Voyager Probe Paths** — the traced flight paths of Voyager 1 (lime) and Voyager 2 (teal) through their planetary flybys and out toward interstellar space, with labeled waypoints and a pulsing marker at each probe's approximate current position.

## Settings

The UI separates two concerns:

- **Environmental settings** govern *how the scene behaves* — orbit speed, animation pause, moon orbits, planet labels, orbit path lines, and true scale. On desktop these live in a glass card opened by the **Settings** button (bottom-left); on mobile and tablet they appear in the menu overlay under a "Settings" heading.
- **Content layers** govern *what is shown* — the four overlays above. On desktop they sit in the "Content Layers" panel below the masthead; on mobile and tablet they appear in the menu overlay under a "Content Layers" heading.

## Controls

| Input | Action |
|---|---|
| Scroll / pinch | Zoom (anchored to the cursor) |
| Drag | Pan |
| Click an object | Open its detail panel (and fly to it, for planets/dwarfs/the Sun) |
| Click empty space | Deselect and close the panel |
| Esc | Close the panel; press again to reset the view |
| `+` / `−` / frame buttons | Zoom controls and reset |
| Play / Pause button | Pause or resume orbital motion (synced with the Pause speed option) |
| Settings button (desktop) | Open the environmental settings card |
| Timeline arrows (when focused) | Step through discovery stops |

## About the scale models

Real solar-system proportions cannot be drawn honestly on one screen, so the explorer offers two models:

- **Navigable scale (default):** planet sizes are true relative to one another, and orbital distances are true relative to one another, but the two use separate scales. The Sun is shown reduced. Moon systems compress each planet's real orbit ratios (power 0.55) so all moons ring their planet visibly.
- **True scale:** sizes and distances share one scale, including real moon distances. Small markers (~2 px) keep planets findable — without them, every planet would be smaller than a pixel.

## Design system

The UI is an implementation of the ELE Cosmic Design System's **Deep Space** mode:

- All colors, spacing, radii, and type come from the token layer in [`css/tokens.css`](css/tokens.css) (`--cosmic-*` custom properties).
- Glass surfaces use the three-part treatment: container fill at 40% opacity, `border/neutral/default` stroke, and the `Dark/Glass` shadow recipes with 16–20 px backdrop blur.
- Semantic color rules hold throughout: lime = selection/active (and Voyager 1, comet heads), teal = informational (constellations, Voyager 2), orange/red reserved for their semantic roles.
- Typography is Montserrat (Google Fonts), on the system's Display→Caption scale.

## Project structure

```
solar-system-explorer/
├── index.html                     # page shell and UI chrome
├── css/
│   ├── tokens.css                 # ELE Cosmic DS token layer (Deep Space values)
│   └── components.css             # glass panels, settings, badges, timeline, toggles
└── js/
    ├── app.js                     # canvas engine: camera, rendering, interactions, all layers
    ├── content.js                 # placards + inline-SVG illustrations for the Sun and planets
    ├── moons.js                   # major-moon data per planet
    ├── comets.js                  # historical comet trajectories and placards
    ├── dwarfs.js                  # dwarf-planet data and placards
    ├── voyagers.js                # Voyager 1 & 2 flight paths and mission placards
    ├── constellations.js          # star patterns for the 88 IAU constellations
    └── constellation-content.js   # placards for the 88 constellations
```

No build step, no dependencies. The only network request is the Montserrat font.

## Running locally

Serve the folder with any static file server (ES modules are not used, but `file://` can still be flaky with some browsers):

```bash
# either
npx serve solar-system-explorer
# or
python3 -m http.server 8000 --directory solar-system-explorer
```

Then open `http://localhost:8000` (or the port your server prints).

## Deploying to GitHub Pages

This project deploys to [curranleeds/solar-system-explorer](https://github.com/curranleeds/solar-system-explorer), served at:

**https://curranleeds.github.io/solar-system-explorer/**

1. Push the *contents* of this folder to the repository root (so `index.html` sits at the top level).
2. In **Settings → Pages**, set the source to the `main` branch, root folder.
3. The included `.nojekyll` file tells Pages to skip Jekyll processing and serve files as-is.

If the repository is ever renamed or moved, update the `og:url` and `og:image` absolute URLs in `index.html` and the View source link in the masthead.

## Accuracy notes

- Planetary, moon, dwarf-planet, comet, and Voyager data are accurate as of early 2026. Confirmed moon counts (Jupiter 95, Saturn 274, Uranus 28, Neptune 16) tick upward as surveys publish — the `extra` values in [`js/moons.js`](js/moons.js) are the place to update.
- Famous constellations use their real asterism shapes; fainter modern constellations use simplified, stylized figures — museum diagrams, not survey-accurate star positions.
- Orbits are drawn as circles (real eccentricities are small at this scale); constellation placement around the solar system is an exhibit layout, not a sky chart projection.
- **Comets** use real orbital elements (eccentricity, perihelion distance), but their on-canvas motion is a looped perihelion *pass* on a randomized timer — not a real-time orbit, since a single Hyakutake orbit takes ~70,000 years.
- **Dwarf planets** orbit on circles at their true relative semi-major axes (Ceres in the belt; the rest trans-Neptunian), consistent with how the eight planets are modeled.
- **Voyager paths** are 2D approximations of the probes' inclined 3D trajectories; flybys occur at each planet's true orbital distance, but the current-position markers are placed at a viewable distance — the real distances (well over 130 AU) lie far beyond the constellation shell. The true figures are given in each probe's panel.

## Accessibility

- `prefers-reduced-motion` pauses orbital motion, star twinkle, comet/probe animation, and panel transitions.
- The detail panel uses dialog semantics; the timeline is a keyboard-operable ARIA slider; toggles are real `role="switch"` buttons and the orbit-speed control is a labeled button group, all with visible lime focus rings.

---

Built with the ELE Cosmic Design System — Relevate Health.
