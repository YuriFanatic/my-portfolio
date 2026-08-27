// One of the placeholder "other workspaces" in the switcher -- a themed
// stand-in page, not a real project.
export default function DummyPage({ page, index }) {
  return (
    <div
      className="flex h-full w-full flex-col overflow-y-auto"
      style={{ background: page.bg, color: page.text, fontFamily: "var(--font-mono)" }}
    >
      <div
        className="flex items-center px-4"
        style={{
          height: "32px",
          flexShrink: 0,
          background: page.secondary,
          borderBottom: `1px solid ${page.accent}33`,
          fontSize: "12px",
          color: page.accent,
        }}
      >
        kien@{page.name} ~ dummy workspace
      </div>

      <div
        className="flex flex-1 flex-col items-center justify-center gap-8"
        style={{ padding: "48px 24px" }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(64px, 12vw, 120px)",
            color: page.accent,
            letterSpacing: "4px",
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          {page.name.toUpperCase()}
        </div>

        <div style={{ fontSize: "14px", color: page.text, opacity: 0.5, textAlign: "center" }}>
          {index ? `workspace ${index} · ` : ""}dummy page · press the grid button to switch
        </div>

        <div className="flex" style={{ border: `1px solid ${page.accent}44` }}>
          {[page.bg, page.secondary, page.accent, page.text].map((c, i) => (
            <div key={i} style={{ width: "64px", height: "48px", background: c }} />
          ))}
        </div>

        <div
          className="w-full"
          style={{ maxWidth: "480px", border: `1px solid ${page.accent}44`, background: page.secondary }}
        >
          <div
            className="flex items-center gap-1.5"
            style={{ padding: "6px 12px", borderBottom: `1px solid ${page.accent}22`, fontSize: "11px" }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f38ba8", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f9e2af", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#a6e3a1", display: "inline-block" }} />
            <span style={{ marginLeft: "8px", opacity: 0.5 }}>kitty — {page.name}</span>
          </div>
          <div style={{ padding: "16px", fontSize: "13px", lineHeight: "1.8" }}>
            <div>
              <span style={{ color: page.accent }}>❯ </span>
              <span style={{ opacity: 0.8 }}>echo $WS_NAME</span>
            </div>
            <div style={{ opacity: 0.6 }}>{page.name}</div>
            <div>
              <span style={{ color: page.accent }}>❯ </span>
              <span style={{ opacity: 0.8 }}>echo $ACCENT</span>
            </div>
            <div style={{ color: page.accent }}>{page.accent}</div>
            <div>
              <span style={{ color: page.accent }}>❯ </span>
              <span className="cursor" style={{ display: "inline-block", width: "8px", height: "1em", verticalAlign: "text-bottom" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
