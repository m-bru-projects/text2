import { normalize, parseCommand } from "./commands.js";

const BASE_SUGGESTIONS = ["look", "directions", "look direction", "examine noun", "talk to person", "ask person about topic", "go direction", "inventory"];

export class AdventureEngine {
  constructor(game) {
    this.game = game;
    this.state = {
      locationId: game.start.locationId,
      turn: 0,
      visited: new Set(),
      inventory: new Set(game.start.inventory ?? []),
      knowledge: new Set(game.start.knowledge ?? []),
      flags: { ...(game.start.flags ?? {}) },
      ended: false,
      ending: null,
      log: [],
      story: [],
      talkedTo: new Set(),
    };

    this.visit(this.state.locationId);
    this.addLog("system", game.intro);
    this.describeLocation();
  }

  getView() {
    const location = this.currentLocation();
    return {
      log: this.state.log,
      status: this.status(location),
      suggestions: BASE_SUGGESTIONS,
      map: this.visibleLocations().map((place) => ({
        name: place.name,
        current: place.id === location.id,
      })),
      story: this.state.story,
      people: this.visiblePeople(),
      places: this.visibleLocations().map((place) => ({
        name: place.name,
        description: place.summary ?? this.stateText(place, "description"),
      })),
      knowledge: this.visibleKnowledge(),
      inventory: this.itemsFromIds(this.game.items, this.state.inventory),
    };
  }

  handleCommand(rawCommand) {
    this.addLog("command", rawCommand);

    if (this.state.ended) {
      this.addLog("system", "The ending has settled. Choose another archive entry to begin again.");
      return;
    }

    const command = parseCommand(rawCommand);

    if (command.intent === "look") this.describeLocation();
    else if (command.intent === "inventory") this.showInventory();
    else if (command.intent === "directions") this.describeDirections();
    else if (command.intent === "go") this.go(command.target);
    else if (command.intent === "examine") this.examine(command.target);
    else if (command.intent === "take") this.take(command.target);
    else if (command.intent === "talk") this.talk(command.target);
    else if (command.intent === "ask") this.ask(command.target, command.topic);
    else if (command.intent === "use") this.use(command.target, command.withTarget);
    else this.addLog("failure", "The thought will not settle into an action. Try a plain command.");

    if (!this.state.ended && !["unknown", "inventory", "directions"].includes(command.intent)) this.afterTurn();
  }

  describeLocation() {
    const location = this.currentLocation();
    const content = this.stateContent(location, "description");
    this.addLog("narrative", content.text);
    this.reveal(content.reveals);
    this.applyEffects(content.effects);
    this.describeDirections({ quiet: true });
  }

  showInventory() {
    const inventory = this.itemsFromIds(this.game.items, this.state.inventory);
    if (!inventory.length) {
      this.addLog("failure", "Your pockets hold nothing useful.");
      return;
    }
    this.addLog("system", `You are carrying ${inventory.map((item) => `[[${item.name}]]`).join(", ")}.`);
  }

  go(target) {
    const exit = this.findExit(target);

    if (!exit) {
      this.addLog("failure", "You cannot find a way there from here.");
      return;
    }

    const exitConfig = exit.config;
    if (!this.exitIsOpen(exitConfig)) {
      this.addLog("failure", exitConfig.lockedText ?? "The way is not open yet.");
      return;
    }

    this.state.locationId = exit.destinationId;
    this.visit(exit.destinationId);
    this.describeLocation();
  }

  examine(target) {
    const exit = this.findExit(target);
    if (exit) {
      this.describeExit(exit);
      return;
    }

    const noun = this.findNoun(target);
    if (!noun) {
      this.addLog("failure", "You study the darkness, but it gives you no useful edge.");
      return;
    }

    const content = this.stateContent(noun, "description");
    this.addLog("narrative", content.text);
    this.reveal(content.reveals);
    this.applyEffects(content.effects);
  }

  describeDirections(options = {}) {
    const exits = this.currentExits();
    if (!exits.length) {
      if (!options.quiet) this.addLog("failure", "You see no clear way out.");
      return;
    }

    const labels = exits.map((exit) => {
      const place = this.game.locations[exit.destinationId];
      const status = this.exitIsOpen(exit.config) ? "" : " (closed)";
      return `${exit.direction} to [[${place.name}]]${status}`;
    });

    this.addLog("system", `Ways from here: ${labels.join("; ")}.`);
  }

  describeExit(exit) {
    const open = this.exitIsOpen(exit.config);
    const fallback = open
      ? `To the ${exit.direction}, you can make out [[${this.game.locations[exit.destinationId].name}]].`
      : (exit.config.lockedText ?? "The way is not open yet.");
    const field = open ? "preview" : "lockedPreview";
    const content = this.stateContent(exit.config, field, fallback);
    const hasAuthoredPreview = Boolean(exit.config[field] || exit.config[`${field}States`]?.length);

    this.addLog(open || hasAuthoredPreview ? "narrative" : "failure", content.text);
    this.reveal(content.reveals);
    this.applyEffects(content.effects);
  }

