import { projects } from "./projects";
import { PALETTES } from "./palettes";

// The single source of truth for workspace order: home, then the three
// live demos (right after home, per the switcher's ws-1..ws-9 numbering),
// then the dummy placeholder workspaces -- one per palette, so switching
// to one previews the same colors the palette switcher offers on home.
// Nav's dots, the workspace switcher, and the carousel itself all read
// from this list so they can never drift out of sync with each other.
export const WORKSPACE_PAGES = [
  { id: "home", title: "Home", kind: "home" },
  ...projects.map((p) => ({ id: p.id, title: p.title, kind: "demo" })),
  ...PALETTES.map((pal) => ({
    id: pal.id,
    title: pal.name,
    kind: "dummy",
    // `secondary` is a DummyPage/PageMiniPreview-era alias for surface2 --
    // kept alongside the full palette so those components don't need to
    // know about the richer palette shape.
    theme: { ...pal, secondary: pal.surface2 },
  })),
];
