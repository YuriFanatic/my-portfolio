import { site } from "@/lib/site";

const EDUCATION = [
  {
    deg: "B.S. Computer Science",
    school: "SF State University",
    detail: "Minor in Mathematics",
  },
  {
    deg: "A.S. Computer Science",
    school: "De Anza College",
    detail: "Completed",
  },
];

export default function About() {
  return (
    <section id="about" className="border-b border-border bg-surface px-6 py-24 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 font-display text-5xl text-gold">
          <span className="text-text-muted">## </span>about_me
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="wm-window">
              <div className="wm-titlebar">
                <span className="wm-dot" style={{ background: "#f38ba8" }} />
                <span className="wm-dot" style={{ background: "#f9e2af" }} />
                <span className="wm-dot" style={{ background: "#a6e3a1" }} />
                <span className="ml-2">about.md</span>
              </div>
              <div className="p-6 leading-relaxed text-text-muted">
                <p className="mb-4 text-[15px]">
                  I&apos;m a Computer Science graduate of{" "}
                  <span className="text-gold">San Francisco State University</span>{" "}
                  (B.S., with a minor in Mathematics), by way of an A.S. in
                  Computer Science from De Anza College. I like building things
                  with a working front end, a real database behind them, and —
                  increasingly — a language model somewhere in the stack.
                </p>
                <p className="text-[15px]">
                  Most recently, that&apos;s meant a multiplayer poker room with
                  its own lobby and chat, a Gemini-powered chatbot with
                  persistent history, and a pseudo-3D racing game built from
                  scratch in a 2D canvas — all three of which you can try out
                  below.
                </p>
                <div className="mt-6 border-t border-border pt-4 font-mono text-xs">
                  <div className="text-text-muted">
                    currently: seeking entry-level roles
                  </div>
                  <div className="mt-1" style={{ color: "var(--color-green,#a6e3a1)" }}>
                    ✓ <span className="text-text">Fullstack Software Engineer</span>
                  </div>
                  <div style={{ color: "var(--color-blue,#89b4fa)" }}>
                    ✓ <span className="text-text">AI / ML Integration Engineer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="wm-window">
              <div className="wm-titlebar">
                <span className="wm-dot" style={{ background: "#f38ba8" }} />
                <span className="wm-dot" style={{ background: "#f9e2af" }} />
                <span className="wm-dot" style={{ background: "#a6e3a1" }} />
                <span className="ml-2">education.txt</span>
              </div>
              <div className="p-4 font-mono text-xs">
                {EDUCATION.map((e, i) => (
                  <div
                    key={e.deg}
                    className={i > 0 ? "mt-4 border-t border-border pt-4" : ""}
                  >
                    <div className="text-gold">{e.deg}</div>
                    <div className="text-text">{e.school}</div>
                    <div className="text-text-muted">{e.detail}</div>
                  </div>
                ))}
                <div className="mt-4 border-t border-border pt-4 leading-relaxed text-text-muted">
                  Algorithms · OS · Databases
                  <br />
                  Web Dev · Linear Algebra · ODE
                </div>
              </div>
            </div>

            <div className="wm-window">
              <div className="wm-titlebar">
                <span className="wm-dot" style={{ background: "#f38ba8" }} />
                <span className="wm-dot" style={{ background: "#f9e2af" }} />
                <span className="wm-dot" style={{ background: "#a6e3a1" }} />
                <span className="ml-2">contact_quick.txt</span>
              </div>
              <div className="p-4 font-mono text-xs">
                <div className="mb-2">
                  <span className="text-text-muted">email: </span>
                  <span style={{ color: "var(--color-blue,#89b4fa)" }}>{site.email}</span>
                </div>
                <div>
                  <span className="text-text-muted">city: </span>
                  <span className="text-gold">{site.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
