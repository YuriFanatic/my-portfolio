// TODO: swap `repo` for each project's real GitHub URL once split into
// separate repos (or link to the right folder in a monorepo).
export const projects = [
  {
    id: "poker",
    title: "Online Poker Game",
    tagline: "Multiplayer, dealt live.",
    description:
      "A fully functional multiplayer poker table with a lobby and in-game chat. The backend deals cards, tracks betting rounds, and keeps every player's view in sync in real time.",
    stack: ["Node.js", "Express", "PostgreSQL", "WebSockets"],
    repo: "https://github.com/YuriFanatic",
    embed: "poker",
  },
  {
    id: "chatbot",
    title: "AI Chatbot",
    tagline: "Ask it something.",
    description:
      "A chatbot backed by the Gemini API, with a lightweight login and chat history persisted in SQL. This version runs right here, through this site's own API route.",
    stack: ["Gemini API", "Next.js API Routes", "PostgreSQL"],
    repo: "https://github.com/YuriFanatic",
    embed: "chatbot",
  },
  {
    id: "racing",
    title: "Simple Racing Game",
    tagline: "Pseudo-3D, zero assets.",
    description:
      "A pseudo-3D racer built on a plain 2D canvas — 100% javascript!!",
    stack: ["JavaScript", "Canvas 2D"],
    repo: "https://github.com/YuriFanatic",
    embed: "racing",
  },
];
