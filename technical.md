# Technical Specification: Text Adventure Engine

## Data Structure

### Game Configuration
Each game is an object containing:
- `id`: Unique identifier.
- `title`: Display title.
- `intro`: Narrative text shown at start.
- `start`: Initial state (`locationId`, `inventory`, `knowledge`, `flags`).
- `status`: Function returning an array of status lines.
- `atmosphere`: (Optional) Array of global periodic events.
- `descriptionStates`: (Optional) Global conditional description modifiers (e.g., for "Global Vibes").
- `locations`: Map of location objects.
- `people`: Map of person objects.
- `items`: Map of item objects.
- `knowledge`: Map of knowledge objects.
- `actions`: Array of action objects.

### Locations
- `id`, `name`, `summary`.
- `aliases`: Array of synonyms for the location.
- `description`: Main text. Supports `[[noun]]` highlighting.
- `descriptionStates`: Conditional descriptions based on `flags`, `inventory`, or `knowledge`.
- `exits`: Map of direction keys (north, south, etc.) to exit objects.
- `nouns`: Map of examinable objects specific to the room.
- `atmosphere`: Array of periodic events (`everyTurns`, `text`, `conditions`).

### Exits
- `to`: Destination location ID.
- `aliases`: Synonyms for the exit.
- `preview`: Text shown when looking at the exit.
- `lockedPreview`: Text shown when the exit is closed.
- `lockedText`: Feedback when attempting to move through a closed exit.
- `conditions`: Requirements to use/see the exit.

### Nouns & Items
- `name`, `description`.
- `aliases`: Comprehensive synonyms, initials, and partial names.
- `locationId`: (Items only) Initial location or `null` for inventory.
- `conditions`: Requirements to see/interact.
- `reveals`: Knowledge, items, or story entries discovered on examination.
- `effects`: Flags or inventory changes triggered on examination.

### Conversation
- `requiresKnowledge`: Knowledge ID required to unlock the topic.
- Topic keys should match the `id` of the Knowledge or Item discussed.
- `text`: The character's response.
- `lockedText`: Hint shown if the topic is known but requirements aren't met.

### Actions
- `item`: Primary noun or item ID.
- `with`: (Optional) Secondary target noun or item ID.
- `requiresInventory`: Item ID required to perform the action.
- `conditions`: World state requirements.
- `text`: Narrative feedback.
- `effects`: State changes (`flags`, `removeInventory`, `movePerson`, `win`).

### Interaction Logic

### Global Vibes & Atmosphere
- **Global Description**: The `game.descriptionStates` allow the engine to prepend global prose (e.g., "The solar flare makes the walls hum") to every location description based on world state.
- **Global Atmosphere**: The `game.atmosphere` array allows for events that can trigger anywhere in the game world, ideal for systemic events like reactor groans or station-wide announcements.

### Noun Nesting
Tactile discovery is achieved by using the `reveals` property on nouns. Examining a primary noun (e.g., `[[desk]]`) can reveal a child noun or item (e.g., `[[drawer]]`) by setting a flag or simply mentioning it in the description.

### NPC Routines
NPCs can be moved between locations using the `movePerson` effect in actions or dialogue reveals.

### Command Parsing
The engine normalizes input (lowercase, trim, remove stop words like "the", "at").
- `examine target`: Checks location nouns, items (in room or inventory), and people.
- `use item with target`: Matches against defined `actions`. Direct manipulation (e.g., `open hatch`) is normalized to `use hatch`.
- `talk to person about topic`: Resolves topic against visible knowledge/items/places, then looks up the corresponding key in the person's `dialogue.topics`.

### State Management
- **Flags**: Boolean or numeric values for mechanical state.
- **Knowledge**: Narrative facts used as conversation keys. Use `conversation: false` to hide from the UI.
- **Story**: Persistent log of major narrative milestones.

### Movement
Movement works via `go direction` or bare directions. Navigate using `direction`, `destination name`, or `exit aliases`.
