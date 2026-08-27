"use client";

import { useEffect, useState } from "react";
import PageMiniPreview from "./PageMiniPreview";

// A straight row of workspace tiles -- no tilt, no scale-on-hover. Hover
// is communicated with an outline only, so a tile's box never changes
// size or position under the cursor. (An earlier fan layout recentered
// itself around whichever tile was hovered, and a later version grew
// tiles on hover -- both changed a tile's own hit-box while the cursor
// was over it, which could push it out from under the pointer and/or
// clip it against the top of the viewport. Fixed layout + outline-only
// hover sidesteps both.)
export default function WorkspaceSwitcher({ pages, activeId, onSelect, onClose, racingSnapshot, chatPreview }) {
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const displayed = pages.find((p) => p.id === (hoveredId ?? activeId));
  const displayedIndex = displayed ? pages.indexOf(displayed) : -1;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center backdrop-blur-md"
      style={{ background: "rgba(17, 17, 27, 0.75)" }}
    >
      <div
        className="pointer-events-none mb-6 font-mono text-sm"
        style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "2px" }}
      >
        ws-{displayedIndex + 1}: {displayed?.id}
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        onMouseLeave={() => setHoveredId(null)}
        className="flex flex-wrap items-center justify-center gap-4 overflow-y-auto px-8"
        style={{ maxWidth: "100%", maxHeight: "70vh" }}
      >
        {pages.map((page) => {
          const isActive = page.id === activeId;
          const isHovered = hoveredId === page.id;

          return (
            <button
              key={page.id}
              type="button"
              onMouseEnter={() => setHoveredId(page.id)}
              onClick={() => {
                onSelect(page.id);
                onClose();
              }}
              aria-pressed={isActive}
              aria-label={page.id}
              style={{
                width: "160px",
                height: "260px",
                flexShrink: 0,
                borderRadius: "4px",
                border: isActive || isHovered ? "2px solid rgba(255,255,255,0.85)" : "1px solid rgba(255,255,255,0.15)",
                boxShadow: isActive || isHovered ? "0 8px 40px rgba(0,0,0,0.7)" : "0 4px 16px rgba(0,0,0,0.4)",
                transition: "box-shadow 0.2s ease, border-color 0.2s ease",
                background: "var(--color-surface-2)",
              }}
              className="group relative overflow-hidden"
            >
              <PageMiniPreview
                page={page}
                snapshot={page.id === "racing" ? racingSnapshot : null}
                chatPreview={page.id === "chatbot" ? chatPreview : null}
              />

              <div
                className="absolute inset-x-0 bottom-0 px-2 pb-3 pt-8 text-center transition-opacity duration-200"
                style={{
                  background: "linear-gradient(to top, rgba(17,17,27,0.9), transparent)",
                  opacity: isActive || isHovered ? 1 : 0,
                }}
              >
                <span className="font-mono text-[10px] uppercase tracking-wide text-text">
                  {page.title ?? page.id}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mb-10 mt-6 flex flex-wrap justify-center gap-2">
        {pages.map((page) => (
          <div
            key={page.id}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(page.id);
              onClose();
            }}
            style={{
              width: page.id === activeId ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: page.id === activeId ? "var(--color-gold)" : "rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute bottom-4 font-mono text-[11px]"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        click a workspace to switch — esc to close
      </div>
    </div>
  );
}
