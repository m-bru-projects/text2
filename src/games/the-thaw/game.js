export const theThaw = {
  id: "the-thaw",
  title: "The Thaw",
  author: "Codex",
  intro:
    "The tram died under the Skeld Ice Shelf with one long electrical sigh. You are Mara Venn, junior archivist of Veyr Station, bearer of a cracked identity seal and a satchel full of forms no court will now receive. Above you, an old world is melting into the roof.\n\nType look to steady yourself. The station will answer in bells, rust, and names.",
  description:
    "A warm front presses through the ice above Veyr Station. Every corridor smells faintly of wet iron, old wax, and paper waking from a century of cold.",
  descriptionStates: [
    {
      conditions: { flags: { archiveOpen: true } },
      text:
        "The opened archives breathe through the station. The air has become granular with paper dust and mineral damp, as if the building is exhaling all the names it once held behind its teeth.",
    },
    {
      conditions: { flags: { engineBalanced: true } },
      text:
        "The Tide Engine has found a steadier pulse. Heat moves in the wall pipes with a tired animal patience, and the thaw outside sounds less like a verdict than a weather system that can be survived.",
    },
  ],
  start: {
    locationId: "tramVestibule",
    inventory: ["identitySeal"],
    knowledge: [],
    flags: {
      archiveOpen: false,
      gardenOpen: false,
      engineBalanced: false,
      mandateReleased: false,
      lanternReady: false,
    },
  },
  status(state) {
    const status = ["thaw rising"];
    if (state.flags.archiveOpen) status.push("archives breathing");
    if (state.flags.engineBalanced) status.push("engine steady");
    if (state.flags.mandateReleased) status.push("mandate released");
    return status;
  },
  atmosphere: [
    {
      everyTurns: 4,
      text:
        "Somewhere overhead, ice shifts with the slow dignity of a cathedral deciding to kneel.",
    },
    {
      everyTurns: 5,
      text:
        "A drop of meltwater lands near you and smells briefly of smoke, as though it has remembered passing through a burned century.",
    },
    {
      everyTurns: 3,
      conditions: { flags: { engineBalanced: true } },
      text:
        "The wall pipes tick with returning heat. For the first time since the tram failed, the sound is not panic.",
    },
  ],
  locations: {
    tramVestibule: {
      id: "tramVestibule",
      name: "Tram Vestibule",
      aliases: ["vestibule", "tram", "station entrance", "entrance"],
      summary: "A stalled arrival bay beneath the ice shelf, glazed with melt and emergency amber.",
      map: { x: 10, y: 52 },
      description:
        "The [[tram vestibule]] is narrow, tiled in green ceramic crazed by frost. The dead tram behind you still carries the faces of commuters in its dark windows, all reflected and doubled by meltwater. A [[route mural]] covers the curved wall, showing Veyr Station as a clean civic diagram: heat lines in red, archive lines in blue, chapel bells in gold.\n\nA cracked [[emergency placard]] hangs beside the inner doors. Someone has written MOUTH BEFORE MACHINE across it in lampblack.",
      exits: {
        east: {
          to: "petitionHall",
          aliases: ["inner doors", "petition hall", "hall"],
          preview:
            "East, the inner doors sag open toward [[Petition Hall]], where cold daylight spills across counters built for orderly desperation.",
        },
      },
      nouns: {
        "tram vestibule": {
          id: "tramVestibuleNoun",
          name: "tram vestibule",
          aliases: ["vestibule", "tram bay", "arrival bay"],
          description:
            "The vestibule was designed to make arrival feel like forgiveness. Its benches are heated stone, though only one still works, pulsing weakly under a crust of white mineral bloom. The ceiling speakers click every few seconds, trying to announce a platform number that no longer exists.",
        },
        "route mural": {
          id: "routeMural",
          name: "route mural",
          aliases: ["mural", "map mural", "station map"],
          description:
            "The mural shows a city pretending to be a machine. Petitioners move from tram to hall, hall to chapel, chapel to archive, archive to furnace, and every path is labeled as if obedience were a form of plumbing. In one corner, four little shelters, one engine, seven vaults, and two clasped hands have been painted with devotional precision.",
          reveals: { knowledge: ["foundingPattern"] },
        },
        "emergency placard": {
          id: "emergencyPlacard",
          name: "emergency placard",
          aliases: ["placard", "sign", "lampblack"],
          description:
            "The printed text orders citizens to await a warmth witness before crossing any sealed threshold. The lampblack message is newer, written by a hurried hand: MOUTH BEFORE MACHINE. Below it, a thumbprint in dried blood has frozen into the shape of a small red island.",
          reveals: { knowledge: ["mouthBeforeMachine"] },
        },
      },
    },
    petitionHall: {
      id: "petitionHall",
      name: "Petition Hall",
      aliases: ["hall", "petition", "public hall"],
      summary: "The civic intake hall where heat, grief, and paperwork were once weighed together.",
      map: { x: 27, y: 52 },
      description:
        "[[Petition Hall]] is too large for the number of living people left in it. Long counters divide the room into public and official halves. Behind them stand pigeonholes stuffed with damp forms, dead brass lamps, and family ribbons gone gray with dust. The air tastes of wax, breath, and the sour glue of thawing envelopes.\n\nA [[bell poster]] droops over the queue ropes. A [[frost-printer]] ticks at the claims desk. On the floor, a line of black tiles marks where petitioners once knelt to surrender a little heat from their palms.",
      exits: {
        west: { to: "tramVestibule", aliases: ["tram", "vestibule"] },
        north: {
          to: "chapelGauges",
          aliases: ["chapel", "gauges"],
          preview:
            "North, incense and machine oil drift from [[Chapel of Gauges]], where the bells are awake enough to be listening.",
        },
        east: {
          to: "rookery",
          aliases: ["rookery", "radio room", "lamp room"],
          preview:
            "East, a stair climbs toward [[The Rookery]], a lamp and radio room built into the upper ribs of the station.",
        },
        south: {
          to: "infirmary",
          aliases: ["infirmary", "clinic"],
          preview:
            "South, a swinging door breathes antiseptic and old lavender from [[Infirmary of Names]].",
        },
      },
      nouns: {
        "Petition Hall": {
          id: "petitionHallNoun",
          name: "Petition Hall",
          aliases: ["hall", "petition hall", "counters"],
          description:
            "This was where private grief became a public queue. The counters are scarred by fingernails, seal knives, and the circular burns of palm-warmers. Under the varnish, you can see children practiced their letters while adults waited to learn whether a missing person was legally warm, legally cold, or too expensive to classify.",
        },
        "bell poster": {
          id: "bellPoster",
          name: "bell poster",
          aliases: ["poster", "bells poster", "bell calendar"],
          description:
            "The poster teaches civic bell etiquette in cheerful block prints. Four strokes for shelter, one for engine, seven for seed, two for vow. A child has drawn a skull beside the number seven and been corrected in red pencil: SEED, NOT DEATH.",
          reveals: { knowledge: ["foundingToll"] },
        },
        "frost-printer": {
          id: "frostPrinter",
          name: "frost-printer",
          aliases: ["printer", "claims desk", "machine"],
          description:
            "The frost-printer is a waist-high bureaucratic animal with glass keys and a brass throat. Its last page is still caught in the rollers: Petition 9,771-B, request for posthumous heat credit, denied because the claimant's mother was 'absent from recognized continuity.' The phrase has been underlined until the paper nearly tore.",
          reveals: { knowledge: ["erasedMother"] },
        },
      },
    },
    chapelGauges: {
      id: "chapelGauges",
      name: "Chapel of Gauges",
      aliases: ["chapel", "gauges", "bell chapel"],
      summary: "A chapel where pressure dials, saint bells, and civic guilt share the same altar.",
      map: { x: 43, y: 36 },
      description:
        "The [[Chapel of Gauges]] is built around a horseshoe of brass dials, each needle trembling over words instead of numbers: MERCY, PRESSURE, WITNESS, RETURN. Above them hang seven small bells and one great cracked bell darkened by centuries of hand smoke.\n\n[[Brother Caldus]] kneels at the gauge altar with a wrench in one sleeve and a prayer cord in the other. A black iron [[choir grille]] stands behind him, sealed by four thumb-worn bell levers.",
      descriptionStates: [
        {
          conditions: { flags: { archiveOpen: true } },
          text:
            "The [[Chapel of Gauges]] is louder now. The opened archives have woken sympathetic chimes inside the walls, and each note arrives with a papery aftertaste. [[Brother Caldus]] watches the [[choir grille]] as if it has confessed before he found the courage to ask.",
        },
      ],
      exits: {
        south: { to: "petitionHall", aliases: ["hall", "petition hall"] },
        east: {
          to: "archiveStacks",
          aliases: ["archive", "archives", "stacks", "choir grille"],
          conditions: { flags: { archiveOpen: true } },
          lockedText:
            "The choir grille refuses you. Its four levers sit in patient silence, waiting for a sequence older than your appointment as archivist.",
          lockedPreview:
            "East, the closed [[choir grille]] hides [[Archive Stacks]] behind ironwork shaped like frozen voices.",
          preview:
            "East, the opened [[choir grille]] leads into [[Archive Stacks]], where catalog bells shiver in the dark.",
        },
      },
      nouns: {
        "Chapel of Gauges": {
          id: "chapelNoun",
          name: "Chapel of Gauges",
          aliases: ["chapel", "gauge chapel"],
          description:
            "Older chapels hid their machinery. Veyr Station sanctified it. Every pipe here has been polished by sleeves, every dial named like a virtue, every prayer bench fitted with a heat meter so devotion could be audited without embarrassment.",
        },
        "choir grille": {
          id: "choirGrille",
          name: "choir grille",
          aliases: ["grille", "bell lock", "levers", "four levers", "iron grille"],
          description:
            "Four levers protrude from the grille at different heights, each capped with a worn enamel number that has mostly flaked away. Around the lock someone engraved a children's rhyme: Speak shelter, speak engine, speak seed, speak vow; the dead keep count and open now.",
          reveals: { knowledge: ["bellLock"] },
        },
      },
    },
    rookery: {
      id: "rookery",
      name: "The Rookery",
      aliases: ["rookery", "radio room", "lamp room", "upper room"],
      summary: "A lamp and radio loft crowded with signal lenses, contraband wire, and thawlight.",
      map: { x: 49, y: 16 },
      description:
        "[[The Rookery]] leans over the station like a lookout's skull. Signal lenses hang in racks. Copper wire crosses the ceiling in patient webs. The north window is not glass but old ice made clear by pressure, and through it you can see black melt channels moving under the shelf.\n\n[[Ione Glass]] has opened a lamp housing on the workbench. Beside her lie a [[salt coil]], a cracked signal lens, and a cup of tea so oversteeped it smells medicinal.",
      exits: {
        west: { to: "petitionHall", aliases: ["hall", "petition hall"] },
        up: {
          to: "signalLantern",
          aliases: ["lantern", "signal lantern", "roof"],
          conditions: { flags: { engineBalanced: true, mandateReleased: true } },
          lockedText:
            "The lantern stair is barred by a legal governor. Its indicator reads: EMERGENCY MANDATE REQUIRED; ENGINE INSTABILITY PROHIBITS ASCENT.",
          lockedPreview:
            "Up, the locked stair toward [[Signal Lantern]] glows with a red legal seal.",
          preview:
            "Up, the released stair climbs toward [[Signal Lantern]], where the station can finally speak beyond itself.",
        },
      },
      nouns: {
        "The Rookery": {
          id: "rookeryNoun",
          name: "The Rookery",
          aliases: ["rookery", "radio room", "lamp room"],
          description:
            "The Rookery was built after the third winter, when people still believed rescue would arrive by schedule. Its walls are layered with obsolete frequencies, weather prayers, and pencil portraits of ships that never came. A child's hand has written HI OUTSIDE on the sill in blue chalk.",
        },
        "salt coil": {
          id: "saltCoilNoun",
          name: "salt coil",
          aliases: ["coil", "contraband coil", "wire"],
          description:
            "The salt coil is illegal Choir work: copper wound around salt-cured gut, able to hold a signal when ordinary wire fuzzes under auroral interference. It smells faintly of brine and smoke. Official manuals call these devices corrosive sabotage. Ione calls them listening tools.",
          reveals: { knowledge: ["saltChoirSignal"] },
        },
      },
    },
    infirmary: {
      id: "infirmary",
      name: "Infirmary of Names",
      aliases: ["infirmary", "clinic", "names infirmary"],
      summary: "A clinic that treated frostbite, birth fever, and the legal condition of being unrecorded.",
      map: { x: 43, y: 70 },
      description:
        "The [[Infirmary of Names]] smells of lavender, iodine, cold linen, and the metallic sweetness of old blood scrubbed too often from tile. Cots stand in two rows. Above each cot is a name slate, because in Veyr Station even fever had to be indexed.\n\nA locked medicine cabinet hangs open, emptied by hands more desperate than careful. On the children's cot rests a clockwork [[nursery automaton]] missing a tooth from its brass smile. A [[ration token]] glints under the pillow.",
      exits: {
        north: { to: "petitionHall", aliases: ["hall", "petition hall"] },
        east: {
          to: "engineNave",
          aliases: ["engine", "engine nave", "lower station"],
          preview:
            "East, a service ramp descends toward [[Engine Nave]], where the whole station's pulse knocks against the floor.",
        },
      },
      nouns: {
        "Infirmary of Names": {
          id: "infirmaryNoun",
          name: "Infirmary of Names",
          aliases: ["infirmary", "clinic"],
          description:
            "Before the Covenant, this was a clinic. After the Covenant, it became a place where bodies and records were repaired in parallel. The old intake chart still asks for pulse, kinship, debt temperature, and whether the patient is recognized by three warm witnesses.",
        },
        "nursery automaton": {
          id: "nurseryAutomaton",
          name: "nursery automaton",
          aliases: ["automaton", "clockwork nurse", "toy", "brass smile"],
          description:
            "The automaton is shaped like a seated nurse with a porcelain cap and a hinged brass mouth. One tooth is missing from the gear rack that forms its smile. A label on its back reads PROPERTY OF SEED VAULT SEVEN: CIVIC LESSONS FOR SMALL SURVIVORS.",
          reveals: { knowledge: ["automatonTooth"] },
        },
        "ration token": {
          id: "rationTokenNoun",
          name: "ration token",
          aliases: ["token", "pillow", "heat token"],
          description:
            "The token is stamped with a number, not a name. Someone scratched ILYA GLASS on the rim with a needle, turning anonymous heat into a specific plea. The reverse bears the punishment code for unauthorized warming of a minor.",
          reveals: { knowledge: ["ilyaConviction"] },
        },
      },
    },
    archiveStacks: {
      id: "archiveStacks",
      name: "Archive Stacks",
      aliases: ["archive", "archives", "stacks"],
      summary: "A deep civic archive where memory was preserved, priced, edited, and sometimes buried.",
      map: { x: 62, y: 36 },
      description:
        "[[Archive Stacks]] descend farther than the lantern light wants to follow. Shelf rails vanish into blue dark. Boxes sweat. Wax seals soften and give off the smell of honey mixed with mildew. Tiny catalog bells ring whenever the ice shifts, each note assigned to a family, a court, a famine, a school.\n\nA rolling ladder has jammed beside the Kest engineering alcove. On the reading table wait [[Kest marginalia]], a sealed [[soft ledger]], and a second [[nursery automaton]] with an intact smile but no winding tooth.",
      descriptionStates: [
        {
          conditions: { flags: { gardenOpen: true } },
          text:
            "[[Archive Stacks]] descend farther than the lantern light wants to follow, but the air has changed. The opened seed vault has pushed green damp into the aisles, and the boxes closest to the door have begun to smell like soil instead of court dust.\n\nA rolling ladder has jammed beside the Kest engineering alcove. On the reading table wait [[Kest marginalia]], the opened [[soft ledger]], and the repaired [[nursery automaton]], its brass smile fixed in a lesson it can no longer stop reciting.",
        },
      ],
      exits: {
        west: { to: "chapelGauges", aliases: ["chapel", "choir grille"] },
        east: {
          to: "underIceGarden",
          aliases: ["garden", "under ice garden", "seed vault"],
          conditions: { flags: { gardenOpen: true } },
          lockedText:
            "The seed-vault door remains closed. Its nursery automaton watches with an unfinished smile, waiting for the lesson it was built to recite.",
          lockedPreview:
            "East, the sealed [[seed-vault door]] bars the way to [[Under-ice Garden]].",
          preview:
            "East, the unlatched [[seed-vault door]] exhales green damp from [[Under-ice Garden]].",
        },
      },
      nouns: {
        "Archive Stacks": {
          id: "archiveNoun",
          name: "Archive Stacks",
          aliases: ["archive", "archives", "stacks"],
          description:
            "This is the holy stomach of Veyr Station. It swallowed birth registers, famine songs, border treaties, apology recordings, prison inventories, and love letters written on ration paper. The shelves are not arranged by topic but by heat priority: lives nearest the boilers were read most often.",
        },
        "Kest marginalia": {
          id: "kestMarginalia",
          name: "Kest marginalia",
          aliases: ["marginalia", "kest notes", "engineering notes", "notes"],
          description:
            "Ruvan Kest's handwriting crawls around an official engine diagram like roots cracking stone. 'No machine can remain innocent when lawyers learn its levers,' he wrote beside the governor override. Lower down: 'If they require witness, make the engine require return.'",
          reveals: { knowledge: ["kestOverride", "engineSequence"] },
        },
        "soft ledger": {
          id: "softLedgerNoun",
          name: "soft ledger",
          aliases: ["ledger", "sealed ledger", "illegal ledger"],
          description:
            "The ledger is sealed in gray station linen and wax soft enough to hold your fingerprint. You can see the edge of many pages, but the binding is threaded through the nursery automaton's latch. The archive built a book that cannot be read until a child's lesson opens a garden.",
          descriptionStates: [
            {
              conditions: { flags: { gardenOpen: true } },
              text:
            "The Soft Ledger is bound in gray seal-skin and station linen, illegal materials married into an illegal book. Its pages list people who were made administratively absent: debtors, dissidents, children born during unmetered outages, whole families traded out of history to balance heat accounts. Your mother's name appears on page forty-one, not dead, not missing, but transferred to 'external silence.'",
              reveals: { knowledge: ["softLedger", "maraMotherTruth"], story: [{ name: "The Soft Ledger", description: "You found the illegal index of citizens erased from Veyr Station's official memory, including your mother." }] },
            },
          ],
        },
        "seed-vault door": {
          id: "seedVaultDoor",
          name: "seed-vault door",
          aliases: ["seed door", "vault door", "garden door"],
          description:
            "The door is painted with extinct fruit: quince, cherry, plum, pomegranate. Each has been labeled by a child in three languages, then corrected by an archivist in red. The latch is coupled to the nursery automaton on the reading table, as if childhood obedience once protected the future food supply.",
        },
        "nursery automaton": {
          id: "archiveAutomaton",
          name: "nursery automaton",
          aliases: ["automaton", "clockwork nurse", "winding toy"],
          description:
            "This automaton's porcelain cheeks are cracked from cold. Its mouth opens when you touch it, but the gear slips where a brass tooth should catch. A whisper of its lesson escapes: 'Four shelters, one engine...' Then silence.",
        },
      },
    },
    engineNave: {
      id: "engineNave",
      name: "Engine Nave",
      aliases: ["engine", "nave", "tide engine", "lower station"],
      summary: "The lower machinery hall where tidal pressure, geothermal heat, and civic law meet.",
      map: { x: 64, y: 72 },
      description:
        "[[Engine Nave]] is a cathedral built by people who trusted bolts more than angels. Pistons move behind fogged glass. The floor trembles in uneven triplets. Brine has crept through the south expansion joint and left white lace on the black iron.\n\n[[Pavel Orra]] stands knee-deep in tools beside the [[pressure chart]]. A huge red wheel labeled FLOODGATE has been chained to a smaller blue wheel labeled RETURN. Above them, a legal governor blinks amber and refuses responsibility.",
      descriptionStates: [
        {
          conditions: { flags: { engineBalanced: true } },
          text:
            "[[Engine Nave]] still roars, but the roar has rhythm now. Steam condenses on the ribs of the ceiling and falls as clean warm rain. [[Pavel Orra]] has stopped swearing at the [[pressure chart]] and started listening to the pistons with the respect one gives an old enemy who has chosen not to strike.",
        },
      ],
      exits: {
        west: { to: "infirmary", aliases: ["infirmary", "clinic"] },
        north: {
          to: "governorReliquary",
          aliases: ["reliquary", "governor", "legal chamber"],
          preview:
            "North, a brass hatch leads to [[Governor's Reliquary]], where law continues in the absence of breath.",
        },
      },
      nouns: {
        "Engine Nave": {
          id: "engineNaveNoun",
          name: "Engine Nave",
          aliases: ["engine nave", "nave", "engine"],
          description:
            "The engine hall imitates a church because Kest understood the station would trust a sacred machine more readily than an honest one. The columns are exhaust stacks. The altar is a pressure manifold. The hymn is metal under strain.",
        },
        "pressure chart": {
          id: "pressureChart",
          name: "pressure chart",
          aliases: ["chart", "readings", "gauge chart"],
          description:
            "The chart is updated in Pavel's blocky hand. Pressure rises in the floodgate line, collapses in the return, and spikes whenever the legal governor vetoes emergency flow. A note in the margin reads: KEST RULE - FLOODGATE, RETURN, WITNESS, OR WE DROWN POLITELY.",
          reveals: { knowledge: ["engineSequence"] },
        },
      },
    },
    governorReliquary: {
      id: "governorReliquary",
      name: "Governor's Reliquary",
      aliases: ["reliquary", "governor", "legal chamber"],
      summary: "A legal shrine where a dead governor's recorded persona still guards the station's permissions.",
      map: { x: 78, y: 58 },
      description:
        "[[Governor's Reliquary]] is warm, dry, and morally airless. The chamber contains one velvet chair, one speaking horn, and hundreds of wax cylinders filed by emergency category. A portrait of Governor Edrik Vale smiles with the exhausted kindness of a man who had other people killed by committee.\n\nThe [[governor persona]] breathes through the speaking horn whenever you move. On a plinth beneath the portrait rests the sealed [[emergency mandate]].",
      descriptionStates: [
        {
          conditions: { flags: { mandateReleased: true } },
          text:
            "[[Governor's Reliquary]] has lost its courtroom warmth. The [[governor persona]] loops quietly through obsolete apologies, and the released [[emergency mandate]] lies open on the plinth like a throat cut cleanly enough to be called surgery.",
        },
      ],
      exits: {
        south: { to: "engineNave", aliases: ["engine", "engine nave"] },
      },
      nouns: {
        "Governor's Reliquary": {
          id: "reliquaryNoun",
          name: "Governor's Reliquary",
          aliases: ["reliquary", "legal chamber"],
          description:
            "The chamber is less a tomb than a legal instrument with velvet upholstery. Dust avoids the governor's chair because warm air still rises from vents beneath it. The station preserved comfort for authority longer than it preserved medicine for children.",
        },
        "governor persona": {
          id: "governorPersonaNoun",
          name: "governor persona",
          aliases: ["persona", "governor", "speaking horn", "edrik vale"],
          description:
            "The persona is a wax-cylinder composite of Governor Vale's legal voice. It can cite mercy statutes, evacuation thresholds, and treason definitions, but its pauses are too clean. No living conscience leaves so little static.",
        },
        "emergency mandate": {
          id: "emergencyMandate",
          name: "emergency mandate",
          aliases: ["mandate", "sealed mandate", "plinth"],
          description:
            "The mandate is a heat-sealed document authorizing external signal, archive transfer, and mass evacuation. Its seal will not break while the governor persona believes the Covenant preserved more names than it erased.",
          descriptionStates: [
            {
              conditions: { flags: { mandateReleased: true } },
              text:
                "The mandate lies open. Its legal language is dry as bone, but the practical effect is enormous: the signal lantern may speak to the Free Melt, and the archives may leave Veyr Station without being called stolen property.",
            },
          ],
        },
      },
    },
    underIceGarden: {
      id: "underIceGarden",
      name: "Under-ice Garden",
      aliases: ["garden", "under ice garden", "seed vault", "vault seven"],
      summary: "A seed vault turned secret chapel, damp with green life and smuggled names.",
      map: { x: 82, y: 30 },
      description:
        "[[Under-ice Garden]] is impossible enough to feel indecent. Pear saplings grow in tubs under violet lamps. Moss covers the heat pipes. The air is thick with soil, salt, and the peppery smell of living leaves. Beyond the far glass, black water moves under the ice shelf like a thought no law can arrest.\n\nA stone [[salt font]] stands among the planters. Choir marks have been carved into its rim. [[Ione Glass]] has left a coil of wire here, hidden in plain sight among bean vines.",
      exits: {
        west: { to: "archiveStacks", aliases: ["archive", "stacks"] },
      },
      nouns: {
        "Under-ice Garden": {
          id: "gardenNoun",
          name: "Under-ice Garden",
          aliases: ["garden", "seed vault", "vault seven"],
          description:
            "The garden was meant to preserve crop genetics for a future government. Instead it preserved disobedience. Names are scratched on plant labels: not species names, but people. Some labels bear dates of birth. Others bear only weather: Born during whiteout. Warmed without permit. Taken south.",
          reveals: { knowledge: ["choirGarden"] },
        },
        "salt font": {
          id: "saltFont",
          name: "salt font",
          aliases: ["font", "stone font", "choir marks"],
          description:
            "The font holds a shallow palm of unfrozen brine. Around its rim the Salt Choir carved a rite: salt for memory, breath for witness, wire for distance, ledger for proof. The words are practical, not mystical. That makes them more moving.",
          reveals: { knowledge: ["transmissionRite"] },
        },
      },
    },
    signalLantern: {
      id: "signalLantern",
      name: "Signal Lantern",
      aliases: ["lantern", "signal", "roof lantern"],
      summary: "The upper signal chamber, aimed at the new black water beyond the ice.",
      map: { x: 62, y: 5 },
      description:
        "[[Signal Lantern]] is a glass and brass throat pointed at the world outside Veyr Station. Wind presses warm rain against the panes. Far below the ice shelf, open water glints black and silver, crowded with floes that move like broken law.\n\nThe lantern cradle waits around a great lens. Its controls are simple because emergencies make fools of ornament: focus, burn, send. The [[Free Melt horizon]] flickers beyond the glass.",
      exits: {
        down: { to: "rookery", aliases: ["rookery", "radio room"] },
      },
      nouns: {
        "Signal Lantern": {
          id: "lanternNoun",
          name: "Signal Lantern",
          aliases: ["lantern", "signal lantern", "signal"],
          description:
            "The lantern can throw coded light through weather that would swallow radio. Its brass rails are polished by generations of drills that never became rescue. Today, the handles are slick with actual rain.",
        },
        "Free Melt horizon": {
          id: "freeMeltHorizon",
          name: "Free Melt horizon",
          aliases: ["horizon", "free melt", "water", "outside"],
          description:
            "The Free Melt is not visible as a nation, only as possibility: smoke threads, black water, a moving point of white light that may be a barge or a star reflected in a wave. Veyr Station taught you to fear outside as hunger. The thaw has made inside hungry too.",
          reveals: { knowledge: ["freeMelt"] },
        },
      },
    },
  },
  people: {
    caldus: {
      id: "caldus",
      name: "Brother Caldus",
      aliases: ["caldus", "brother", "chaplain", "bell chaplain"],
      locationId: "chapelGauges",
      description:
        "Brother Caldus is broad, stooped, and powdered with brass dust. His beard has frozen into two gray points where his breath meets chapel air. He smells of candle wax and machine oil, and his eyes keep moving to the bells as if they might interrupt him with a better conscience.",
      dialogue: {
        default:
          "Brother Caldus turns from the gauge altar. 'Archivist Venn. If you have come to file the end of the world, you will find the proper form missing. If you have come to stop it, ask quickly.'",
        noInterest: "Caldus folds that thought into silence. 'Not every wound has a useful edge just now.'",
        topics: {
          foundingToll: {
            text:
              "'Four, one, seven, two,' Caldus says softly. 'The public catechism says shelter, engine, seed, vow. The private count is uglier. I taught children the pretty version for thirty years and called it mercy.'",
            reveals: { knowledge: ["foundingToll"] },
          },
          bellLock: {
            text:
              "'The grille wants a voice before a hand. Vey loved that arrangement. Say the sequence plainly. The levers are there to make the machine feel like ritual, but the mouth wakes it first.'",
            reveals: { knowledge: ["mouthBeforeMachine", "foundingToll"] },
          },
          softLedger: {
            requiresKnowledge: "softLedger",
            text:
              "Caldus touches his prayer cord until the beads click like small teeth. 'Then the rumors were mercifully incomplete. If the ledger is true, rescue without confession would preserve the station and damn it again.'",
            reveals: { knowledge: ["confessionNecessary"] },
          },
          erasedMother: {
            text:
              "'Absent from recognized continuity,' he repeats, bitterly precise. 'A phrase invented so clerks could make a family vanish without writing the word murder.'",
          },
        },
      },
    },
    ione: {
      id: "ione",
      name: "Ione Glass",
      aliases: ["ione", "glass", "lamp mechanic", "courier"],
      locationId: "rookery",
      description:
        "Ione Glass wears a lamp mechanic's coat with three unauthorized pockets sewn inside the lining. Her hair is cropped close, her hands are burned in fine crescent shapes, and her smile arrives only after her suspicion has searched you for weapons.",
      dialogue: {
        default:
          "Ione does not look up from the lamp housing. 'If you are here to ask why a mechanic has Choir wire, I will lie efficiently. If you are here to help, start by admitting the station is not worth saving clean.'",
        noInterest: "'That is archive talk,' Ione says. 'Useful for shelves. Less useful for lungs.'",
        topics: {
          saltChoirSignal: {
            text:
              "'Salt holds a signal the way grief holds a name,' Ione says. 'Copper alone forgets in weather like this. The Choir learned from smugglers, widows, and bad electricians.'",
            reveals: { knowledge: ["transmissionRite"] },
          },
          ilyaConviction: {
            text:
              "Her face closes. 'Ilya is my brother. He warmed a feverish child with stolen battery time. The court called it theft from the collective future. I call it Tuesday in a dying station.'",
            reveals: { knowledge: ["ioneStake"] },
          },
          freeMelt: {
            text:
              "'The Free Melt will come if the lantern speaks proof, not just distress. They have enough mouths. What they need is leverage against old regimes pretending to be museums.'",
          },
          softLedger: {
            requiresKnowledge: "softLedger",
            text:
              "'Send it,' Ione says. No smile now. No performance. 'Not excerpts. Not a summary written by guilty men. Send the ugly book whole, or Veyr Station survives as a lie with better plumbing.'",
            reveals: { knowledge: ["sendLedger"] },
          },
        },
      },
    },
    pavel: {
      id: "pavel",
      name: "Pavel Orra",
      aliases: ["pavel", "orra", "engineer", "tide engineer"],
      locationId: "engineNave",
      description:
        "Pavel Orra has the flat, furious calm of a person who has been right too often and obeyed too rarely. His coat is patched with insulation foil. One eyebrow is singed away. He keeps a wrench tucked through his belt like a magistrate's baton.",
      dialogue: {
        default:
          "'Do not touch anything that hisses, glows, weeps, or has a label written by a committee,' Pavel says. 'That leaves about six bolts and my lunch.'",
        noInterest: "Pavel snorts. 'Bring me pressure, sequence, or coffee. Philosophy can wait in the floodwater.'",
        topics: {
          engineSequence: {
            text:
              "'Floodgate, return, witness,' Pavel says, tapping the chart hard enough to dent paper. 'Open the system, give the pressure somewhere honest to go, then make the legal governor admit someone living saw it done.'",
            reveals: { knowledge: ["engineSequence"] },
          },
          kestOverride: {
            text:
              "'Kest hated governors in machines. Left them just enough authority to look important, then hid the real repair logic in ritual language. Man had style. Terrible handwriting.'",
          },
          softLedger: {
            requiresKnowledge: "softLedger",
            text:
              "'If that book proves what I think it proves, the governor override is illegal by its own law. Which is funny, if your sense of humor has been pressure-cooked for twenty years.'",
          },
        },
      },
    },
    governorPersona: {
      id: "governorPersona",
      name: "Governor Persona",
      aliases: ["governor", "persona", "edrik", "vale", "governor persona"],
      locationId: "governorReliquary",
      description:
        "The Governor Persona is only a voice, but the room behaves as if it still has a body: warmed chair, polished horn, respectful dust. Its diction is smooth enough to skate on and just as cold underneath.",
      dialogue: {
        default:
          "'Citizen archivist,' says the speaking horn. 'Emergency petitions are welcome when accompanied by verified witness, valid seal, and confidence in the Covenant that preserved us.'",
        noInterest:
          "'The Reliquary finds no actionable category in that subject,' the governor persona replies.",
        topics: {
          softLedger: {
            requiresKnowledge: "softLedger",
            text:
              "You read names until the horn begins correcting you, then stuttering, then citing statutes that contradict the corrections. At last it says, very quietly, 'Continuity error recognized. Preservation claim unsound. Emergency mandate released.'",
            effects: { flags: { mandateReleased: true } },
            reveals: {
              knowledge: ["mandateReleased"],
              story: [{ name: "Mandate Released", description: "The dead governor's persona recognized the Soft Ledger as proof that the Covenant's preservation claim was legally false." }],
            },
          },
          emergencyMandate: {
            text:
              "'Mandate release requires engine stability, external threat, and preservation confidence,' the persona says. 'Please enjoy the warmth of lawful continuity.'",
          },
          identitySeal: {
            text:
              "'Seal recognized: Mara Venn, junior archivist, debt temperature moderate, maternal continuity incomplete.' The horn pauses. 'You may petition for correction after the emergency.'",
          },
        },
      },
    },
  },
  items: {
    identitySeal: {
      id: "identitySeal",
      name: "identity seal",
      aliases: ["seal", "id seal", "cracked seal"],
      description:
        "Your identity seal is a disk of black resin and brass, cracked across your mother's surname. It still opens minor archive cabinets and proves you exist to machines less sentimental than people.",
    },
    brassTooth: {
      id: "brassTooth",
      name: "brass tooth",
      aliases: ["tooth", "automaton tooth", "winding tooth"],
      locationId: "infirmary",
      conditions: { knowledge: ["automatonTooth"] },
      description:
        "The brass tooth is warm from your palm, ridged on one side and stamped with a tiny number seven. It belongs to a nursery automaton's smile, which is a sentence Veyr Station somehow made ominous.",
      takeText:
        "You pry the [[brass tooth]] from beneath the nursery cot. It comes free with a click like a child finishing a lesson.",
      reveals: { story: [{ name: "A Missing Tooth", description: "You recovered the brass tooth needed to complete the archive automaton's civic lesson." }] },
    },
    softLedgerItem: {
      id: "softLedgerItem",
      name: "soft ledger",
      aliases: ["ledger", "illegal ledger", "soft ledger"],
      conditions: { flags: { gardenOpen: true } },
      description:
        "The ledger is too heavy for its size. Not physically; morally. Each page is a person whom Veyr Station made administratively absent while continuing to praise itself as memory's last shelter.",
      takeText:
        "You take the [[soft ledger]]. The book flexes in your hands, damp at the edges, as if it has been breathing inside the archive wall.",
      reveals: { knowledge: ["softLedger"] },
    },
  },
  knowledge: {
    foundingPattern: {
      id: "foundingPattern",
      name: "founding pattern",
      aliases: ["pattern", "four one seven two motif"],
      description:
        "The station repeats four shelters, one engine, seven seed vaults, and two civic vows as decoration, catechism, and lock language.",
    },
    foundingToll: {
      id: "foundingToll",
      name: "Founding Toll",
      aliases: ["toll", "four one seven two", "4172", "bell sequence"],
      description:
        "The Founding Toll is four, one, seven, two: publicly a civic catechism, privately a wound hidden in arithmetic.",
    },
    mouthBeforeMachine: {
      id: "mouthBeforeMachine",
      name: "mouth before machine",
      aliases: ["mouth", "speak first", "voice before hand"],
      description:
        "Some Veyr mechanisms require spoken witness before their hardware will obey.",
    },
    bellLock: {
      id: "bellLock",
      name: "bell lock",
      aliases: ["choir grille", "grille lock", "bell levers"],
      description:
        "The choir grille in the Chapel of Gauges is a lock disguised as ritual furniture.",
    },
    erasedMother: {
      id: "erasedMother",
      name: "erased mother",
      aliases: ["mother", "absent continuity", "recognized continuity"],
      description:
        "The phrase 'absent from recognized continuity' was used to erase people from legal memory without declaring them dead.",
    },
    automatonTooth: {
      id: "automatonTooth",
      name: "missing automaton tooth",
      aliases: ["missing tooth", "automaton tooth", "nursery tooth"],
      description:
        "A nursery automaton needs a brass tooth to complete its lesson and operate its linked latch.",
    },
    ilyaConviction: {
      id: "ilyaConviction",
      name: "Ilya's conviction",
      aliases: ["ilya", "ration token", "conviction"],
      description:
        "Ione's brother Ilya was punished for using unauthorized heat to warm a sick child.",
    },
    saltChoirSignal: {
      id: "saltChoirSignal",
      name: "Salt Choir signal",
      aliases: ["salt choir", "salt coil", "choir signal"],
      description:
        "Salt Choir wiring can carry messages through thaw weather that ruins official radio.",
    },
    transmissionRite: {
      id: "transmissionRite",
      name: "transmission rite",
      aliases: ["rite", "salt font", "send ledger"],
      description:
        "The Choir's rite is practical: salt for memory, breath for witness, wire for distance, ledger for proof.",
    },
    kestOverride: {
      id: "kestOverride",
      name: "Kest override",
      aliases: ["kest", "override", "ruvan kest"],
      description:
        "Ruvan Kest hid real emergency repair logic beneath ritual language to limit political control over the Tide Engine.",
    },
    engineSequence: {
      id: "engineSequence",
      name: "engine sequence",
      aliases: ["floodgate return witness", "pressure sequence", "repair sequence"],
      description:
        "The Tide Engine can be rebalanced by following Kest's rule: floodgate, return, witness.",
    },
    softLedger: {
      id: "softLedger",
      name: "Soft Ledger",
      aliases: ["ledger", "illegal ledger", "soft ledger"],
      description:
        "The Soft Ledger records citizens erased from official memory, proving the Covenant of Heat preserved power as carefully as names.",
    },
    maraMotherTruth: {
      id: "maraMotherTruth",
      name: "Mara's mother",
      aliases: ["mother truth", "mara mother", "external silence"],
      description:
        "Mara's mother was transferred to 'external silence,' a category for people removed from the station's record without public death.",
    },
    confessionNecessary: {
      id: "confessionNecessary",
      name: "confession before rescue",
      aliases: ["confession", "rescue confession"],
      description:
        "Saving Veyr Station without exposing the Soft Ledger would preserve the lie that made the disaster moral.",
    },
    mandateReleased: {
      id: "mandateReleased",
      name: "released mandate",
      aliases: ["mandate", "emergency mandate"],
      description:
        "The emergency mandate now permits external signal, evacuation, and archive transfer.",
    },
    freeMelt: {
      id: "freeMelt",
      name: "Free Melt",
      aliases: ["outside", "free melt horizon", "barges"],
      description:
        "The Free Melt is the loose world forming along open water beyond the old ice jurisdictions.",
    },
    choirGarden: {
      id: "choirGarden",
      name: "Choir garden",
      aliases: ["garden names", "under ice garden"],
      description:
        "The Under-ice Garden became a Salt Choir memorial where erased people were preserved on plant labels.",
    },
    sendLedger: {
      id: "sendLedger",
      name: "send the ledger",
      aliases: ["send ledger", "transmit ledger", "send proof"],
      description:
        "Ione wants the Soft Ledger transmitted whole, not summarized by the station that profited from hiding it.",
    },
  },
  actions: [
    {
      item: "four one seven two",
      aliases: ["4172", "four, one, seven, two", "founding toll", "founding sequence"],
      with: "",
      locationId: "chapelGauges",
      conditions: { knowledge: ["foundingToll"], flags: { archiveOpen: false } },
      text:
        "You speak the numbers into the chapel air: four, one, seven, two.\n\nThe small bells answer first, then the cracked great bell gives a sound too low to be heard cleanly. The choir grille unlocks one lever at a time. Brother Caldus bows his head as the ironwork opens, and the station exhales paper-cold air from the archive dark.",
      effects: { flags: { archiveOpen: true } },
      reveals: {
        story: [{ name: "The Archive Opened", description: "You used the Founding Toll to open the choir grille and wake the Archive Stacks." }],
      },
    },
    {
      item: "brassTooth",
      with: "nursery automaton",
      aliases: ["tooth", "automaton tooth"],
      locationId: "archiveStacks",
      requiresInventory: "brassTooth",
      conditions: { flags: { gardenOpen: false } },
      text:
        "You press the brass tooth into the automaton's broken smile. The clockwork nurse shudders, winds itself from some hidden spring, and recites in a child's bright voice: 'Four shelters, one engine, seven seeds, two vows. A future is not owned by the hands that lock it.'\n\nThe seed-vault door unlatches. Damp green air rolls into the stacks, carrying the smell of soil and brine. A gray ledger slides from the automaton's back compartment and lands on the table with a soft, accusing weight.",
      effects: { flags: { gardenOpen: true }, removeInventory: ["brassTooth"] },
      reveals: {
        inventory: ["softLedgerItem"],
        knowledge: ["softLedger", "transmissionRite"],
        story: [{ name: "The Garden Door", description: "Repairing the nursery automaton opened the seed-vault door and revealed the Soft Ledger." }],
      },
    },
    {
      item: "floodgate return witness",
      aliases: ["engine sequence", "floodgate, return, witness", "floodgate return witness"],
      with: "",
      locationId: "engineNave",
      conditions: { knowledge: ["engineSequence"], flags: { engineBalanced: false } },
      text:
        "You follow Kest's rule aloud because the machine was built to distrust silent repairs. Floodgate: Pavel breaks the red wheel's chain and pressure screams into the wider pipe. Return: you haul the blue wheel until brine hammers through the lower manifold. Witness: you press your cracked identity seal to the legal governor and say your name.\n\nThe amber veto light goes dark. The Tide Engine stumbles once, twice, then catches a deep rhythm that travels through your bones. Warm rain begins falling from the nave ceiling.",
      effects: { flags: { engineBalanced: true } },
      reveals: {
        story: [{ name: "The Engine Steadied", description: "You rebalanced the Tide Engine by applying Kest's floodgate, return, witness sequence." }],
      },
    },
    {
      item: "softLedgerItem",
      aliases: ["soft ledger", "ledger", "illegal ledger"],
      with: "governor persona",
      locationId: "governorReliquary",
      requiresInventory: "softLedgerItem",
      conditions: { flags: { mandateReleased: false } },
      text:
        "You hold the ledger before the speaking horn and read until the room's warm vents falter. Names become evidence. Evidence becomes contradiction. Contradiction becomes law.\n\nThe governor persona tries to preserve the Covenant and finds the Covenant has eaten its own proof. The emergency mandate cracks open on the plinth.",
      effects: { flags: { mandateReleased: true } },
      reveals: {
        knowledge: ["mandateReleased"],
        story: [{ name: "Law Confessed", description: "You forced the governor persona to release the emergency mandate by confronting it with the Soft Ledger." }],
      },
    },
    {
      item: "softLedgerItem",
      aliases: ["soft ledger", "ledger", "illegal ledger", "signal", "lantern"],
      with: "signal lantern",
      locationId: "signalLantern",
      requiresInventory: "softLedgerItem",
      conditions: { flags: { engineBalanced: true, mandateReleased: true } },
      text:
        "You set the Soft Ledger into the lantern cradle. The salt coil drinks brine from the font flask Ione pressed into your hand without ceremony. The lens warms. Names turn to pulses of white light.\n\nVeyr Station does not ask for rescue as a victim. It speaks as witness and culprit both. Across the black water, one light answers. Then another. Then a chain of them, low and practical on the Free Melt horizon.\n\nBehind you, bells begin ringing without sequence. For once, they are not counting debt.",
      effects: {
        win: {
          text:
            "Ending: The Thaw. The Free Melt barges turn toward Veyr Station, guided by a confession bright enough to cross the weather. The station may survive. More importantly, its lie will not.",
          story: {
            name: "Ending: The Thaw",
            description:
              "You transmitted the Soft Ledger with the evacuation signal, saving Veyr Station as evidence instead of monument.",
          },
        },
      },
    },
  ],
};
