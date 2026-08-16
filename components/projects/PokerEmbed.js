// Set NEXT_PUBLIC_POKER_URL once the poker game is deployed on
// Railway/Render (see .env.local.example). Until then this renders a
// standby placeholder instead of a broken iframe.
export default function PokerEmbed() {
  const url = process.env.NEXT_PUBLIC_POKER_URL;

  if (!url) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface-2 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
          Standby
        </p>
        <p className="max-w-xs text-sm text-text-muted">
          The live table goes here once NEXT_PUBLIC_POKER_URL points at the
          deployed game. Check the README for the Railway/Render setup.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <iframe
        src={url}
        title="Online Poker Game"
        className="h-[600px] w-full"
        loading="lazy"
        allow="clipboard-write"
      />
    </div>
  );
}
