export const underbridgeLetter = {
  id: "underbridge-letter",
  title: "The Underbridge Letter",
  intro: "Rain worries at the city. In your coat pocket, the [[letter]] is warm enough to feel alive.",
  start: {
    locationId: "underbridge",
    inventory: ["letter"],
    knowledge: [],
    flags: {
      gateOpen: false,
      tokenSeen: false,
    },
  },
  status(state) {
    return [
      "First night",
      "Rain",
      state.flags.gateOpen ? "The gate is listening" : "The letter is warm",
    ];
  },
  locations: {
    underbridge: {
      id: "underbridge",
      name: "Underbridge Gate",
      aliases: ["gate", "underbridge"],
      summary: "A flooded service gate beneath the east rail bridge.",
      description:
        "The [[Underbridge Gate]] leans shut beneath the railway. Rain threads through the ironwork. A faded [[civic seal]] is bolted beside a narrow [[drain hatch]], and [[Mara Venn]] waits under a broken lamp.",
      descriptionStates: [
        {
          conditions: {
            flags: {
              gateOpen: true,
            },
          },
          text:
            "The [[Underbridge Gate]] stands open beneath the railway, its iron bars angled inward toward the stair beyond. Rain threads through the ironwork. The faded [[civic seal]] watches beside the narrow [[drain hatch]], and [[Mara Venn]] waits under the broken lamp.",
        },
      ],
      exits: {
        north: {
          to: "archiveSteps",
          aliases: ["stairs", "stair", "steps"],
          preview:
            "North, the opened gate reveals slick stone steps descending toward a low amber glow. The air beyond looks dry in a way rain should not allow.",
          lockedPreview:
            "North, the [[Underbridge Gate]] bars the way. Beyond it, you can just make out descending steps and a weak amber glow below the rain.",
          conditions: {
            flags: {
              gateOpen: true,
            },
          },
          lockedText: "The gate is still shut. Its dark plate waits beside the bars.",
        },
      },
      nouns: {
        gate: {
          name: "Underbridge Gate",
          aliases: ["gate", "iron gate"],
          locationId: "underbridge",
          description:
            "The gate has no lock, only a palm-dark plate etched with the same mark as the [[letter]]. The metal hums when your hand nears it.",
          descriptionStates: [
            {
              conditions: {
                flags: {
                  gateOpen: true,
                },
              },
              text:
                "The gate is open now. Its palm-dark plate has gone cold, and the bars hold their inward angle as if listening for whether you will descend.",
            },
          ],
          reveals: {
            story: [{ name: "The gate has no lock", description: "The Underbridge Gate responds to marks and memory, not keys." }],
          },
        },
        seal: {
          name: "civic seal",
          aliases: ["seal", "mark"],
          locationId: "underbridge",
          description:
            "The seal shows seven towers over a drowned eye. Someone has scratched a newer word beneath it: [[Morrow]].",
          reveals: {
            knowledge: ["morrow"],
          },
        },
        hatch: {
          name: "drain hatch",
          aliases: ["hatch", "drain"],
          locationId: "underbridge",
          description:
            "The hatch is half-choked with leaves. Beneath the grate, a strip of brass catches the lamplight: a [[brass token]].",
          effects: {
            flags: {
              tokenSeen: true,
            },
          },
        },
      },
      atmosphere: [
        { everyTurns: 3, text: "A train passes overhead, and the gate shivers after the sound is gone." },
        { everyTurns: 4, text: "Rainwater gathers into letters, then breaks before you can read them." },
      ],
    },
    archiveSteps: {
      id: "archiveSteps",
      name: "Archive Steps",
      aliases: ["archive", "municipal archive", "steps"],
      summary: "Stone steps descending toward the sealed municipal archive.",
      description:
        "Beyond the opened gate, slick steps descend to the [[municipal archive]]. A line of amber bulbs burns below the waterline. The air tastes of dust despite the rain.",
      exits: {
        south: {
          to: "underbridge",
          aliases: ["gate", "underbridge"],
          preview:
            "South, the open gate frames the rain-slick underbridge and the broken lamp above [[Mara Venn]].",
        },
      },
      nouns: {
        archive: {
          name: "municipal archive",
          aliases: ["archive", "steps"],
          locationId: "archiveSteps",
          description:
            "Every window has been papered from inside. On the nearest pane, a hand has written: ask what the city forgot.",
          reveals: {
            knowledge: ["cityForgot"],
            story: [{ name: "What the city forgot", description: "The archive seems arranged around an erased civic memory." }],
          },
        },
      },
      atmosphere: [
        { everyTurns: 3, text: "One amber bulb flares brighter than the rest, then steadies." },
      ],
    },
  },
  people: {
    mara: {
      id: "mara",
      name: "Mara Venn",
      aliases: ["mara", "venn", "woman"],
      locationId: "underbridge",
      description:
        "Mara Venn is rain-soaked, severe, and still somehow composed. She keeps glancing at the [[letter]] as if it might interrupt.",
      reveals: {
        knowledge: ["maraMet"],
      },
      dialogue: {
        default:
          '"You came because it warmed in your pocket," Mara says. "That means the archive has started naming you back."',
        noInterest: '"That is not the thread I am holding," Mara says.',
        topics: {
          underbridge: {
            text:
              '"The bridge is only useful because people forget to look beneath useful things," Mara says.',
          },
          morrow: {
            requiresKnowledge: "morrow",
            lockedText: 'Mara says, "Names matter. Bring me one first."',
            text:
              '"Morrow was not a person," Mara says. "It was the city before the city. The seal is older than the bridge."',
            reveals: {
              knowledge: ["morrowWasCity"],
            },
          },
          letter: {
            text:
              '"Read it closely," Mara says. "It does not tell you where to go. It tells the gate who you are willing to become."',
            reveals: {
              knowledge: ["letterOpensGate"],
            },
          },
          token: {
            requiresKnowledge: "drownedEyeToken",
            lockedText: 'Mara glances toward the drain hatch. "If there is a token, bring it into the light first."',
            text:
              'Mara turns the brass token over once. "They gave these to witnesses, not citizens. Keep it. The archive respects witnesses."',
            reveals: {
              knowledge: ["tokenWitness"],
            },
          },
          archive: {
            requiresKnowledge: "cityForgot",
            text:
              'Mara lowers her voice. "Inside are casebooks for crimes that happened tomorrow and confessions signed by streets."',
            reveals: {
              knowledge: ["archivePurpose"],
            },
          },
        },
      },
    },
  },
  items: {
    letter: {
      id: "letter",
      name: "letter",
      aliases: ["warm letter", "envelope"],
      description:
        "The paper is dry despite the rain. Its only line reads: When the drowned eye opens, bring the name [[Morrow]].",
      reveals: {
        knowledge: ["morrow", "letterOpensGate"],
      },
    },
    token: {
      id: "token",
      name: "brass token",
      aliases: ["token", "brass"],
      locationId: "underbridge",
      conditions: {
        flags: {
          tokenSeen: true,
        },
      },
      description:
        "The token is stamped with the drowned eye. It is cold, unlike the [[letter]], and leaves a circular shadow on your palm.",
      reveals: {
        knowledge: ["drownedEyeToken"],
      },
    },
  },
  knowledge: {
    morrow: {
      id: "morrow",
      name: "Morrow",
      description: "A scratched word beneath the civic seal, also named in the letter.",
    },
    maraMet: {
      id: "maraMet",
      name: "Mara Venn",
      description: "Mara expected the letter to bring you to the gate.",
      conversation: false,
    },
    drownedEyeToken: {
      id: "drownedEyeToken",
      name: "Drowned eye token",
      aliases: ["token", "brass token"],
      description: "The token bears the same eye as the civic seal.",
    },
    tokenWitness: {
      id: "tokenWitness",
      name: "Witness token",
      description: "Mara says the archive recognizes the brass token as a witness sign.",
      conversation: false,
    },
    letterOpensGate: {
      id: "letterOpensGate",
      name: "Letter as credential",
      description: "The letter is less a message than a way to identify yourself to the gate.",
      conversation: false,
    },
    morrowWasCity: {
      id: "morrowWasCity",
      name: "Morrow was a city",
      description: "Morrow was the city before the present city overwrote it.",
      conversation: false,
    },
    cityForgot: {
      id: "cityForgot",
      name: "What the city forgot",
      description: "The archive keeps something erased from civic memory.",
    },
    archivePurpose: {
      id: "archivePurpose",
      name: "The archive's purpose",
      description: "The archive keeps impossible casebooks and confessions.",
      conversation: false,
    },
  },
  actions: [
    {
      item: "letter",
      with: "gate",
      locationId: "underbridge",
      requiresInventory: "letter",
      conditions: {
        knowledge: ["letterOpensGate", "morrow"],
        flags: {
          gateOpen: false,
        },
      },
      text:
        "You press the [[letter]] to the gate's dark plate and say Morrow. The iron opens inward without sound, revealing the stair below.",
      effects: {
        flags: {
          gateOpen: true,
        },
      },
      reveals: {
        story: [{ name: "The gate opened", description: "The word Morrow and the letter opened the Underbridge Gate." }],
      },
    },
  ],
};
