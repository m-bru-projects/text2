# Text Adventure Engine Principles

## Scope

This is a browser-based text adventure engine that can load multiple games at start, with more games added later through a game registry.

The engine should stay clear and scalable: reusable runtime code belongs in the engine, while story-specific rooms, items, knowledge, people, dialogue, and actions belong in separate game files.

## Interaction

The game is text-first. The player types commands rather than choosing from context-specific buttons.

Supported command styles should remain forgiving:

- `look`
- `look noun`
- `look at noun`
- `examine noun`
- `read noun`
- `take noun`
- `directions`
- `look direction`
- `north`, `south`, `east`, `west`, `up`, `down`, `in`, `out`
- `talk to person`
- `talk to person about topic`
- `ask person about topic`
- `use item with noun`
- `use item on noun`
- `go direction`
- `inventory`

The parser should prefer the player's likely intent. For example, `look gate` should inspect the gate, while plain `look` should describe the current location.

## Navigation

Players should be able to understand available movement without guessing.

The `directions` command should list the visible exits from the current location. It can include blocked exits when the player can perceive them, but it should clearly mark that they are not currently passable.

The normal `look` command should also show possible exits after the room description, so the player does not need a separate command to understand basic movement.

The player should also be able to inspect a direction with commands such as `look north`. This should provide a glimpse of what lies that way without moving the player. Direction previews can have different text when an exit is blocked, opened, changed, or otherwise affected by world state.

Movement should accept both `go north` and bare direction commands such as `north`, `n`, `up`, or `down`. Movement and direction previews should share the same exit definitions, aliases, and conditions so the navigational prose and the actual movement rules stay aligned.

## Nouns And Examination

Nouns and important events are highlighted in the main text.

Almost all visible nouns should be examinable, including nouns revealed by examining other nouns. Looking at objects should be a primary way to expose new details, unlock world state, and discover conversation topics.

## Knowledge, Flags, And Story

Knowledge is for facts the player can use in conversation. The Knowledge notebook should not become a dump of every internal discovery.

Use flags for transient discoveries or mechanical state, such as:

- revealing that an item is available
- opening a route
- recording that an object has been inspected
- tracking one-off world changes

Use story entries for important progress beats that the player may want to remember, even if they are not conversation topics.

Knowledge can be hidden from the Knowledge notebook with `conversation: false` when it is useful internally but not something the player should naturally raise with people.

Example: seeing a glimmer under a hatch should be a flag that makes a token available, not a Knowledge entry. Taking or examining the token can create Knowledge if that token becomes something people can discuss.

## Conversation

In general, the player should be able to talk to people about:

- visited places
- visible Knowledge entries
- items currently in inventory

Characters do not need bespoke answers for every possible topic. If a topic is valid but irrelevant to that character, they can give a neutral "doesn't care about that" response in their own voice.

Authored dialogue can still require specific knowledge, inventory, flags, or world state before it unlocks. Locked dialogue should give an in-world hint rather than a mechanical error.

## Objects And World Effects

Object interaction and world interaction are core progress systems. Using, taking, examining, or talking about things can have large effects on the world around the player.

Effects may change flags, reveal knowledge, add story entries, add or remove inventory, open routes, or alter what future commands can do.

Use commands are interpreted as action lookups in the current game data. `use item with target` and `use item on target` are equivalent. The parser normalizes both sides, then the engine searches for an action whose `item` or action alias matches the first side, whose `with` value matches the second side, and whose location, inventory, knowledge, and flag conditions are satisfied.

Direct manipulation verbs such as `open cabinet`, `press switch`, `turn wheel`, `align lantern`, or `send signal` are interpreted as `use noun` with no secondary target. More specific commands such as `align lantern to Aster` are interpreted as `use lantern with Aster`.

If an action needs an item in inventory, it should declare that requirement explicitly. If no matching valid action exists, the engine should give a quiet failure such as "Nothing changes."

World changes must also change future prose. If an action opens a gate, breaks a lock, moves an object, changes a character's attitude, or otherwise alters the fiction, later `look` and `examine` output should describe the new state rather than repeating stale default text.

Game data should support conditional descriptions for locations, objects, people, and other examinable nouns. These descriptions should be driven by the same flags, inventory, and knowledge conditions that drive mechanics, so the written world and the simulated world stay aligned.

## Endings

Short games should still have a real ending or win condition. The final state should be represented in game data, not only implied by prose.

When a game reaches an ending, the engine should record it, show a clear ending message, and stop accepting further world-changing commands for that run.

## Atmospheric Events

Atmospheric events occur every few turns, with some randomness.

They are context-specific and location-specific. They should be visually distinct in the UI, but their prose should not literally start with labels such as `Atmosphere:`.

Atmospheric events should add mood and pressure without pretending to be normal command feedback.

## Feedback Style

Different output types should remain visually distinct:

- Narrative, successful actions, and item-taking should use the main literary text style.
- Dialogue should feel like spoken prose and remain easy to scan.
- Failed or blocked commands should use a quieter feedback style.
- Atmospheric events should have their own restrained visual treatment.

Taking an item should not look like a failed command.
