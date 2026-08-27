import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import PokerEmbed from "./PokerEmbed";
import ChatbotDemo from "./ChatbotDemo";
import RacingGameDemo from "./RacingGameDemo";

const embeds = {
  poker: PokerEmbed,
  chatbot: ChatbotDemo,
  racing: RacingGameDemo,
};

export default function ProjectsSection({ active = true }) {
  // Status badges reflect real deploy state, not decoration:
  // - poker only goes "live" once its standalone deploy URL is set.
  // - the racing game always runs, since it ships natively with this site.
  // - the chatbot is "live" once a Gemini key is set, "demo" otherwise —
  //   either way the UI still works, see app/api/chat/route.js.
  const statusFor = {
    poker: process.env.NEXT_PUBLIC_POKER_URL ? "LIVE" : "STANDBY",
    chatbot: process.env.GEMINI_API_KEY ? "LIVE" : "DEMO MODE",
    racing: "LIVE",
  };

  return (
    <section id="projects" className="border-b border-border px-6 py-24 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 font-display text-5xl" style={{ color: "var(--color-blue,#89b4fa)" }}>
          <span className="text-text-muted">## </span>projects
        </div>
        <p className="max-w-2xl font-mono text-sm text-text-muted">
          These run for real, right on this page! Statuses below reflect
          whether each demo is actually wired up yet.
        </p>

        <div className="mt-10 flex flex-col gap-6">
          {projects.map((project) => {
            const Embed = embeds[project.embed];
            return (
              <ProjectCard
                key={project.id}
                project={project}
                status={statusFor[project.id]}
              >
                <Embed active={active} />
              </ProjectCard>
            );
          })}
        </div>

        <div className="mt-6 text-center font-mono text-xs text-text-muted">
          more at{" "}
          <a
            href="https://github.com/YuriFanatic"
            target="_blank"
            rel="noreferrer noopener"
            className="text-gold"
          >
            github.com/YuriFanatic →
          </a>
        </div>
      </div>
    </section>
  );
}
