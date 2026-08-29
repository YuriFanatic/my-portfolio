import WmWindow from "@/components/ui/WmWindow";
import SectionHeading from "@/components/ui/SectionHeading";

const EXPERIENCE = [
  {
    company: "QA Construction",
    location: "San Jose, CA",
    role: "Web Development",
    period: "06/2023 – 07/2023",
    color: "#89b4fa",
    bullets: [
      "Developed and maintained responsive websites with HTML/CSS, implementing cross-device compatibility and browser optimization best practices — led to a 25% increase in user engagement.",
      "Built a fully functional website with a gallery of past projects, user contact form, and admin dashboard.",
    ],
  },
  {
    company: "San Jose Public Library",
    location: "San Jose, CA",
    role: "Volunteer",
    period: "06/2020 – 08/2020",
    color: "#a6e3a1",
    bullets: [
      "Assisted patrons in locating and utilizing library resources including books, digital media, and reference materials.",
      "Organized and maintained library collections according to the Dewey Decimal System.",
    ],
  },
  {
    company: "Mexican Brothers Market",
    location: "San Jose, CA",
    role: "Retail | Store Clerk",
    period: "02/2018 – 07/2023",
    color: "#fab387",
    bullets: [
      "Delivered personalized customer service to countless customers daily in a high-paced environment.",
      "Managed inventory, and cash transactions.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="border-b border-border px-6 py-24 md:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading name="experience" color="#fab387" />

        <div className="flex flex-col gap-6">
          {EXPERIENCE.map((exp) => (
            <WmWindow
              key={exp.company}
              title={`${exp.company.toLowerCase().replace(/\s+/g, "-")}.log`}
            >
              <div className="p-5">
                <div className="mb-3 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                  <div>
                    <span
                      className="font-display text-2xl"
                      style={{ color: exp.color }}
                    >
                      {exp.company}
                    </span>
                    <span className="ml-3 font-mono text-xs text-text-muted">
                      {exp.location}
                    </span>
                  </div>
                  <div className="font-mono text-xs">
                    <span className="text-text-muted">{exp.role}</span>
                    <span style={{ color: "var(--color-border)" }}> · {exp.period}</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-2">
                  {exp.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm leading-relaxed text-text-muted">
                      <span
                        className="shrink-0 font-mono"
                        style={{ color: exp.color }}
                      >
                        ▸
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </WmWindow>
          ))}
        </div>
      </div>
    </section>
  );
}