  take(target) {
    const item = this.findItem(target);
    if (!item || !this.isAccessible(item)) {
      this.addLog("failure", "That is not something you can take here.");
      return;
    }

    this.state.inventory.add(item.id);
    this.addLog("success", `You take the [[${item.name}]].`);
    this.reveal(item.reveals);
    this.applyEffects(item.effects);
  }

  talk(target) {
    const person = this.findPerson(target);
    if (!person || !this.isAccessible(person)) {
      this.addLog("failure", "No one answers to that name here.");
      return;
    }

    this.state.talkedTo.add(person.id);
    this.addLog("dialogue", person.dialogue.default);
    this.reveal(person.reveals);
    this.applyEffects(person.effects);
  }

  ask(target, topic) {
    const person = this.findPerson(target);
    if (!person || !this.isAccessible(person)) {
      this.addLog("failure", "There is no one here to ask.");
      return;
    }

    const resolvedTopic = this.resolveConversationTopic(topic);
    const topicKey = this.findDialogueTopicKey(person, topic, resolvedTopic);
    const answer = topicKey ? person.dialogue.topics[topicKey] : null;
    if (!answer) {
      if (!resolvedTopic && !topicKey) {
        this.addLog("dialogue", `${person.name} does not follow what you mean.`);
        return;
      }

      const topicName = resolvedTopic?.name ? `[[${resolvedTopic.name}]]` : "that";
      this.addLog("dialogue", person.dialogue.noInterest ?? `${person.name} has nothing useful to say about ${topicName}.`);
      return;
    }

    if (answer.requiresKnowledge && !this.state.knowledge.has(answer.requiresKnowledge)) {
      this.addLog("dialogue", answer.lockedText ?? `${person.name} watches you with patient suspicion.`);
      return;
    }

    this.addLog("dialogue", answer.text);
    this.reveal(answer.reveals);
    this.applyEffects(answer.effects);
  }

  use(target, withTarget) {
    const action = this.game.actions.find((candidate) => {
      return this.actionTermMatches(candidate.item, target, candidate.aliases) && this.actionTermMatches(candidate.with ?? "", withTarget);
    });

    if (!action || !this.canRunAction(action)) {
      this.addLog("failure", "Nothing changes.");
      return;
    }

    this.addLog("narrative", action.text);
    this.reveal(action.reveals);
    this.applyEffects(action.effects);
  }

  afterTurn() {
    this.state.turn += 1;
    const event = this.findAtmosphericEvent();
    if (event) this.addLog("atmosphere", event.text);
  }

