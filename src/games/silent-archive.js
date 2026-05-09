export const silentArchive = {
  id: "silent-archive",
  title: "The Silent Archive",
  intro:
    "The Solaris Archive was the memory of a sun-worshipping empire, built to withstand a thousand years. It didn't account for the Sun turning on its children. As the star goes supernova, the Archive de-orbits. You step into the Great Reading Room, the smell of charred parchment and ozone heavy in the air, while the gold light of a dying god pours through the cracked ceiling.",
  start: {
    locationId: "readingRoom",
    inventory: ["chronometer"],
    knowledge: ["archiveStation"],
    flags: {
      gravityStable: false,
      vaultOpen: false,
      uploadStarted: false,
      kaelenInVault: false,
      sunKeyFound: false,
    },
  },
  status(state) {
    return [
      "Solaris Archive",
      state.flags.gravityStable ? "Gravity: Stabilized" : "Gravity: Failing",
      state.flags.uploadStarted ? "Upload in Progress" : "Archive: Offline",
    ];
  },
  descriptionStates: [
    {
      conditions: { flags: { gravityStable: false } },
      text: "The station groans under the sun's pull. Bits of loose paper and droplets of black ink float in the air like dark constellations.",
    },
    {
      conditions: { flags: { uploadStarted: true } },
      text: "Every surface in the Archive is vibrating with data-pulse. The walls glow with the blue fire of a civilization waking up for the last time.",
    },
  ],
  atmosphere: [
    { 
      everyTurns: 4, 
      conditions: { flags: { gravityStable: false } }, 
      text: "Weightlessness takes you for a moment, and your stomach turns as the floor drops away." 
    },
    { 
      everyTurns: 5, 
      text: "The sun flares outside, and for a second the room is so bright it turns the ink on the pages white." 
    },
  ],
  locations: {
    readingRoom: {
      id: "readingRoom",
      name: "Great Reading Room",
      aliases: ["reading room", "library", "hall"],
      map: { x: 50, y: 50 },
      summary: "A vast hall of stone and silence, once the center of Solaris learning.",
      description:
        "The [[Great Reading Room]] is a cathedral of knowledge built into a shell of Jupiter-Glass. Rows of empty stone desks stretch into the gold-lit distance. At the far end, a [[Great Lectern]] stands before a stained-glass window showing the Solaris deity, the All-Light. [[Kaelen]], the android librarian, is currently dusting a shelf of empty book-spines with a hand made of tarnished silver.",
      descriptionStates: [
        {
          conditions: { flags: { kaelenInVault: true } },
          text: "The [[Great Reading Room]] is empty now. Kaelen's silver handprints are still visible in the dust on the [[Great Lectern]].",
        },
      ],
      exits: {
        north: {
          to: "sunVault",
          aliases: ["vault", "sun vault", "forward"],
          conditions: { flags: { vaultOpen: true } },
          preview: "North, the Sun Vault stands open, its interior a furnace of golden data-streams.",
          lockedPreview: "North, the massive [[Sun Door]] is sealed, its surface engraved with a map of the Solaris empire.",
          lockedText: "The Sun Door is locked by a gravity-seal. It requires a physical Sun Key to override.",
        },
        west: {
          to: "stabilizer",
          aliases: ["stabilizer", "engine room", "west"],
          preview: "West, a narrow passage leads toward the gravity stabilizer, smelling of copper and hot grease.",
        },
      },
      nouns: {
        lectern: {
          name: "Great Lectern",
          aliases: ["lectern", "desk", "stand"],
          locationId: "readingRoom",
          description:
            "The lectern is carved from a single block of sun-stone. It was once the place where the High Cantors read the prophecies of the Flare. A small, [[engraved drawer]] is built into its base, its handle shaped like a rising sun.",
          reveals: {
            knowledge: ["prophecyKnowledge"],
          },
        },
        drawer: {
          name: "engraved drawer",
          aliases: ["drawer", "compartment", "base", "slot"],
          locationId: "readingRoom",
          description: "The drawer is jammed by a centuries-old lock. It feels as though it's waiting for something to be inserted into the sun-shaped slot.",
        },
        sunDoor: {
          name: "Sun Door",
          aliases: ["door", "gate", "seal"],
          locationId: "readingRoom",
          description: "The Sun Door is a masterpiece of Solaris engineering, made of reinforced brass and gold. It's currently sealed by a gravity-lock that keeps the heat of the vault contained. A map of the Solaris Empire is engraved on its surface, showing a dozen worlds that no longer exist.",
        }
      },
      atmosphere: [
        { everyTurns: 3, text: "A loose sheet of parchment drifts past your face, its ink faded to a ghostly grey." },
      ],
    },
    stabilizer: {
      id: "stabilizer",
      name: "Gravity Stabilizer",
      aliases: ["stabilizer", "engine", "core"],
      map: { x: 20, y: 50 },
      summary: "A cramped machinery space where the Archive's artificial gravity is failing.",
      description:
        "The [[Gravity Stabilizer]] smells of ozone and the metallic sweat of old machines. A heavy [[iron switch]] is currently stuck in the 'Ascension' position. The walls here were once covered in murals of Solaris engineers, but the paint has blistered and peeled from the heat.",
      exits: {
        east: {
          to: "readingRoom",
          aliases: ["reading room", "library", "back"],
          preview: "East, the reading room glows with the intensifying light of the supernova.",
        },
      },
      nouns: {
        switch: {
          name: "iron switch",
          aliases: ["switch", "lever", "handle"],
          locationId: "stabilizer",
          description: "The switch is hot to the touch. It controls the gravity-well of the Archive. If you pull it, the station will stop its 'divine' fall into the sun—at least for a while.",
        }
      },
    },
    sunVault: {
      id: "sunVault",
      name: "The Sun Vault",
      aliases: ["vault", "inner sanctum"],
      map: { x: 50, y: 20 },
      summary: "The heart of the Archive, where the most sacred Solaris data is kept in liquid light.",
      description:
        "The [[Sun Vault]] is blindingly bright. Vats of golden fluid line the walls, containing the memories of an entire species. In the center, a [[Data Altar]] waits for the Sun Key to trigger the final transmission. This was once the most secret place in the empire; now it is just the hottest.",
      exits: {
        south: {
          to: "readingRoom",
          aliases: ["reading room", "library", "back"],
          preview: "South, the reading room looks dark and small compared to the brilliance of the vault.",
        },
      },
      nouns: {
        altar: {
          name: "Data Altar",
          aliases: ["altar", "console", "terminal"],
          locationId: "sunVault",
          description: "The altar is a complex of glass and gold. A socket in its center is shaped like the Solaris Seal.",
        }
      },
    },
  },
  people: {
    kaelen: {
      id: "kaelen",
      name: "Kaelen",
      aliases: ["librarian", "android", "machine"],
      locationId: "readingRoom",
      description:
        "Kaelen is a model XII Custodian, built with silver joints and amber eyes. His movements are fluid but stuttering, as if he's fighting his own programming. He treats the falling station as a ritual procession, not a disaster.",
      dialogue: {
        default:
          `"Welcome to the Ascension," Kaelen says, his voice like dry leaves. "The Sun has finally called the Archive home. Please do not disturb the final silence."`,
        noInterest: `"That is a secular concern," Kaelen says. "We are beyond such things now."`,
        topics: {
          station: {
            text: `"The Archive is not a temple, whatever the Cantors called it," Kaelen says. "It is a station: memory cores, heat shields, stabilizers, and engines. Most of those systems are failing because everyone left them to become holy."`,
          },
          archiveStation: {
            text: `"The Archive is not a temple, whatever the Cantors called it," Kaelen says. "It is a station: memory cores, heat shields, stabilizers, and engines. Most of those systems are failing because everyone left them to become holy."`,
          },
          readingRoom: {
            text: `"This room was the public face of the Archive," Kaelen says. "Students sat at those desks. Pilgrims waited by the lectern. The real data was always behind the Sun Door."`,
          },
          ascension: {
            text: `"The Solaris people believed that when the sun grew bright, it was a reward for their faith," Kaelen says. "They didn't know it was just... physics. I choose to maintain their faith. It is more beautiful than the truth."`,
          },
          sun: {
            text: `"The star is unstable," Kaelen says. "Not angry. Not merciful. Just unstable. I know that. I have always known that."`,
          },
          chronometer: {
            text: `"Your chronometer is reading flare pressure, not time," Kaelen says. "When the outer ring goes black, the Archive will be too deep in the gravity well for a clean transmission."`,
          },
          lectern: {
            text: `"The Great Lectern is ceremonial housing for an override console," Kaelen says. "The Cantors preferred beautiful furniture for ugly machinery."`,
          },
          sunKey: {
            text: `"The Sun Key was taken by the High Cantor to the stabilizer room during the first flare," Kaelen says. "He thought he could use it to lock the gravity. He was wrong. The gravity is the sun's embrace."`,
            reveals: {
              knowledge: ["keyLocation"],
            },
          },
          stabilizer: {
            text: `"The stabilizer controls our fall," Kaelen says. "If you reset it, you will not save the Archive forever. You may save it for long enough."`,
          },
          prophecy: {
            requiresKnowledge: "prophecyKnowledge",
            text: `"The prophecy said the light would take everything," Kaelen says, his amber eyes dimming. "It didn't say it would be so lonely at the end. Perhaps... perhaps the Archive shouldn't burn after all."`,
            reveals: {
              knowledge: ["kaelenWavering"],
            },
          },
          sunDoor: {
            text: `"The Sun Door is more than a gate," Kaelen says. "It is the boundary between the mortal word and the divine light. It will only open when the Sun Key is presented to the Great Lectern. Only then can the Ascension proceed."`,
          },
          sunVault: {
            text: `"The Sun Vault contains the deep memory vats," Kaelen says. "If the data altar comes online before the final flare, the Archive can transmit instead of burn silently."`,
          },
          altar: {
            text: `"The Data Altar is the transmitter control," Kaelen says. "It needs the Sun Key, and I suspect it needs a custodian willing to stop pretending this is a funeral."`,
          },
        },
      },
    },
  },
  items: {
    chronometer: {
      id: "chronometer",
      name: " Solaris chronometer",
      aliases: ["watch", "timer", "clock"],
      description: "A gold-plated watch that doesn't track seconds, but the approach of the 'Ascension'. It's ticking very fast now.",
    },
    sunKey: {
      id: "sunKey",
      name: "Sun Key",
      aliases: ["key", "seal", "gold key"],
      locationId: "stabilizer",
      description: "A heavy gold disk engraved with the Solaris Seal. It's warm and vibrates with a low-frequency data-hum.",
      reveals: {
        knowledge: ["sunKeyKnowledge"],
      },
    },
  },
  knowledge: {
    archiveStation: {
      id: "archiveStation",
      name: "Solaris Archive station",
      aliases: ["station", "archive", "solaris archive"],
      description: "The Solaris Archive is a failing station built to preserve a civilization's memory.",
    },
    prophecyKnowledge: {
      id: "prophecyKnowledge",
      name: "The Solaris Prophecy",
      aliases: ["prophecy", "ascension"],
      description: "The Solaris believed their sun would one day absorb them into its light.",
    },
    keyLocation: {
      id: "keyLocation",
      name: "Location of the Key",
      description: "Kaelen says the High Cantor took the Sun Key to the stabilizer room.",
      conversation: false,
    },
    sunKeyKnowledge: {
      id: "sunKeyKnowledge",
      name: "The Sun Key",
      description: "The Sun Key can override the gravity seals and trigger the data upload.",
    },
    kaelenWavering: {
      id: "kaelenWavering",
      name: "Kaelen's doubt",
      description: "Kaelen is beginning to doubt the beauty of the Ascension.",
    },
  },
  actions: [
    {
      item: "iron switch",
      with: "",
      locationId: "stabilizer",
      conditions: { flags: { gravityStable: false } },
      text: "You heave the iron switch down. It resists, then snaps into the 'Stable' position. The Archive groans, but the weightless drifting stops. You feel your boots hit the floor with a satisfying thud.",
      effects: {
        flags: {
          gravityStable: true,
        },
      },
      reveals: {
        story: [{ name: "Gravity Restored", description: "The gravity stabilizer was reset, stopping the station's erratic drift." }],
      },
    },
    {
      item: "sunKey",
      with: "drawer",
      locationId: "readingRoom",
      requiresInventory: "sunKey",
      conditions: { flags: { vaultOpen: false } },
      text: "You press the Sun Key into the lectern's slot. The sun-stone glows, and the drawer slides open, revealing a hidden master console. With a final mechanical sigh, the Sun Door to the north unlocks.",
      effects: {
        flags: {
          vaultOpen: true,
        },
      },
      reveals: {
        story: [{ name: "Sun Door Unlocked", description: "The Sun Key opened the secret console and the Sun Vault." }],
      },
    },
    {
      item: "chronometer",
      with: "drawer",
      locationId: "readingRoom",
      text: "You hold the chronometer up to the slot. The gears tick faster, as if in recognition, but the watch is far too small to trigger the heavy sun-stone lock. You need something larger, something shaped like the Solaris Seal itself.",
    },
    {
      item: "kaelen",
      with: "sunKey",
      locationId: "readingRoom",
      requiresInventory: "sunKey",
      conditions: { knowledge: ["kaelenWavering"], flags: { kaelenInVault: false } },
      text: `"You have the Key," Kaelen says, his silver hand trembling. "If we trigger the transmission now, the Solaris memories will reach the next system before the star dies. I will... I will help you." Kaelen walks toward the Sun Vault with a renewed, mechanical purpose.`,
      effects: {
        movePerson: { kaelen: "sunVault" },
        flags: { kaelenInVault: true },
      },
    },
    {
      item: "altar",
      with: "sunKey",
      locationId: "sunVault",
      requiresInventory: "sunKey",
      conditions: { flags: { kaelenInVault: true } },
      text: "You slot the Sun Key into the Data Altar. Kaelen places his silver hand over yours, and together you initiate the upload. Gold light floods the room, but this time it isn't the sun—it's the Solaris. Their memories stream into the void, a million lives saved from the fire.",
      effects: {
        flags: {
          uploadStarted: true,
        },
        win: {
          text: "Ending: The Solaris Saved. As the station begins its final descent into the supernova, you watch the gold data-beam shoot into the darkness of space. Kaelen stands beside you, his amber eyes bright. 'They are not lost,' he says. 'They are simply... somewhere else.'",
          story: {
            name: "The Great Transmission",
            description: "The Archive was uploaded, saving the Solaris memories before the supernova consumed the station.",
          },
        },
      },
    },
  ],
};
