import { AdventureEngine } from "./engine/AdventureEngine.js";
import { renderText } from "./engine/text.js";
import { games } from "./games/index.js";

const transcript = document.querySelector("#transcript");
const statusBar = document.querySelector("#statusBar");
const commandForm = document.querySelector("#commandForm");
const commandInput = document.querySelector("#commandInput");
const suggestions = document.querySelector("#suggestions");
const tabs = document.querySelector("#tabs");
const tabPanel = document.querySelector("#tabPanel");
const gameSelect = document.querySelector("#gameSelect");

const tabNames = ["Map", "Story", "People", "Places", "Knowledge", "Inventory"];
let activeTab = "Map";
let engine = null;
let commandHistory = [];
let historyIndex = -1;

function boot() {
  games.forEach((game, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = game.title;
    gameSelect.append(option);
  });

  tabs.replaceChildren(
    ...tabNames.map((name) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = name;
      button.className = name === activeTab ? "active" : "";
      button.addEventListener("click", () => {
        activeTab = name;
        render();
      });
      return button;
    }),
  );

  gameSelect.addEventListener("change", () => loadGame(games[Number(gameSelect.value)]));
  commandForm.addEventListener("submit", onCommand);
  commandInput.addEventListener("keydown", onInputKeydown);
  if (games.length) loadGame(games[0]);
  else renderEmptyArchive();
}

function loadGame(game) {
  engine = new AdventureEngine(game);
  commandHistory = [];
  historyIndex = -1;
  render();
  commandInput.focus();
}

function onCommand(event) {
  event.preventDefault();
  if (!engine) return;
  const command = commandInput.value.trim();
  if (!command) return;
  commandHistory.push(command);
  historyIndex = commandHistory.length;
  engine.handleCommand(command);
  commandInput.value = "";
  render();
}

function onInputKeydown(event) {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    historyIndex = Math.max(0, historyIndex - 1);
    commandInput.value = commandHistory[historyIndex] ?? "";
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    historyIndex = Math.min(commandHistory.length, historyIndex + 1);
    commandInput.value = commandHistory[historyIndex] ?? "";
  }
}

function render() {
  if (!engine) {
    renderEmptyArchive();
    return;
  }

  const view = engine.getView();
  statusBar.textContent = view.status.join(" · ");
  suggestions.textContent = `Try: ${view.suggestions.join(", ")}`;

  transcript.replaceChildren(
    ...view.log.map((entry) => {
      const block = document.createElement("section");
      block.className = `entry ${entry.kind}`;
      block.innerHTML = renderText(entry.text);
      return block;
    }),
  );
  transcript.scrollTop = transcript.scrollHeight;

  for (const button of tabs.children) {
    button.classList.toggle("active", button.textContent === activeTab);
  }
  tabPanel.replaceChildren(renderTab(activeTab, view));
}

function renderTab(tab, view) {
  if (tab === "Map") return renderMap(view);
  if (tab === "Story") return renderList("Story", view.story);
  if (tab === "People") return renderList("People", view.people);
  if (tab === "Places") return renderList("Places", view.places);
  if (tab === "Knowledge") return renderList("Knowledge", view.knowledge);
  return renderList("Inventory", view.inventory);
}

function renderEmptyArchive() {
  statusBar.textContent = "NO ARCHIVES LOADED";
  suggestions.textContent = "Add a game to src/games and register it in src/games/index.js.";
  gameSelect.disabled = true;
  commandInput.disabled = true;
  commandInput.placeholder = "No game selected";

  transcript.replaceChildren(emptyMessage("No stories are currently installed."));
  tabPanel.replaceChildren(renderList(activeTab, []));
}

function emptyMessage(text) {
  const block = document.createElement("section");
  block.className = "entry system";
  block.textContent = text;
  return block;
}

function renderMap(view) {
  const wrap = document.createElement("div");
  wrap.className = "map";
  const byId = new Map(view.map.locations.map((place) => [place.id, place]));
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "map-lines");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");

  for (const connection of view.map.connections) {
    const from = byId.get(connection.from);
    const to = byId.get(connection.to);
    if (!from || !to) continue;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", from.x);
    line.setAttribute("y1", from.y);
    line.setAttribute("x2", to.x);
    line.setAttribute("y2", to.y);
    line.setAttribute("class", connection.open ? "map-line" : "map-line closed");
    svg.append(line);
  }

  wrap.append(svg);

  for (const place of view.map.locations) {
    const node = document.createElement("div");
    node.className = place.current ? "map-node current" : "map-node";
    node.style.left = `${place.x}%`;
    node.style.top = `${place.y}%`;
    node.textContent = place.name;
    wrap.append(node);
  }
  return wrap;
}

function renderList(title, items) {
  const wrap = document.createElement("div");
  wrap.className = "list-panel";
  const heading = document.createElement("h2");
  heading.textContent = title;
  wrap.append(heading);

  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "No entries yet.";
    wrap.append(empty);
    return wrap;
  }

  for (const item of items) {
    const row = document.createElement("article");
    row.className = "note-row";
    row.innerHTML = `<h3>${item.name}</h3><p>${renderText(item.description)}</p>`;
    wrap.append(row);
  }
  return wrap;
}

boot();
