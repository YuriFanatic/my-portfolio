import { site } from "@/lib/site";

const facts = [
  { label: "Location", value: site.location },
  { label: "Education", value: "B.S. Computer Science, SFSU" },
  { label: "Minor", value: "Mathematics" },
  { label: "Core stack", value: "React · Node/Express · PostgreSQL" },
];

export default function About() {
  return (
    <section id="about" className="border-b border-border/70">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 sm:py-28 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
            About
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">
            Full-stack, front to back.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-muted sm:text-lg">
            I&apos;m a Computer Science graduate of San Francisco State University
            (B.S., with a minor in Mathematics), by way of an A.S. in
            Computer Science from De Anza College. I like building things
            with a working front end, a real database behind them, and —
            increasingly — a language model somewhere in the stack.
          </p>
          <p className="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
            Most recently, that&apos;s meant a multiplayer poker room with its
            own lobby and chat, a Gemini-powered chatbot with persistent
            history, and a pseudo-3D racing game built from scratch in a 2D
            canvas — all three of which you can try out below.
          </p>
        </div>

        <dl className="grid content-start gap-4 rounded-2xl border border-border bg-surface p-6">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
                {fact.label}
              </dt>
              <dd className="mt-1 text-sm text-text">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
