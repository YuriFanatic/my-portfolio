// Shared "Hyprland window" chrome: a titlebar with the three traffic-light
// dots, optionally wrapped in the full bordered window frame. Used across
// the home-page sections, project cards, and dummy workspace pages.
export const WM_DOT_COLORS = ["#f38ba8", "#f9e2af", "#a6e3a1"];

export function WmTitlebar({ title }) {
  return (
    <div className="wm-titlebar">
      {WM_DOT_COLORS.map((c) => (
        <span key={c} className="wm-dot" style={{ background: c }} />
      ))}
      {title && <span className="ml-2">{title}</span>}
    </div>
  );
}

export default function WmWindow({ title, className = "", children }) {
  return (
    <div className={`wm-window ${className}`.trim()}>
      <WmTitlebar title={title} />
      {children}
    </div>
  );
}
