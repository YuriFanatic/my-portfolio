"use client";

import { createContext, useContext, useState } from "react";
import { PALETTES } from "@/lib/palettes";

const SelectorContext = createContext({
  open: false,
  setOpen: () => {},
  activeId: "home",
  setActiveId: () => {},
  palette: PALETTES[0],
  setPalette: () => {},
});

export function SelectorProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [palette, setPalette] = useState(PALETTES[0]);
  return (
    <SelectorContext.Provider value={{ open, setOpen, activeId, setActiveId, palette, setPalette }}>
      {children}
    </SelectorContext.Provider>
  );
}

export function useSelector() {
  return useContext(SelectorContext);
}
