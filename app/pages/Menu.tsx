"use client";

import { useCallback, useEffect, useState } from "react";
import type { View } from "../types/site";
import { useSwipe, type SwipeDirection } from "../hooks/usePanelSwipe";

export interface MenuProps {
  isActive: boolean;
  onNavigate: (view: View) => void;
  naturalSwipe: boolean;
  onSwipe?: () => void;
  swipeEnabled?: boolean;
}

export function Menu({ isActive, onNavigate, naturalSwipe, onSwipe, swipeEnabled = true }: MenuProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const handleSwipe = useCallback(
    (direction: SwipeDirection) => {
      onSwipe?.();
      switch (direction) {
        case "left":
          onNavigate("works");
          break;
        case "right":
          onNavigate("experience");
          break;
        case "up":
          onNavigate("about");
          break;
        case "down":
          onNavigate("contact");
          break;
      }
    },
    [onNavigate, onSwipe],
  );

  const containerRef = useSwipe(handleSwipe, isActive && swipeEnabled, naturalSwipe);

  return (
    <section
      ref={containerRef}
      className={`h-screen absolute inset-0 ${isActive ? "" : "pointer-events-none"}`}
    >
      <div
        className="absolute left-1/2 top-1/2 h-[40em] w-[80ch] -translate-x-1/2 -translate-y-1/2 font-mono leading-none tracking-tight text-white"
        style={{
          fontSize: isTouchDevice
            ? "clamp(1.05rem, min(100vw / 77, 150vh / 77), 2.5rem)"
            : "clamp(1rem, min(100vw / 77, 150vh / 77), 2.5rem)",
          fontFamily:
            "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace",
        }}
      >
        <nav aria-label="Main menu">
          <button
            type="button"
            onClick={() => onNavigate("about")}
            className="absolute left-[34ch] top-[15em] h-[3em] w-[11ch] sm:left-[36ch] sm:top-[17em] sm:h-[1em] sm:w-[7ch] cursor-pointer bg-transparent text-transparent focus-visible:outline-1 focus-visible:outline-white/60"
            aria-label="About"
          />
          <button
            type="button"
            onClick={() => onNavigate("experience")}
            className="absolute left-[32ch] top-[18em] h-[3em] w-[16ch] sm:left-[34ch] sm:top-[19em] sm:h-[1em] sm:w-[12ch] cursor-pointer bg-transparent text-transparent focus-visible:outline-1 focus-visible:outline-white/60"
            aria-label="Experience"
          />
          <button
            type="button"
            onClick={() => onNavigate("works")}
            className="absolute left-[34ch] top-[21em] h-[3em] w-[11ch] sm:left-[36ch] sm:top-[21em] sm:h-[1em] sm:w-[7ch] cursor-pointer bg-transparent text-transparent focus-visible:outline-1 focus-visible:outline-white/60"
            aria-label="Works"
          />
          <button
            type="button"
            onClick={() => onNavigate("contact")}
            className="absolute left-[33ch] top-[24em] h-[3em] w-[13ch] sm:left-[35ch] sm:top-[23em] sm:h-[1em] sm:w-[9ch] cursor-pointer bg-transparent text-transparent focus-visible:outline-1 focus-visible:outline-white/60"
            aria-label="Contact"
          />
        </nav>
      </div>
    </section>
  );
}
