export const rainglassHouse = {
  id: "rainglass-house",
  title: "The Rainglass House",
  intro:
    "The house at Veyr Lane has been empty for thirty years, but tonight every window is wet from the inside. Your [[black invitation]] names you executor, witness, and trespasser.",
  start: {
    locationId: "foyer",
    inventory: ["invitation"],
    knowledge: [],
    flags: {
      keyVisible: false,
        studyOpen: false,
        safeOpen: false,
        nurseryOpen: false,
        shardVisible: false,
        shardTaken: false,
        heartMended: false,
      },
  },
  status(state) {
    return [
      "Third night",
      "Indoor rain",
      state.ended ? "The debt is answered" : state.flags.nurseryOpen ? "The nursery is awake" : "The house is listening",
    ];
  },
  locations: {
    foyer: {
      id: "foyer",
      name: "Marble Foyer",
      aliases: ["foyer", "hall", "entry", "marble hall"],
      map: { x: 48, y: 72 },
      summary: "A black-and-white marble entry hall where rain falls upward from the floor.",
      description:
        "The [[Marble Foyer]] is long enough to make your footsteps arrive late. Black and white tiles cross the floor in a pattern that refuses to line up at the edges. Rain beads on the underside of the chandelier and rises, drop by drop, into the dark plaster ceiling. [[Ada Lorne]], the old housekeeper, waits beside the umbrella stand with a ring of keys she never offers you.",
      descriptionStates: [
        {
          conditions: {
            flags: {
              nurseryOpen: true,
            },
          },
          text:
            "The [[Marble Foyer]] has changed its breathing. Rain still rises from the floor, but now it travels in straighter lines, as if something above has begun to draw it home. [[Ada Lorne]] waits beside the umbrella stand, her ring of useless keys quiet in her hand.",
        },
      ],
      exits: {
        north: {
          to: "gallery",
          aliases: ["gallery", "portrait gallery"],
          preview:
            "North, a tall arch leads into a portrait gallery where the painted faces shine as though freshly varnished.",
        },
        west: {
          to: "conservatory",
          aliases: ["conservatory", "winter garden", "garden"],
          preview:
            "West, a glass corridor leads toward a conservatory silvered by condensation and moonlight.",
        },
      },
      nouns: {
        chandelier: {
          name: "chandelier",
          aliases: ["light", "ceiling"],
          locationId: "foyer",
          description:
            "The chandelier is unlit, yet every crystal is warm. The rising rain gathers inside the drops and makes them heavy with trapped reflections.",
        },
        umbrellaStand: {
          name: "umbrella stand",
          aliases: ["stand", "umbrellas"],
          locationId: "foyer",
          description:
            "The umbrella stand contains no umbrellas. Its brass lip is engraved with a sentence worn almost smooth: every shelter keeps a record of the storm.",
          reveals: {
            knowledge: ["houseRecordsStorms"],
          },
        },
      },
      atmosphere: [
        { everyTurns: 4, text: "A drop of rain climbs your sleeve, hesitates at the cuff, then vanishes into the fabric." },
        {
          everyTurns: 6,
          conditions: {
            flags: {
              nurseryOpen: false,
            },
          },
          text: "Somewhere above, a child laughs once behind a closed door. The sound is old and perfectly dry.",
        },
        {
          everyTurns: 6,
          conditions: {
            flags: {
              nurseryOpen: true,
            },
          },
          text: "Somewhere above, the nursery answers the rain with a small, sleeping creak.",
        },
      ],
    },
    conservatory: {
      id: "conservatory",
      name: "Winter Conservatory",
      aliases: ["conservatory", "winter garden", "garden"],
      map: { x: 20, y: 70 },
      summary: "A glass room of dead citrus trees, dry fountains, and moonlit condensation.",
      description:
        "The [[Winter Conservatory]] has kept the shape of a garden without keeping anything alive. Citrus trees stand in porcelain tubs, their leaves black and curled. A dry [[moon basin]] occupies the center of the room, and the glass walls are scribbled over by rain that never touches the floor.",
      exits: {
        east: {
          to: "foyer",
          aliases: ["foyer", "hall", "entry"],
          preview:
            "East, the glass corridor returns to the marble foyer; from there, the portrait gallery waits north.",
        },
      },
      nouns: {
        basin: {
          name: "moon basin",
          aliases: ["basin", "fountain", "dry fountain"],
          locationId: "conservatory",
          description:
            "The basin is dry except for a ring of white mineral dust. In the center, under a film of dead leaves, a [[silver key]] lies with its teeth pointed toward the gallery.",
          effects: {
            flags: {
              keyVisible: true,
            },
          },
        },
        trees: {
          name: "citrus trees",
          aliases: ["trees", "citrus", "leaves"],
          locationId: "conservatory",
          description:
            "The citrus trees have been dead for years, but their branches are tied with fresh black thread. Each knot holds a scrap of paper too waterlogged to read.",
        },
      },
      atmosphere: [
        { everyTurns: 3, text: "Condensation races up the glass in thin lines, spelling almost-words before the moon erases them." },
      ],
    },
    gallery: {
      id: "gallery",
      name: "Portrait Gallery",
      aliases: ["gallery", "portrait gallery", "portraits"],
      map: { x: 48, y: 42 },
      summary: "A long gallery of varnished ancestors and doors that answer to names.",
      description:
        "The [[Portrait Gallery]] runs along the house's spine. The portraits do not watch you; they watch the doors. At the east end waits the dark [[study door]], and at the west end a narrow [[nursery door]] has been painted the color of old milk.",
      descriptionStates: [
        {
          conditions: {
            flags: {
              nurseryOpen: true,
            },
          },
          text:
            "The [[Portrait Gallery]] feels shallower now, as if the painted ancestors have stepped back from the surface. The [[study door]] stands obediently open. The [[nursery door]] is also open, and cold blue light lies across the floorboards outside it.",
        },
        {
          conditions: {
            flags: {
              studyOpen: true,
            },
          },
          text:
            "The [[Portrait Gallery]] runs along the house's spine. The east [[study door]] stands open, but the west [[nursery door]] remains shut under its old milk-white paint.",
        },
      ],
      exits: {
        south: {
          to: "foyer",
          aliases: ["foyer", "hall", "entry"],
          preview:
            "South, the marble foyer glows with chandelier rain.",
        },
        east: {
          to: "study",
          aliases: ["study", "study door", "door"],
          conditions: {
            flags: {
              studyOpen: true,
            },
          },
          preview:
            "East, the opened study smells of paper, sealing wax, and old decisions.",
          lockedPreview:
            "East, the [[study door]] is locked. A silver escutcheon below the handle is scratched by years of failed keys.",
          lockedText: "The study door is locked. The silver escutcheon waits for the right key.",
        },
        west: {
          to: "nursery",
          aliases: ["nursery", "nursery door", "white door"],
          conditions: {
            flags: {
              nurseryOpen: true,
            },
          },
          preview:
            "West, the nursery door opens into a blue room where the wallpaper moves like water.",
          lockedPreview:
            "West, the [[nursery door]] is shut. Its painted surface is pierced by a needle-sized keyhole.",
          lockedText: "The nursery door is shut. Its keyhole is too narrow for any ordinary key.",
        },
      },
      nouns: {
        portrait: {
          name: "largest portrait",
          aliases: ["portrait", "largest portrait", "ancestor", "paintings", "portraits"],
          locationId: "gallery",
          description:
            "The largest portrait shows a woman in a storm-grey dress holding a child who has been painted out. A brass plaque names her [[Elian Voss]], though the eyes are Ada's eyes and the child's absence is the brightest thing in the frame.",
          descriptionStates: [
            {
              conditions: {
                flags: {
                  heartMended: true,
                },
              },
              text:
                "The largest portrait shows [[Elian Voss]] in a storm-grey dress with a child restored to her arms. The new paint is still wet, but the child's face has already begun to smile.",
            },
          ],
          reveals: {
            knowledge: ["elianVoss"],
            story: [{ name: "The missing child", description: "The largest portrait shows a child painted out of the family record." }],
          },
        },
        studyDoor: {
          name: "study door",
          aliases: ["door", "east door", "study"],
          locationId: "gallery",
          description:
            "The study door is black oak with a silver escutcheon. The scratches around the keyhole suggest many people tried the wrong keys before giving up.",
          descriptionStates: [
            {
              conditions: {
                flags: {
                  studyOpen: true,
                },
              },
              text:
                "The study door stands open. Beyond it, papers shift softly on a desk no wind can reach.",
            },
          ],
        },
        nurseryDoor: {
          name: "nursery door",
          aliases: ["white door", "west door", "nursery", "door", "keyhole", "lock"],
          locationId: "gallery",
          description:
            "The nursery door is painted a sour white. Its keyhole is so narrow it looks less like a lock than a wound.",
          descriptionStates: [
            {
              conditions: {
                flags: {
                  nurseryOpen: true,
                },
              },
              text:
                "The nursery door is open. The keyhole has sealed behind the rainglass needle, leaving a smooth white scar.",
            },
          ],
        },
      },
      atmosphere: [
        { everyTurns: 4, text: "The varnish on one portrait ripples, then tightens again over an expression you did not see in time." },
      ],
    },
    study: {
      id: "study",
      name: "Executor's Study",
      aliases: ["study", "executor's study", "office"],
      map: { x: 76, y: 42 },
      summary: "A paper-choked study where old contracts have continued to age without readers.",
      description:
        "The [[Executor's Study]] is smaller than it should be, compressed by shelves and sealed boxes. A green-shaded lamp burns over the [[family ledger]], though no oil feeds it. Against the far wall, a black iron [[rain safe]] waits below a portrait-shaped stain.",
      descriptionStates: [
        {
          conditions: {
            flags: {
              safeOpen: true,
            },
          },
          text:
            "The [[Executor's Study]] has relaxed by a fraction. The [[family ledger]] lies open under the green lamp, and the black iron [[rain safe]] gapes in the far wall with its little velvet drawer extended.",
        },
      ],
      exits: {
        west: {
          to: "gallery",
          aliases: ["gallery", "portraits", "out"],
          preview:
            "West, the portrait gallery holds its line of watchful doors.",
        },
      },
      nouns: {
        ledger: {
          name: "family ledger",
          aliases: ["ledger", "book", "records"],
          locationId: "study",
          description:
            "The ledger is written in three inks and one brown stain that might once have been blood. The final entry names a debt against the unborn child of [[Elian Voss]]: one lifetime of rain, to be held in trust by the house until returned.",
          reveals: {
            knowledge: ["childDebt"],
            story: [{ name: "The rain debt", description: "The house holds a debt against Elian Voss's missing child." }],
          },
        },
        safe: {
          name: "rain safe",
          aliases: ["safe", "black safe", "iron safe"],
          locationId: "study",
          description:
            "The rain safe has no dial. Its face is smooth except for a shallow groove shaped like a spoken sentence. Someone has polished the metal around it with nervous fingers.",
          descriptionStates: [
            {
              conditions: {
                flags: {
                  safeOpen: true,
                },
              },
              text:
                "The rain safe is open. Inside, a narrow velvet drawer holds the impression where the [[rainglass needle]] rested.",
            },
          ],
        },
      },
      atmosphere: [
        { everyTurns: 5, text: "A page turns somewhere in the shelves, although every book near you remains shut." },
      ],
    },
    nursery: {
      id: "nursery",
      name: "Blue Nursery",
      aliases: ["nursery", "blue nursery", "child's room"],
      map: { x: 20, y: 42 },
      summary: "A water-blue nursery where the wallpaper swims in slow circles.",
      description:
        "The [[Blue Nursery]] is painted in shades of rainwater. A small iron [[cradle]] stands in the center of the room, empty except for a folded blanket that rises and falls as if something beneath it is breathing. The walls are papered with boats, moons, and houses sinking into gentle blue.",
      descriptionStates: [
        {
          conditions: {
            flags: {
              shardVisible: true,
            },
          },
          text:
            "The [[Blue Nursery]] is painfully still. The small iron [[cradle]] stands uncovered now, and the folded blanket has collapsed around the glimmering place where the rainglass shard was hidden.",
        },
      ],
      exits: {
        east: {
          to: "gallery",
          aliases: ["gallery", "portraits", "out"],
          preview:
            "East, the portrait gallery waits in a long brown line.",
        },
        down: {
          to: "cistern",
          aliases: ["cistern", "stairs", "cellar", "below"],
          conditions: {
            flags: {
              shardTaken: true,
            },
          },
          preview:
            "Down, the nursery floorboards have opened around a stair that smells of rainwater and stone.",
          lockedPreview:
            "Down, the floorboards tremble around a seam you cannot open by force. Something in the cradle seems to be holding it shut.",
          lockedText: "The floorboards will not open while the cradle keeps its secret.",
        },
      },
      nouns: {
        cradle: {
          name: "cradle",
          aliases: ["iron cradle", "blanket"],
          locationId: "nursery",
          description:
            "The cradle is cold enough to mist your breath. When you lift the folded blanket, a triangular [[rainglass shard]] gleams in the hollow beneath it, bright as a piece of captured weather.",
          effects: {
            flags: {
              shardVisible: true,
            },
          },
        },
        wallpaper: {
          name: "wallpaper",
          aliases: ["walls", "paper", "boats", "moons"],
          locationId: "nursery",
          description:
            "The wallpaper boats sail in slow circles when you look away. Each tiny house in the pattern has one lit window and one room drowned in blue.",
        },
      },
      atmosphere: [
        { everyTurns: 3, text: "The cradle rocks once without sound, then settles exactly where it began." },
      ],
    },
    cistern: {
      id: "cistern",
      name: "Rain Cistern",
      aliases: ["cistern", "cellar", "rain cistern", "below"],
      map: { x: 20, y: 18 },
      summary: "A stone chamber beneath the nursery where the house stores its impossible rain.",
      description:
        "The [[Rain Cistern]] is a round stone chamber beneath the nursery. Black water fills the central well without reflecting the ceiling. Over it hangs the [[rainglass heart]], a many-faceted mechanism with one triangular socket empty and waiting.",
      descriptionStates: [
        {
          conditions: {
            flags: {
              heartMended: true,
            },
          },
          text:
            "The [[Rain Cistern]] is draining upward into silence. The [[rainglass heart]] turns above the well with its shard restored, each facet giving back a different version of the room.",
        },
      ],
      exits: {
        up: {
          to: "nursery",
          aliases: ["nursery", "stairs", "above"],
          preview:
            "Up, the nursery glows faintly blue at the top of the stair.",
        },
      },
      nouns: {
        heart: {
          name: "rainglass heart",
          aliases: ["heart", "mechanism", "rainglass", "engine"],
          locationId: "cistern",
          description:
            "The rainglass heart is built from beveled panes, silver pins, and tiny channels of water that flow in impossible directions. One triangular socket is empty. The surrounding glass has cracked from the strain of holding a debt too long.",
          reveals: {
            knowledge: ["heartShard"],
          },
          descriptionStates: [
            {
              conditions: {
                flags: {
                  heartMended: true,
                },
              },
              text:
                "The rainglass heart turns without grinding now. Water climbs through its channels and leaves each pane clear behind it.",
            },
          ],
        },
        well: {
          name: "central well",
          aliases: ["well", "black water", "water"],
          locationId: "cistern",
          description:
            "The well is perfectly black. It gives back no reflection, but when you lean close, you hear the foyer chandelier raining upward inside it.",
        },
      },
      atmosphere: [
        { everyTurns: 4, text: "The well exhales, and every drop of water in the room leans toward it." },
      ],
    },
  },
  people: {
    ada: {
      id: "ada",
      name: "Ada Lorne",
      aliases: ["ada", "lorne", "housekeeper", "woman"],
      locationId: "foyer",
      description:
        "Ada Lorne is small, elderly, and exact as a folded letter. Her black dress is dry despite the rising rain. The keys at her belt are numerous, but each one has had its teeth filed smooth.",
      reveals: {
        knowledge: ["adaKnowsHouse"],
      },
      dialogue: {
        default:
          '"The house has admitted you," Ada says. "That is not the same as welcoming you. Start with what it hides in plain sight."',
        noInterest: '"That is not where the debt is kept," Ada says.',
        topics: {
          invitation: {
            text:
              '"The invitation is a legal instrument," Ada says. "It names you because the house cannot mend itself, and because blood alone has proved unreliable."',
            reveals: {
              knowledge: ["executorNamed"],
            },
          },
          elianVoss: {
            requiresKnowledge: "elianVoss",
            text:
              '"Elian signed the first rain contract," Ada says. "She thought she was buying ten dry summers. She did not read what the house would collect after."',
            reveals: {
              knowledge: ["rainContract"],
            },
          },
          childDebt: {
            requiresKnowledge: "childDebt",
            lockedText: '"Do not ask me to name a debt you have not seen," Ada says.',
            text:
              'Ada closes her hand around the useless keys. "Say this where iron listens: return the rain you borrowed. The safe was made for that sentence."',
            reveals: {
              knowledge: ["rainVow"],
            },
          },
          rainVow: {
            requiresKnowledge: "rainVow",
            text:
              '"Not a password," Ada says. "A correction. The house has mistaken custody for ownership for thirty years."',
          },
          conservatory: {
            text:
              '"The conservatory remembers the moon better than the sun," Ada says. "If the house left you a key, it would leave it somewhere dry."',
            reveals: {
              knowledge: ["keyInBasin"],
            },
          },
          rainglass: {
            text:
              '"Rainglass does not break cleanly," Ada says. "Every shard continues the argument of the whole."',
          },
          heartShard: {
            requiresKnowledge: "heartShard",
            text:
              'Ada looks at the shard without touching it. "That is not a keepsake. It is a missing piece of an engine. The house will not release what it has taken until the heart is whole."',
          },
        },
      },
    },
  },
  items: {
    invitation: {
      id: "invitation",
      name: "black invitation",
      aliases: ["invitation", "letter", "black letter", "paper"],
      description:
        "The black invitation is dry, thick, and faintly warm. Beneath your name, a smaller line reads: Executor may enter, witness may speak, trespasser may pay.",
      reveals: {
        knowledge: ["executorNamed"],
      },
    },
    silverKey: {
      id: "silverKey",
      name: "silver key",
      aliases: ["key", "small key"],
      locationId: "conservatory",
      conditions: {
        flags: {
          keyVisible: true,
        },
      },
      description:
        "The silver key is light and almost flat. Its bow is shaped like a crescent moon, and its teeth are still sharp.",
      reveals: {
        knowledge: ["studyKey"],
      },
    },
    needle: {
      id: "needle",
      name: "rainglass needle",
      aliases: ["needle", "glass needle"],
      locationId: "study",
      conditions: {
        flags: {
          safeOpen: true,
        },
      },
      description:
        "The rainglass needle is thinner than a match and clear except for a dark thread of water trapped inside it. It looks made for a lock too small to forgive ordinary keys.",
      reveals: {
        knowledge: ["needleKey"],
      },
    },
    shard: {
      id: "shard",
      name: "rainglass shard",
      aliases: ["shard", "glass shard", "triangular shard"],
      locationId: "nursery",
      conditions: {
        flags: {
          shardVisible: true,
        },
      },
      description:
        "The shard is triangular, warm on one edge and cold on the other two. When you hold it up, the room seen through it has not happened yet.",
      takeText:
        "You take the [[rainglass shard]]. The nursery floorboards flex under your feet, and a seam opens beside the cradle, revealing a narrow stair descending into rain-smelling dark.",
      reveals: {
        knowledge: ["heartShard"],
      },
      effects: {
        flags: {
          shardTaken: true,
        },
      },
    },
  },
  knowledge: {
    adaKnowsHouse: {
      id: "adaKnowsHouse",
      name: "Ada knows the house",
      description: "Ada understands the house's rituals but will not volunteer every answer at once.",
      conversation: false,
    },
    executorNamed: {
      id: "executorNamed",
      name: "Executor named",
      aliases: ["invitation", "executor"],
      description: "The invitation gives you legal and ritual authority to act inside the house.",
    },
    houseRecordsStorms: {
      id: "houseRecordsStorms",
      name: "House records storms",
      description: "The house treats shelter and weather as debts to be recorded.",
      conversation: false,
    },
    keyInBasin: {
      id: "keyInBasin",
      name: "Key in a dry place",
      description: "Ada hints that a useful key would be hidden somewhere dry.",
      conversation: false,
    },
    studyKey: {
      id: "studyKey",
      name: "Silver study key",
      aliases: ["key", "study key"],
      description: "The silver key seems suited to the study door's escutcheon.",
    },
    elianVoss: {
      id: "elianVoss",
      name: "Elian Voss",
      aliases: ["elian", "voss", "portrait"],
      description: "The largest portrait names Elian Voss and shows a child painted out of the family record.",
    },
    rainContract: {
      id: "rainContract",
      name: "Rain contract",
      description: "Elian Voss bought dry summers with a contract that later claimed a child.",
    },
    childDebt: {
      id: "childDebt",
      name: "Child debt",
      aliases: ["debt", "ledger"],
      description: "The family ledger records a debt against Elian Voss's unborn child.",
    },
    rainVow: {
      id: "rainVow",
      name: "Rain vow",
      aliases: ["vow", "sentence", "return the rain"],
      description: "Ada says the correcting phrase is: return the rain you borrowed.",
    },
    needleKey: {
      id: "needleKey",
      name: "Needle key",
      aliases: ["needle", "rainglass needle"],
      description: "The rainglass needle fits a lock too narrow for an ordinary key.",
    },
    heartShard: {
      id: "heartShard",
      name: "Rainglass shard",
      aliases: ["shard", "heart shard"],
      description: "The triangular shard belongs in the rainglass heart below the nursery.",
    },
  },
  actions: [
    {
      item: "silver key",
      with: "study door",
      locationId: "gallery",
      requiresInventory: "silverKey",
      conditions: {
        flags: {
          studyOpen: false,
        },
      },
      text:
        "The silver key turns once in the study door. The lock answers with a relieved click, and the east door swings inward on silent hinges. When you let go, the key stays in the escutcheon as if the door has swallowed its last excuse.",
      effects: {
        flags: {
          studyOpen: true,
        },
        removeInventory: ["silverKey"],
      },
      reveals: {
        story: [{ name: "The study opened", description: "The silver key unlocked the executor's study." }],
      },
    },
    {
      item: "study door",
      with: "",
      locationId: "gallery",
      requiresInventory: "silverKey",
      conditions: {
        flags: {
          studyOpen: false,
        },
      },
      text:
        "You try the silver key in the study door. It turns once, and the door opens with a sigh of paper and old wax. The key remains in the escutcheon, fixed there by the opened lock.",
      effects: {
        flags: {
          studyOpen: true,
        },
        removeInventory: ["silverKey"],
      },
    },
    {
      item: "safe",
      aliases: ["vow", "rain vow", "sentence", "return the rain", "return the rain you borrowed"],
      with: "",
      locationId: "study",
      conditions: {
        knowledge: ["rainVow"],
        flags: {
          safeOpen: false,
        },
      },
      text:
        "You speak Ada's correction into the groove: return the rain you borrowed. The safe drinks the words through its iron face. A velvet drawer slides open, offering a [[rainglass needle]].",
      effects: {
        flags: {
          safeOpen: true,
        },
      },
      reveals: {
        story: [{ name: "The rain safe opened", description: "Ada's rain vow opened the iron safe in the study." }],
      },
    },
    {
      item: "rain vow",
      aliases: ["vow", "sentence", "return the rain", "return the rain you borrowed"],
      with: "safe",
      locationId: "study",
      conditions: {
        knowledge: ["rainVow"],
        flags: {
          safeOpen: false,
        },
      },
      text:
        "You speak Ada's correction into the groove: return the rain you borrowed. The safe drinks the words through its iron face. A velvet drawer slides open, offering a [[rainglass needle]].",
      effects: {
        flags: {
          safeOpen: true,
        },
      },
      reveals: {
        story: [{ name: "The rain safe opened", description: "Ada's rain vow opened the iron safe in the study." }],
      },
    },
    {
      item: "shard",
      aliases: ["rainglass shard", "glass shard", "triangular shard"],
      with: "",
      locationId: "nursery",
      requiresInventory: "shard",
      conditions: {
        flags: {
          shardTaken: false,
        },
      },
      text:
        "As you take the shard, the nursery floorboards flex under your feet. A seam opens beside the cradle, revealing a narrow stair descending into rain-smelling dark.",
      effects: {
        flags: {
          shardTaken: true,
        },
      },
    },
    {
      item: "needle",
      with: "nursery door",
      locationId: "gallery",
      requiresInventory: "needle",
      conditions: {
        flags: {
          nurseryOpen: false,
        },
      },
      text:
        "The rainglass needle slides into the nursery door's narrow wound. For a moment the whole gallery smells of lightning. Then the white door opens, and the needle dissolves into a clear scar in the paint.",
      effects: {
        flags: {
          nurseryOpen: true,
        },
        removeInventory: ["needle"],
      },
    },
    {
      item: "nursery door",
      with: "",
      locationId: "gallery",
      requiresInventory: "needle",
      conditions: {
        flags: {
          nurseryOpen: false,
        },
      },
      text:
        "You touch the rainglass needle to the nursery door. The lock accepts it like a remembered name, and the white door opens. The needle thins into the paint until only a clear scar remains.",
      effects: {
        flags: {
          nurseryOpen: true,
        },
        removeInventory: ["needle"],
      },
    },
    {
      item: "shard",
      with: "heart",
      locationId: "cistern",
      requiresInventory: "shard",
      conditions: {
        knowledge: ["heartShard"],
      },
      text:
        "You set the rainglass shard into the heart's empty socket. The mechanism closes around it with a sound like breath returning. Above you, every drop of stolen rain begins to fall in the right direction.",
      effects: {
        flags: {
          heartMended: true,
        },
        removeInventory: ["shard"],
        win: {
          text:
            "Ending: The Rainglass House releases its debt. By dawn the windows are dry, Ada's keys have teeth again, and the painted child in the gallery has returned to Elian Voss's arms.",
          story: {
            name: "The debt released",
            description: "The rainglass heart was repaired with the nursery shard, ending the house's claim.",
          },
        },
      },
    },
  ],
};
