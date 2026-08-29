"use client";

import { createContext, useContext, useState } from "react";
import { PALETTES } from "@/lib/palettes";

const WorkspaceContext = createContext({
  open: false,
  setOpen: () => {},
  activeId: "home",
  setActiveId: () => {},
  palette: PALETTES[0],
  setPalette: () => {},
});

export function WorkspaceProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [palette, setPalette] = useState(PALETTES[0]);
  return (
    <WorkspaceContext.Provider value={{ open, setOpen, activeId, setActiveId, palette, setPalette }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  return useContext(WorkspaceContext);
}
