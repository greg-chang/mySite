"use client";

import { useCallback } from "react";
import type { View } from "../../types/site";
import { useSwipe, type SwipeDirection } from "../../hooks/usePanelSwipe";

export interface MenuProps {
  isActive: boolean;
  onNavigate: (view: View) => void;
  naturalSwipe: boolean;
  onSwipe?: () => void;
}

export function Menu({ isActive, onNavigate, naturalSwipe, onSwipe }: MenuProps) {
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

  const containerRef = useSwipe(handleSwipe, isActive, naturalSwipe);

  return (
    <section
      ref={containerRef}
      className={`h-screen absolute inset-0 ${isActive ? "" : "pointer-events-none"}`}
    >
      <div
        className="absolute left-1/2 top-1/2 h-[40em] w-[80ch] -translate-x-1/2 -translate-y-1/2 font-mono leading-none tracking-tight text-white"
        style={{
          fontSize: "clamp(0.7rem, min(100vw / 80, 150vh / 80), 2rem)",
          fontFamily:
            "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace",
        }}
      >
        <nav aria-label="Main menu">
          <button
            type="button"
            onClick={() => onNavigate("about")}
            className="absolute left-[36ch] top-[17em] h-[1em] w-[7ch] cursor-pointer bg-transparent text-transparent focus-visible:outline-1 focus-visible:outline-white/60"
            aria-label="About"
          />
          <button
            type="button"
            onClick={() => onNavigate("experience")}
            className="absolute left-[34ch] top-[19em] h-[1em] w-[12ch] cursor-pointer bg-transparent text-transparent focus-visible:outline-1 focus-visible:outline-white/60"
            aria-label="Experience"
          />
          <button
            type="button"
            onClick={() => onNavigate("works")}
            className="absolute left-[36ch] top-[21em] h-[1em] w-[7ch] cursor-pointer bg-transparent text-transparent focus-visible:outline-1 focus-visible:outline-white/60"
            aria-label="Works"
          />
          <button
            type="button"
            onClick={() => onNavigate("contact")}
            className="absolute left-[35ch] top-[23em] h-[1em] w-[9ch] cursor-pointer bg-transparent text-transparent focus-visible:outline-1 focus-visible:outline-white/60"
            aria-label="Contact"
          />
        </nav>
      </div>
    </section>
  );
}
