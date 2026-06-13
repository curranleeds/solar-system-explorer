/* ============================================================
   Cosmic Explorer — Voyager probe paths
   Content layer: the historical flight paths of Voyager 1 and 2,
   traced as polylines through their gravity-assist flybys and out
   toward interstellar space.

   The real trajectories are three-dimensional and inclined; these
   are approximate 2D routes that pass each flyby planet at its true
   orbital distance, then fan outward. The current-position markers
   are placed at a viewable distance — the true distances (well over
   130 AU) lie far beyond the constellation shell — and the real
   figures are given in the detail panel.

   points: ordered waypoints in AU (x, y). A `label` marks a flyby.
   The final point is the current-position marker.
   ============================================================ */

window.COSMIC_VOYAGERS = [
  {
    id: 'voyager-1', name: 'Voyager 1', token: 'primary',
    points: [
      { x: -0.5, y: 0.8 },
      { x: -3.4, y: 3.9, label: 'Jupiter · 1979' },
      { x: -6.6, y: 6.9, label: 'Saturn · 1980' },
      { x: -15, y: 16 },
      { x: -30, y: 34 },
      { x: -50, y: 60 },
    ],
    info: {
      badges: [
        { hue: 'lime', text: 'Voyager 1' },
        { hue: 'gray', text: 'Interstellar' },
      ],
      lede: 'The farthest human-made object from Earth — launched in 1977, it slingshotted past Jupiter and Saturn and is now in interstellar space, still faintly calling home.',
      launch: '5 September 1977 · Cape Canaveral',
      objectives: 'A close study of Jupiter and Saturn and Saturn’s giant moon Titan, followed by an open-ended mission into the outer heliosphere and beyond. The Titan flyby was prioritized over a Pluto option — bending Voyager 1 up and out of the planetary plane.',
      flybys: [
        { world: 'Jupiter · March 1979', text: 'Discovered active volcanoes on the moon Io — the first ever seen beyond Earth — resolved the swirling dynamics of the Great Red Spot, and detected Jupiter’s faint ring.' },
        { world: 'Saturn · November 1980', text: 'Probed Titan’s thick nitrogen atmosphere, revealed intricate structure and "spokes" in the rings, and found new moons. The Titan encounter flung Voyager 1 northward out of the ecliptic.' },
      ],
      distance: '~167 AU from Earth (~25.0 billion km)',
      status: 'Operational. Crossed the heliopause into interstellar space on 25 August 2012 — the first spacecraft ever to do so. Its plutonium power source fades each year, and instruments are being switched off one by one to extend the mission into the 2030s.',
      stats: [
        ['Launched', '5 Sep 1977'],
        ['Distance', '~167 AU'],
        ['Speed', '~17 km/s'],
        ['Heliopause', '25 Aug 2012'],
        ['Status', 'Active · interstellar'],
      ],
    },
  },
  {
    id: 'voyager-2', name: 'Voyager 2', token: 'tertiary',
    points: [
      { x: 0.6, y: 0.7 },
      { x: 4.3, y: 2.9, label: 'Jupiter · 1979' },
      { x: 8.8, y: 4.0, label: 'Saturn · 1981' },
      { x: 18.2, y: 6.6, label: 'Uranus · 1986' },
      { x: 28.0, y: 11.0, label: 'Neptune · 1989' },
      { x: 42, y: 24 },
      { x: 55, y: 44 },
    ],
    info: {
      badges: [
        { hue: 'teal', text: 'Voyager 2' },
        { hue: 'gray', text: 'Grand Tour' },
      ],
      lede: 'The only spacecraft to visit all four giant planets — a once-in-176-years planetary alignment let it tour Jupiter, Saturn, Uranus, and Neptune in a single grand sweep.',
      launch: '20 August 1977 · Cape Canaveral (16 days before Voyager 1)',
      objectives: 'Exploit a rare alignment of the outer planets to perform the "Grand Tour", using each planet’s gravity to fling the probe onward to the next — the only mission ever to reach Uranus and Neptune.',
      flybys: [
        { world: 'Jupiter · July 1979', text: 'Added detail to Io’s volcanism and the Jovian ring, and refined our picture of the planet’s turbulent atmosphere and moons.' },
        { world: 'Saturn · August 1981', text: 'Returned high-resolution ring and atmosphere data before gravity assist sent it on toward Uranus.' },
        { world: 'Uranus · January 1986', text: 'The first and only visit to Uranus: discovered 10 new moons and 2 rings, and revealed a magnetic field bizarrely tilted 59° from the rotation axis.' },
        { world: 'Neptune · August 1989', text: 'The first and only visit to Neptune: imaged the Great Dark Spot, clocked 2,100 km/h winds, and found active nitrogen geysers erupting on the moon Triton.' },
      ],
      distance: '~139 AU from Earth (~20.8 billion km)',
      status: 'Operational. Crossed the heliopause on 5 November 2018 — the second spacecraft to enter interstellar space. Like its twin, it is slowly powering down but continues to return data on the interstellar medium.',
      stats: [
        ['Launched', '20 Aug 1977'],
        ['Distance', '~139 AU'],
        ['Speed', '~15 km/s'],
        ['Heliopause', '5 Nov 2018'],
        ['Status', 'Active · interstellar'],
      ],
    },
  },
];
