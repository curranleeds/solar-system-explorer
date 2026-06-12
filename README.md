# Cosmic Explorer — Our Solar System

An interactive, museum-style tour of the solar system, built entirely with vanilla HTML, CSS, and JavaScript on the **ELE Cosmic Design System** (Deep Space mode). Pan and zoom a living map of the Sun, eight planets, 23 major moons, the asteroid belt, and all 88 IAU constellations — and click anything to read its story.

## The experience

- **A living solar system.** Planets orbit the Sun in real time at true relative speeds (one Earth year ≈ 2 minutes), with an 850-body asteroid belt drifting on Kepler-scaled periods.
- **Click to approach.** Selecting the Sun, a planet, or a constellation flies the camera in and opens a glass detail panel — discovery history, name origin, cultural significance across civilizations, and a data table of scientific specs.
- **Major moons.** The 23 significant moons orbit their planets and fade in as you approach. Each planet's card lists its moons as clickable badges with a stats frame (diameter, distance, period, discovery); hovering or clicking highlights the moon and its orbital path in space.
- **All 88 constellations.** Toggle the constellation overlay to reveal the full IAU sky as a celestial shell around the solar system — the zodiac ring in ecliptic order, northern figures above, southern below. Every figure is clickable, with placards covering first documentation, traditions from Babylon to the Dreamtime, earthly uses, and notable named stars.
- **True scale mode.** A toggle switches from the navigable display scale to one true scale for both sizes and distances. The Sun becomes barely a dot; the emptiness is the exhibit. Zoom extends to 30,000× so you can still find Earth.
- **Discovery timeline.** A scrubber walks through documented history — Antiquity, Copernicus (1543), Galileo (1610), Huygens (1655), Herschel (1781), Piazzi (1801), Neptune (1846), Today. Objects not yet discovered at a stop ghost out; the stop's subject pulses.

## Controls

| Input | Action |
|---|---|
| Scroll / pinch | Zoom (anchored to the cursor) |
| Drag | Pan |
| Click an object | Fly to it and open its detail panel |
| Click empty space | Deselect and close the panel |
| Esc | Close the panel; press again to reset the view |
| `+` / `−` / frame buttons | Zoom controls and reset |
| Timeline arrows (when focused) | Step through discovery stops |

## About the scale models

Real solar-system proportions cannot be drawn honestly on one screen, so the explorer offers two models:

- **Navigable scale (default):** planet sizes are true relative to one another, and orbital distances are true relative to one another, but the two use separate scales. The Sun is shown reduced. Moon systems compress each planet's real orbit ratios (power 0.55) so all moons ring their planet visibly.
- **True scale:** sizes and distances share one scale, including real moon distances. Small markers (~2 px) keep planets findable — without them, every planet would be smaller than a pixel.

## Design system

The UI is an implementation of the ELE Cosmic Design System's **Deep Space** mode:

- All colors, spacing, radii, and type come from the token layer in [`css/tokens.css`](css/tokens.css) (`--cosmic-*` custom properties).
- Glass surfaces use the three-part treatment: container fill at 40% opacity, `border/neutral/default` stroke, and the `Dark/Glass` shadow recipes with 16–20 px backdrop blur.
- Semantic color rules hold throughout: lime = selection/active, teal = informational (constellation layer), orange/red reserved for their semantic roles.
- Typography is Montserrat (Google Fonts), on the system's Display→Caption scale.

## Project structure

```
solar-system-explorer/
├── index.html                     # page shell and UI chrome
├── css/
│   ├── tokens.css                 # ELE Cosmic DS token layer (Deep Space values)
│   └── components.css             # glass panels, badges, timeline, toggles
└── js/
    ├── app.js                     # canvas engine: camera, rendering, interactions
    ├── content.js                 # placards for the Sun and planets
    ├── moons.js                   # major-moon data per planet
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

- Planetary, moon, and discovery data are accurate as of early 2026. Confirmed moon counts (Jupiter 95, Saturn 274, Uranus 28, Neptune 16) tick upward as surveys publish — the `extra` values in [`js/moons.js`](js/moons.js) are the place to update.
- Famous constellations use their real asterism shapes; fainter modern constellations use simplified, stylized figures — museum diagrams, not survey-accurate star positions.
- Orbits are drawn as circles (real eccentricities are small at this scale); constellation placement around the solar system is an exhibit layout, not a sky chart projection.

## Accessibility

- `prefers-reduced-motion` pauses orbital motion, star twinkle, and panel animations.
- The detail panel uses dialog semantics; the timeline is a keyboard-operable ARIA slider; toggles are real `role="switch"` buttons with visible lime focus rings throughout.

---

Built with the ELE Cosmic Design System — Relevate Health.
