"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import DonutAnimation from "./components/DonutAnimation";
import { Menu } from "./components/site/Menu";
import { Panel } from "./components/site/Panel";
import { AboutContent, ContactContent, ExperienceContent, WorksContent } from "./components/site/PanelContents";
import { SettingsMenu } from "./components/site/SettingsMenu";
import { INITIAL_SETTINGS_DELAY_MS } from "./constants/siteUi";
import { getDefaultSwipePreference } from "./lib/getDefaultSwipePreference";
import type { View } from "./types/site";

export default function Home() {
  const [menuReady, setMenuReady] = useState(false);
  const [view, setView] = useState<View>("menu");
  const [naturalSwipe, setNaturalSwipe] = useState(getDefaultSwipePreference);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsDelayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToMenu = () => setView("menu");
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  useEffect(() => {
    return () => {
      if (settingsDelayTimeoutRef.current) clearTimeout(settingsDelayTimeoutRef.current);
    };
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden bg-black text-white relative">
      <div className="absolute inset-0">
        <DonutAnimation
          onMenuReady={() => {
            setMenuReady(true);
            settingsDelayTimeoutRef.current = setTimeout(() => {
              setSettingsOpen(true);
            }, INITIAL_SETTINGS_DELAY_MS);
          }}
        />
      </div>

      <SettingsMenu
        naturalSwipe={naturalSwipe}
        onNaturalSwipeChange={setNaturalSwipe}
        isOpen={settingsOpen}
        onOpenChange={setSettingsOpen}
      />

      <div className={`absolute inset-0 ${menuReady ? "" : "pointer-events-none"}`}>
        <Menu isActive={menuReady && view === "menu"} onNavigate={setView} naturalSwipe={naturalSwipe} onSwipe={closeSettings} />

        <Panel
          isActive={view === "about"}
          animation="slideInFromBottom"
          onBack={goToMenu}
          onSwipeBack={goToMenu}
          swipeBackDirection="down"
          naturalSwipe={naturalSwipe}
          onSwipe={closeSettings}
        >
          <AboutContent />
        </Panel>

        <Panel
          isActive={view === "experience"}
          animation="slideInFromLeft"
          onBack={goToMenu}
          onSwipeBack={goToMenu}
          swipeBackDirection="left"
          naturalSwipe={naturalSwipe}
          onSwipe={closeSettings}
        >
          <ExperienceContent />
        </Panel>

        <Panel
          isActive={view === "contact"}
          animation="slideInFromTop"
          onBack={goToMenu}
          onSwipeBack={goToMenu}
          swipeBackDirection="up"
          naturalSwipe={naturalSwipe}
          onSwipe={closeSettings}
        >
          <ContactContent />
        </Panel>

        <Panel
          isActive={view === "works"}
          animation="slideInFromRight"
          onBack={goToMenu}
          onSwipeBack={goToMenu}
          swipeBackDirection="right"
          naturalSwipe={naturalSwipe}
          onSwipe={closeSettings}
        >
          <WorksContent naturalSwipe={naturalSwipe} />
        </Panel>
      </div>
    </div>
  );
}
