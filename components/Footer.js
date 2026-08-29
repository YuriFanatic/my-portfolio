import { site } from "@/lib/site";
import WmWindow from "@/components/ui/WmWindow";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { platform: "github", handle: "github.com/YuriFanatic", color: "#cba6f7", href: site.github },
    {
      platform: "linkedin",
      handle: site.linkedin.replace("https://linkedin.com/in/", ""),
      color: "#89b4fa",
      href: site.linkedin,
    },
    { platform: "email", handle: site.email, color: "#a6e3a1", href: `mailto:${site.email}` },
  ];

  return (
    <footer id="contact" className="mt-auto px-6 py-24 md:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading name="contact" color="var(--color-flare)" />

        <div className="grid gap-6 md:grid-cols-2">
          <WmWindow title="links.txt">
            <div className="p-4">
              {links.map((l) => (
                <a
                  key={l.platform}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="group flex items-center justify-between border-b border-border py-3 last:border-b-0"
                >
                  <span className="font-mono text-sm" style={{ color: l.color }}>
                    {l.platform}
                  </span>
                  <span className="font-mono text-xs text-text-muted transition-colors group-hover:text-text">
                    {l.handle} →
                  </span>
                </a>
              ))}
            </div>
          </WmWindow>

          <WmWindow title="availability.txt">
            <div className="p-4 text-center font-mono">
              <div
                className="font-display tracking-widest"
                style={{ fontSize: "36px", color: "#a6e3a1" }}
              >
                AVAILABLE
              </div>
              <div className="mt-2 text-xs leading-relaxed text-text-muted">
                seeking entry-level SWE roles
                <br />
                fullstack · backend · ai integration
                <br />
                {site.location} + remote
              </div>
            </div>
          </WmWindow>
        </div>

        <p className="mt-14 text-center font-mono text-xs text-text-muted">
          © {year} {site.name}. Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
