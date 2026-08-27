"use client";

import { useState } from "react";
import PokerEmbed from "@/components/projects/PokerEmbed";
import ChatbotDemo from "@/components/projects/ChatbotDemo";
import RacingGameDemo from "@/components/projects/RacingGameDemo";
import HomePanel from "@/components/carousel/HomePanel";
import DummyPage from "@/components/carousel/DummyPage";
import WorkspaceSwitcher from "@/components/carousel/WorkspaceSwitcher";
import { useSelector } from "@/components/carousel/SelectorContext";
import { WORKSPACE_PAGES } from "@/lib/workspacePages";

const demoEmbeds = { poker: PokerEmbed, chatbot: ChatbotDemo, racing: RacingGameDemo };

// Every panel renders all the time -- only the active one is visible and
// interactive. That's what "freeze" means here: the racing game's own
// active/fill props stop its animation loop and input listeners when it's
// not on screen, and the chatbot/poker panels just sit hidden with their
// state intact, ready to resume the instant they're selected again. It's
// also what makes Home's scroll position "sticky": its scroll container
// never unmounts, so the browser keeps its scrollTop for free.
export default function FullscreenCarousel() {
  const [racingSnapshot, setRacingSnapshot] = useState(null);
  const [chatPreview, setChatPreview] = useState(null);
  const { open, setOpen, activeId, setActiveId } = useSelector();

  return (
    <main className="relative flex-1 overflow-hidden bg-bg">
      <div className="absolute inset-0 grid grid-cols-[1fr] grid-rows-[1fr]">
        {WORKSPACE_PAGES.map((page, index) => {
          const isActive = page.id === activeId;
          return (
            <div
              key={page.id}
              aria-hidden={!isActive}
              style={{ gridArea: "1 / 1", minHeight: 0, minWidth: 0 }}
              className={`h-full w-full transition-opacity duration-500 ease-out ${
                isActive ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
              }`}
            >
              {page.kind === "home" && <HomePanel active={isActive} />}
              {page.kind === "dummy" && <DummyPage page={page.theme} index={index + 1} />}
              {page.kind === "demo" &&
                (page.id === "racing" ? (
                  <RacingGameDemo active={isActive} fill onFrame={setRacingSnapshot} />
                ) : (
                  <DemoPanel id={page.id} setChatPreview={setChatPreview} />
                ))}
            </div>
          );
        })}
      </div>

      {open && (
        <WorkspaceSwitcher
          pages={WORKSPACE_PAGES}
          activeId={activeId}
          onSelect={setActiveId}
          onClose={() => setOpen(false)}
          racingSnapshot={racingSnapshot}
          chatPreview={chatPreview}
        />
      )}
    </main>
  );
}

function DemoPanel({ id, setChatPreview }) {
  const Embed = demoEmbeds[id];
  return (
    <div className="flex h-full w-full items-center justify-center p-6 sm:p-10">
      <div className="h-[min(78vh,640px)] w-full">
        <Embed fill {...(id === "chatbot" ? { onPreviewChange: setChatPreview } : {})} />
      </div>
    </div>
  );
}
