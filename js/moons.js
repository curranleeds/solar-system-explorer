/* ============================================================
   Cosmic Explorer — major moons
   The significant moon of each system, with compact stats.
   `extra` counts the remaining confirmed moons not rendered.
   Negative periodDays = retrograde orbit.
   ============================================================ */

window.COSMIC_MOONS = {
  earth: {
    extra: 0,
    moons: [
      { id: 'luna', name: 'The Moon', diameterKm: 3474.8, orbitKm: 384400, periodDays: 27.32, discovered: 'Prehistory' },
    ],
  },
  mars: {
    extra: 0,
    moons: [
      { id: 'phobos', name: 'Phobos', diameterKm: 22.5, orbitKm: 9376, periodDays: 0.319, discovered: '1877 · Asaph Hall' },
      { id: 'deimos', name: 'Deimos', diameterKm: 12.4, orbitKm: 23463, periodDays: 1.263, discovered: '1877 · Asaph Hall' },
    ],
  },
  jupiter: {
    extra: 91,
    moons: [
      { id: 'io', name: 'Io', diameterKm: 3643.2, orbitKm: 421700, periodDays: 1.769, discovered: '1610 · Galileo Galilei' },
      { id: 'europa', name: 'Europa', diameterKm: 3121.6, orbitKm: 670900, periodDays: 3.551, discovered: '1610 · Galileo Galilei' },
      { id: 'ganymede', name: 'Ganymede', diameterKm: 5268.2, orbitKm: 1070400, periodDays: 7.155, discovered: '1610 · Galileo Galilei' },
      { id: 'callisto', name: 'Callisto', diameterKm: 4820.6, orbitKm: 1882700, periodDays: 16.689, discovered: '1610 · Galileo Galilei' },
    ],
  },
  saturn: {
    extra: 265,
    moons: [
      { id: 'mimas', name: 'Mimas', diameterKm: 396.4, orbitKm: 185539, periodDays: 0.942, discovered: '1789 · William Herschel' },
      { id: 'enceladus', name: 'Enceladus', diameterKm: 504.2, orbitKm: 237948, periodDays: 1.37, discovered: '1789 · William Herschel' },
      { id: 'tethys', name: 'Tethys', diameterKm: 1062.2, orbitKm: 294619, periodDays: 1.888, discovered: '1684 · Giovanni Cassini' },
      { id: 'dione', name: 'Dione', diameterKm: 1122.8, orbitKm: 377396, periodDays: 2.737, discovered: '1684 · Giovanni Cassini' },
      { id: 'rhea', name: 'Rhea', diameterKm: 1527.6, orbitKm: 527108, periodDays: 4.518, discovered: '1672 · Giovanni Cassini' },
      { id: 'titan', name: 'Titan', diameterKm: 5149.5, orbitKm: 1221870, periodDays: 15.945, discovered: '1655 · Christiaan Huygens' },
      { id: 'hyperion', name: 'Hyperion', diameterKm: 270, orbitKm: 1481010, periodDays: 21.28, discovered: '1848 · Bond & Lassell' },
      { id: 'iapetus', name: 'Iapetus', diameterKm: 1468.6, orbitKm: 3560820, periodDays: 79.32, discovered: '1671 · Giovanni Cassini' },
    ],
  },
  uranus: {
    extra: 23,
    moons: [
      { id: 'miranda', name: 'Miranda', diameterKm: 471.6, orbitKm: 129390, periodDays: 1.413, discovered: '1948 · Gerard Kuiper' },
      { id: 'ariel', name: 'Ariel', diameterKm: 1157.8, orbitKm: 190900, periodDays: 2.52, discovered: '1851 · William Lassell' },
      { id: 'umbriel', name: 'Umbriel', diameterKm: 1169.4, orbitKm: 266000, periodDays: 4.144, discovered: '1851 · William Lassell' },
      { id: 'titania', name: 'Titania', diameterKm: 1576.8, orbitKm: 435910, periodDays: 8.706, discovered: '1787 · William Herschel' },
      { id: 'oberon', name: 'Oberon', diameterKm: 1522.8, orbitKm: 583520, periodDays: 13.46, discovered: '1787 · William Herschel' },
    ],
  },
  neptune: {
    extra: 13,
    moons: [
      { id: 'proteus', name: 'Proteus', diameterKm: 420, orbitKm: 117646, periodDays: 1.122, discovered: '1989 · Voyager 2' },
      { id: 'triton', name: 'Triton', diameterKm: 2706.8, orbitKm: 354759, periodDays: -5.877, discovered: '1846 · William Lassell' },
      { id: 'nereid', name: 'Nereid', diameterKm: 357, orbitKm: 5513800, periodDays: 360.13, discovered: '1949 · Gerard Kuiper' },
    ],
  },
};
