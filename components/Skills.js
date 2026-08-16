const groups = [
  {
    label: "Languages",
    items: ["Java", "Python", "JavaScript", "TypeScript", "C++", "C", "R"],
  },
  {
    label: "Frontend",
    items: [
      "React",
      "Vue",
      "Responsive Design",
      "Component Architecture",
      "State Management",
    ],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "REST API Design", "Schema Design"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MongoDB", "SQL", "NoSQL Patterns"],
  },
  {
    label: "Cloud & AI",
    items: ["Gemini API", "LLM Integration", "Python for ML"],
  },
  {
    label: "Practices",
    items: ["OOP & Design Patterns", "Jest", "TDD", "Agile/Scrum"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="border-b border-border/70">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
          Skills
        </p>
        <h2 className="mt-4 font-display text-3xl sm:text-4xl">
          Things I'm Good At
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.label}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
                {`// ${group.label}`}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-text"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
