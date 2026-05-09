export const keplerStation = {
  id: "kepler-station",
  title: "Kepler Station Leak",
  intro:
    "Kepler Station is two hundred meters under the North Atlantic, and Compartment C is taking on water. You have a wet work jacket, a bruised shoulder, and eight minutes before the lower lab loses power.",
  start: {
    locationId: "control",
    inventory: [],
    knowledge: [],
    flags: {
      lockerOpen: false,
      badgeVisible: false,
      pumpReset: false,
      patchApplied: false,
      intakeClosed: false,
      labOpen: false,
      specimenSecured: false,
    },
  },
  status(state) {
    return [
      "Emergency shift",
      "Hull leak",
      state.ended ? "Lab stabilized" : state.flags.patchApplied ? "Patch holding" : "Water rising",
    ];
  },
  locations: {
    control: {
      id: "control",
      name: "Control Room",
      aliases: ["control", "control room", "bridge"],
      map: { x: 48, y: 72 },
      summary: "The station's cramped control room, lit by red emergency panels.",
      description:
        "The [[Control Room]] is cramped, loud, and too bright with red alarms. A wall display shows Compartment C flooding at ankle depth. [[Mara Okafor]], the station technician, is clipped into the comms chair with a bandaged hand. A dented [[equipment locker]] is bolted beside the hatch.",
      descriptionStates: [
        {
          conditions: { flags: { specimenSecured: true } },
          text:
            "The [[Control Room]] is still loud, but the alarm tone has dropped from panic to warning. The wall display shows Compartment C sealed and the lower lab drawing stable power. [[Mara Okafor]] has stopped gripping the comms chair quite so hard.",
        },
        {
          conditions: { flags: { patchApplied: true } },
          text:
            "The [[Control Room]] is still lit red, but the flooding graph has flattened. Compartment C is wet, damaged, and no longer actively filling. [[Mara Okafor]] watches the pump readout like she can hold it steady by staring.",
        },
      ],
      exits: {
        east: {
          to: "junction",
          aliases: ["junction", "corridor", "east hatch"],
          preview:
            "East, the main hatch opens into the service junction. Water slaps somewhere beyond it.",
        },
      },
      nouns: {
        display: {
          name: "wall display",
          aliases: ["display", "screen", "alarm", "readout"],
          locationId: "control",
          description:
            "The display marks three problems in order: intake valve open, pump breaker tripped, lower lab door locked. Mara has circled the pump breaker with a grease pencil.",
          reveals: {
            knowledge: ["repairOrder"],
          },
        },
        locker: {
          name: "equipment locker",
          aliases: ["locker", "cabinet"],
          locationId: "control",
          description:
            "The locker door is bent but not locked. Through the gap you can see a red tube of [[marine sealant]] and a spare [[lab badge]] on a lanyard.",
          effects: {
            flags: {
              badgeVisible: true,
            },
          },
          descriptionStates: [
            {
              conditions: { flags: { lockerOpen: true } },
              text:
                "The locker hangs open. Empty clips mark where the [[marine sealant]] and spare [[lab badge]] were stored.",
            },
          ],
        },
      },
      atmosphere: [
        { everyTurns: 4, text: "The hull gives a low metallic pop, and every conversation in the room stops for half a second." },
      ],
    },
    junction: {
      id: "junction",
      name: "Service Junction",
      aliases: ["junction", "service junction", "corridor"],
      map: { x: 48, y: 46 },
      summary: "A cross-corridor with exposed cable trays and water moving along the deck.",
      description:
        "The [[Service Junction]] smells of hot plastic and seawater. Water runs east to west across the deck grating. A yellow hatch leads north to the pump room, a low hatch leads west toward Compartment C, and a sealed door leads east to the lower lab.",
      descriptionStates: [
        {
          conditions: { flags: { labOpen: true } },
          text:
            "The [[Service Junction]] is soaked but navigable. The pump room hatch stands north, Compartment C lies west, and the lower lab door to the east is unlocked with its status light back to green.",
        },
      ],
      exits: {
        south: {
          to: "control",
          aliases: ["control", "control room"],
          preview:
            "South, the control room flashes red through the open hatch.",
        },
        north: {
          to: "pump",
          aliases: ["pump", "pump room", "breaker"],
          preview:
            "North, the pump room hatch is open. The breaker panel inside is throwing blue sparks into a drip tray.",
        },
        west: {
          to: "compartment",
          aliases: ["compartment", "compartment c", "leak"],
          preview:
            "West, Compartment C is knee-deep in water. The leak sounds like someone tearing canvas.",
        },
        east: {
          to: "lab",
          aliases: ["lab", "lower lab", "laboratory"],
          conditions: { flags: { labOpen: true } },
          preview:
            "East, the lower lab is lit by white battery strips and the blue glow of sample freezers.",
          lockedPreview:
            "East, the lower lab door is locked. Its reader is alive but flashing ACCESS REQUIRED.",
          lockedText: "The lower lab door will not open without a valid badge.",
        },
      },
      nouns: {
        labDoor: {
          name: "lower lab door",
          aliases: ["lab door", "door", "reader", "badge reader"],
          locationId: "junction",
          description:
            "The lower lab door is watertight and heavy. Its badge reader is still powered, which means the lock can be opened if you have a valid badge.",
          descriptionStates: [
            {
              conditions: { flags: { labOpen: true } },
              text:
                "The lower lab door is unlocked. A strip of green light runs around the frame.",
            },
          ],
        },
      },
      atmosphere: [
        { everyTurns: 3, text: "Water taps through the grating below your boots, carrying flecks of insulation foam." },
      ],
    },
    pump: {
      id: "pump",
      name: "Pump Room",
      aliases: ["pump", "pump room", "breaker"],
      map: { x: 48, y: 20 },
      summary: "A narrow machinery space with the emergency pump breaker tripped.",
      description:
        "The [[Pump Room]] is barely wider than your shoulders. The emergency pump is intact, but the [[breaker panel]] is open and the main switch has tripped halfway down. Water drips from a cable tray into a plastic bucket.",
      descriptionStates: [
        {
          conditions: { flags: { pumpReset: true } },
          text:
            "The [[Pump Room]] vibrates with the emergency pump running. The [[breaker panel]] is closed now, and the bucket under the cable tray is filling slowly instead of fast.",
        },
      ],
      exits: {
        south: {
          to: "junction",
          aliases: ["junction", "corridor"],
          preview:
            "South, the service junction flashes red under the emergency lights.",
        },
      },
      nouns: {
        breaker: {
          name: "breaker panel",
          aliases: ["breaker", "panel", "switch", "pump switch"],
          locationId: "pump",
          description:
            "The breaker is a chunky manual switch with a rubber grip. A printed label says RESET PUMP BEFORE PATCHING ACTIVE LEAKS, otherwise pressure will blow sealant out of the crack.",
          reveals: {
            knowledge: ["pumpBeforePatch"],
          },
          descriptionStates: [
            {
              conditions: { flags: { pumpReset: true } },
              text:
                "The breaker is locked in the ON position. The pump note is still readable: RESET PUMP BEFORE PATCHING ACTIVE LEAKS.",
            },
          ],
        },
      },
      atmosphere: [
        { everyTurns: 4, text: "The pump casing ticks as trapped air moves through the line." },
      ],
    },
    compartment: {
      id: "compartment",
      name: "Compartment C",
      aliases: ["compartment", "compartment c", "leak room"],
      map: { x: 20, y: 46 },
      summary: "A flooded maintenance compartment where seawater jets through a cracked intake flange.",
      description:
        "Compartment C is cold and loud. Seawater sprays from a cracked [[intake flange]] near the deck and runs into the corridor drain. A red [[hand valve]] is mounted above the leak, close enough to reach if you brace yourself against the wall.",
      descriptionStates: [
        {
          conditions: { flags: { patchApplied: true } },
          text:
            "Compartment C is still flooded, but the jet from the [[intake flange]] has stopped. The patch is ugly, grey, and holding. The red [[hand valve]] above it is fully closed.",
        },
        {
          conditions: { flags: { intakeClosed: true } },
          text:
            "Compartment C is cold and loud, but the worst pressure is off. The red [[hand valve]] is closed, and seawater now pulses weakly from the cracked [[intake flange]] instead of jetting across the room.",
        },
      ],
      exits: {
        east: {
          to: "junction",
          aliases: ["junction", "corridor"],
          preview:
            "East, the service junction is brighter and marginally drier.",
        },
      },
      nouns: {
        valve: {
          name: "hand valve",
          aliases: ["valve", "red valve", "intake valve"],
          locationId: "compartment",
          description:
            "The red valve controls the intake line feeding the cracked flange. It is stiff, but the handle is intact and labelled CLOSE BEFORE PATCH.",
          reveals: {
            knowledge: ["closeValve"],
          },
          descriptionStates: [
            {
              conditions: { flags: { intakeClosed: true } },
              text:
                "The red valve is fully closed. The leak has dropped from a jet to a hard pulse.",
            },
          ],
        },
        flange: {
          name: "intake flange",
          aliases: ["flange", "crack", "leak", "pipe"],
          locationId: "compartment",
          description:
            "The flange has cracked along one bolt hole. The surface is metal, not plastic, so sealant will hold if the pump is running and the intake valve is closed first.",
          reveals: {
            knowledge: ["patchPlan"],
          },
          descriptionStates: [
            {
              conditions: { flags: { patchApplied: true } },
              text:
                "The intake flange is wrapped in a thick band of marine sealant. No water is getting through.",
            },
          ],
        },
      },
      atmosphere: [
        { everyTurns: 3, text: "A fresh wave rolls against your shins and slaps the bulkhead behind you." },
      ],
    },
    lab: {
      id: "lab",
      name: "Lower Lab",
      aliases: ["lab", "lower lab", "laboratory"],
      map: { x: 76, y: 46 },
      summary: "A sealed research lab with backup power fading from the sample freezers.",
      description:
        "The [[Lower Lab]] is bright, cold, and shaking from the pump line next door. Three sample freezers run on backup battery. The middle [[sample case]] is latched but not locked, and its status light has dropped to yellow.",
      descriptionStates: [
        {
          conditions: { flags: { specimenSecured: true } },
          text:
            "The [[Lower Lab]] is stable. The middle [[sample case]] is secured, its status light green again, and the freezers have stopped cycling in panic.",
        },
      ],
      exits: {
        west: {
          to: "junction",
          aliases: ["junction", "corridor"],
          preview:
            "West, the service junction is wet and lit red.",
        },
      },
      nouns: {
        case: {
          name: "sample case",
          aliases: ["case", "sample", "specimen", "freezer"],
          locationId: "lab",
          description:
            "The case contains the station's pressure-grown coral sample, the reason Kepler exists. A label on the latch reads: SEAL CASE AFTER FLOOD STABILIZATION.",
          reveals: {
            knowledge: ["secureSample"],
          },
          descriptionStates: [
            {
              conditions: { flags: { specimenSecured: true } },
              text:
                "The sample case is sealed and drawing normal power. The coral inside glows faintly, alive and contained.",
            },
          ],
        },
      },
      atmosphere: [
        { everyTurns: 4, text: "One freezer clicks off, waits two seconds, then comes back with a thin electrical whine." },
      ],
    },
  },
  people: {
    mara: {
      id: "mara",
      name: "Mara Okafor",
      aliases: ["mara", "okafor", "technician", "tech"],
      locationId: "control",
      description:
        "Mara Okafor has grease on her cheek and a pressure bandage wrapped around her left hand. She is scared, angry about being scared, and still doing the math faster than anyone else in the station.",
      reveals: {
        knowledge: ["maraInjured"],
      },
      dialogue: {
        default:
          '"Listen carefully," Mara says. "Pump first, then valve, then patch. If you patch against full pressure, it will peel straight off."',
        noInterest: '"That can wait," Mara says. "Right now I need the leak stopped and the lab door open."',
        topics: {
          repairOrder: {
            requiresKnowledge: "repairOrder",
            text:
              '"The display is right," Mara says. "Pump breaker, intake valve, sealant on the flange. Do it in that order or you waste the sealant."',
            reveals: {
              knowledge: ["patchPlan"],
            },
          },
          pumpBeforePatch: {
            requiresKnowledge: "pumpBeforePatch",
            text:
              '"The pump lowers pressure in the intake line," Mara says. "It won\'t dry the room, but it gives the sealant a chance."',
          },
          closeValve: {
            requiresKnowledge: "closeValve",
            text:
              '"Clockwise until it stops," Mara says. "Use both hands if you have to. The handle is stiff, not broken."',
          },
          labBadge: {
            text:
              '"There should be a spare lab badge in the locker," Mara says. "If it didn\'t wash under the console, it will open the lower lab."',
          },
          marineSealant: {
            text:
              '"Use the whole tube on the cracked flange," Mara says. "Do not be neat. Be generous."',
          },
          specimen: {
            requiresKnowledge: "secureSample",
            text:
              '"Seal the sample case once the flooding is stable," Mara says. "That coral is five years of work and half our funding."',
          },
        },
      },
    },
  },
  items: {
    sealant: {
      id: "sealant",
      name: "marine sealant",
      aliases: ["sealant", "tube", "red tube", "patch compound"],
      locationId: "control",
      conditions: { flags: { lockerOpen: true } },
      description:
        "The marine sealant is a red squeeze tube rated for temporary underwater repairs. The instructions are blunt: reduce pressure, close intake, apply full tube.",
      reveals: {
        knowledge: ["patchPlan"],
      },
    },
    labBadge: {
      id: "labBadge",
      name: "lab badge",
      aliases: ["badge", "keycard", "card", "lanyard"],
      locationId: "control",
      conditions: { flags: { badgeVisible: true } },
      description:
        "The lab badge belongs to T. Serrano, night biology. The plastic is cracked, but the chip looks intact.",
      reveals: {
        knowledge: ["labAccess"],
      },
    },
  },
  knowledge: {
    maraInjured: {
      id: "maraInjured",
      name: "Mara is injured",
      description: "Mara knows the repair procedure but cannot safely do the manual work herself.",
      conversation: false,
    },
    repairOrder: {
      id: "repairOrder",
      name: "Repair order",
      aliases: ["display", "order", "plan"],
      description: "The control display lists the immediate problems: pump, intake valve, lab access.",
    },
    pumpBeforePatch: {
      id: "pumpBeforePatch",
      name: "Pump before patching",
      aliases: ["pump", "breaker"],
      description: "The pump must be reset before the leak is patched, or pressure will blow the sealant off.",
    },
    closeValve: {
      id: "closeValve",
      name: "Close intake valve",
      aliases: ["valve", "intake"],
      description: "The intake valve needs to be closed before sealant is applied.",
    },
    patchPlan: {
      id: "patchPlan",
      name: "Patch plan",
      aliases: ["sealant", "flange", "leak"],
      description: "Reset the pump, close the intake valve, then use marine sealant on the cracked flange.",
    },
    labAccess: {
      id: "labAccess",
      name: "Lab access",
      aliases: ["badge", "keycard"],
      description: "The spare lab badge should open the lower lab door.",
    },
    secureSample: {
      id: "secureSample",
      name: "Secure sample",
      aliases: ["sample", "specimen", "coral"],
      description: "Once the leak is stabilized, the lower lab sample case needs to be sealed.",
    },
  },
  actions: [
    {
      item: "locker",
      with: "",
      locationId: "control",
      conditions: { flags: { lockerOpen: false } },
      text:
        "You yank the bent locker door until the latch gives. The metal shrieks, then swings open far enough to reach the [[marine sealant]] and spare [[lab badge]].",
      effects: {
        flags: {
          lockerOpen: true,
          badgeVisible: true,
        },
      },
    },
    {
      item: "breaker",
      aliases: ["switch", "pump", "pump switch", "breaker panel"],
      with: "",
      locationId: "pump",
      conditions: { flags: { pumpReset: false } },
      text:
        "You grip the rubber handle and shove the breaker up. For one long second nothing happens. Then the emergency pump catches, rough at first, and the floor starts vibrating under your boots.",
      effects: {
        flags: {
          pumpReset: true,
        },
      },
    },
    {
      item: "valve",
      aliases: ["hand valve", "red valve", "intake valve"],
      with: "",
      locationId: "compartment",
      conditions: { flags: { intakeClosed: false } },
      text:
        "You brace one boot against the bulkhead and turn the red valve clockwise. It moves a quarter turn, sticks, then gives. The jet from the flange drops to a hard pulse.",
      effects: {
        flags: {
          intakeClosed: true,
        },
      },
    },
    {
      item: "sealant",
      with: "flange",
      locationId: "compartment",
      requiresInventory: "sealant",
      conditions: {
        flags: {
          pumpReset: true,
          intakeClosed: true,
          patchApplied: false,
        },
      },
      text:
        "You squeeze the full tube of marine sealant around the cracked flange. It foams grey, hardens under your palms, and holds. The spray stops.",
      effects: {
        flags: {
          patchApplied: true,
        },
        removeInventory: ["sealant"],
      },
      reveals: {
        story: [{ name: "Leak patched", description: "The pump was reset, the intake valve closed, and the cracked flange patched." }],
      },
    },
    {
      item: "lab badge",
      aliases: ["badge", "keycard", "card"],
      with: "lab door",
      locationId: "junction",
      requiresInventory: "labBadge",
      conditions: {
        flags: {
          patchApplied: true,
          labOpen: false,
        },
      },
      text:
        "You press the lab badge to the reader. The lock checks the chip, complains once, then accepts it. The lower lab door unlocks with a heavy mechanical clunk.",
      effects: {
        flags: {
          labOpen: true,
        },
        removeInventory: ["labBadge"],
      },
    },
    {
      item: "sample case",
      aliases: ["case", "sample", "specimen", "coral", "freezer"],
      with: "",
      locationId: "lab",
      conditions: {
        flags: {
          patchApplied: true,
          specimenSecured: false,
        },
      },
      text:
        "You close the sample case and dog the latch down until the yellow light turns green. The freezer load drops, the backup battery steadies, and the lab alarm clears.",
      effects: {
        flags: {
          specimenSecured: true,
        },
        win: {
          text:
            "Ending: Kepler Station stabilizes. The leak is patched, the lower lab holds power, and Mara reports one injured technician, one soaked repair lead, and one living coral sample still worth saving.",
          story: {
            name: "Kepler stabilized",
            description: "The pump was reset, the leak patched, the lab opened, and the sample secured.",
          },
        },
      },
    },
  ],
};
