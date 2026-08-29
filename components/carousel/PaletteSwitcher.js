"use client";

import { useEffect, useRef, useState } from "react";
import { PALETTES } from "@/lib/palettes";

// Standalone popover: styled entirely from the `theme` prop (the
// currently active palette) rather than Tailwind's bg-*/text-* utilities,
// since it lives in the global Nav bar outside the home workspace's
// CSS-variable-scoped subtree.
export default function PaletteSwitcher({ theme, palette, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        title="Switch color palette"
        className="flex items-center gap-1.5 px-2 py-0.5 font-mono text-[11px] transition-colors"
        style={{
          border: `1px solid ${theme.border}`,
          background: open ? theme.surface2 : "transparent",
          color: theme.muted,
        }}
      >
        <span className="flex gap-0.5">
          {PALETTES.map((pal) => (
            <span
              key={pal.id}
              style={{
                width: pal.id === palette.id ? "14px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: pal.accent,
                transition: "width 0.25s ease",
              }}
            />
          ))}
        </span>
        <span style={{ color: theme.accent }}>{palette.name}</span>
        <span style={{ opacity: 0.4 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+4px)] z-[200] flex min-w-[160px] flex-col gap-1 p-2"
          style={{
            background: theme.surface,
            border: `1px solid ${theme.border}`,
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          <div
            className="mb-1 px-1.5 pb-1.5 font-mono text-[10px]"
            style={{ color: theme.subtle, borderBottom: `1px solid ${theme.border}` }}
          >
            select palette
          </div>
          {PALETTES.map((pal) => {
            const isActive = pal.id === palette.id;
            return (
              <button
                key={pal.id}
                type="button"
                onClick={() => {
                  onSelect(pal);
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-2 py-1.5 text-left transition-all"
                style={{
                  border: isActive ? `1px solid ${pal.accent}` : "1px solid transparent",
                  background: isActive ? `${pal.accent}18` : "transparent",
                }}
              >
                <span className="flex shrink-0">
                  {[pal.bg, pal.surface2, pal.accent, pal.text].map((c, i) => (
                    <span key={i} style={{ width: "12px", height: "20px", background: c, display: "block" }} />
                  ))}
                </span>
                <span>
                  <div className="font-mono text-xs" style={{ color: isActive ? pal.accent : theme.text }}>
                    {pal.name}
                  </div>
                  <div className="font-mono text-[10px]" style={{ color: theme.subtle }}>
                    {pal.accent}
                  </div>
                </span>
                {isActive && (
                  <span className="ml-auto font-mono text-[11px]" style={{ color: pal.accent }}>
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
