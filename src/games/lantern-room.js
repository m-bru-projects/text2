export const lanternRoom = {
  id: "lantern-room",
  title: "The Lantern Room",
  intro:
    "The society left you one hour and a dead man's [[field note]]. Somewhere inside the old observatory, a signal is waiting to be corrected.",
  start: {
    locationId: "vestibule",
    inventory: ["fieldNote"],
    knowledge: [],
    flags: {
      cabinetOpen: false,
      lensClean: false,
      lanternAligned: false,
    },
  },
  status(state) {
    return [
      "Last hour",
      "Wind",
      state.ended ? "The signal is sent" : state.flags.lanternAligned ? "The lantern is aligned" : "The dome is dark",
    ];
  },
  locations: {
    vestibule: {
      id: "vestibule",
      name: "Observatory Vestibule",
      aliases: ["vestibule", "entry", "hall"],
      map: { x: 32, y: 72 },
      summary: "A narrow entry beneath a sealed observatory dome.",
      description:
        "The [[Observatory Vestibule]] smells of wet wool and extinguished gas. A brass [[cabinet]] hangs beside a stairwell, and [[Iris Vale]] stands with one hand on the rail.",
      descriptionStates: [
        {
          conditions: {
            flags: {
              cabinetOpen: true,
            },
          },
          text:
            "The [[Observatory Vestibule]] is colder now. The brass [[cabinet]] hangs open beside the stairwell, and [[Iris Vale]] watches the dark steps as if counting your remaining minutes.",
        },
      ],
      exits: {
        up: {
          to: "dome",
          aliases: ["north", "stairs", "stairwell", "dome"],
          preview:
            "Up the stairwell, the observatory dome waits in a ring of pale dust. Something glass catches the lightning.",
        },
      },
      nouns: {
        cabinet: {
          name: "cabinet",
          aliases: ["brass cabinet"],
          locationId: "vestibule",
          description:
            "The cabinet door is fastened by a simple latch. Through the seam, you catch the dry mineral smell of old cleaning powder.",
          descriptionStates: [
            {
              conditions: {
                flags: {
                  cabinetOpen: true,
                },
              },
              text:
                "The cabinet hangs open. A rectangle of dust marks where the [[polishing cloth]] used to rest.",
            },
          ],
        },
      },
      atmosphere: [
        { everyTurns: 3, text: "Wind presses against the outer door, then releases it with a careful sigh." },
      ],
    },
    dome: {
      id: "dome",
      name: "Telescope Dome",
      aliases: ["dome", "telescope", "observatory"],
      map: { x: 32, y: 38 },
      summary: "The observatory's circular upper chamber.",
      description:
        "The [[Telescope Dome]] opens above you in ribs of black iron. The old [[telescope]] points nowhere useful. A narrow door leads east to the lantern platform.",
      exits: {
        down: {
          to: "vestibule",
          aliases: ["south", "stairs", "vestibule"],
          preview:
            "Down the stairwell, the vestibule lamp trembles below.",
        },
        east: {
          to: "platform",
          aliases: ["platform", "lantern platform"],
          preview:
            "East, a maintenance door opens onto the wind-scoured lantern platform.",
        },
      },
      nouns: {
        telescope: {
          name: "telescope",
          aliases: ["scope", "old telescope"],
          locationId: "dome",
          description:
            "The telescope's sighting ring is still marked with a charcoal notch beside the word [[Aster]].",
          reveals: {
            knowledge: ["aster"],
            story: [{ name: "Aster mark", description: "The telescope is marked with the word Aster." }],
          },
        },
      },
      atmosphere: [
        { everyTurns: 3, text: "The dome ticks as cooling metal answers the storm outside." },
      ],
    },
    platform: {
      id: "platform",
      name: "Lantern Platform",
      aliases: ["platform", "lantern", "roof"],
      map: { x: 70, y: 38 },
      summary: "A narrow exterior platform holding the signal lantern.",
      description:
        "Rain stripes the [[Lantern Platform]]. The signal [[lantern]] faces the harbor with a clouded [[lens]], and the city below is a scatter of black water and amber windows.",
      descriptionStates: [
        {
          conditions: {
            flags: {
              lanternAligned: true,
            },
          },
          text:
            "The [[Lantern Platform]] hums around the aligned [[lantern]]. Its clean [[lens]] holds the city in a single bright point.",
        },
        {
          conditions: {
            flags: {
              lensClean: true,
            },
          },
          text:
            "Rain stripes the [[Lantern Platform]]. The signal [[lantern]] faces the harbor with its [[lens]] clear enough to catch every stray light below.",
        },
      ],
      exits: {
        west: {
          to: "dome",
          aliases: ["dome", "inside"],
          preview:
            "West, the dome door cuts a black rectangle out of the rain.",
        },
      },
      nouns: {
        lantern: {
          name: "lantern",
          aliases: ["signal lantern", "lamp"],
          locationId: "platform",
          description:
            "The lantern's brass frame is intact, but the [[lens]] is filmed with salt. Its alignment wheel is stamped with the same word from the note: [[Aster]].",
          descriptionStates: [
            {
              conditions: {
                flags: {
                  lanternAligned: true,
                },
              },
              text:
                "The lantern is aligned to Aster. The housing vibrates with stored light.",
            },
            {
              conditions: {
                flags: {
                  lensClean: true,
                },
              },
              text:
                "The lantern's lens is clean. The alignment wheel waits under your hand, its pointer hovering near the word [[Aster]].",
            },
          ],
          reveals: {
            knowledge: ["aster"],
          },
        },
        lens: {
          name: "lens",
          aliases: ["clouded lens", "glass"],
          locationId: "platform",
          description:
            "Salt and soot cloud the lens. Any signal sent through it would scatter before it reached the harbor.",
          descriptionStates: [
            {
              conditions: {
                flags: {
                  lensClean: true,
                },
              },
              text:
                "The lens is clear. Through it, the harbor lights sharpen into hard amber points.",
            },
          ],
        },
      },
      atmosphere: [
        { everyTurns: 3, text: "Rain needles the lantern housing, then runs away in bright threads." },
      ],
    },
  },
  people: {
    iris: {
      id: "iris",
      name: "Iris Vale",
      aliases: ["iris", "vale", "woman"],
      locationId: "vestibule",
      description:
        "Iris Vale wears a dark coat buttoned to the throat. She watches the stairwell, not the door.",
      reveals: {
        knowledge: ["irisTrustsNote"],
      },
      dialogue: {
        default:
          '"Do not waste time asking why they chose you," Iris says. "Ask what the old keeper left undone."',
        noInterest: '"That will not bring the harbor light back," Iris says.',
        topics: {
          aster: {
            requiresKnowledge: "aster",
            lockedText: '"Find the keeper\'s word first," Iris says. "He hid everything behind names."',
            text:
              '"Aster is not a star tonight," Iris says. "It is the bearing. Clean the lens, set the wheel, and send the signal."',
            reveals: {
              knowledge: ["signalPlan"],
            },
          },
          fieldNote: {
            text:
              '"The note is his confession," Iris says. "He knew the lantern would fail and left the remedy where only a careful reader would find it."',
            reveals: {
              knowledge: ["keeperConfession"],
            },
          },
          platform: {
            text:
              '"The platform takes the worst of the weather," Iris says. "If the lens is fouled, the harbor sees nothing."',
          },
        },
      },
    },
  },
  items: {
    fieldNote: {
      id: "fieldNote",
      name: "field note",
      aliases: ["note", "dead man's note", "paper"],
      description:
        "The field note is cramped with a single instruction: Clean the eye, set it to [[Aster]], and wake the harbor before the bell.",
      reveals: {
        knowledge: ["aster", "signalPlan"],
      },
    },
    cloth: {
      id: "cloth",
      name: "polishing cloth",
      aliases: ["cloth", "rag"],
      locationId: "vestibule",
      conditions: {
        flags: {
          cabinetOpen: true,
        },
      },
      description:
        "The polishing cloth is grey with old silver dust but still soft at the folded edge.",
    },
  },
  knowledge: {
    irisTrustsNote: {
      id: "irisTrustsNote",
      name: "Iris trusts the note",
      description: "Iris believes the keeper's field note points to the unfinished work.",
      conversation: false,
    },
    keeperConfession: {
      id: "keeperConfession",
      name: "Keeper's confession",
      description: "The keeper knew the lantern would fail and left instructions behind.",
      conversation: false,
    },
    aster: {
      id: "aster",
      name: "Aster",
      aliases: ["bearing", "word"],
      description: "Aster is the word marked on the telescope and lantern wheel.",
    },
    signalPlan: {
      id: "signalPlan",
      name: "Signal plan",
      aliases: ["plan", "harbor signal"],
      description: "Clean the lens, align the lantern to Aster, and send the harbor signal.",
    },
  },
  actions: [
    {
      item: "cabinet",
      with: "",
      locationId: "vestibule",
      conditions: {
        flags: {
          cabinetOpen: false,
        },
      },
      text:
        "You lift the cabinet latch. Inside, beneath a shallow drift of dust, lies a folded [[polishing cloth]].",
      effects: {
        flags: {
          cabinetOpen: true,
        },
      },
    },
    {
      item: "cloth",
      with: "lens",
      locationId: "platform",
      requiresInventory: "cloth",
      conditions: {
        flags: {
          lensClean: false,
        },
      },
      text:
        "You work the [[polishing cloth]] over the lens until the salt gives way. The harbor lights gather into focus beyond the glass.",
      effects: {
        flags: {
          lensClean: true,
        },
      },
      reveals: {
        story: [{ name: "The lens is clean", description: "The lantern can now carry a signal across the harbor." }],
      },
    },
    {
      item: "lantern",
      with: "aster",
      locationId: "platform",
      conditions: {
        knowledge: ["aster"],
        flags: {
          lensClean: true,
          lanternAligned: false,
        },
      },
      text:
        "You turn the lantern's wheel until the pointer rests on Aster. The housing answers with a low amber pulse.",
      effects: {
        flags: {
          lanternAligned: true,
        },
      },
    },
    {
      item: "lantern",
      aliases: ["signal", "harbor signal", "light"],
      with: "",
      locationId: "platform",
      conditions: {
        flags: {
          lensClean: true,
          lanternAligned: true,
        },
      },
      text:
        "You open the lantern shutter. Amber light crosses the harbor in one clean line, and far below, an answering bell begins to ring.",
      effects: {
        win: {
          text:
            "Ending: The harbor receives the signal before the last hour closes. Iris will find the bell still ringing when she reaches the platform.",
          story: {
            name: "The harbor answered",
            description: "The cleaned and aligned lantern sent the signal in time.",
          },
        },
      },
    },
  ],
};
