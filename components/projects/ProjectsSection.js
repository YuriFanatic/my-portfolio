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

export default function ProjectsSection() {
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
    <section id="projects" className="border-b border-border/70">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
          Projects
        </p>
        <h2 className="mt-4 font-display text-3xl sm:text-4xl">
          Three things you can try right now.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-text-muted">
          These run for real, right on this page! Statuses
          below reflect whether each demo is actually wired up yet.
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
                <Embed />
              </ProjectCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
