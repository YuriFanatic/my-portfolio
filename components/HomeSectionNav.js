"use client";

import { useEffect, useState } from "react";

const links = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "contact", label: "contact" },
];

// Scoped to the home workspace only -- it scrolls its own sections, not
// other workspaces, so it doesn't need to know about the switcher at all.
export default function HomeSectionNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function goTo(e, id) {
    e.preventDefault();
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  }

  return (
    <div
      className="sticky top-0 z-30 flex items-center gap-1 overflow-x-auto border-b border-border px-4 font-mono text-xs"
      style={{ height: "32px", background: "var(--color-base)" }}
    >
      {links.map((link, i) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          onClick={(e) => goTo(e, link.id)}
          className="whitespace-nowrap px-2 py-0.5 transition-all"
          style={{
            color: active === link.id ? "var(--color-bg)" : "var(--color-text-muted)",
            background: active === link.id ? "var(--color-gold)" : "transparent",
          }}
        >
          {i + 1}:{link.label}
        </a>
      ))}
    </div>
  );
}
