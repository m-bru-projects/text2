export const clockworkHeart = {
  id: "clockwork-heart",
  title: "The Clockwork Heart",
  intro: "The workshop is silent except for a faint ticking. You must restart the machine before the cold sets in.",
  start: {
    locationId: "workshop",
    inventory: [],
    knowledge: [],
    flags: {
      cabinetOpen: false,
      keySeen: false,
      machineRunning: false,
    },
  },
  status(state) {
    return [
      "Workshop",
      "Freezing",
      state.flags.machineRunning ? "The heart beats" : "The machine is silent",
    ];
  },
  locations: {
    workshop: {
      id: "workshop",
      name: "Tinkerer's Workshop",
      aliases: ["workshop", "room"],
      summary: "A cluttered, freezing workshop.",
      description:
        "The [[workshop]] is bitterly cold. In the center sits the brass [[machine]]. A locked [[glass cabinet]] hangs on the wall. Old [[Elias]] sits in his chair, shivering.",
      descriptionStates: [
        {
          conditions: {
            flags: { machineRunning: true },
          },
          text: "The [[workshop]] is warm now, filled with the steady rhythmic ticking of the brass [[machine]]. The [[glass cabinet]] hangs on the wall. [[Elias]] sits in his chair, resting peacefully.",
        },
        {
          conditions: {
            flags: { cabinetOpen: true },
          },
          text: "The [[workshop]] is bitterly cold. In the center sits the brass [[machine]]. An open [[glass cabinet]] hangs on the wall. Old [[Elias]] sits in his chair, shivering.",
        }
      ],
      exits: {},
      nouns: {
        machine: {
          name: "brass machine",
          aliases: ["machine", "brass machine"],
          locationId: "workshop",
          description: "A complex brass contraption. It has a keyhole shaped like a star, but it is entirely motionless.",
          descriptionStates: [
            {
              conditions: {
                flags: { machineRunning: true },
              },
              text: "The machine is ticking smoothly, radiating a gentle heat that warms the entire room.",
            }
          ],
          reveals: {
            knowledge: ["starKeyhole"],
          }
        },
        cabinet: {
          name: "glass cabinet",
          aliases: ["cabinet", "glass cabinet"],
          locationId: "workshop",
          description: "Through the smudge-stained glass, you can see a [[star key]] resting on a velvet cushion. The cabinet is locked with a simple latch that is stuck.",
          descriptionStates: [
            {
              conditions: {
                flags: { cabinetOpen: true },
              },
              text: "The glass cabinet is open. Its shelves are mostly bare.",
            }
          ],
          effects: {
            flags: { keySeen: true }
          }
        }
      },
      atmosphere: [
        { everyTurns: 4, text: "Frost creeps a little further up the windowpanes." },
        { everyTurns: 5, text: "The silence in the room feels heavy." }
      ]
    }
  },
  people: {
    elias: {
      id: "elias",
      name: "Elias",
      aliases: ["elias", "old man", "man"],
      locationId: "workshop",
      description: "Elias looks frail and exhausted. His hands tremble from the cold.",
      reveals: {
        knowledge: ["eliasCondition"],
      },
      dialogue: {
        default: '"It is too cold to think," Elias mutters. "The fire is dead."',
        noInterest: '"I don\'t know about that. I only know the cold," Elias whispers.',
        topics: {
          machine: {
            text: '"It is the heart of this place," Elias says. "If it stops, the cold wins."',
            reveals: {
              knowledge: ["machinePurpose"]
            }
          },
          cabinet: {
            text: '"Ah, the latch is stuck. Just force it open. I don\'t care if you break the glass."',
            reveals: {
              knowledge: ["cabinetStuck"]
            }
          },
          starKeyhole: {
            text: '"The starter key. I put it in the cabinet for safekeeping, and then my hands got too stiff to open it."'
          }
        }
      }
    }
  },
  items: {
    key: {
      id: "key",
      name: "star key",
      aliases: ["key", "star key", "starter key"],
      locationId: "workshop",
      conditions: {
        flags: {
          keySeen: true,
          cabinetOpen: true,
        }
      },
      description: "A heavy brass key with a star-shaped bit.",
      reveals: {
        story: [{ name: "Found the key", description: "You obtained the star key from the cabinet." }]
      }
    }
  },
  knowledge: {
    starKeyhole: {
      id: "starKeyhole",
      name: "Star keyhole",
      description: "The machine requires a star-shaped key to start.",
      conversation: true
    },
    eliasCondition: {
      id: "eliasCondition",
      name: "Elias is freezing",
      description: "Elias won't last long in this cold.",
      conversation: false
    },
    machinePurpose: {
      id: "machinePurpose",
      name: "The machine's purpose",
      description: "The machine provides heat for the workshop.",
      conversation: false
    },
    cabinetStuck: {
      id: "cabinetStuck",
      name: "Stuck cabinet",
      description: "Elias said to just force the cabinet open."
    }
  },
  actions: [
    {
      item: "cabinet",
      with: "",
      locationId: "workshop",
      conditions: {
        flags: {
          cabinetOpen: false,
        }
      },
      text: "You pull hard on the cabinet latch. With a sharp crack, it gives way and swings open, revealing the [[star key]].",
      effects: {
        flags: {
          cabinetOpen: true,
          keySeen: true
        }
      }
    },
    {
      item: "glass cabinet",
      with: "",
      locationId: "workshop",
      conditions: {
        flags: {
          cabinetOpen: false,
        }
      },
      text: "You pull hard on the cabinet latch. With a sharp crack, it gives way and swings open, revealing the [[star key]].",
      effects: {
        flags: {
          cabinetOpen: true,
          keySeen: true
        }
      }
    },
    {
      item: "key",
      with: "machine",
      locationId: "workshop",
      requiresInventory: "key",
      conditions: {
        flags: {
          machineRunning: false
        }
      },
      text: "You insert the [[star key]] into the machine's keyhole and turn it. A deep thrumming sound begins to resonate through the brass. The machine stutters, then catches, ticking with a steady rhythm. A wave of blessed heat washes over you.",
      effects: {
        flags: {
          machineRunning: true
        },
        win: {
          text: "You have restarted the heart of the workshop and saved Elias from the cold.",
          story: { name: "The Engine Roars", description: "You started the machine and restored heat." }
        }
      }
    },
    {
      item: "star key",
      with: "machine",
      locationId: "workshop",
      requiresInventory: "key",
      conditions: {
        flags: {
          machineRunning: false
        }
      },
      text: "You insert the [[star key]] into the machine's keyhole and turn it. A deep thrumming sound begins to resonate through the brass. The machine stutters, then catches, ticking with a steady rhythm. A wave of blessed heat washes over you.",
      effects: {
        flags: {
          machineRunning: true
        },
        win: {
          text: "You have restarted the heart of the workshop and saved Elias from the cold.",
          story: { name: "The Engine Roars", description: "You started the machine and restored heat." }
        }
      }
    }
  ]
};
