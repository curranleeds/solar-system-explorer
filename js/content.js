/* ============================================================
   Cosmic Explorer — celestial object placards
   Museum-style content: discovery, etymology, cultural history,
   and vital statistics for each clickable object.
   ============================================================ */

window.COSMIC_OBJECT_INFO = {
  sol: {
    class: 'G2V Star',
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
