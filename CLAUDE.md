# CLAUDE.md — Cosmic Explorer

Working notes for resuming this project in a new session. Read this first.

## What this is
An interactive, museum-style solar-system explorer. **Vanilla HTML/CSS/JS on a single `<canvas>`** — no build step, no framework, no dependencies (only the Montserrat web font). Deployed to GitHub Pages at https://curranleeds.github.io/solar-system-explorer/ from `main` root.

Repo: https://github.com/curranleeds/solar-system-explorer

## Run / preview

### Plain local serve (your own terminal — simplest)
```bash
cd /Users/curranleeds/Desktop/repos/solar-system-explorer-main
python3 -m http.server 8000
# open http://localhost:8000
```

### In-app Claude preview (IMPORTANT — sandbox quirk)
The Claude preview dev-server runs in a sandbox that **cannot read `~/Desktop`** (only `/tmp`). So:
1. `./restage-preview.sh` copies the site into `/tmp/sse-preview` (run it after EVERY edit you want to preview).
2. `.claude/launch.json` serves `/tmp/sse-preview` on port 8137 (Python, isolated mode).
3. Then use `preview_start` / `preview_eval` / `preview_screenshot` against that server.

`restage-preview.sh` and `.claude/` are **gitignored** (dev-only; the script has a hardcoded path).

Preview gotchas that affect verification (not the real app):
- `requestAnimationFrame` is **paint-gated** — it only ticks when a screenshot/eval forces a paint. Animations advance ~1 frame per screenshot.
- The frame loop clamps `dt` to 0.05s, so time-based animations crawl in the preview. To verify time-based visuals, inject state via `preview_eval` using the `window.__cosmic` debug handle (see below) rather than waiting.
- After a fresh `preview_start`, set viewport explicitly (`preview_resize` width 1280 height 800); it sometimes starts at a tiny width.

## File map
```
index.html                 page shell + all UI chrome; loads js/*.js (note ?v=N cache-busting)
css/tokens.css             ELE Cosmic Design System tokens (--cosmic-* custom properties, Deep Space mode)
css/components.css         all UI styling (glass panels, settings, timeline, detail panel, .panel-art banner)
js/app.js                  the engine: camera/pan/zoom, render loop, hit-testing, detail panel,
                           planets+moons+belt, constellations, timeline, settings wiring,
                           content layers (comets/dwarfs/voyagers), panel-art lifecycle, comet tail
js/content.js              COSMIC_OBJECT_INFO: Sun + 8 planet placards (also still holds unused SVG
                           `illustration` strings — superseded by the image system, kept for recovery)
js/moons.js                COSMIC_MOONS: major moons per planet
js/comets.js               COSMIC_COMETS: 5 historical comets (Keplerian elements + panel content)
js/dwarfs.js               COSMIC_DWARFS: 5 dwarf planets
js/voyagers.js             COSMIC_VOYAGERS: Voyager 1 & 2 paths + mission content
js/constellations.js       88 IAU constellation star patterns
js/constellation-content.js  constellation placards
js/planet-art.js           PLANET_ART: animated overlay drawers for each planet/Sun detail card
images/planets/*.png       pixel-art base images for the detail cards (lowercase names; 1024×1024)
restage-preview.sh         (gitignored) copy site → /tmp/sse-preview for the sandboxed preview
```

## Architecture notes

### Engine (`app.js`, one big IIFE)
- World space (AU-scaled px, `AU = 280`) → screen via `toScreen`/`toWorld` using `cam {x,y,zoom}` lerping toward `target`.
- Single `frame()` rАF loop: advances `simDays` (orbit clock) and `cometClock`, updates positions, hit-tests hover, clears + redraws everything each frame.
- Orbit speed presets via `SPEED_MULT {cinematic:1, fast:4, orrery:20}` + `paused`; the inline play/pause button and the "Pause" segment stay in sync.
- `reducedMotion` (from `prefers-reduced-motion`) gates most animation.
- Detail panel: `renderPanel(obj)` branches by `obj.kind` (`constellation`/`comet`/`dwarf`/`probe`) else planet/Sun. `showPanel`/`hidePanel`/`deselect` manage it.

### Detail-panel art system (the big recent feature)
Each planet/Sun card top is a `.panel-art` banner (2:1, full-bleed, `border-radius` top corners) containing:
- `<img class="panel-art-img">` — the **static base image** (`images/planets/<id>.png`), `object-fit: contain` (whole round planet centered, never cropped). The Sun's body id is `sol` but its image is `sun.png` (mapped in `renderPanel`).
- `<canvas class="panel-art-anim">` — a **transparent overlay** for animation, drawn on top so the image shows through.

`app.js` `startPanelArt(obj)` / `stopPanelArt()` manage one loop at a time (cancel-token). On open it calls `PLANET_ART[obj.id](canvas, token)` if present. **Reduced motion or no entry → image alone, no loop.**

