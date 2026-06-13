/* ============================================================
   Cosmic Explorer — dwarf planets
   Content layer: the five IAU-recognized dwarf planets. Ceres sits
   in the asteroid belt; the rest are trans-Neptunian. Orbits are
   drawn circular at the body's semi-major axis (matching how the
   eight planets are modeled here), scaled to world space by app.js.

   Each entry mirrors the planet schema (radiusKm, au, periodDays,
   surface) plus a `info` block for the detail panel and optional
   visual flags (elongated, ring).
   ============================================================ */

window.COSMIC_DWARFS = [
  {
    id: 'ceres', name: 'Ceres', radiusKm: 473, au: 2.77, periodDays: 1680,
    surface: ['#c2bcae', '#948d7f', '#5a5349'],
    info: {
      badges: [
        { hue: 'teal', text: 'Dwarf planet' },
        { hue: 'gray', text: 'Asteroid belt' },
      ],
      lede: 'The largest body in the asteroid belt and the only dwarf planet in the inner solar system — big enough to have been called a planet, then an asteroid, and finally a dwarf planet.',
      discovery: {
        headline: 'Giuseppe Piazzi · 1 January 1801',
        body: 'Piazzi spotted Ceres from Palermo on the first night of the 19th century, filling the suspicious gap between Mars and Jupiter. It was hailed as a new planet — until dozens more belt objects turned up and it was demoted to "asteroid".',
      },
      reclassification: 'Ceres was reclassified twice. After a century as the first and largest asteroid, the 2006 IAU resolution that demoted Pluto also promoted Ceres to dwarf planet — round enough for its own gravity to pull it into a sphere, but sharing its orbit with the rest of the belt.',
      features: 'NASA’s Dawn spacecraft orbited Ceres in 2015 and found brilliant white deposits — salts left by briny water — on the floor of Occator crater. Evidence points to a subsurface layer of brine and a muddy, ice-rich mantle.',
      stats: [
        ['Mean radius', '473 km'],
        ['Mass', '9.4 ×10²⁰ kg'],
        ['Distance from Sun', '2.77 AU'],
        ['Orbital period', '4.6 years'],
        ['Day length', '9.07 hours'],
        ['Moons', '0'],
        ['Discovered', '1801'],
      ],
    },
  },
  {
    id: 'pluto', name: 'Pluto', radiusKm: 1188, au: 39.5, periodDays: 90560,
    surface: ['#d9c4a3', '#b89a72', '#7c6347'],
    info: {
      badges: [
        { hue: 'teal', text: 'Dwarf planet' },
        { hue: 'orange', text: 'Former 9th planet' },
      ],
      lede: 'For 76 years the ninth planet, and still the most beloved world in the outer solar system — a frozen, heart-marked dwarf at the gateway to the Kuiper Belt.',
      discovery: {
        headline: 'Clyde Tombaugh · 18 February 1930',
        body: 'Working at Lowell Observatory, 24-year-old Clyde Tombaugh found Pluto by painstakingly comparing photographic plates for a moving dot. It was named by an 11-year-old English schoolgirl, Venetia Burney, after the Roman god of the underworld.',
      },
      reclassification: 'Pluto is the reason the word "dwarf planet" exists. The 2006 discovery of the more massive Eris forced the IAU to define "planet" precisely — and Pluto failed the third test: it has not "cleared its orbital neighborhood". It was reclassified as a dwarf planet on 24 August 2006, igniting a public debate that still smolders.',
      features: 'New Horizons flew past in July 2015 and revealed a stunning nitrogen-ice plain shaped like a heart — Tombaugh Regio — alongside water-ice mountains and a thin, hazy nitrogen atmosphere. Pluto has five moons; the largest, Charon, is so big the two orbit a shared point in space.',
      stats: [
        ['Mean radius', '1,188 km'],
        ['Mass', '1.30 ×10²² kg'],
        ['Distance from Sun', '39.5 AU'],
        ['Orbital period', '248 years'],
        ['Day length', '6.4 Earth days'],
        ['Moons', '5 (Charon, + 4)'],
        ['Discovered', '1930'],
      ],
    },
  },
  {
    id: 'haumea', name: 'Haumea', radiusKm: 816, au: 43.2, periodDays: 103740,
    surface: ['#e6e9ee', '#bcc2cc', '#7d838f'],
    elongated: true, ring: true,
    info: {
      badges: [
        { hue: 'teal', text: 'Dwarf planet' },
        { hue: 'orange', text: 'Egg-shaped' },
      ],
      lede: 'The strangest of the dwarf planets — an egg-shaped world spinning so fast it has stretched itself into an ellipsoid, complete with two moons and a ring of its own.',
      discovery: {
        headline: 'Announced 2005 · Brown (Caltech) / Ortiz (Sierra Nevada)',
        body: 'Haumea’s discovery is shadowed by a priority dispute between Mike Brown’s Caltech team and a Spanish group led by José Luis Ortiz, who announced it days apart in 2005. The IAU credited the discovery to the observatory but named it after the Hawaiian goddess of childbirth.',
      },
      reclassification: 'The IAU recognized Haumea as a dwarf planet in 2008 — one of four objects (with Pluto, Eris, and Makemake) elevated after the 2006 redefinition of "planet".',
      features: 'Haumea rotates once every 3.9 hours — the fastest spin of any large body in the solar system — which has elongated it to roughly 2,100 km on its long axis. It has a crystalline water-ice surface, two moons (Hiʻiaka and Namaka), and in 2017 became the first trans-Neptunian object found to have a ring.',
      stats: [
        ['Mean radius', '~816 km'],
        ['Long axis', '~2,100 km'],
        ['Mass', '4.0 ×10²¹ kg'],
        ['Distance from Sun', '43.2 AU'],
        ['Orbital period', '284 years'],
        ['Day length', '3.9 hours — fastest'],
        ['Moons', '2 · plus a ring'],
        ['Discovered', '2004–05'],
      ],
    },
  },
  {
    id: 'makemake', name: 'Makemake', radiusKm: 715, au: 45.8, periodDays: 111400,
    surface: ['#c98f63', '#9c6740', '#5e3a22'],
    info: {
      badges: [
        { hue: 'teal', text: 'Dwarf planet' },
        { hue: 'gray', text: 'Kuiper Belt' },
      ],
      lede: 'A reddish, methane-frosted world of the classical Kuiper Belt — the second-brightest known object out there after Pluto, and a key player in Pluto’s downfall.',
      discovery: {
        headline: 'Mike Brown, Chad Trujillo, David Rabinowitz · 31 March 2005',
        body: 'Found just after Easter 2005, it was nicknamed "Easterbunny" before being named Makemake, the creator god of the Rapa Nui people of Easter Island. Its discovery, alongside Eris and Haumea, made the old nine-planet model untenable.',
      },
      reclassification: 'Makemake was accepted as a dwarf planet by the IAU in 2008. It was among the discoveries that, by revealing Pluto was just one of many sizeable Kuiper Belt bodies, prompted the 2006 reclassification.',
      features: 'Its surface is coated in frozen methane and ethane, giving it a reddish tint, and it is highly reflective. A 2015 occultation showed it has no significant global atmosphere. In 2016 a small, dark moon nicknamed MK2 was discovered orbiting it.',
      stats: [
        ['Mean radius', '715 km'],
        ['Mass', '~3.1 ×10²¹ kg'],
        ['Distance from Sun', '45.8 AU'],
        ['Orbital period', '305 years'],
        ['Day length', '22.8 hours'],
        ['Moons', '1 (MK2)'],
        ['Discovered', '2005'],
      ],
    },
  },
  {
    id: 'eris', name: 'Eris', radiusKm: 1163, au: 67.8, periodDays: 203800,
    surface: ['#dfe2e6', '#aeb4bd', '#6f7682'],
    info: {
      badges: [
        { hue: 'teal', text: 'Dwarf planet' },
        { hue: 'orange', text: 'Sparked the debate' },
      ],
      lede: 'The most massive dwarf planet — slightly heavier than Pluto — whose discovery in the scattered disc forced astronomy to decide, once and for all, what a planet really is.',
      discovery: {
        headline: 'Mike Brown, Chad Trujillo, David Rabinowitz · imaged 2003, found 2005',
        body: 'Detected in images taken in 2003 and confirmed in January 2005, Eris was briefly hailed as a "tenth planet" because it appeared larger than Pluto. It was aptly named for the Greek goddess of strife and discord.',
      },
      reclassification: 'Eris is the dwarf planet that broke the planet. Being more massive than Pluto, it left astronomers with two choices: call Eris the tenth planet, or redefine the term. The 2006 IAU resolution chose the latter, creating the "dwarf planet" category and demoting both worlds at once.',
      features: 'Eris orbits far out in the scattered disc on a highly eccentric, steeply inclined path that carries it three times farther from the Sun than Pluto. Its surface is a brilliant, highly reflective shell of methane ice — possibly an atmosphere that freezes and falls as snow as it recedes from the Sun. It has one moon, Dysnomia.',
      stats: [
        ['Mean radius', '1,163 km'],
        ['Mass', '1.65 ×10²² kg (> Pluto)'],
        ['Distance from Sun', '67.8 AU (avg)'],
        ['Orbital period', '558 years'],
        ['Day length', '~15.8 hours'],
        ['Moons', '1 (Dysnomia)'],
        ['Discovered', '2003–05'],
      ],
    },
  },
];
