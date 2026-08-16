import { ExternalLink, Mail } from "lucide-react";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="mt-auto">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
          Contact
        </p>
        <h2 className="mt-4 max-w-xl font-display text-3xl sm:text-4xl">
          Wanna talk to me?? Here I am!
        </h2>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-gold-soft"
          >
            <Mail size={16} />
            {site.email}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-text transition-colors hover:border-gold hover:text-gold"
          >
            <ExternalLink size={16} />
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-text transition-colors hover:border-gold hover:text-gold"
          >
            <ExternalLink size={16} />
            LinkedIn
          </a>
        </div>

        <p className="mt-14 font-mono text-xs text-text-muted">
          © {year} {site.name}. Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
