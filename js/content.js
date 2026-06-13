/* ============================================================
   Cosmic Explorer — celestial object placards
   Museum-style content: discovery, etymology, cultural history,
   and vital statistics for each clickable object.
   ============================================================ */

window.COSMIC_OBJECT_INFO = {
  sol: {
    class: 'G2V Star',
    illustration: `<svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Stylized illustration of the Sun with corona rays and a granulated surface">
  <defs>
    <radialGradient id="sun-bg" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#1a1407"/><stop offset="100%" stop-color="#05060a"/>
    </radialGradient>
    <radialGradient id="sun-core" cx="46%" cy="42%" r="62%">
      <stop offset="0%" stop-color="#fff6d8"/><stop offset="45%" stop-color="#fcd877"/><stop offset="80%" stop-color="#f3a32c"/><stop offset="100%" stop-color="#c4631a"/>
    </radialGradient>
    <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f7b733" stop-opacity="0.5"/><stop offset="45%" stop-color="#e8852a" stop-opacity="0.2"/><stop offset="100%" stop-color="#e8852a" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="sun-limb" cx="46%" cy="42%" r="60%">
      <stop offset="0%" stop-color="#fff0c0" stop-opacity="0.45"/><stop offset="55%" stop-color="#fff0c0" stop-opacity="0"/><stop offset="100%" stop-color="#8a3d0c" stop-opacity="0.45"/>
    </radialGradient>
    <filter id="sun-gran" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.085" numOctaves="3" seed="6" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.96  0 0 0 0 0.62  0 0 0 0 0.16  0 0 0 0.7 0"/>
    </filter>
    <polygon id="sun-ray" points="240,4 235,116 245,116" fill="#f6b53a" opacity="0.5"/>
    <clipPath id="sun-clip"><circle cx="240" cy="120" r="92"/></clipPath>
  </defs>
  <rect width="480" height="240" fill="url(#sun-bg)"/>
  <g>
    <use href="#sun-ray"/>
    <use href="#sun-ray" transform="rotate(20 240 120)"/>
    <use href="#sun-ray" transform="rotate(40 240 120)"/>
    <use href="#sun-ray" transform="rotate(60 240 120)"/>
    <use href="#sun-ray" transform="rotate(80 240 120)"/>
    <use href="#sun-ray" transform="rotate(100 240 120)"/>
    <use href="#sun-ray" transform="rotate(120 240 120)"/>
    <use href="#sun-ray" transform="rotate(140 240 120)"/>
    <use href="#sun-ray" transform="rotate(160 240 120)"/>
    <use href="#sun-ray" transform="rotate(180 240 120)"/>
    <use href="#sun-ray" transform="rotate(200 240 120)"/>
    <use href="#sun-ray" transform="rotate(220 240 120)"/>
    <use href="#sun-ray" transform="rotate(240 240 120)"/>
    <use href="#sun-ray" transform="rotate(260 240 120)"/>
    <use href="#sun-ray" transform="rotate(280 240 120)"/>
    <use href="#sun-ray" transform="rotate(300 240 120)"/>
    <use href="#sun-ray" transform="rotate(320 240 120)"/>
    <use href="#sun-ray" transform="rotate(340 240 120)"/>
  </g>
  <circle cx="240" cy="120" r="150" fill="url(#sun-glow)"/>
  <circle cx="240" cy="120" r="92" fill="url(#sun-core)"/>
  <g clip-path="url(#sun-clip)">
    <rect x="148" y="28" width="184" height="184" fill="url(#sun-gran)" opacity="0.4"/>
    <g opacity="0.8">
      <ellipse cx="210" cy="140" rx="11" ry="8" fill="#9a4410"/>
      <ellipse cx="210" cy="140" rx="5" ry="3.6" fill="#5e2708"/>
      <ellipse cx="270" cy="98" rx="7" ry="5" fill="#9a4410"/>
      <ellipse cx="270" cy="98" rx="3" ry="2.2" fill="#5e2708"/>
    </g>
    <rect x="148" y="28" width="184" height="184" fill="url(#sun-limb)"/>
  </g>
  <g fill="none" stroke="#f08a2a" stroke-width="3" stroke-linecap="round" opacity="0.7">
    <path d="M170,64 q-16,-16 4,-28"/>
    <path d="M320,150 q18,10 6,30"/>
  </g>
  <circle cx="240" cy="120" r="92" fill="none" stroke="#ffe9a8" stroke-opacity="0.4" stroke-width="1.5"/>
</svg>`,
    badges: [
      { hue: 'teal', text: 'Yellow dwarf' },
      { hue: 'orange', text: '99.86% of system mass' },
    ],
    lede: 'Every culture that ever looked up began here. The Sun is an ordinary star by galactic standards — and the reason there is anything ordinary about Earth at all.',
    discovery: {
      headline: 'Known to every human who ever lived',
      body: 'The Sun was never discovered, but it was decoded slowly. Spectroscopy in the 1800s revealed it was made of elements found on Earth, and in 1939 Hans Bethe explained the nuclear fusion that has kept it burning for 4.6 billion years.',
    },
    nameOrigin: 'From Old English "sunne", rooted in Proto-Germanic. The Latin "Sol" and Greek "Helios" survive in words like solar, solstice, and heliosphere.',
    cultures: [
      { tradition: 'Ancient Egypt', text: 'Ra, the falcon-headed sun god, sailed the sky in a solar barque each day and crossed the underworld each night — death and rebirth on a 24-hour cycle.' },
      { tradition: 'Aztec', text: 'Tonatiuh, the Fifth Sun, demanded movement and offering to keep rising. The Aztec calendar stone places his face at the center of cosmic time.' },
      { tradition: 'Japan', text: 'Amaterasu, the sun goddess of Shinto, is the mythological ancestor of the imperial line. When she hid in a cave, the world went dark.' },
    ],
    stats: [
      ['Mean radius', '696,340 km'],
      ['Mass', '1.989 ×10³⁰ kg'],
      ['Volume', '1.41 ×10¹⁸ km³ (1.3M Earths)'],
      ['Distance from Earth', '147.1–152.1M km'],
      ['Light travel time', '8 min 20 s'],
      ['Rotation period', '~25 days (equator)'],
      ['Surface temperature', '5,505 °C'],
      ['Core temperature', '~15,000,000 °C'],
      ['Age', '~4.6 billion years'],
      ['Spectral class', 'G2V'],
    ],
  },

  mercury: {
    class: 'Terrestrial planet',
    illustration: `<svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Stylized illustration of Mercury's heavily cratered grey surface">
  <defs>
    <radialGradient id="mer-bg" cx="50%" cy="38%" r="80%">
      <stop offset="0%" stop-color="#161a22"/><stop offset="100%" stop-color="#05070c"/>
    </radialGradient>
    <radialGradient id="mer-body" cx="38%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#c6c0b4"/><stop offset="58%" stop-color="#8d877c"/><stop offset="100%" stop-color="#4b463e"/>
    </radialGradient>
    <radialGradient id="mer-shade" cx="36%" cy="28%" r="82%">
      <stop offset="0%" stop-color="#04060c" stop-opacity="0"/><stop offset="62%" stop-color="#04060c" stop-opacity="0"/><stop offset="100%" stop-color="#04060c" stop-opacity="0.82"/>
    </radialGradient>
    <radialGradient id="mer-halo" cx="50%" cy="50%" r="50%">
      <stop offset="64%" stop-color="#9aa0aa" stop-opacity="0"/><stop offset="88%" stop-color="#9aa0aa" stop-opacity="0.12"/><stop offset="100%" stop-color="#9aa0aa" stop-opacity="0"/>
    </radialGradient>
    <filter id="mer-rough" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.14" numOctaves="2" seed="9" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.48  0 0 0 0 0.44  0 0 0 0.5 0"/>
    </filter>
    <g id="mer-crater">
      <circle r="11" fill="#7d776c"/>
      <path d="M-8,-6 A11 11 0 0 1 8,-6" fill="none" stroke="#cbc4b6" stroke-width="2" opacity="0.55"/>
      <path d="M-8,7 A11 11 0 0 0 8,7" fill="none" stroke="#45403a" stroke-width="2.4" opacity="0.7"/>
      <circle r="11" fill="none" stroke="#564f47" stroke-width="1" opacity="0.5"/>
    </g>
    <clipPath id="mer-clip"><circle cx="240" cy="120" r="138"/></clipPath>
  </defs>
  <rect width="480" height="240" fill="url(#mer-bg)"/>
  <g fill="#aab2c0">
    <circle cx="58" cy="50" r="1" opacity="0.5"/><circle cx="430" cy="44" r="1" opacity="0.5"/>
    <circle cx="446" cy="180" r="0.8" opacity="0.4"/><circle cx="36" cy="166" r="0.8" opacity="0.35"/>
  </g>
  <circle cx="240" cy="120" r="150" fill="url(#mer-halo)"/>
  <g clip-path="url(#mer-clip)">
    <rect x="102" y="-18" width="276" height="276" fill="url(#mer-body)"/>
    <rect x="102" y="-18" width="276" height="276" fill="url(#mer-rough)" opacity="0.5"/>
    <g>
      <use href="#mer-crater" transform="translate(196 86) scale(1.15)"/>
      <use href="#mer-crater" transform="translate(252 72) scale(0.7)"/>
      <use href="#mer-crater" transform="translate(304 104) scale(1.35)"/>
      <use href="#mer-crater" transform="translate(212 142) scale(0.95)"/>
      <use href="#mer-crater" transform="translate(270 152) scale(1.1)"/>
      <use href="#mer-crater" transform="translate(174 120) scale(0.8)"/>
      <use href="#mer-crater" transform="translate(316 164) scale(0.7)"/>
      <use href="#mer-crater" transform="translate(238 188) scale(1.0)"/>
      <use href="#mer-crater" transform="translate(292 198) scale(0.6)"/>
      <use href="#mer-crater" transform="translate(158 162) scale(0.65)"/>
      <use href="#mer-crater" transform="translate(204 204) scale(0.7)"/>
      <use href="#mer-crater" transform="translate(330 128) scale(0.9)"/>
      <use href="#mer-crater" transform="translate(150 96) scale(0.6)"/>
      <use href="#mer-crater" transform="translate(282 116) scale(0.55)"/>
      <use href="#mer-crater" transform="translate(326 88) scale(0.6)"/>
      <use href="#mer-crater" transform="translate(238 116) scale(0.5)"/>
    </g>
    <rect x="102" y="-18" width="276" height="276" fill="url(#mer-shade)"/>
    <ellipse cx="190" cy="74" rx="42" ry="24" fill="#fbfdff" opacity="0.08"/>
  </g>
  <circle cx="240" cy="120" r="138" fill="none" stroke="#dfe3ea" stroke-opacity="0.14" stroke-width="1.5"/>
</svg>`,
    badges: [
      { hue: 'teal', text: 'Terrestrial' },
      { hue: 'gray', text: 'Known since antiquity' },
    ],
    lede: 'The smallest planet and the fastest, Mercury skims so close to the Sun that whole civilizations mistook it for two different objects — one at dawn, one at dusk.',
    discovery: {
      headline: 'Antiquity · No single discoverer',
      body: 'Visible to the naked eye, Mercury appears in Sumerian records nearly 5,000 years old. The Greeks tracked it as two stars — Apollo in the morning, Hermes in the evening — until they realized both were one swift world.',
    },
    nameOrigin: 'Named for the Roman messenger of the gods, whose winged sandals matched the planet’s pace: Mercury completes an orbit in just 88 days, faster than any other planet.',
    cultures: [
      { tradition: 'Babylon', text: 'Identified with Nabu, god of writing and scribes. Babylonian astronomers logged its darting motion in cuneiform tablets that still survive.' },
      { tradition: 'Ancient Greece', text: 'The dual identity of Apollo and Hermes — the same planet greeting astronomers at both ends of the day before they connected the two.' },
      { tradition: 'China', text: 'Chénxīng, the "Hour Star", associated with the element water in the Wuxing system that tied the five visible planets to the five classical elements.' },
    ],
    stats: [
      ['Mean radius', '2,439.7 km'],
      ['Mass', '3.30 ×10²³ kg'],
      ['Volume', '6.08 ×10¹⁰ km³'],
      ['Distance from Sun', '57.9M km (0.39 AU)'],
      ['Distance from Earth', '77–222M km'],
      ['Orbital period', '88 days'],
      ['Day length (solar)', '176 Earth days'],
      ['Surface gravity', '3.7 m/s²'],
      ['Mean temperature', '167 °C (−180 to 430 °C)'],
      ['Moons', '0'],
    ],
  },

  venus: {
    class: 'Terrestrial planet',
    illustration: `<svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Stylized illustration of Venus shrouded in thick amber cloud cover">
  <defs>
    <radialGradient id="ven-bg" cx="50%" cy="38%" r="80%">
      <stop offset="0%" stop-color="#1d1710"/><stop offset="100%" stop-color="#070608"/>
    </radialGradient>
    <radialGradient id="ven-body" cx="38%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#f1ddb2"/><stop offset="58%" stop-color="#cfa869"/><stop offset="100%" stop-color="#85602f"/>
    </radialGradient>
    <radialGradient id="ven-shade" cx="36%" cy="28%" r="82%">
      <stop offset="0%" stop-color="#0a0704" stop-opacity="0"/><stop offset="62%" stop-color="#0a0704" stop-opacity="0"/><stop offset="100%" stop-color="#0a0704" stop-opacity="0.78"/>
    </radialGradient>
    <radialGradient id="ven-halo" cx="50%" cy="50%" r="50%">
      <stop offset="64%" stop-color="#e8c483" stop-opacity="0"/><stop offset="88%" stop-color="#e8c483" stop-opacity="0.16"/><stop offset="100%" stop-color="#e8c483" stop-opacity="0"/>
    </radialGradient>
    <filter id="ven-clouds" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="3" seed="3" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.95  0 0 0 0 0.82  0 0 0 0 0.55  0 0 0 0.5 0"/>
    </filter>
    <clipPath id="ven-clip"><circle cx="240" cy="120" r="138"/></clipPath>
  </defs>
  <rect width="480" height="240" fill="url(#ven-bg)"/>
  <g fill="#c4b69a">
    <circle cx="56" cy="48" r="1" opacity="0.5"/><circle cx="432" cy="46" r="1" opacity="0.5"/>
    <circle cx="446" cy="182" r="0.8" opacity="0.4"/><circle cx="34" cy="168" r="0.8" opacity="0.35"/>
  </g>
  <circle cx="240" cy="120" r="150" fill="url(#ven-halo)"/>
  <g clip-path="url(#ven-clip)">
    <rect x="102" y="-18" width="276" height="276" fill="url(#ven-body)"/>
    <g fill="none" stroke-linecap="round" opacity="0.4">
      <path d="M112,84 q64,-12 128,-2 q64,10 128,-4" stroke="#f0deb8" stroke-width="9"/>
      <path d="M112,128 q70,12 140,2 q60,-10 120,2" stroke="#9c7a45" stroke-width="7"/>
      <path d="M112,170 q64,-10 128,0 q64,10 128,-2" stroke="#efdcb4" stroke-width="8"/>
    </g>
    <path d="M150,60 q70,40 96,60 q-30,30 -90,52" fill="none" stroke="#f4e6c4" stroke-width="5" opacity="0.3" stroke-linecap="round"/>
    <rect x="102" y="-18" width="276" height="276" fill="url(#ven-clouds)" opacity="0.32"/>
    <rect x="102" y="-18" width="276" height="276" fill="url(#ven-shade)"/>
    <ellipse cx="190" cy="74" rx="44" ry="25" fill="#fff6e0" opacity="0.16"/>
  </g>
  <circle cx="240" cy="120" r="138" fill="none" stroke="#f3e3bf" stroke-opacity="0.16" stroke-width="1.5"/>
</svg>`,
    badges: [
      { hue: 'teal', text: 'Terrestrial' },
      { hue: 'red', text: 'Hottest surface' },
    ],
    lede: 'The brightest object in our sky after the Sun and Moon, Venus hides a furnace beneath its serene clouds — a runaway greenhouse hot enough to melt lead.',
    discovery: {
      headline: 'Antiquity · No single discoverer',
      body: 'The Venus tablet of Ammisaduqa, a Babylonian record from around 1600 BC, is one of the oldest astronomical documents in existence — 21 years of Venus risings, pressed into clay.',
    },
    nameOrigin: 'Named for the Roman goddess of love and beauty, a tribute to its brilliance. It is the only one of the classical planets named for a goddess.',
    cultures: [
      { tradition: 'Babylon', text: 'The star of Ishtar, goddess of love and war — a fitting pairing for a planet both beautiful and, as we now know, ferociously hostile.' },
      { tradition: 'Maya', text: 'The Dresden Codex contains a Venus table accurate to within hours over centuries. Maya rulers timed wars and ceremonies to its risings as Chac Ek’, the great star.' },
      { tradition: 'Ancient Greece', text: 'Phosphorus the morning star and Hesperus the evening star — recognized as a single body by the Pythagoreans, a small triumph of early astronomy.' },
    ],
    stats: [
      ['Mean radius', '6,051.8 km'],
      ['Mass', '4.87 ×10²⁴ kg'],
      ['Volume', '9.28 ×10¹¹ km³'],
      ['Distance from Sun', '108.2M km (0.72 AU)'],
      ['Distance from Earth', '38–261M km'],
      ['Orbital period', '224.7 days'],
      ['Day length (rotation)', '243 Earth days, retrograde'],
      ['Surface gravity', '8.87 m/s²'],
      ['Mean temperature', '464 °C'],
      ['Moons', '0'],
    ],
  },

  earth: {
    class: 'Terrestrial planet',
    illustration: `<svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Stylized illustration of Earth with land masses and a blue atmosphere">
  <defs>
    <radialGradient id="ear-bg" cx="50%" cy="38%" r="80%">
      <stop offset="0%" stop-color="#0c1424"/><stop offset="100%" stop-color="#05080f"/>
    </radialGradient>
    <radialGradient id="ear-ocean" cx="38%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#9fc9f0"/><stop offset="55%" stop-color="#3f78c8"/><stop offset="100%" stop-color="#16356b"/>
    </radialGradient>
    <radialGradient id="ear-shade" cx="36%" cy="28%" r="82%">
      <stop offset="0%" stop-color="#03060c" stop-opacity="0"/><stop offset="60%" stop-color="#03060c" stop-opacity="0"/><stop offset="100%" stop-color="#03060c" stop-opacity="0.8"/>
    </radialGradient>
    <radialGradient id="ear-atmo" cx="50%" cy="50%" r="50%">
      <stop offset="60%" stop-color="#7db4f0" stop-opacity="0"/><stop offset="86%" stop-color="#7db4f0" stop-opacity="0.28"/><stop offset="100%" stop-color="#7db4f0" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="ear-clip"><circle cx="240" cy="120" r="138"/></clipPath>
  </defs>
  <rect width="480" height="240" fill="url(#ear-bg)"/>
  <g fill="#aebfd6">
    <circle cx="56" cy="48" r="1" opacity="0.5"/><circle cx="434" cy="46" r="1" opacity="0.5"/>
    <circle cx="446" cy="184" r="0.8" opacity="0.4"/><circle cx="34" cy="168" r="0.8" opacity="0.35"/>
  </g>
  <circle cx="240" cy="120" r="152" fill="url(#ear-atmo)"/>
  <g clip-path="url(#ear-clip)">
    <rect x="102" y="-18" width="276" height="276" fill="url(#ear-ocean)"/>
    <g fill="#5f8050">
      <path d="M236,52 q-16,10 -12,30 q-12,14 -2,32 q-8,20 6,40 q10,18 26,30 q14,8 18,-8 q12,-10 4,-26 q12,-14 2,-30 q10,-16 -4,-28 q4,-18 -14,-26 q-12,-16 -24,-10 Z" fill="#6f8f57"/>
      <path d="M252,40 q18,-6 30,4 q14,2 10,16 q-14,8 -28,2 q-16,0 -12,-22 Z" fill="#7a9a60"/>
      <path d="M150,128 q-14,8 -10,26 q-8,16 6,28 q10,12 16,-2 q10,-10 2,-24 q4,-16 -14,-28 Z" fill="#6a8a52"/>
      <path d="M300,150 q18,-4 28,8 q10,10 -4,18 q-18,6 -28,-6 q-8,-12 4,-20 Z" fill="#74946a"/>
    </g>
    <g fill="#b8895a" opacity="0.55">
      <path d="M246,70 q12,-2 14,10 q-2,12 -14,10 q-10,-10 0,-20 Z"/>
    </g>
    <g fill="#eef4fb" opacity="0.22">
      <path d="M170,86 q40,-10 80,2 q-30,14 -82,8 q-12,-6 2,-10 Z"/>
      <path d="M214,168 q44,-6 78,6 q-34,12 -80,4 q-10,-6 2,-10 Z"/>
    </g>
    <rect x="102" y="-18" width="276" height="276" fill="url(#ear-shade)"/>
    <ellipse cx="188" cy="74" rx="40" ry="22" fill="#ffffff" opacity="0.12"/>
  </g>
  <circle cx="240" cy="120" r="138" fill="none" stroke="#bcdcff" stroke-opacity="0.22" stroke-width="1.5"/>
</svg>`,
    badges: [
      { hue: 'teal', text: 'Terrestrial' },
      { hue: 'lime', text: 'Inhabited' },
    ],
    lede: 'The only world known to host life, and the only planet not named for a god. Everyone you have ever heard of lived here, on a pale blue dot wrapped in a film of air.',
    discovery: {
      headline: 'Antiquity · Recognized as a planet in 1543',
      body: 'Earth was never "discovered" — but it was demoted, magnificently. Copernicus’s De revolutionibus (1543) moved the Sun to the center and made Earth what it had always been: one planet among several.',
    },
    nameOrigin: 'From Old English "eorþe", meaning ground or soil — Germanic roots rather than classical mythology. Every other planet carries a deity’s name; ours simply means the dirt underfoot.',
    cultures: [
      { tradition: 'Ancient Greece', text: 'Gaia, the primordial mother from whom the Titans descended — the personification of Earth as the source of all life, a name modern science borrowed back for the biosphere.' },
      { tradition: 'Norse', text: 'Jörð, the earth goddess and mother of Thor. The English word "earth" and the Norse name grow from the same Germanic root.' },
      { tradition: 'Aztec', text: 'Tlaltecuhtli, the earth deity torn apart to form the world — mountains from shoulders, rivers from hair — and who required honoring for the world to bear fruit.' },
    ],
    stats: [
      ['Mean radius', '6,371 km'],
      ['Mass', '5.97 ×10²⁴ kg'],
      ['Volume', '1.08 ×10¹² km³'],
      ['Distance from Sun', '149.6M km (1 AU)'],
      ['Orbital period', '365.25 days'],
      ['Day length', '23.9 hours'],
      ['Surface gravity', '9.81 m/s²'],
      ['Mean temperature', '15 °C'],
      ['Surface covered by ocean', '71%'],
      ['Moons', '1'],
    ],
  },

  mars: {
    class: 'Terrestrial planet',
    illustration: `<svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Stylized illustration of Mars with Olympus Mons on a rust-red surface">
  <defs>
    <radialGradient id="mar-bg" cx="50%" cy="38%" r="80%">
      <stop offset="0%" stop-color="#1d130e"/><stop offset="100%" stop-color="#080507"/>
    </radialGradient>
    <radialGradient id="mar-body" cx="38%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#dc8c64"/><stop offset="56%" stop-color="#b35330"/><stop offset="100%" stop-color="#6c2912"/>
    </radialGradient>
    <radialGradient id="mar-mons" cx="40%" cy="36%" r="60%">
      <stop offset="0%" stop-color="#dc8b5d"/><stop offset="100%" stop-color="#a44d2c"/>
    </radialGradient>
    <radialGradient id="mar-shade" cx="36%" cy="28%" r="82%">
      <stop offset="0%" stop-color="#0a0503" stop-opacity="0"/><stop offset="60%" stop-color="#0a0503" stop-opacity="0"/><stop offset="100%" stop-color="#0a0503" stop-opacity="0.8"/>
    </radialGradient>
    <radialGradient id="mar-halo" cx="50%" cy="50%" r="50%">
      <stop offset="64%" stop-color="#d2784c" stop-opacity="0"/><stop offset="88%" stop-color="#d2784c" stop-opacity="0.16"/><stop offset="100%" stop-color="#d2784c" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="mar-clip"><circle cx="240" cy="120" r="138"/></clipPath>
  </defs>
  <rect width="480" height="240" fill="url(#mar-bg)"/>
  <g fill="#c2a496">
    <circle cx="56" cy="48" r="1" opacity="0.5"/><circle cx="434" cy="46" r="1" opacity="0.5"/>
    <circle cx="446" cy="184" r="0.8" opacity="0.4"/><circle cx="34" cy="168" r="0.8" opacity="0.35"/>
  </g>
  <circle cx="240" cy="120" r="150" fill="url(#mar-halo)"/>
  <g clip-path="url(#mar-clip)">
    <rect x="102" y="-18" width="276" height="276" fill="url(#mar-body)"/>
    <ellipse cx="240" cy="6" rx="46" ry="16" fill="#eef2f4" opacity="0.7"/>
    <ellipse cx="240" cy="232" rx="34" ry="12" fill="#eef2f4" opacity="0.55"/>
    <g opacity="0.5" fill="#7c331a">
      <ellipse cx="300" cy="150" rx="40" ry="14" transform="rotate(-12 300 150)"/>
      <ellipse cx="206" cy="170" rx="26" ry="10" transform="rotate(8 206 170)"/>
    </g>
    <path d="M236,148 q44,-10 92,2 q22,4 40,-2" fill="none" stroke="#5f2410" stroke-width="6" stroke-linecap="round" opacity="0.6"/>
    <g>
      <circle cx="202" cy="106" r="34" fill="url(#mar-mons)"/>
      <circle cx="202" cy="106" r="34" fill="none" stroke="#e6a276" stroke-width="1.5" opacity="0.45"/>
      <circle cx="202" cy="106" r="22" fill="none" stroke="#8f4023" stroke-width="2" opacity="0.5"/>
      <circle cx="202" cy="106" r="10" fill="#5e2712"/>
      <path d="M194,100 A10 10 0 0 1 210,100" fill="none" stroke="#e0a074" stroke-width="1.6" opacity="0.6"/>
      <ellipse cx="194" cy="98" rx="13" ry="8" fill="#eaa978" opacity="0.4"/>
    </g>
    <g fill="#9a4527" opacity="0.7">
      <circle cx="172" cy="150" r="6"/>
      <circle cx="156" cy="128" r="5"/>
      <circle cx="186" cy="68" r="5"/>
    </g>
    <rect x="102" y="-18" width="276" height="276" fill="url(#mar-shade)"/>
    <ellipse cx="190" cy="74" rx="42" ry="24" fill="#ffe6d4" opacity="0.1"/>
  </g>
  <circle cx="240" cy="120" r="138" fill="none" stroke="#f0c4a8" stroke-opacity="0.16" stroke-width="1.5"/>
</svg>`,
    badges: [
      { hue: 'teal', text: 'Terrestrial' },
      { hue: 'gray', text: 'Known since antiquity' },
    ],
    lede: 'The red wanderer has meant war, fire, and misfortune to skywatchers for millennia. Today it hosts a small fleet of robots and the tallest volcano in the solar system.',
    discovery: {
      headline: 'Antiquity · No single discoverer',
      body: 'Egyptian astronomers recorded the red planet some 4,000 years ago and noticed something strange: it sometimes reverses course. That retrograde loop puzzled astronomers until Kepler used Mars itself to derive his laws of planetary motion.',
    },
    nameOrigin: 'Named for the Roman god of war — the obvious patron for a planet the color of dried blood. Its rust-red tint comes from iron oxide dust covering the surface.',
    cultures: [
      { tradition: 'Ancient Egypt', text: 'Har Decher, "the Red One", also called the backward traveler for its retrograde motion across the sky.' },
      { tradition: 'Babylon', text: 'The star of Nergal, god of war and plague — an omen-bearer watched closely before military campaigns.' },
      { tradition: 'China', text: 'Yínghuò, the "Shimmering Deceiver", tied to the element fire. Its unpredictable brightness and looping path made it an object of imperial divination.' },
    ],
    stats: [
      ['Mean radius', '3,389.5 km'],
      ['Mass', '6.42 ×10²³ kg'],
      ['Volume', '1.63 ×10¹¹ km³'],
      ['Distance from Sun', '227.9M km (1.52 AU)'],
      ['Distance from Earth', '54.6–401M km'],
      ['Orbital period', '687 days'],
      ['Day length', '24.6 hours'],
      ['Surface gravity', '3.71 m/s²'],
      ['Mean temperature', '−63 °C'],
      ['Moons', '2 (Phobos, Deimos)'],
    ],
  },

  jupiter: {
    class: 'Gas giant',
    illustration: `<svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Stylized illustration of Jupiter showing its banded atmosphere and Great Red Spot">
  <defs>
    <radialGradient id="jup-bg" cx="50%" cy="38%" r="80%">
      <stop offset="0%" stop-color="#111c31"/>
      <stop offset="100%" stop-color="#05080f"/>
    </radialGradient>
    <radialGradient id="jup-body" cx="38%" cy="30%" r="78%">
      <stop offset="0%" stop-color="#e2cda4"/>
      <stop offset="60%" stop-color="#bda06f"/>
      <stop offset="100%" stop-color="#74502f"/>
    </radialGradient>
    <radialGradient id="jup-shade" cx="36%" cy="28%" r="82%">
      <stop offset="0%" stop-color="#04060c" stop-opacity="0"/>
      <stop offset="64%" stop-color="#04060c" stop-opacity="0"/>
      <stop offset="100%" stop-color="#04060c" stop-opacity="0.8"/>
    </radialGradient>
    <radialGradient id="jup-grs" cx="46%" cy="40%" r="62%">
      <stop offset="0%" stop-color="#c87a5f"/>
      <stop offset="52%" stop-color="#9d4e37"/>
      <stop offset="100%" stop-color="#693624"/>
    </radialGradient>
    <radialGradient id="jup-halo" cx="50%" cy="50%" r="50%">
      <stop offset="62%" stop-color="#c4a577" stop-opacity="0"/>
      <stop offset="86%" stop-color="#c4a577" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#c4a577" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="jup-clip"><circle cx="240" cy="120" r="138"/></clipPath>
  </defs>
  <rect width="480" height="240" fill="url(#jup-bg)"/>
  <g fill="#b8c2d4">
    <circle cx="54" cy="46" r="1" opacity="0.5"/>
    <circle cx="128" cy="206" r="0.9" opacity="0.4"/>
    <circle cx="426" cy="58" r="1.1" opacity="0.55"/>
    <circle cx="448" cy="176" r="0.8" opacity="0.4"/>
    <circle cx="28" cy="150" r="0.8" opacity="0.35"/>
    <circle cx="398" cy="214" r="0.8" opacity="0.3"/>
  </g>
  <circle cx="240" cy="120" r="150" fill="url(#jup-halo)"/>
  <g clip-path="url(#jup-clip)">
    <rect x="100" y="-20" width="280" height="280" fill="url(#jup-body)"/>
    <g>
      <rect x="100" y="-20" width="280" height="40" fill="#b6a079"/>
      <rect x="100" y="16"  width="280" height="14" fill="#ddc9a1"/>
      <rect x="100" y="28"  width="280" height="16" fill="#9c7547"/>
      <rect x="100" y="42"  width="280" height="22" fill="#d6c195"/>
      <rect x="100" y="62"  width="280" height="14" fill="#86603e"/>
      <rect x="100" y="75"  width="280" height="24" fill="#cfba90"/>
      <rect x="100" y="98"  width="280" height="16" fill="#a37c4e"/>
      <rect x="100" y="112" width="280" height="28" fill="#e0cb9f"/>
      <rect x="100" y="138" width="280" height="16" fill="#8d6841"/>
      <rect x="100" y="152" width="280" height="26" fill="#ccb78b"/>
      <rect x="100" y="176" width="280" height="16" fill="#9a7345"/>
      <rect x="100" y="190" width="280" height="22" fill="#c8b288"/>
      <rect x="100" y="208" width="280" height="52" fill="#a89169"/>
    </g>
    <g stroke-linecap="round" fill="none" opacity="0.4">
      <path d="M120,36 q60,6 120,0 t120,-2" stroke="#6f5132" stroke-width="2"/>
      <path d="M120,106 q70,-6 140,0 t120,2" stroke="#7c5c39" stroke-width="2"/>
      <path d="M120,184 q60,7 130,1 t120,-2" stroke="#6f5132" stroke-width="2"/>
    </g>
    <g>
      <ellipse cx="182" cy="150" rx="33" ry="19" fill="url(#jup-grs)"/>
      <ellipse cx="182" cy="150" rx="33" ry="19" fill="none" stroke="#d8a48d" stroke-width="1" opacity="0.35"/>
      <ellipse cx="178" cy="147" rx="16" ry="9" fill="#b5654a" opacity="0.55"/>
    </g>
    <rect x="100" y="-20" width="280" height="280" fill="url(#jup-shade)"/>
    <ellipse cx="188" cy="74" rx="46" ry="26" fill="#fff4dc" opacity="0.12"/>
  </g>
  <circle cx="240" cy="120" r="138" fill="none" stroke="#f0e2c2" stroke-opacity="0.16" stroke-width="1.5"/>
</svg>`,
    badges: [
      { hue: 'teal', text: 'Gas giant' },
      { hue: 'orange', text: 'Largest planet' },
    ],
    lede: 'More massive than every other planet combined, Jupiter is a failed star’s shadow — a striped colossus whose Great Red Spot is a storm older than the United States.',
    discovery: {
      headline: 'Antiquity · Moons discovered 1610, Galileo Galilei',
      body: 'The planet itself was known to the ancients, but in January 1610 Galileo turned a telescope on it and found four moons in orbit — the first objects ever seen circling another world, and a fatal blow to the Earth-centered cosmos.',
    },
    nameOrigin: 'Named for the king of the Roman gods, counterpart of the Greek Zeus. Appropriately, it is the heavyweight of the solar system — 2.5 times the mass of all other planets together.',
    cultures: [
      { tradition: 'Babylon', text: 'The star of Marduk, patron god of Babylon itself. Its position was tracked for omens concerning kings and nations.' },
      { tradition: 'China', text: 'Suìxīng, the "Year Star". Its almost exactly 12-year orbit defined the twelve earthly branches — the cycle behind the Chinese zodiac.' },
      { tradition: 'India', text: 'Brihaspati, guru of the gods in Vedic tradition — teacher, priest, and embodiment of wisdom, honored in the name of Thursday (Brihaspativara).' },
    ],
    stats: [
      ['Mean radius', '69,911 km'],
      ['Mass', '1.90 ×10²⁷ kg'],
      ['Volume', '1.43 ×10¹⁵ km³ (1,321 Earths)'],
      ['Distance from Sun', '778.5M km (5.20 AU)'],
      ['Distance from Earth', '588–968M km'],
      ['Orbital period', '11.86 years'],
      ['Day length', '9.93 hours — fastest spin'],
      ['Gravity (cloud tops)', '24.79 m/s²'],
      ['Cloud-top temperature', '−145 °C'],
      ['Moons', '95 confirmed'],
    ],
  },

  saturn: {
    class: 'Gas giant',
    illustration: `<svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Stylized illustration of Saturn with its prominent ring system at a slight angle">
  <defs>
    <radialGradient id="sat-bg" cx="50%" cy="38%" r="80%">
      <stop offset="0%" stop-color="#16140d"/><stop offset="100%" stop-color="#070608"/>
    </radialGradient>
    <radialGradient id="sat-body" cx="40%" cy="32%" r="74%">
      <stop offset="0%" stop-color="#f2e4ba"/><stop offset="58%" stop-color="#cdb47b"/><stop offset="100%" stop-color="#86713f"/>
    </radialGradient>
    <radialGradient id="sat-shade" cx="38%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#0a0804" stop-opacity="0"/><stop offset="60%" stop-color="#0a0804" stop-opacity="0"/><stop offset="100%" stop-color="#0a0804" stop-opacity="0.74"/>
    </radialGradient>
    <radialGradient id="sat-halo" cx="50%" cy="50%" r="50%">
      <stop offset="64%" stop-color="#e6cf93" stop-opacity="0"/><stop offset="90%" stop-color="#e6cf93" stop-opacity="0.13"/><stop offset="100%" stop-color="#e6cf93" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="sat-clip"><circle cx="240" cy="120" r="82"/></clipPath>
  </defs>
  <rect width="480" height="240" fill="url(#sat-bg)"/>
  <g fill="#c4ba99">
    <circle cx="48" cy="44" r="1" opacity="0.5"/><circle cx="440" cy="50" r="1" opacity="0.5"/>
    <circle cx="452" cy="186" r="0.8" opacity="0.4"/><circle cx="30" cy="170" r="0.8" opacity="0.35"/>
  </g>
  <circle cx="240" cy="120" r="96" fill="url(#sat-halo)"/>
  <g transform="rotate(-16 240 120)" fill="none" stroke-linecap="butt" opacity="0.82">
    <path d="M44,120 A196,52 0 0 0 436,120" stroke="#d3c094" stroke-width="13"/>
    <path d="M72,120 A170,45 0 0 0 408,120" stroke="#bba577" stroke-width="8"/>
  </g>
  <g clip-path="url(#sat-clip)">
    <rect x="156" y="36" width="168" height="168" fill="url(#sat-body)"/>
    <g stroke-linecap="round" fill="none" opacity="0.3">
      <path d="M164,98 q38,6 76,0 t72,-2" stroke="#9a8350" stroke-width="3"/>
      <path d="M164,124 q40,-5 80,0 t72,2" stroke="#b69e69" stroke-width="3"/>
      <path d="M164,150 q38,6 76,0 t72,-2" stroke="#9a8350" stroke-width="3"/>
    </g>
    <rect x="156" y="36" width="168" height="168" fill="url(#sat-shade)"/>
    <ellipse cx="206" cy="78" rx="34" ry="19" fill="#fff7df" opacity="0.14"/>
  </g>
  <g transform="rotate(-16 240 120)" fill="none" stroke-linecap="butt">
    <path d="M44,120 A196,52 0 0 1 436,120" stroke="#e4d4ad" stroke-width="13"/>
    <path d="M72,120 A170,45 0 0 1 408,120" stroke="#cebb8c" stroke-width="8"/>
  </g>
  <circle cx="240" cy="120" r="82" fill="none" stroke="#f3e6c2" stroke-opacity="0.14" stroke-width="1.5"/>
</svg>`,
    badges: [
      { hue: 'teal', text: 'Gas giant' },
      { hue: 'gray', text: 'Known since antiquity' },
    ],
    lede: 'The farthest planet the ancients could see, and the most theatrical. Saturn’s rings — ice and rock shepherded into bands hundreds of thousands of kilometers wide — are thinner than a city block is tall.',
    discovery: {
      headline: 'Antiquity · Rings identified 1655, Christiaan Huygens',
      body: 'Galileo saw the rings in 1610 but his telescope rendered them as "ears" — he died never knowing what they were. Christiaan Huygens resolved the mystery in 1655: a thin, flat ring, touching the planet nowhere.',
    },
    nameOrigin: 'Named for the Roman god of agriculture and time, father of Jupiter. As the slowest visible planet — nearly 30 years per orbit — it became a natural symbol of old age and patience.',
    cultures: [
      { tradition: 'Ancient Greece', text: 'Kronos, the Titan who devoured his children and was overthrown by Zeus — the slow, heavy elder of the wandering stars.' },
      { tradition: 'India', text: 'Shani, the slow mover, deity of karma and justice in Hindu tradition. His seven-and-a-half-year transits (Sade Sati) are still consulted in astrology today.' },
      { tradition: 'Hebrew tradition', text: 'Shabbatai, "the restful one" — sharing a root with Shabbat. The seven classical planets gave the week its seven days; Saturn kept Saturday.' },
    ],
    stats: [
      ['Mean radius', '58,232 km'],
      ['Mass', '5.68 ×10²⁶ kg'],
      ['Volume', '8.27 ×10¹⁴ km³'],
      ['Distance from Sun', '1.43B km (9.54 AU)'],
      ['Distance from Earth', '1.20–1.66B km'],
      ['Orbital period', '29.4 years'],
      ['Day length', '10.7 hours'],
      ['Mean density', '0.69 g/cm³ — would float'],
      ['Cloud-top temperature', '−178 °C'],
      ['Moons', '274 confirmed'],
    ],
  },

  uranus: {
    class: 'Ice giant',
    illustration: `<svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Stylized illustration of Uranus, pale blue-green and tipped on its side with vertical rings">
  <defs>
    <radialGradient id="ura-bg" cx="50%" cy="38%" r="80%">
      <stop offset="0%" stop-color="#0c1a1e"/><stop offset="100%" stop-color="#05090c"/>
    </radialGradient>
    <radialGradient id="ura-body" cx="40%" cy="32%" r="78%">
      <stop offset="0%" stop-color="#d2eff0"/><stop offset="56%" stop-color="#86c6c6"/><stop offset="100%" stop-color="#3c8688"/>
    </radialGradient>
    <radialGradient id="ura-shade" cx="38%" cy="30%" r="82%">
      <stop offset="0%" stop-color="#03090b" stop-opacity="0"/><stop offset="60%" stop-color="#03090b" stop-opacity="0"/><stop offset="100%" stop-color="#03090b" stop-opacity="0.72"/>
    </radialGradient>
    <radialGradient id="ura-halo" cx="50%" cy="50%" r="50%">
      <stop offset="62%" stop-color="#a8e4e4" stop-opacity="0"/><stop offset="88%" stop-color="#a8e4e4" stop-opacity="0.18"/><stop offset="100%" stop-color="#a8e4e4" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="ura-clip"><circle cx="240" cy="120" r="92"/></clipPath>
  </defs>
  <rect width="480" height="240" fill="url(#ura-bg)"/>
  <g fill="#a6c8c8">
    <circle cx="52" cy="46" r="1" opacity="0.5"/><circle cx="436" cy="48" r="1" opacity="0.5"/>
    <circle cx="448" cy="184" r="0.8" opacity="0.4"/><circle cx="32" cy="170" r="0.8" opacity="0.35"/>
  </g>
  <circle cx="240" cy="120" r="100" fill="url(#ura-halo)"/>
  <g transform="rotate(102 240 120)" fill="none" stroke-linecap="butt" opacity="0.5">
    <path d="M88,120 A152,40 0 0 0 392,120" stroke="#bfe6e6" stroke-width="4"/>
    <path d="M104,120 A136,36 0 0 0 376,120" stroke="#8fc4c4" stroke-width="2.5"/>
  </g>
  <g clip-path="url(#ura-clip)">
    <rect x="148" y="28" width="184" height="184" fill="url(#ura-body)"/>
    <g stroke-linecap="round" fill="none" opacity="0.22">
      <path d="M156,104 q42,5 84,0 t76,-2" stroke="#5fa6a6" stroke-width="4"/>
      <path d="M156,136 q44,-5 88,0 t72,2" stroke="#aadede" stroke-width="4"/>
    </g>
    <ellipse cx="206" cy="80" rx="34" ry="20" fill="#eafafa" opacity="0.14"/>
    <rect x="148" y="28" width="184" height="184" fill="url(#ura-shade)"/>
  </g>
  <g transform="rotate(102 240 120)" fill="none" stroke-linecap="butt" opacity="0.62">
    <path d="M88,120 A152,40 0 0 1 392,120" stroke="#cdeeee" stroke-width="4"/>
    <path d="M104,120 A136,36 0 0 1 376,120" stroke="#9fd0d0" stroke-width="2.5"/>
  </g>
  <g stroke="#dff4f4" stroke-opacity="0.5" stroke-width="1.4" stroke-dasharray="5 6">
    <line x1="111" y1="101" x2="369" y2="139"/>
  </g>
  <g fill="#eafafa" opacity="0.7">
    <circle cx="146" cy="106" r="2.4"/><circle cx="334" cy="134" r="2.4"/>
  </g>
  <circle cx="240" cy="120" r="92" fill="none" stroke="#d4f2f2" stroke-opacity="0.18" stroke-width="1.5"/>
</svg>`,
    badges: [
      { hue: 'teal', text: 'Ice giant' },
      { hue: 'lime', text: 'First telescopic discovery' },
    ],
    lede: 'The first planet found with a telescope, Uranus doubled the known size of the solar system overnight — and it orbits tipped on its side, rolling around the Sun like a barrel.',
    discovery: {
      headline: '13 March 1781 · William Herschel',
      body: 'From his garden in Bath, England, the musician-turned-astronomer William Herschel spotted what he first logged as a comet. Within months the orbit told the truth: a new planet, the first discovered in recorded history.',
    },
    nameOrigin: 'Named for the Greek primordial god of the sky — the only planet named from Greek rather than Roman mythology. Herschel wanted "Georgium Sidus" after King George III; the rest of Europe politely declined.',
    cultures: [
      { tradition: 'Georgian Britain', text: 'Briefly "the Georgian planet" in England for decades — a naming dispute that pitted royal patronage against scientific convention. Convention won.' },
      { tradition: 'East Asia', text: 'Translated as Tiānwángxīng, "Sky King Star", in Chinese, Japanese, and Korean — a literal rendering of the sky-god name into the older five-planet tradition.' },
      { tradition: 'Chemistry', text: 'Uranium, discovered in 1789, was named in the new planet’s honor by Martin Klaproth — eight years after Uranus itself. Neptunium and plutonium later followed the same pattern.' },
    ],
    stats: [
      ['Mean radius', '25,362 km'],
      ['Mass', '8.68 ×10²⁵ kg'],
      ['Volume', '6.83 ×10¹³ km³'],
      ['Distance from Sun', '2.87B km (19.19 AU)'],
      ['Distance from Earth', '2.57–3.15B km'],
      ['Orbital period', '84 years'],
      ['Day length', '17.2 hours'],
      ['Axial tilt', '97.8° — rolls on its side'],
      ['Cloud-top temperature', '−195 °C'],
      ['Moons', '28 confirmed'],
    ],
  },

  neptune: {
    class: 'Ice giant',
    illustration: `<svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Stylized illustration of Neptune, deep blue with a wind band and a great dark spot">
  <defs>
    <radialGradient id="nep-bg" cx="50%" cy="38%" r="80%">
      <stop offset="0%" stop-color="#0a1226"/><stop offset="100%" stop-color="#04060f"/>
    </radialGradient>
    <radialGradient id="nep-body" cx="40%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#9ab8ef"/><stop offset="55%" stop-color="#4a6fca"/><stop offset="100%" stop-color="#1d3278"/>
    </radialGradient>
    <radialGradient id="nep-shade" cx="38%" cy="28%" r="82%">
      <stop offset="0%" stop-color="#03060f" stop-opacity="0"/><stop offset="60%" stop-color="#03060f" stop-opacity="0"/><stop offset="100%" stop-color="#03060f" stop-opacity="0.8"/>
    </radialGradient>
    <radialGradient id="nep-grds" cx="44%" cy="38%" r="64%">
      <stop offset="0%" stop-color="#33508f"/><stop offset="60%" stop-color="#1a2f63"/><stop offset="100%" stop-color="#0d1c44"/>
    </radialGradient>
    <radialGradient id="nep-halo" cx="50%" cy="50%" r="50%">
      <stop offset="62%" stop-color="#6f95e6" stop-opacity="0"/><stop offset="88%" stop-color="#6f95e6" stop-opacity="0.2"/><stop offset="100%" stop-color="#6f95e6" stop-opacity="0"/>
    </radialGradient>
    <filter id="nep-clouds" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.055" numOctaves="3" seed="5" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.62  0 0 0 0 0.74  0 0 0 0 0.96  0 0 0 0.45 0"/>
    </filter>
    <clipPath id="nep-clip"><circle cx="240" cy="120" r="138"/></clipPath>
  </defs>
  <rect width="480" height="240" fill="url(#nep-bg)"/>
  <g fill="#aebfdf">
    <circle cx="54" cy="48" r="1" opacity="0.5"/><circle cx="434" cy="46" r="1" opacity="0.5"/>
    <circle cx="446" cy="184" r="0.8" opacity="0.4"/><circle cx="34" cy="168" r="0.8" opacity="0.35"/>
  </g>
  <circle cx="240" cy="120" r="152" fill="url(#nep-halo)"/>
  <g clip-path="url(#nep-clip)">
    <rect x="102" y="-18" width="276" height="276" fill="url(#nep-body)"/>
    <g>
      <rect x="102" y="74" width="276" height="22" fill="#5f81d2" opacity="0.5"/>
      <rect x="102" y="138" width="276" height="26" fill="#2a468f" opacity="0.55"/>
      <rect x="102" y="186" width="276" height="20" fill="#5f81d2" opacity="0.4"/>
    </g>
    <rect x="102" y="-18" width="276" height="276" fill="url(#nep-clouds)" opacity="0.28"/>
    <g>
      <ellipse cx="196" cy="104" rx="28" ry="16" fill="url(#nep-grds)"/>
      <ellipse cx="196" cy="104" rx="28" ry="16" fill="none" stroke="#1a2c5e" stroke-width="1.4" opacity="0.6"/>
      <path d="M176,98 q20,-8 40,2" fill="none" stroke="#bcd0f4" stroke-width="2" opacity="0.4" stroke-linecap="round"/>
    </g>
    <g fill="#e2ecfb" opacity="0.6" stroke-linecap="round">
      <path d="M214,128 q34,-6 64,2 q-30,8 -64,2 Z"/>
      <path d="M150,150 q26,-4 48,2 q-24,7 -48,2 Z" opacity="0.7"/>
    </g>
    <rect x="102" y="-18" width="276" height="276" fill="url(#nep-shade)"/>
    <ellipse cx="190" cy="74" rx="42" ry="24" fill="#eaf2ff" opacity="0.12"/>
  </g>
  <circle cx="240" cy="120" r="138" fill="none" stroke="#c2d6ff" stroke-opacity="0.18" stroke-width="1.5"/>
</svg>`,
    badges: [
      { hue: 'teal', text: 'Ice giant' },
      { hue: 'lime', text: 'Predicted by mathematics' },
    ],
    lede: 'The only planet found by arithmetic before it was found by eye. Astronomers noticed Uranus drifting off course, did the math, and pointed a telescope at the answer.',
    discovery: {
      headline: '23 September 1846 · Johann Galle, from Urbain Le Verrier’s prediction',
      body: 'Le Verrier computed where an unseen planet must be to explain Uranus’s wobble and mailed the coordinates to Berlin. Johann Galle found Neptune that same night, within one degree of the prediction — "discovered with the point of a pen."',
    },
    nameOrigin: 'Named for the Roman god of the sea, fitting its deep ocean-blue color — caused not by water but by methane in its atmosphere absorbing red light.',
    cultures: [
      { tradition: 'France & England', text: 'A discovery so close it sparked an international priority dispute: John Couch Adams had made a parallel prediction in England. History now credits the mathematics of both.' },
      { tradition: 'East Asia', text: 'Hǎiwángxīng, "Sea King Star" — the sea-god name translated directly into Chinese, Japanese, Korean, and Vietnamese astronomical tradition.' },
      { tradition: 'Chemistry', text: 'Neptunium, element 93, named in 1940 to follow uranium just as Neptune follows Uranus in the sky.' },
    ],
    stats: [
      ['Mean radius', '24,622 km'],
      ['Mass', '1.02 ×10²⁶ kg'],
      ['Volume', '6.25 ×10¹³ km³'],
      ['Distance from Sun', '4.50B km (30.07 AU)'],
      ['Distance from Earth', '4.30–4.69B km'],
      ['Orbital period', '164.8 years'],
      ['Day length', '16.1 hours'],
      ['Wind speed', 'Up to 2,100 km/h — fastest known'],
      ['Cloud-top temperature', '−200 °C'],
      ['Moons', '16 (Triton orbits backwards)'],
    ],
  },
};
