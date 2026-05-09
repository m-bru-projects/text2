# Text Adventure Design Principles

## Narrative Soul
A good story in this engine must have "soul." It should move beyond pragmatic task-solving into an evocative, lived-in experience.

- **Sensory Depth**: Go beyond visual descriptions. Include smells (ozone, dry lavender, damp earth), sounds (the groan of a hull, distant laughter), and physical sensations (the grit of sand, a throbbing bruise).
- **Lived-in Worlds**: Locations should show the passage of time. Use clutter, stains, and personal artifacts to tell a story of who was there before.
- **The "Why" vs the "What"**: Don't just describe a door; describe why it's scratched or why it smells like old wax.
- **Dramatic Consequence**: Interactions that change the environment (opening a sealed bay, patching a hull, restoring power) should have heavy narrative weight. These state changes are opportunities for dramatic flair—shifting the atmosphere, changing the lighting, or altering the world's sensory profile.
- **Dynamic Echoes**: The environment should not be static. Use state-driven atmospheric events to show the world responding to the crisis. As a situation escalates (e.g., a reactor failing), the random "echoes" in every room should become more intense and frequent.
- **Global Vibe**: Use global world states to alter the prose of every location. A "Solar Flare" or "Deep Night" state should change the lighting and mood across the entire game, ensuring a cohesive and shifting atmosphere.
- **Narrative Anchors**: A story must ground the player in a wider universe. Implicitly build the world through brand names, historical eras (e.g., "The Pre-Collapse"), and specific colony names. Every game should answer three questions for the player: What is the immediate crisis? What is the human history? What is the state of the wider world?

## Character Humanity
Characters are not just hint machines or gatekeepers; they are people with history.

- **Backstory**: Every character should have a life outside the current crisis. Allow the player to ask about their past, their family, and their feelings.
- **Emotional Stakes**: Conversations should reveal the character's stakes in the world. Use tone and subtext to show fear, grief, or hope.
- **Dynamic Presence**: People should react to the player's progress and the changing environment. Their descriptions and dialogue should shift as the story reaches critical points.
- **Active Life**: NPCs should feel like they have agency. Whenever possible, give them routines or self-directed actions (e.g., moving between rooms, performing tasks) so they don't feel like static "statues" waiting for the player.

## Objects as Storytellers
Objects are windows into the world's history and its inhabitants' lives.

- **Narrative Weight**: An object shouldn't just be a key. It should be a locket with initials, a book with a handwritten note, or a piano missing a specific note that represents a lost memory.
- **Responsive Examination**: Every highlighted noun (`[[noun]]`) in the prose must be examinable. This includes nouns appearing in room descriptions, exit previews, and even the `lockedPreview` of a closed door. If the player can see the word, they must be able to `look` at it.
- **Narrative Dialogue**: NPCs should be able to discuss the world around them. Major environmental objects (like a sealed vault door or a flickering terminal) should always be valid conversation topics for nearby characters, helping to integrate the world and the people.
- **Intuitive Failure**: If a player attempts a logical but incorrect action (e.g., trying to use a small tool where a large one is needed), provide a unique narrative response instead of a generic error. This guides the player toward the correct solution while maintaining the game's "soul."
- **Noun Nesting**: Create a sense of tactile discovery through hierarchical examination. Looking at a desk reveals a drawer; looking at the drawer reveals a hidden compartment. This "peeling back" of the world makes it feel physically real.
- **Historical Ghosts (Optional)**: For added flavor, contrast a room's current state with its past. Mention what a room *was* (a ballroom, a nursery) to heighten the emotional weight of what it *is* now (a graveyard, a flooded shell).
- **Layered Lore**: Use non-interactive media—documents, logs, paintings, posters, and holographic recordings—to flesh out the narrative anchors. These items should provide the "why" and "where" of the universe, enriching the experience for players who take the time to study them.
- **Forgiving Interaction**: Assume the player is part of the world. Support exhaustive synonyms, initials, and common-sense aliases so the player never has to "guess the verb" or the specific word.

## Navigation & Discovery
The player should feel like an explorer, not a surveyor.

- **Descriptive Exits**: Exits should be part of the narrative prose, not a separate UI list. Use `previews` to give the player a glimpse of the mood in the next room.
- **World Consistency**: When the world changes (a door opens, a leak is patched), the room descriptions must update to reflect the new reality. Never repeat stale text.
- **Knowledge Lifecycle**: Distinguish between transient flags (mechanical state) and Knowledge (narrative facts). Knowledge represents things the player can actually discuss with people.

## Story Design
- **Puzzle Progression**: A story should never be a single monolithic puzzle. It should be a series of interconnected or parallel puzzles that build momentum toward the ending. Solving one mystery should naturally provide the clues or items needed for the next.
- **Critical Path & Clues**: Ensure every puzzle is clued through atmospheric details or conversation before it becomes a blocker.
- **Pacing**: Alternate moments of tense investigation with atmospheric release and narrative payoff.
- **Endings**: Every story should have a definitive emotional payoff that is recorded in the game's story log.
