export const gildedAnchor = {
  id: "gilded-anchor",
  title: "The Gilded Anchor",
  intro:
    "The Gilded Anchor was the jewel of the Vesper Line, a luxury star-yacht carrying the last heirs of the Inner Colonies toward the New Eden. Twenty years ago, the Ophiuchus Flare turned the dream into a tomb. You step onto the airlock, your boots crunching on crystalline frost, knowing that the reactor's heartbeat is the only thing keeping this ghost of the Old World from drifting into the sun.",
  start: {
    locationId: "airlock",
    inventory: ["scanner"],
    knowledge: [],
    flags: {
      reactorStable: false,
      pianoRepaired: false,
      silasTrust: 0,
      locketOpened: false,
      truthRevealed: false,
    },
  },
  status(state) {
    return [
      "Ophiuchus Nebula",
      "Reactor Decay: Critical",
      state.flags.truthRevealed ? "The passenger is gone" : "Waiting for the song",
    ];
  },
  locations: {
    airlock: {
      id: "airlock",
      name: "Starboard Airlock",
      aliases: ["airlock", "entrance", "starboard"],
      map: { x: 50, y: 90 },
      summary: "A frozen entry point where the heat of your suit is the only thing keeping the air alive.",
      description:
        "The [[Starboard Airlock]] smells of dry lavender and old, recycled air. Crystalline frost covers the walls, turning the luxury padding into something sharp and brittle. A brass [[commemorative plaque]] is bolted to the wall, and a heavy [[hatch]] leads forward into the main lounge. Beside the controls, a discarded [[silver locket]] is frozen to the deck plates.",
      exits: {
        north: {
          to: "lounge",
          aliases: ["lounge", "main room", "forward"],
          preview:
            "North, the main lounge opens up, its tall windows framing the purple and gold swirls of the Ophiuchus Nebula.",
        },
      },
      nouns: {
        plaque: {
          name: "commemorative plaque",
          aliases: ["plaque", "brass", "sign"],
          locationId: "airlock",
          description:
            "The plaque reads: 'The Gilded Anchor. Commissioned 2298 for the Vesper Line. Serving the Inner Colonies' quest for the New Eden. Safety, Luxury, Legacy.' The word 'Legacy' has been scratched out by a fingernail.",
          reveals: {
            knowledge: ["vesperLine"],
          },
        },
        hatch: {
          name: "lounge hatch",
          aliases: ["hatch", "door"],
          locationId: "airlock",
          description: "A thick, reinforced hatch that leads to the interior of the yacht. It's been left partially open, as if someone was waiting for a guest.",
        }
      },
      atmosphere: [
        { everyTurns: 4, text: "The hull groans as a piece of nebula debris scrapes along the outer plating, a sound like a long, metallic sigh." },
        { everyTurns: 6, text: "The smell of lavender strengthens for a moment, then vanishes back into the scent of cold metal." },
      ],
    },
    lounge: {
      id: "lounge",
      name: "Grand Observation Lounge",
      aliases: ["lounge", "observation lounge", "main room"],
      map: { x: 50, y: 50 },
      summary: "A vast room of velvet and glass, dominated by the swirling colors of the nebula outside.",
      description:
        "The [[Observation Lounge]] was designed for people who owned the stars. Half-empty bottles of synth-wine stand on low tables, their contents long ago turned to syrup. At the center of the room sits a grand [[ivory piano]], and beside it, [[Captain Silas Vane]] sits in a high-backed chair, staring into the [[purple nebula]] outside.",
      descriptionStates: [
        {
          conditions: { flags: { truthRevealed: true } },
          text:
            "The [[Observation Lounge]] feels emptier now, though Silas is still there. The purple light of the nebula seems less like a ghost and more like simple gas. The [[ivory piano]] stands ready, its silence no longer a weight.",
        },
      ],
      exits: {
        south: {
          to: "airlock",
          aliases: ["airlock", "back", "south"],
          preview: "South, the airlock waits, its frost shimmering in the light of your suit's lamps.",
        },
        west: {
          to: "quarters",
          aliases: ["quarters", "bedroom", "west"],
          preview: "West, a short corridor leads toward the Captain's personal quarters.",
        },
      },
      nouns: {
        nebula: {
          name: "purple nebula",
          aliases: ["nebula", "window", "clouds", "gas", "purple gas"],
          locationId: "lounge",
          description:
            "The Ophiuchus Nebula is a graveyard of charged ions and ancient stardust. Before the Great Collapse, it was a shortcut for the Vesper liners. Now, it's a dead zone where signals go to die and ships are slowly stripped of their color by the static.",
          reveals: {
            knowledge: ["nebulaHistory"],
          },
        },
        piano: {
          name: "ivory piano",
          aliases: ["piano", "instrument", "keyboard"],
          locationId: "lounge",
          description:
            "The piano is a masterpiece of Pre-Collapse craftsmanship. Most of the keys are perfectly tuned, but Middle C is missing entirely, leaving a jagged gap in the ivory. A small [[scrap of sheet music]] is tucked under the lid.",
          reveals: {
            knowledge: ["missingNote"],
          },
          descriptionStates: [
            {
              conditions: { flags: { pianoRepaired: true } },
              text: "The ivory piano is complete again. The silver key you found fits perfectly into the gap, shimmering under the lounge lights.",
            }
          ]
        },
        wine: {
          name: "synth-wine",
          aliases: ["wine", "bottles", "syrup"],
          locationId: "lounge",
          description: "Expensive vintages from the inner colonies. One bottle has a handwritten label: 'To our last night in the sun. - Elena.'",
          reveals: {
            knowledge: ["elenaName"],
          }
        }
      },
      atmosphere: [
        { everyTurns: 3, text: "Silas hums a melody that sounds familiar, then stops abruptly, his breath hitching." },
        { everyTurns: 5, text: "A flash of gold light from the nebula illuminates the lounge, casting long, dramatic shadows across the dusty floor." },
      ],
    },
    quarters: {
      id: "quarters",
      name: "Captain's Quarters",
      aliases: ["quarters", "bedroom", "cabin"],
      map: { x: 20, y: 50 },
      summary: "A private cabin filled with the clutter of a twenty-year vigil.",
      description:
        "The [[Captain's Quarters]] are cramped and smell of old paper. A narrow bunk is neatly made, but the floor is covered in hundreds of [[scrawled charts]] that track the movement of the nebula. On a small desk sits a [[silver key]] and a photograph of a woman with Silas's eyes.",
      exits: {
        east: {
          to: "lounge",
          aliases: ["lounge", "back", "east"],
          preview: "East, the grand lounge and the captain's silhouette are visible through the door.",
        },
      },
      nouns: {
        charts: {
          name: "scrawled charts",
          aliases: ["charts", "papers", "maps", "drawings"],
          locationId: "quarters",
          description:
            "The charts don't track stars or planets. They track the 'Passenger'—a specific eddy of gas in the nebula that Silas believes is the ghost of his daughter, Elena. One chart is marked with a date: The Night of the Flare, 2312. It was the day the Vesper Line died.",
          reveals: {
            knowledge: ["theFlare"],
            story: [{ name: "The Passenger", description: "Silas believes his daughter's consciousness is trapped in the nebula's gas." }],
          },
        },
        photo: {
          name: "photograph",
          aliases: ["photo", "picture"],
          locationId: "quarters",
          description: "A woman in a pilot's uniform laughs at the camera. The caption reads: 'Elena Vane, First Solo Flight, 2304.'",
          reveals: {
            knowledge: ["elenaVane"],
          }
        }
      },
      atmosphere: [
        { everyTurns: 4, text: "The air filtration system rattles, sounding like a dry cough." },
      ],
    },
  },
  people: {
    silas: {
      id: "silas",
      name: "Captain Silas Vane",
      aliases: ["silas", "vane", "captain", "man"],
      locationId: "lounge",
      description:
        "Silas Vane is a man made of sharp angles and deep shadows. His uniform is immaculate, though twenty years out of style. His eyes are clear and terrifyingly focused on the purple clouds outside. He moves with a slow, deliberate grace, as if afraid of disturbing the dust.",
      reveals: {
        knowledge: ["silasGuilt"],
      },
      dialogue: {
        default:
          `"The nebula is singing tonight," Silas says without looking at you. "Can you hear it? It's a bit flat. It needs the piano."`,
        noInterest: `"That is a distraction," Silas says quietly. "The music is the only thing that matters now."`,
        topics: {
          elenaVane: {
            requiresKnowledge: "elenaVane",
            text:
              `"Elena was the finest pilot on the Anchor," Silas says, his voice softening. "She stayed behind to manual-lock the reactor during the Flare. She said she'd be right back. She's still out there, you know. Just... dispersed."`,
            reveals: {
              knowledge: ["elenaLost"],
            },
          },
          theFlare: {
            requiresKnowledge: "theFlare",
            text:
              `"The Ophiuchus Flare was a beautiful death," Silas says. "It turned the hull to glass and the crew to light. I was in the shielded bay. I watched her go. I've been trying to call her back ever into the piano ever since."`,
          },
          missingNote: {
            requiresKnowledge: "missingNote",
            text:
              `"The Middle C," Silas says, his fingers twitching. "The heart of the song. I lost it when the locket broke during the evacuation. Without it, the song is a lie."`,
          },
          evInitials: {
            requiresKnowledge: "evInitials",
            text:
              `Silas turns to look at you for the first time. "You found it? Elena wore that every day. It was a gift from her mother. If the ice has taken it, then the ice has taken her heart too."`,
            reveals: {
              knowledge: ["locketImportance"],
            },
          },
          locket: {
            requiresKnowledge: "evInitials",
            text:
              `Silas turns to look at you for the first time. "You found it? Elena wore that every day. It was a gift from her mother. If the ice has taken it, then the ice has taken her heart too."`,
            reveals: {
              knowledge: ["locketImportance"],
            },
          },
          reactor: {
            text: `"The reactor is failing, isn't it?" Silas asks, though he doesn't seem concerned. "It's been screaming for years. Elena locked it down, you know. She saved me. Now the ship is just... returning the favor by holding onto her."`,
          },
          past: {
            text: `"I was a Captain once," Silas says, a ghost of a smile appearing. "I commanded fleets. Now I command a graveyard. It's much quieter. The dead don't argue about fuel consumption."`,
          },
          vesperLine: {
            requiresKnowledge: "vesperLine",
            text: `"The Vesper Line was a lie," Silas says. "They promised a New Eden, but they only built ships for the rich to die in. They didn't tell the passengers that the nebula was growing. They just wanted the tickets paid."`,
          },
          nebulaHistory: {
            requiresKnowledge: "nebulaHistory",
            text: `"The nebula doesn't just block signals," Silas whispers. "It absorbs memories. If you stay here long enough, you start to hear the thoughts of everyone who ever drowned in it. That's why I need the piano. To make the thoughts... harmonious."`,
          }
        },
      },
    },
  },
  items: {
    scanner: {
      id: "scanner",
      name: "handheld scanner",
      aliases: ["scanner", "tool", "device"],
      description: "A standard-issue salvage scanner. It's currently detecting a massive energy buildup in the nebula—and a failing reactor core below decks.",
    },
    silverKey: {
      id: "silverKey",
      name: "silver key",
      aliases: ["key", "piano key", "silver", "middle C"],
      locationId: "quarters",
      description: "It's not a door key. It's an ivory-plated silver piano key, specifically shaped for Middle C. It feels warm in your hand, as if it's been held recently.",
    },
    locket: {
      id: "locket",
      name: "silver locket",
      aliases: ["locket", "jewelry", "initials", "E.V."],
      locationId: "airlock",
      description: "The locket is silver and engraved with 'E.V.'. After being warmed by your suit's heat, the frost has melted, but the latch is still stuck.",
    },
    sheetMusic: {
      id: "sheetMusic",
      name: "scrap of sheet music",
      aliases: ["scrap", "music", "sheet music", "paper"],
      locationId: "lounge",
      description: "A water-stained piece of paper. The melody is titled 'Lullaby for the Nebula'. It's written in a delicate, hurried hand.",
    }
  },
  knowledge: {
    evInitials: {
      id: "evInitials",
      name: "The initials E.V.",
      aliases: ["E.V.", "initials", "E V"],
      description: "The locket is engraved with the initials E.V.",
    },
    elenaName: {
      id: "elenaName",
      name: "The name Elena",
      aliases: ["Elena"],
      description: "A wine bottle mentions someone named Elena.",
    },
    missingNote: {
      id: "missingNote",
      name: "The missing Middle C",
      aliases: ["middle C", "piano key", "note"],
      description: "The piano is missing its Middle C key, which Silas needs for his song.",
    },
    theFlare: {
      id: "theFlare",
      name: "The Ophiuchus Flare",
      aliases: ["flare", "accident"],
      description: "A solar event twenty years ago that destroyed the ship's crew.",
    },
    elenaVane: {
      id: "elenaVane",
      name: "Elena Vane",
      aliases: ["Elena", "daughter"],
      description: "Silas's daughter, who was a pilot on the Gilded Anchor.",
    },
    silasGuilt: {
      id: "silasGuilt",
      name: "Silas's Guilt",
      description: "Silas feels responsible for Elena's death during the Flare.",
      conversation: false,
    },
    locketImportance: {
      id: "locketImportance",
      name: "The locket's meaning",
      description: "The locket was Elena's, and Silas views it as a symbol of her heart.",
    },
    vesperLine: {
      id: "vesperLine",
      name: "The Vesper Line",
      description: "The luxury company that built the ship and promised a 'New Eden'.",
    },
    nebulaHistory: {
      id: "nebulaHistory",
      name: "Nebula History",
      description: "The Ophiuchus Nebula was a shortcut that turned into a dead zone after the Great Collapse.",
    }
  },
  actions: [
    {
      item: "scanner",
      with: "locket",
      locationId: "airlock",
      requiresInventory: "scanner",
      text: "You run the scanner's thermal beam over the locket. The ice hisses and turns to steam, and with a soft click, the locket pops open. Inside is a small, curled lock of dark hair and a micro-engraving: 'To Dad, so you can always find your way home.'",
      effects: {
        flags: {
          locketOpened: true,
        },
      },
      reveals: {
        story: [{ name: "The locket opened", description: "The locket contains a message from Elena to Silas." }],
        knowledge: ["elenaLost"],
      },
    },
    {
      item: "silver key",
      with: "piano",
      locationId: "lounge",
      requiresInventory: "silverKey",
      conditions: {
        flags: {
          pianoRepaired: false,
        },
      },
      text: "You slide the silver key into the gap at Middle C. It clicks into place, perfectly aligned. Silas gasps, his hands hovering over the keys.",
      effects: {
        flags: {
          pianoRepaired: true,
        },
      },
      reveals: {
        story: [{ name: "The piano repaired", description: "The missing Middle C has been restored to the ivory piano." }],
      },
    },
    {
      item: "piano",
      with: "",
      locationId: "lounge",
      conditions: {
        flags: {
          pianoRepaired: true,
          truthRevealed: false,
        },
      },
      text: "You press Middle C. The note rings out, pure and clear, cutting through the silence of the lounge. Silas begins to play, a haunting, looping melody that seems to pulse in time with the nebula outside. For a moment, the purple gas seems to press against the glass, responding to the sound.",
      effects: {
        flags: {
          truthRevealed: true,
        },
        win: {
          text: "Ending: The Song for Elena. As the final note fades, the nebula light recedes. Silas stands up, his eyes finally looking at you, not the window. 'She heard it,' he whispers. 'She told me it's okay to go home now.' You lead the Captain to the airlock as the reactor begins its final hum, leaving the ghost ship to the purple stars.",
          story: {
            name: "The Final Song",
            description: "The piano was repaired and the song played, allowing Silas to finally find peace and leave the ship.",
          },
        },
      },
    },
  ],
};
