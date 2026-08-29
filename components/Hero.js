"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import WmWindow from "@/components/ui/WmWindow";

const TERM_LINES = [
  "whoami",
  "kien ngo — cs grad, fullstack dev, ai enthusiast",
  "cat interests.txt",
  "fullstack apps · llm integration · game dev · sql · open source",
  "echo $LOCATION",
  `${site.location.toLowerCase()} · open to work`,
];

const STATUS_ITEMS = [
  { label: "role", value: "entry-level SWE" },
  { label: "location", value: site.location },
  { label: "email", value: site.email },
  { label: "github", value: site.github.replace("https://github.com/", "") },
];

const BADGES = [
  { text: "SFSU GRAD", color: "#89b4fa" },
  { text: "FULLSTACK", color: "var(--color-gold)" },
  { text: "AI/ML", color: "#a6e3a1" },
  { text: "OPEN TO WORK", color: "var(--color-flare)" },
];

function TypewriterText({ lines }) {
  const [displayed, setDisplayed] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }
    const line = lines[currentLine];
    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar((c) => c + 1), 35);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDisplayed((d) => [...d, line]);
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }, 200);
    return () => clearTimeout(t);
  }, [currentLine, currentChar, lines]);

  const activeLine =
    currentLine < lines.length ? lines[currentLine].slice(0, currentChar) : "";

  return (
    <div className="font-mono text-sm leading-relaxed">
      {displayed.map((l, i) => (
        <div key={i}>
          <span style={{ color: "#a6e3a1" }}>❯ </span>
          <span className="text-text">{l}</span>
        </div>
      ))}
      {!done && currentLine < lines.length && (
        <div>
          <span style={{ color: "#a6e3a1" }}>❯ </span>
          <span className="text-text">{activeLine}</span>
          <span className="cursor" />
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-screen flex-col justify-center border-b border-border px-6 py-16 md:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <span
                  key={b.text}
                  className="border px-2 py-0.5 font-mono text-xs"
                  style={{ color: b.color, borderColor: b.color }}
                >
                  {b.text}
                </span>
              ))}
            </div>

            <h1
              className="mb-4 font-display leading-none text-text"
              style={{ fontSize: "clamp(72px, 10vw, 140px)", letterSpacing: "2px" }}
            >
              KIEN
              <br />
              <span className="text-gold">NGO</span>
            </h1>

            <div className="mb-8 font-mono text-sm text-text-muted">
              <span style={{ color: "#89b4fa" }}>const</span>{" "}
              role ={" "}
              <span style={{ color: "#a6e3a1" }}>
                &quot;fullstack dev + feet enthusiast&quot;
              </span>
              <span className="blink text-gold">;</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="border px-4 py-2 font-mono text-sm transition-colors hover:bg-surface-2"
                style={{ borderColor: "var(--color-gold)", color: "var(--color-gold)" }}
              >
                ~/projects
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                className="border px-4 py-2 font-mono text-sm transition-colors hover:bg-surface-2"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
              >
                ~/github
              </a>
              <a
                href={`mailto:${site.email}`}
                className="border px-4 py-2 font-mono text-sm transition-colors hover:bg-surface-2"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
              >
                ~/email
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <WmWindow title="kitty — zsh">
              <div className="p-4" style={{ minHeight: "220px" }}>
                <TypewriterText lines={TERM_LINES} />
              </div>
            </WmWindow>

            <WmWindow title="neofetch">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 p-4 font-mono text-xs">
                <div className="col-span-2 mb-2 text-gold">
                  kien@sfstate
                  <span style={{ color: "var(--color-border)" }}> ──────────────</span>
                </div>
                {STATUS_ITEMS.map((s) => (
                  <div key={s.label} className="flex gap-2">
                    <span className="text-gold">{s.label}</span>
                    <span className="text-text-muted">{s.value}</span>
                  </div>
                ))}
                <div className="col-span-2 mt-3 flex gap-1">
                  {[
                    "#f38ba8",
                    "#f9e2af",
                    "#a6e3a1",
                    "#89dceb",
                    "#89b4fa",
                    "#cba6f7",
                    "#cdd6f4",
                  ].map((c) => (
                    <span key={c} className="inline-block h-4 w-5" style={{ background: c }} />
                  ))}
                </div>
              </div>
            </WmWindow>
          </div>
        </div>

        <div className="mt-16 pb-8 text-center font-mono text-xs text-text-muted">
          <span className="blink">▼</span> scroll to explore{" "}
          <span className="blink">▼</span>
        </div>
      </div>
    </section>
  );
}
