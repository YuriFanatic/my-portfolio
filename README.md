# kien-portfolio

Personal portfolio site with three live demos: an online poker game, an AI
chatbot, and a pseudo-3D racing game.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS 4** — design tokens live in `app/globals.css`
- **lucide-react** for icons
- Fonts via `next/font/google`: Fraunces (display), Inter (body), IBM Plex
  Mono (labels/HUD)

## Run it locally

```bash
npm install
cp .env.local.example .env.local   # optional, see below
npm run dev
```

Open `http://localhost:3000`. Everything renders and the racing game is
fully playable with zero configuration.

## Project structure

```
app/
  layout.js          root layout, fonts, metadata
  page.js             assembles the page from components/
  globals.css         design tokens (colors, fonts)
  api/chat/route.js   chatbot backend (Gemini, or demo-mode fallback)
components/
  Nav.js, Hero.js, About.js, Skills.js, Footer.js
  projects/
    ProjectsSection.js   lays out the three project cards
    ProjectCard.js        shared card shell (title, stack, status badge)
    PokerEmbed.js          iframes the standalone poker deploy
    ChatbotDemo.js         chat UI, calls /api/chat
    RacingGameDemo.js      the playable canvas game
lib/
  site.js       your name, email, links, résumé path
  projects.js   copy + stack tags for each project card
  db.js         stubbed Postgres helper for chat history (commented out)
```

## What's live out of the box vs. what needs setup

| Demo | Works with zero config? | To go fully "live" |
|---|---|---|
| Racing game | Yes — it's a native React/canvas component | Nothing to do |
| Chatbot | Yes, in "demo mode" (canned reply) | Set `GEMINI_API_KEY` in `.env.local` / your host's env vars |
| Poker game | No — shows a "standby" placeholder | Deploy the poker app separately (Railway/Render), then set `NEXT_PUBLIC_POKER_URL` to its URL |

Each project card's status badge reads directly from these env vars, so
it always reflects what's actually wired up — no need to hand-edit it.

## Deploying to Render

1. Push this repo to GitHub.
2. On Render: **New +** → **Web Service**, connect the repo.
3. Build command: `npm install && npm run build`. Start command: `npm run start`.
4. Add environment variables from `.env.local.example` under the
   **Environment** tab (`GEMINI_API_KEY`, `DATABASE_URL`,
   `NEXT_PUBLIC_POKER_URL` — all optional).
5. Deploy. Render gives you a free `.onrender.com` URL; add a custom
   domain later under **Settings → Custom Domain**.

Note: Render's free tier spins down after inactivity (~30–60s cold start
on the next visit). Fine for a demo link, but if you want it always
instant, the paid Starter tier keeps it warm.

## Wiring up chat history (optional)

`lib/db.js` has a ready-to-uncomment Postgres helper and the `CREATE
TABLE` statement for chat history, matching the original AI Chatbot Site
project. It's left commented out so the app runs without a database by
default — see the comments in that file for the three steps to enable it.

