const STOP_WORDS = /^(?:the|a|an|at|to|with|on|in)\s+/;
const DIRECTIONS = new Set([
  "north",
  "n",
  "south",
  "s",
  "east",
  "e",
  "west",
  "w",
  "up",
  "u",
  "down",
  "d",
  "in",
  "out",
]);

export function normalize(value = "") {
  return value.toLowerCase().trim().replace(STOP_WORDS, "").replace(/\s+/g, " ");
}

export function parseCommand(rawCommand) {
  const command = normalize(rawCommand);

  if (["look", "l", "look around"].includes(command)) return { intent: "look" };
  if (["inventory", "inv", "i"].includes(command)) return { intent: "inventory" };
  if (["directions", "exits", "ways", "ways out"].includes(command)) return { intent: "directions" };
  if (DIRECTIONS.has(command)) return { intent: "go", target: expandDirection(command) };

  const go = command.match(/^(?:go|walk|move|enter)\s+(.+)$/);
  if (go) return { intent: "go", target: normalize(go[1]) };

  const examine = command.match(/^(?:examine|inspect|look at|look|read|study)\s+(.+)$/);
  if (examine) return { intent: "examine", target: normalize(examine[1]) };

  const take = command.match(/^(?:take|get|pick up)\s+(.+)$/);
  if (take) return { intent: "take", target: normalize(take[1]) };

  const speakTo = command.match(/^(?:say|speak|recite|whisper)\s+(.+?)\s+to\s+(.+)$/);
  if (speakTo) return { intent: "use", target: normalize(speakTo[1]), withTarget: normalize(speakTo[2]) };

  const speak = command.match(/^(?:say|speak|recite|whisper)\s+(.+)$/);
  if (speak) return { intent: "use", target: normalize(speak[1]), withTarget: "" };

  const show = command.match(/^show\s+(.+?)\s+to\s+(.+)$/);
  if (show) return { intent: "ask", target: normalize(show[2]), topic: normalize(show[1]) };

  const ask = command.match(/^ask\s+(.+?)\s+about\s+(.+)$/);
  if (ask) return { intent: "ask", target: normalize(ask[1]), topic: normalize(ask[2]) };

  const talkAbout = command.match(/^(?:talk to|speak to|talk)\s+(.+?)\s+about\s+(.+)$/);
  if (talkAbout) return { intent: "ask", target: normalize(talkAbout[1]), topic: normalize(talkAbout[2]) };

  const talk = command.match(/^(?:talk to|speak to|talk)\s+(.+)$/);
  if (talk) return { intent: "talk", target: normalize(talk[1]) };

  const useWith = command.match(/^use\s+(.+?)\s+(?:with|on)\s+(.+)$/);
  if (useWith) return { intent: "use", target: normalize(useWith[1]), withTarget: normalize(useWith[2]) };

  const putWith = command.match(/^(?:put|place|insert|set)\s+(.+?)\s+(?:in|into|on|onto|with)\s+(.+)$/);
  if (putWith) return { intent: "use", target: normalize(putWith[1]), withTarget: normalize(putWith[2]) };

  const alignWith = command.match(/^(?:align|set|turn)\s+(.+?)\s+(?:to|with|on)\s+(.+)$/);
  if (alignWith) return { intent: "use", target: normalize(alignWith[1]), withTarget: normalize(alignWith[2]) };

  const manipulateWith = command.match(/^(?:open|unlock|close|turn|press|pull|push|light|send)\s+(.+?)\s+(?:with|using|on|to)\s+(.+)$/);
  if (manipulateWith) return { intent: "use", target: normalize(manipulateWith[2]), withTarget: normalize(manipulateWith[1]) };

  const directUse = command.match(/^(?:open|close|turn|press|pull|push|light|send|align|set)\s+(.+)$/);
  if (directUse) return { intent: "use", target: normalize(directUse[1]), withTarget: "" };

  const use = command.match(/^use\s+(.+)$/);
  if (use) return { intent: "use", target: normalize(use[1]), withTarget: "" };

  return { intent: "unknown" };
}

function expandDirection(command) {
  const aliases = {
    n: "north",
    s: "south",
    e: "east",
    w: "west",
    u: "up",
    d: "down",
  };

  return aliases[command] ?? command;
}
