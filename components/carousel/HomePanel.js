"use client";

import HomeSectionNav from "@/components/carousel/HomeSectionNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import ProjectsSection from "@/components/projects/ProjectsSection";
import Footer from "@/components/Footer";
import { useWorkspace } from "@/components/carousel/WorkspaceContext";

export default function HomePanel({ active }) {
  const { palette } = useWorkspace();

  // Every component under here is styled with Tailwind's bg-bg/text-gold/
  // etc. utilities, which just resolve to var(--color-bg) and friends --
  // so re-pointing those custom properties on this one wrapper re-themes
  // the whole home workspace live, with no per-component palette prop
  // threading needed.
  const themeVars = {
    "--color-bg": palette.bg,
    "--color-surface": palette.surface,
    "--color-surface-2": palette.surface2,
    "--color-border": palette.border,
    "--color-base": palette.base,
    "--color-text": palette.text,
    "--color-text-muted": palette.muted,
    "--color-gold": palette.accent,
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-bg text-text" style={themeVars}>
      <HomeSectionNav />
      <Hero />
      <About />
      <Experience />
      <ProjectsSection active={active} />
      <Skills />
      <Footer />
    </div>
  );
}
