import WmWindow from "@/components/ui/WmWindow";
import SectionHeading from "@/components/ui/SectionHeading";

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
    <section id="skills" className="border-b border-border bg-surface px-6 py-24 md:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading name="skills" color="#a6e3a1" />

        <WmWindow title="skills.sh">
          <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
                  {`// ${group.label}`}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="bg-surface-2 px-2 py-1 font-mono text-xs text-text"
                    >
                      #{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </WmWindow>
      </div>
    </section>
  );
}
