// Chat endpoint used by components/projects/ChatbotDemo.js.
//
// Set GEMINI_API_KEY in .env.local to go live. Without it, this route
// still responds (in "demo" mode) so the site never shows a broken demo.
//
// Model name last verified against https://ai.google.dev/gemini-api/docs/models
// at the time this was written — check that page if generateContent starts
// returning 404s, model names/availability change over time.
const GEMINI_MODEL = "gemini-2.0-flash";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const history = Array.isArray(body?.history) ? body.history : [];

  if (!message) {
    return Response.json({ error: "Message is required." }, { status: 400 });
  }
  if (message.length > 2000) {
    return Response.json({ error: "Message is too long." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return Response.json({
      reply:
        "This is running in demo mode — the site owner hasn't wired up a Gemini API key yet. " +
        "Once GEMINI_API_KEY is set in the environment, this same endpoint calls the real model.",
      mode: "demo",
    });
  }

  try {
    const contents = [
      ...history.slice(-10).map((turn) => ({
        role: turn.role === "assistant" ? "model" : "user",
        parts: [{ text: String(turn.content ?? "") }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: { maxOutputTokens: 512 },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API error:", res.status, errText);
      return Response.json(
        { error: "The model API returned an error. Check server logs." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ??
      "Sorry, I didn't get a usable response from the model that time.";

    // TODO: once lib/db.js is wired up, save both `message` and `reply`
    // here with saveMessage(sessionId, "user", message) / "model".

    return Response.json({ reply, mode: "live" });
  } catch (err) {
    console.error("Chat route error:", err);
    return Response.json(
      { error: "Something went wrong talking to the model." },
      { status: 500 }
    );
  }
}
