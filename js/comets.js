/* ============================================================
   Cosmic Explorer — historical comets
   Content layer: five famous comets on approximate Keplerian
   trajectories. Orbital elements are stored in AU / radians and
   scaled to world space by app.js. Periods are real; the on-canvas
   motion is a looped perihelion "pass" on a randomized timer, not
   a real-time orbit (a single Hyakutake orbit takes ~70,000 years).

   orbit:
     aAU   — semi-major axis (AU)
     e     — eccentricity
     omega — orientation of perihelion in the map plane (radians)
     dir   — +1 / -1 sweep handedness (prograde / retrograde look)
     nuMax — true-anomaly half-sweep rendered each pass (radians)
   anim:
     pass  — [min,max] seconds for one perihelion pass
     gap   — [min,max] seconds the comet waits between passes
   ============================================================ */

window.COSMIC_COMETS = [
  {
    id: 'halley', name: "Halley's Comet",
    orbit: { aAU: 17.8, e: 0.967, omega: 0.5, dir: -1, nuMax: 2.62 },
    anim: { pass: [26, 40], gap: [16, 36] },
    info: {
      badges: [
        { hue: 'lime', text: 'Periodic' },
        { hue: 'gray', text: 'Returns 2061' },
      ],
      lede: 'The most famous comet of all — the first ever recognized as a returning visitor, and the only naked-eye comet that can appear twice in a human lifetime.',
      discovery: {
        headline: 'Edmond Halley · periodicity computed 1705',
        body: 'Seen since antiquity, but in 1705 Edmond Halley realized the comets of 1531, 1607, and 1682 were one object on a 76-year orbit. He predicted its 1758 return; it arrived on schedule, 16 years after his death, and has carried his name ever since.',
      },
      significance: 'The proof that some comets are bound, periodic members of the solar system rather than one-off apparitions — a decisive confirmation of Newtonian gravity applied to the heavens.',
      earthObs: 'Recorded in the Bayeux Tapestry before the Norman Conquest of 1066 and noted in Chinese annals as far back as 240 BC. Its 1910 return was spectacular; 1986 was faint from Earth but met by the Giotto spacecraft. Next perihelion: mid-2061.',
      stats: [
        ['Orbital period', '~76 years'],
        ['Perihelion', '0.59 AU'],
        ['Aphelion', '35.1 AU'],
        ['Eccentricity', '0.967'],
        ['Nucleus', '~15 × 8 km'],
        ['Last perihelion', '9 Feb 1986'],
      ],
    },
  },
  {
    id: 'hale-bopp', name: 'Comet Hale–Bopp',
    orbit: { aAU: 186, e: 0.995, omega: 2.2, dir: 1, nuMax: 2.78 },
    anim: { pass: [30, 46], gap: [18, 40] },
    info: {
      badges: [
        { hue: 'lime', text: 'Great Comet of 1997' },
        { hue: 'gray', text: 'Long-period' },
      ],
      lede: 'The Great Comet of 1997 — so large and bright it stayed visible to the naked eye for a record 18 months and became one of the most-observed comets in history.',
      discovery: {
        headline: 'Alan Hale & Thomas Bopp · 23 July 1995',
        body: 'Discovered independently the same night by Alan Hale in New Mexico and Thomas Bopp in Arizona, while still out beyond Jupiter — an unusually early catch that hinted at an exceptionally large nucleus, later estimated at 40–80 km across.',
      },
      significance: 'Its brilliance and 18-month naked-eye visibility made it a generational comet, and its two distinct tails — a blue gas tail and a yellow-white dust tail — were textbook-perfect.',
      earthObs: 'Peaked in spring 1997, visible even from light-polluted cities across the Northern Hemisphere. It will not return until roughly the year 4385.',
      stats: [
        ['Orbital period', '~2,533 years'],
        ['Perihelion', '0.91 AU'],
        ['Eccentricity', '0.995'],
        ['Nucleus', '~40–80 km'],
        ['Perihelion date', '1 Apr 1997'],
      ],
    },
  },
  {
    id: 'shoemaker-levy-9', name: 'Shoemaker–Levy 9',
    orbit: { aAU: 5.2, e: 0.22, omega: 1.35, dir: 1, nuMax: 1.3 },
    anim: { pass: [24, 38], gap: [20, 42] },
    fragments: true,
    info: {
      badges: [
        { hue: 'red', text: 'Impacted Jupiter' },
        { hue: 'gray', text: 'Fragmented' },
      ],
      lede: 'The "string of pearls" — a comet captured by Jupiter that tore into 21 fragments and crashed into the planet in 1994, the first collision between two solar-system bodies ever witnessed.',
      discovery: {
        headline: 'Carolyn & Eugene Shoemaker and David Levy · 24 March 1993',
        body: 'Found already shattered into a line of fragments orbiting Jupiter, not the Sun. Calculations showed it had been captured by the giant decades earlier and torn apart by tidal forces during a close pass in 1992.',
      },
      significance: 'The first direct observation of an extraterrestrial collision. It transformed how we think about impact hazards and proved Jupiter acts as a gravitational shield for the inner solar system.',
      earthObs: 'Between 16–22 July 1994, 21 fragments slammed into Jupiter at 60 km/s, leaving dark scars larger than Earth that were visible in small telescopes for months and imaged by Hubble and Galileo.',
      stats: [
        ['Host body', 'Jupiter (captured)'],
        ['Fragments', '21 (labeled A–W)'],
        ['Impact speed', '~60 km/s'],
        ['Impact dates', '16–22 Jul 1994'],
        ['Largest scar', '> Earth diameter'],
      ],
    },
  },
  {
    id: 'neowise', name: 'Comet NEOWISE',
    orbit: { aAU: 290, e: 0.999, omega: 5.2, dir: 1, nuMax: 2.9 },
    anim: { pass: [28, 42], gap: [18, 38] },
    info: {
      badges: [
        { hue: 'lime', text: 'Great Comet of 2020' },
        { hue: 'gray', text: 'Long-period' },
      ],
      lede: 'The brightest comet visible from the Northern Hemisphere since Hale–Bopp — a lockdown-era spectacle that drew millions outside in the summer of 2020.',
      discovery: {
        headline: 'NEOWISE space telescope · 27 March 2020',
        body: 'Discovered by NASA’s NEOWISE infrared space telescope, the comet (formally C/2020 F3) survived its close perihelion passage and emerged bright enough to see with the unaided eye.',
      },
      significance: 'A rare genuinely bright comet for a generation that had mostly missed Hale–Bopp, and one of the first great comets discovered by a space-based survey rather than a ground observer.',
      earthObs: 'Best seen in July 2020, low in the northwest after sunset, with a long golden dust tail. Closest approach to Earth was 23 July 2020 at 0.69 AU. It returns in roughly 6,800 years.',
      stats: [
        ['Orbital period', '~6,800 years'],
        ['Perihelion', '0.29 AU'],
        ['Eccentricity', '0.999'],
        ['Nucleus', '~5 km'],
        ['Perihelion date', '3 Jul 2020'],
      ],
    },
  },
  {
    id: 'hyakutake', name: 'Comet Hyakutake',
    orbit: { aAU: 1150, e: 0.9998, omega: 3.9, dir: -1, nuMax: 2.94 },
    anim: { pass: [22, 36], gap: [20, 44] },
    info: {
      badges: [
        { hue: 'lime', text: 'Great Comet of 1996' },
        { hue: 'gray', text: 'Very close pass' },
      ],
      lede: 'The Great Comet of 1996 — it passed unusually close to Earth and unfurled one of the longest comet tails ever measured, stretching more than halfway across the sky.',
      discovery: {
        headline: 'Yuji Hyakutake · 31 January 1996',
        body: 'Found by amateur astronomer Yuji Hyakutake in southern Japan using powerful binoculars, just two months before its dramatically close approach to Earth.',
      },
      significance: 'Its proximity made it a scientific bonanza: spacecraft detected an astonishingly long ion tail, and — to everyone’s surprise — the comet was found to emit X-rays, a previously unknown comet phenomenon.',
      earthObs: 'On 25 March 1996 it passed just 0.10 AU from Earth — one of the closest cometary approaches in two centuries — appearing as a brilliant blue-green head with a tail spanning over 80°. It will not return for roughly 70,000 years.',
      stats: [
        ['Orbital period', '~70,000 years'],
        ['Perihelion', '0.23 AU'],
        ['Earth approach', '0.10 AU (25 Mar 1996)'],
        ['Eccentricity', '0.9998'],
        ['Nucleus', '~4.2 km'],
      ],
    },
  },
];
