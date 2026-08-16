// Optional: persist chatbot history to Postgres, the way the original
// AI Chatbot Site project does.
//
// 1. npm install pg
// 2. Set DATABASE_URL in .env.local (Render Postgres, Neon, etc. all work)
// 3. Run this once against your database:
//
//    CREATE TABLE IF NOT EXISTS chat_messages (
//      id SERIAL PRIMARY KEY,
//      session_id TEXT NOT NULL,
//      role TEXT NOT NULL CHECK (role IN ('user', 'model')),
//      content TEXT NOT NULL,
//      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
//    );
//
// 4. Uncomment the code below and call saveMessage(...) from
//    app/api/chat/route.js after each turn.

// import { Pool } from "pg";
//
// const pool = process.env.DATABASE_URL
//   ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
//   : null;
//
// export async function saveMessage(sessionId, role, content) {
//   if (!pool) return;
//   await pool.query(
//     "INSERT INTO chat_messages (session_id, role, content) VALUES ($1, $2, $3)",
//     [sessionId, role, content]
//   );
// }
//
// export async function getHistory(sessionId, limit = 20) {
//   if (!pool) return [];
//   const { rows } = await pool.query(
//     "SELECT role, content FROM chat_messages WHERE session_id = $1 ORDER BY created_at ASC LIMIT $2",
//     [sessionId, limit]
//   );
//   return rows;
// }

export {};
