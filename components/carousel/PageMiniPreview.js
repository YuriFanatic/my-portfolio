import { Coins, Flag } from "lucide-react";

export default function PageMiniPreview({ page, snapshot, chatPreview }) {
  if (page.kind === "home") {
    return (
      <div className="flex h-full w-full flex-col gap-1.5 p-2.5" style={{ background: "#1e1e2e" }}>
        <div className="h-2 rounded-[1px]" style={{ background: "#11111b" }} />
        <div className="h-5 w-3/5 rounded-[1px]" style={{ background: "#cba6f7" }} />
        <div className="h-1.5 w-4/5 rounded-[1px]" style={{ background: "#313244" }} />
        <div className="h-1.5 w-3/4 rounded-[1px]" style={{ background: "#313244" }} />
        <div className="h-1.5 w-1/2 rounded-[1px]" style={{ background: "#313244" }} />
        <div className="mt-1 flex-1 rounded-[1px]" style={{ background: "#181825" }} />
        <div className="h-1.5 rounded-[1px]" style={{ background: "#45475a" }} />
      </div>
    );
  }

  if (page.kind === "dummy") {
    const t = page.theme;
    return (
      <div className="flex h-full w-full flex-col gap-1.5 p-2.5" style={{ background: t.bg }}>
        <div className="h-2 rounded-[1px]" style={{ background: t.secondary }} />
        <div className="h-5 w-[55%] rounded-[1px]" style={{ background: t.accent, opacity: 0.85 }} />
        <div className="h-1.5 w-3/4 rounded-[1px]" style={{ background: t.secondary }} />
        <div className="h-1.5 w-3/5 rounded-[1px]" style={{ background: t.secondary }} />
        <div className="mt-1 grid flex-1 grid-cols-2 gap-1">
          <div className="rounded-[1px]" style={{ background: t.secondary }} />
          <div className="rounded-[1px]" style={{ background: t.accent, opacity: 0.3 }} />
        </div>
        <div className="h-1.5 rounded-[1px]" style={{ background: t.secondary }} />
      </div>
    );
  }

  if (page.id === "racing") {
    return snapshot ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={snapshot} alt="" className="h-full w-full object-cover" />
    ) : (
      <div className="flex h-full w-full items-center justify-center text-text-muted">
        <Flag size={24} />
      </div>
    );
  }

  if (page.id === "chatbot") {
    return (
      <div className="flex h-full w-full flex-col justify-center gap-1 p-3">
        <p className="line-clamp-6 text-[10px] leading-snug text-text-muted">
          {chatPreview?.content ?? "Ask it something."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center text-text-muted">
      <Coins size={24} />
    </div>
  );
}