  findAtmosphericEvent() {
    const location = this.currentLocation();
    const candidates = (location.atmosphere ?? []).filter((event) => {
      const every = event.everyTurns ?? 3;
      return this.state.turn > 0 && this.state.turn % every === 0 && this.conditionsMet(event.conditions);
    });

    if (!candidates.length) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  reveal(reveals = {}) {
    for (const id of reveals.knowledge ?? []) this.state.knowledge.add(id);
    for (const id of reveals.inventory ?? []) this.state.inventory.add(id);
    for (const item of reveals.story ?? []) this.addStory(item);
  }

  applyEffects(effects = {}) {
    for (const [key, value] of Object.entries(effects.flags ?? {})) {
      this.state.flags[key] = value;
    }
    for (const id of effects.removeKnowledge ?? []) this.state.knowledge.delete(id);
    for (const id of effects.removeInventory ?? []) this.state.inventory.delete(id);
    if (effects.win) this.win(effects.win);
  }

  win(ending) {
    this.state.ended = true;
    this.state.ending = ending;
    this.addLog("success", ending.text ?? "You have reached an ending.");
    if (ending.story) this.addStory(ending.story);
  }

  addStory(item) {
    if (this.state.story.some((entry) => entry.name === item.name)) return;
    this.state.story.push(item);
  }

  addLog(kind, text) {
    this.state.log.push({ kind, text });
  }

  visit(locationId) {
    this.state.visited.add(locationId);
  }

  currentLocation() {
    return this.game.locations[this.state.locationId];
  }

  visibleLocations() {
    return Object.values(this.game.locations).filter((place) => this.state.visited.has(place.id));
  }

  stateText(entry, field) {
    return this.stateContent(entry, field).text;
  }

  stateContent(entry, field, fallbackText = "") {
    const variants = entry[`${field}States`] ?? [];
    const match = variants.find((variant) => this.conditionsMet(variant.conditions));

    if (!match) {
      return {
        text: entry[field] ?? fallbackText,
        reveals: entry.reveals,
        effects: entry.effects,
      };
    }

    return {
      text: match.text ?? match[field] ?? entry[field],
      reveals: match.reveals ?? entry.reveals,
      effects: match.effects ?? entry.effects,
    };
  }

  currentExits() {
    return Object.entries(this.currentLocation().exits ?? {}).map(([direction, config]) => {
      const normalizedConfig = typeof config === "string" ? { to: config } : config;
      return {
        direction,
        config: normalizedConfig,
        destinationId: normalizedConfig.to,
      };
    });
  }

  findExit(target) {
    return this.currentExits().find((exit) => {
      const place = this.game.locations[exit.destinationId];
      return [
        exit.direction,
        ...(exit.config.aliases ?? []),
        place.id,
        place.name,
        ...(place.aliases ?? []),
      ].some((name) => normalize(name) === target);
    });
  }

  exitIsOpen(exitConfig) {
    return this.conditionsMet(exitConfig.conditions);
  }

  visiblePeople() {
    return Object.values(this.game.people).filter((person) => this.state.talkedTo.has(person.id) || this.isAccessible(person));
  }

  visibleKnowledge() {
    return this.itemsFromIds(this.game.knowledge, this.state.knowledge).filter((item) => item.conversation !== false);
  }

  visibleInventory() {
    return this.itemsFromIds(this.game.items, this.state.inventory);
  }

  resolveConversationTopic(topic) {
    const pools = [
      ...this.visibleLocations().map((entry) => ({ ...entry, type: "place" })),
      ...this.visibleKnowledge().map((entry) => ({ ...entry, type: "knowledge" })),
      ...this.visibleInventory().map((entry) => ({ ...entry, type: "item" })),
    ];

    return pools.find((entry) => this.matches(entry, topic)) ?? null;
  }

  findDialogueTopicKey(person, topic, resolvedTopic) {
    return Object.keys(person.dialogue.topics ?? {}).find((key) => {
      if (normalize(key) === topic) return true;
      if (!resolvedTopic) return false;
      return this.matches(resolvedTopic, normalize(key));
    });
  }

  findNoun(target) {
    const location = this.currentLocation();
    const pools = [
      ...Object.values(location.nouns ?? {}),
      ...Object.values(this.game.items),
      ...Object.values(this.game.people),
    ];
    return pools.find((entry) => this.matches(entry, target) && this.isAccessible(entry));
  }

  findItem(target) {
    return Object.values(this.game.items).find((entry) => this.matches(entry, target));
  }

  findPerson(target) {
    return Object.values(this.game.people).find((entry) => this.matches(entry, target));
  }

  actionTermMatches(term, target, extraAliases = []) {
    if (!term && !target) return true;
    if (!target) return false;

    const directEntry = this.findGameEntry(term);
    if (directEntry && this.matches({ ...directEntry, aliases: [...(directEntry.aliases ?? []), ...extraAliases] }, target)) return true;

    return [term, ...extraAliases].filter(Boolean).some((name) => normalize(name) === target);
  }

  findGameEntry(term) {
    const entries = [
      ...Object.values(this.game.items ?? {}),
      ...Object.values(this.game.people ?? {}),
      ...Object.values(this.game.knowledge ?? {}),
      ...Object.values(this.game.locations ?? {}),
      ...Object.values(this.currentLocation().nouns ?? {}),
    ];

    return entries.find((entry) => this.matches(entry, normalize(term)));
  }

  matches(entry, target) {
    return [entry.id, entry.name, ...(entry.aliases ?? [])].filter(Boolean).some((name) => normalize(name) === target);
  }

  isAccessible(entry) {
    return this.conditionsMet(entry.conditions) && (!entry.locationId || entry.locationId === this.state.locationId);
  }

  canRunAction(action) {
    if (action.locationId && action.locationId !== this.state.locationId) return false;
    if (action.requiresInventory && !this.state.inventory.has(action.requiresInventory)) return false;
    return this.conditionsMet(action.conditions);
  }

  conditionsMet(conditions = {}) {
    for (const id of conditions.knowledge ?? []) {
      if (!this.state.knowledge.has(id)) return false;
    }
    for (const id of conditions.inventory ?? []) {
      if (!this.state.inventory.has(id)) return false;
    }
    for (const [key, value] of Object.entries(conditions.flags ?? {})) {
      if (this.state.flags[key] !== value) return false;
    }
    return true;
  }

  itemsFromIds(source, ids) {
    return [...ids].map((id) => source[id]).filter(Boolean);
  }

  status(location) {
    const state = this.game.status(this.state);
    return [location.name.toUpperCase(), ...state.map((item) => item.toUpperCase())];
  }
}