`PLANET_ART` contract (in `planet-art.js`):
- Overlay backing is `160×80` (2:1). The contained square image occupies the centered `80×80` region, so **image fraction (fx,fy) → (40 + fx*80, fy*80)**; every disk centers at (80,40). Helpers `fx()/fy()` encode this.
- `token = { cancelled }`; every frame must check it and stop.
- Effects are subtle, drawn with low alpha so the static art reads through.
- Saturn & Uranus ring shimmer is **sampled from the actual image pixels** (`buildRingMask` reads the sibling `<img>` to find real ring pixels, storing each pixel's angle) so the highlight follows the painted ring. The highlight is a glint that **swoops around the ring curve every 10s**.
- Mercury & Earth terminators use a rotating-illuminated-hemisphere model (`-nx*sin(ph)+nz*cos(ph)`) with **no edge taper**, so night covers the whole disc (no pointed poles). Earth composites clouds → night → aurora with straight-alpha "over".
- Per-body effects implemented: Sun (corona pulse + lime flares), Mercury (terminator E→W), Venus (3-layer cloud drift + lightning), Earth (clouds W→E + terminator 60s + teal polar aurora), Mars (20s dust wash + dust devils), Jupiter (band shimmer + breathing GRS), Saturn (ring swoop + polar hexagon), Uranus (ring swoop + seasonal pole-to-pole shift), Neptune (fast streaks + pulsing Great Dark Spot).
- Colors that must match the design system are read at runtime via `getComputedStyle` (e.g. `--cosmic-interactive-primary` lime, `--cosmic-text-brand-teal`), never hardcoded.

### Content layers (toggles in Settings)
- **Constellations** — 88 IAU figures (older feature).
- **Historical Comets** — `COMETS` built from `COSMIC_COMETS`; looped perihelion passes on randomized timers. Heads are glowing lime nuclei; SL9 is a fragmented "string of pearls". Clickable → comet panel.
- **Dwarf Planets** — Ceres/Pluto/Haumea/Makemake/Eris, smaller/dimmer, dashed orbits.
- **Voyager Probe Paths** — traced V1 (lime) / V2 (teal) paths, labeled flybys, pulsing markers.

### Comet tail (`app.js` `drawCometTail`)
Physics-style pixel particle tail (replaced the old gradient cone):
- Each comet keeps a **position-history queue** (world space), **distance-resampled**: a new entry only when the head has moved ≥ `MIN_STEP` (4 world px). Capped 60 (30 on mobile <768px). Cleared when inactive.
- This makes the tail **stretch when fast** (entries spaced by per-frame travel) and **persist when slow** (entries at the 4px floor stay behind the head instead of collapsing).
- Particles: 2–3px + opaque near head → 1px + transparent at the end; per-frame ±2px jitter (skipped on mobile) + seeded per-frame size variation for a dusty look; `fillRect` only.
- **Color: lime (`--cosmic-interactive-primary`, runtime) at the head → white toward the tail → transparent.**
- Reduced motion → static 10-particle tail.

### `window.__cosmic` debug handle
Exposed for testing/automation (harmless, consistent with the original author's debug object):
`cam, target, PLANETS, DWARFS, COMETS, PROBES, SUN, flyTo, resetView, deselect, openPanel(id), scaleState, applyStop, ...`. Use `__cosmic.openPanel('jupiter')`, manipulate `__cosmic.COMETS[i].history`, set `cam`/`target`, etc. in `preview_eval`.

## Conventions / gotchas
- **Case-insensitive macOS filesystem**: `Sun.png` and `sun.png` are the SAME file. NEVER write a lowercase file then `rm` the capitalized one — it deletes both. (This already caused two accidental deletions; originals were recovered from `~/Downloads`.) To rename case-only, copy from a different directory or `git mv`.
- All planet image files are **lowercase** in `images/planets/`.
- Design system: use `--cosmic-*` tokens; Deep Space dark glass aesthetic; lime = selection/active, teal = informational.
- Cache-busting: script/style tags in `index.html` use `?v=N`. **Bump these (and ideally add `?v` to planet-art.js/images) when deploying** so returning visitors don't get stale JS/CSS. (Currently `?v=3`.)
- No build/test tooling. "Tests" = open the app and look. Verify visual changes via the preview workflow above.

## Deploy
Push to `main`; GitHub Pages serves the repo root (`.nojekyll` present). `gh` is authenticated on this machine, so `git push` works. If the repo URL changes, update `og:url`/`og:image` in `index.html` and the masthead "View source" link.

## State as of last session
All planned features are built and pushed: settings restructure, 9 planet/Sun image cards with animated overlays, 3 content layers with detail panels, comet particle tail. Possible next steps if asked: bump cache-busting versions for a clean deploy; tune any overlay intensities; the unused SVG `illustration` strings in `content.js` could be removed.
