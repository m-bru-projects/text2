# Text Adventure Engine

Browser-based text adventure engine with a separate sample game.

## Run

```sh
python3 -m http.server 8000
```

Open `http://127.0.0.1:8000`.

## Structure

- `index.html` mounts the app.
- `src/app.js` handles DOM rendering, command history, tab switching, and game selection.
- `src/engine/AdventureEngine.js` owns game state, turns, movement, object interaction, conversations, knowledge, inventory, story notes, and atmospheric events.
- `src/engine/commands.js` parses plain text commands.
- `src/engine/text.js` renders highlighted nouns marked as `[[noun]]`.
- `src/games/kepler-station.js` is the current grounded larger test story.
- `src/games/rainglass-house.js` is an older supernatural test story.
- `src/games/lantern-room.js` is a short standalone regression story with a winning condition.
- `src/games/index.js` is the game registry. Add future games here.

Locations can define `map: { x, y }` coordinates for the notebook map. Coordinates are percentages from 0 to 100. If a location has no map coordinates, the engine falls back to a simple grid position.

## Current Commands

- `look`
- `examine noun`
- `read noun`
- `take noun`
- `open noun`
- `align noun to topic`
- `send noun`
- `directions`
- `look direction`
- `north`, `south`, `east`, `west`, `up`, `down`, `in`, `out`
- `n`, `s`, `e`, `w`, `u`, `d`
- `talk to person`
- `ask person about topic`
- `use item with noun`
- `use item on noun`
- `say phrase`
- `speak phrase`
- `say phrase to noun`
- `show item to person`
- `put item in noun`
- `open noun with item`
- `go direction`
- `inventory`

## Game Data Notes

Games define locations, people, items, knowledge, actions, and start state. Reveals can add knowledge, inventory, and story entries. Effects currently support flags, knowledge removal, and inventory removal. Location exits can be locked behind conditions, which lets object interactions reshape the reachable world.

Use flags for transient discoveries or mechanical state, such as making an item available after inspecting a container. Use knowledge for facts the player can raise in conversation. Set `conversation: false` on internal knowledge that should not appear in the Knowledge notebook.

Actions can end a game through `effects.win`, which records the ending and stops further world-changing commands.
