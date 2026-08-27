"use client";

import { useEffect, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { site } from "@/lib/site";
import { useSelector } from "@/components/carousel/SelectorContext";
import { WORKSPACE_PAGES } from "@/lib/workspacePages";
import { PALETTES } from "@/lib/palettes";
import PaletteSwitcher from "@/components/PaletteSwitcher";

export default function Nav() {
  const [time, setTime] = useState(null);
  const { setOpen, activeId, setActiveId, palette, setPalette } = useSelector();

  useEffect(() => {
    setTime(new Date());
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const activeIndex = WORKSPACE_PAGES.findIndex((p) => p.id === activeId);
  const activePage = WORKSPACE_PAGES[activeIndex];
  const activeLabel = activeIndex >= 0 ? `ws-${activeIndex + 1}: ${activeId}` : "";
  const isHome = activePage?.kind === "home";

  // The bar itself re-themes to match whatever's on screen: the chosen
  // palette while home is active, a dummy workspace's own fixed palette
  // while one of those is active, and the default otherwise (the live
  // demo panels aren't palette-aware, so there's nothing to match there).
  const chromeTheme = isHome ? palette : activePage?.kind === "dummy" ? activePage.theme : PALETTES[0];

  const timeStr = time ? time.toLocaleTimeString("en-US", { hour12: false }) : "";
  const dateStr = time
    ? time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    : "";

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between gap-4 px-4 font-mono text-xs backdrop-blur transition-colors"
      style={{ height: "32px", background: `${chromeTheme.base}e6`, borderBottom: `1px solid ${chromeTheme.border}` }}
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          title="Open workspace switcher"
          className="flex items-center gap-1.5 px-2 py-0.5 transition-colors"
          style={{ border: `1px solid ${chromeTheme.border}`, color: chromeTheme.accent }}
        >
          <LayoutGrid size={12} />
          <span className="hidden sm:inline">{activeLabel}</span>
        </button>

        <div className="ml-1 flex items-center gap-1">
          {WORKSPACE_PAGES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              title={p.id}
              className="rounded-full transition-all"
              style={{
                width: p.id === activeId ? "18px" : "8px",
                height: "8px",
                background:
                  p.id === activeId
                    ? p.kind === "dummy"
                      ? p.theme.accent
                      : p.kind === "home"
                        ? palette.accent
                        : chromeTheme.accent
                    : chromeTheme.border,
              }}
            />
          ))}
        </div>
      </div>

      <div className="hidden sm:block" style={{ color: chromeTheme.accent }}>
        kien@portfolio ~ Hyprland
      </div>

      <div className="flex items-center gap-3">
        {isHome && <PaletteSwitcher theme={chromeTheme} palette={palette} onSelect={setPalette} />}
        {time && (
          <div className="hidden items-center gap-3 sm:flex" style={{ color: chromeTheme.muted }}>
            <span>{dateStr}</span>
            <span style={{ color: chromeTheme.accent }}>{timeStr}</span>
          </div>
        )}
        <a href={site.resumeHref} className="hidden hover:underline sm:block" style={{ color: chromeTheme.accent }}>
          ~/resume
        </a>
      </div>
    </header>
  );
}
