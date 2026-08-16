import { ExternalLink } from "lucide-react";

export default function ProjectCard({ project, status, children }) {
  const isLive = status === "LIVE";

  return (
    <article
      id={project.id}
      className="scroll-mt-24 rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl">{project.title}</h3>
          <p className="mt-1 text-sm text-gold-soft">{project.tagline}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isLive ? "bg-gold" : "bg-text-muted"
              }`}
              aria-hidden="true"
            />
            {status}
          </span>
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="text-text-muted transition-colors hover:text-text"
            aria-label={`${project.title} on GitHub`}
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base">
        {project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-surface-2 px-3 py-1 font-mono text-[11px] text-text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-6">{children}</div>
    </article>
  );
}
