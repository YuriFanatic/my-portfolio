// The "## sectionname" heading repeated at the top of every home-page
// section. `color` accepts any CSS color value; omit it (and pass
// `className` instead) to use a Tailwind color utility like `text-gold`.
export default function SectionHeading({ name, color, className = "" }) {
  return (
    <div
      className={`mb-12 font-display text-5xl ${className}`.trim()}
      style={color ? { color } : undefined}
    >
      <span className="text-text-muted">## </span>
      {name}
    </div>
  );
}
