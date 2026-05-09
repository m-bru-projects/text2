export const tideCaller = {
  id: "tide-caller",
  title: "The Tide Caller",
  intro:
    "The light is failing over the water. Out beyond the breakwater, seven [[fishing boats]] are still running wide, their lanterns faint against the coming dark.",
  start: {
    locationId: "harbourQuay",
    inventory: [],
    knowledge: [],
    flags: {
      bellRestored: false,
      clapperVisible: false,
    },
  },
  status(state) {
    return [
      "Dusk",
      "Storm hour away",
      state.flags.bellRestored ? "Boats making harbour" : "Seven boats still out",
    ];
  },
  locations: {
    harbourQuay: {
      id: "harbourQuay",
      name: "Harbour Quay",
      aliases: ["harbour", "quay", "dock"],
      summary: "The stone quay at the village edge, dark water lapping at its steps.",
      description:
        "The quay stones are slick with spray. Seven [[fishing boats]] move beyond the breakwater, their lanterns bunching and separating in the chop. [[Ren]], the harbour-warden, stands at the mooring post with his hands knotted together. On the [[cliff]] above, the old [[warning bell]] hangs silent.",
      exits: {
        north: {
          to: "cliffBell",
          aliases: ["cliff", "path", "up"],
          preview:
            "North, a narrow path climbs the cliff face. The dark shape of the warning bell is visible at the top — no sound from it.",
        },
        east: {
          to: "boathouse",
          aliases: ["boathouse", "shed"],
          preview:
            "East, the boathouse hulks low against the cliff wall. Its door hangs open a hand's width.",
        },
      },
      nouns: {
        boats: {
          name: "fishing boats",
          aliases: ["boats", "fleet", "lights", "lanterns"],
          locationId: "harbourQuay",
          description:
            "Seven lanterns in the chop, closer together now than they should be. The lead boat is running a wide berth around something in the water — they cannot see the harbour mouth without a guide signal.",
          reveals: {
            knowledge: ["stormComing"],
          },
        },
        cliff: {
          name: "cliff",
          aliases: ["cliff", "clifftop"],
          locationId: "harbourQuay",
          description:
            "The cliff rises sharply above the quay. The warning bell is mounted at its crest, where it carries over any weather.",
        },
      },
      atmosphere: [
        { everyTurns: 3, text: "A gust off the water brings cold and the smell of rain still an hour out — or less." },
        { everyTurns: 5, text: "The boat lanterns drift further from the harbour mouth. They are circling." },
      ],
    },
    cliffBell: {
      id: "cliffBell",
      name: "Cliff Bell",
      aliases: ["bell", "cliff", "clifftop"],
      summary: "The clifftop where the village warning bell stands, missing its clapper.",
      description:
        "The [[warning bell]] is mounted here on an iron frame, facing the open sea. It is old and kept clean, but when you look into the iron crown it is empty — someone has removed the [[clapper]].",
      descriptionStates: [
        {
          conditions: { flags: { bellRestored: true } },
          text:
            "The [[warning bell]] stands on its frame, the [[clapper]] back in its mount. The last tone is still moving out across the water, and below, seven lights are turning toward the harbour mouth.",
        },
      ],
      exits: {
        south: {
          to: "harbourQuay",
          aliases: ["quay", "harbour", "down"],
          preview:
            "The path drops south to the quay. [[Ren]] is still at the mooring post.",
        },
      },
      nouns: {
        bell: {
          name: "warning bell",
          aliases: ["bell", "iron bell"],
          locationId: "cliffBell",
          description:
            "The bell is as wide as a barrel, cast from dark iron and worn smooth where hands have struck it. The [[clapper]] mount inside is empty — only the threading bolt remains.",
          descriptionStates: [
            {
              conditions: { flags: { bellRestored: true } },
              text:
                "The bell sits on its frame with the [[clapper]] threaded back into place. Its last tone is still somewhere out over the water.",
            },
          ],
          reveals: {
            knowledge: ["bellSilenced"],
          },
        },
      },
      atmosphere: [
        {
          everyTurns: 3,
          text: "Wind presses against you at the clifftop. Below, the boat lanterns drift further from the harbour mouth.",
        },
      ],
    },
    boathouse: {
      id: "boathouse",
      name: "Boathouse",
      aliases: ["boathouse", "shed"],
      summary: "A low stone building at the cliff base, smelling of rope and tar.",
      description:
        "The boathouse is close and dim. [[Coiled nets]] fill the left-hand corner, and a long [[repair bench]] runs the far wall. The place has the feeling of somewhere deliberately left untouched.",
      exits: {
        west: {
          to: "harbourQuay",
          aliases: ["quay", "harbour", "out"],
          preview:
            "West, through the boathouse door, the quay and the dark water beyond.",
        },
      },
      nouns: {
        nets: {
          name: "coiled nets",
          aliases: ["nets", "net", "coil"],
          locationId: "boathouse",
          description:
            "Heavy nets stacked and coiled. When you lift the topmost coil, a length of dark iron with a worn leather grip is beneath it — the missing [[bell clapper]].",
          effects: {
            flags: { clapperVisible: true },
          },
          reveals: {
            knowledge: ["clapperFound"],
          },
        },
        bench: {
          name: "repair bench",
          aliases: ["bench", "workbench"],
          locationId: "boathouse",
          description:
            "The bench is clear except for a stub of rope and a single iron bolt — the kind used to mount a bell clapper.",
        },
      },
      atmosphere: [
        { everyTurns: 4, text: "Outside, the wind picks up. The boathouse door creaks on its hinge." },
      ],
    },
  },
  people: {
    ren: {
      id: "ren",
      name: "Ren",
      aliases: ["ren", "warden", "harbour-warden", "old man"],
      locationId: "harbourQuay",
      description:
        "Ren is compact, grey at the temples and salt-dried from decades at the water. His eyes keep moving between the cliff and the sea without settling on either.",
      reveals: {
        knowledge: ["renMet"],
      },
      dialogue: {
        default:
          '"Seven boats still out," Ren says without turning. "Bell has not rung in four years. I took the [[clapper]] myself after a false alarm that cost Pell\'s boat its nets. My hands gave the wrong signal and I will not trust them again."',
        noInterest: '"Ask me something the sea cares about," Ren says.',
        topics: {
          storm: {
            text:
              '"Give it an hour," Ren says. "Maybe less. They cannot find the harbour mouth without the bell — not in this light, not with the chop pushing them wide."',
            reveals: {
              knowledge: ["stormComing"],
            },
          },
          bell: {
            text:
              '"Go up and look at it," Ren says. "The clapper is in the boathouse under the nets. I put it there. I cannot ring it myself — but you have no history with the boats."',
            reveals: {
              knowledge: ["clapperLocation"],
            },
          },
          clapper: {
            requiresKnowledge: "bellSilenced",
            lockedText:
              '"Go look at the bell first," Ren says, reading your expression. "Then ask me again."',
            text:
              '"In the boathouse, under the nets on the left," Ren says flatly. "Put it back. Ring the bell. Do what I will not."',
            reveals: {
              knowledge: ["clapperLocation"],
            },
          },
          boats: {
            text:
              '"Pell\'s boy is on the lead boat. Three children on the second. You know how it is," Ren says.',
          },
        },
      },
    },
  },
  items: {
    clapper: {
      id: "clapper",
      name: "bell clapper",
      aliases: ["clapper", "iron clapper"],
      locationId: "boathouse",
      conditions: {
        flags: { clapperVisible: true },
      },
      description:
        "A length of dark iron, heavy and well-balanced, with a worn leather grip where a hand would steady it during mounting. It still smells faintly of iron and salt.",
      reveals: {
        knowledge: ["clapperTaken"],
      },
    },
  },
  knowledge: {
    renMet: {
      id: "renMet",
      name: "Ren",
      description: "The harbour-warden who removed the bell clapper four years ago after a false alarm he caused.",
      conversation: false,
    },
    stormComing: {
      id: "stormComing",
      name: "The storm",
      description: "A storm is an hour or less out, and seven boats are still beyond the harbour mouth in failing light.",
    },
    bellSilenced: {
      id: "bellSilenced",
      name: "Bell without a clapper",
      description: "The warning bell on the cliff is missing its clapper and cannot be rung.",
    },
    clapperLocation: {
      id: "clapperLocation",
      name: "Where the clapper is",
      description: "Ren hid the clapper beneath the nets in the boathouse.",
      conversation: false,
    },
    clapperFound: {
      id: "clapperFound",
      name: "Clapper under the nets",
      description: "The bell clapper was hidden under the coiled nets in the boathouse.",
      conversation: false,
    },
    clapperTaken: {
      id: "clapperTaken",
      name: "Bell clapper",
      aliases: ["clapper"],
      description: "The iron clapper taken from the boathouse nets, removed from the warning bell four years ago.",
    },
  },
  actions: [
    {
      item: "clapper",
      with: "bell",
      locationId: "cliffBell",
      requiresInventory: "clapper",
      text:
        "You thread the [[bell clapper]] back onto the mounting bolt and step away. The first swing is tentative. The second is not. The bell opens across the sea like a door — low, carrying, deliberate — and does not stop until seven shapes below begin to turn toward the harbour mouth.",
      effects: {
        flags: { bellRestored: true },
        win: {
          text: "One by one the lanterns angle for home. You stand at the clifftop and count them in, all seven, before the first rain reaches you.",
          story: {
            name: "The bell rang",
            description: "You restored the clapper and rang the warning bell. The seven boats made harbour before the storm.",
          },
        },
      },
    },
  ],
};
