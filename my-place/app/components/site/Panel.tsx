"use client";

import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import { SLIDE_DURATION, SLIDE_BACK_DURATION_MS, SLIDE_EASING } from "../../constants/siteAnimations";
import { useSwipe, type SwipeDirection } from "../../hooks/usePanelSwipe";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "./SiteChevrons";

export const PanelNavContext = createContext<{
  onBack: () => void;
  swipeBackDirection: SwipeDirection;
} | null>(null);

export function usePanelNav() {
  const ctx = useContext(PanelNavContext);
  if (!ctx) {
    throw new Error("BackToMenuButton must be used inside a Panel");
  }
  return ctx;
}

function chevronForSwipeBack(direction: SwipeDirection) {
  switch (direction) {
    case "down":
      return <ChevronUp />;
    case "up":
      return <ChevronDown />;
    case "left":
      return <ChevronRight />;
    case "right":
      return <ChevronLeft />;
  }
}

/** Sits on the same row as the page title (top-aligned with the heading). */
export function BackToMenuButton() {
  const { onBack, swipeBackDirection } = usePanelNav();
  return (
    <button
      type="button"
      onClick={onBack}
      className="font-sans flex shrink-0 items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
    >
      {chevronForSwipeBack(swipeBackDirection)}
      <span>Menu</span>
    </button>
  );
}

export interface PanelProps {
  isActive: boolean;
  animation: string;
  onBack: () => void;
  onSwipeBack: () => void;
  swipeBackDirection: SwipeDirection;
  naturalSwipe: boolean;
  onSwipe?: () => void;
  children: ReactNode;
  header?: ReactNode;
}

export function Panel({
  isActive,
  animation,
  onBack,
  onSwipeBack,
  swipeBackDirection,
  naturalSwipe,
  onSwipe,
  children,
  header,
}: PanelProps) {
  const handleSwipe = useCallback(
    (direction: SwipeDirection) => {
      onSwipe?.();
      if (direction === swipeBackDirection) {
        onSwipeBack();
      }
    },
    [swipeBackDirection, onSwipeBack, onSwipe],
  );

  const containerRef = useSwipe(handleSwipe, isActive, naturalSwipe);

  return (
    <section
      ref={containerRef}
      className={`h-screen flex flex-col bg-black absolute inset-0 ${isActive ? "" : "pointer-events-none"}`}
      style={{
        animation: isActive ? `${animation} ${SLIDE_DURATION} ${SLIDE_EASING} forwards` : undefined,
        opacity: isActive ? 1 : 0,
        transition: `opacity ${SLIDE_BACK_DURATION_MS}ms ease-out`,
      }}
    >
      <PanelNavContext.Provider value={{ onBack, swipeBackDirection }}>
        {header && (
          <div className="flex items-center justify-center border-b border-white/10 p-6">
            {header}
          </div>
        )}
        {children}
      </PanelNavContext.Provider>
    </section>
  );
}
