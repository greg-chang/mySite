"use client";

import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import { LuChevronDown, LuChevronLeft, LuChevronRight, LuChevronUp } from "react-icons/lu";
import { useSwipe, type SwipeDirection } from "../hooks/usePanelSwipe";

const SLIDE_DURATION_MS = 420;
const SLIDE_BACK_DURATION_MS = 500;
const SLIDE_EASING = "cubic-bezier(0.33, 1.1, 0.68, 1)";

function entryTransform(animation: string): string {
  if (animation.includes("Bottom")) return "translateY(100%)";
  if (animation.includes("Top")) return "translateY(-100%)";
  if (animation.includes("Left")) return "translateX(-100%)";
  if (animation.includes("Right")) return "translateX(100%)";
  return "translateY(100%)";
}

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
      return <LuChevronUp />;
    case "up":
      return <LuChevronDown />;
    case "left":
      return <LuChevronRight />;
    case "right":
      return <LuChevronLeft />;
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
  swipeEnabled?: boolean;
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
  swipeEnabled = true,
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

  const containerRef = useSwipe(handleSwipe, isActive && swipeEnabled, naturalSwipe);

  // Use CSS transitions instead of @keyframes animations so the settled active
  // state is transform:none — no stacking context, no iOS scroll interference.
  // When inactive the panel sits off-screen at its entry position, ready to
  // slide back in. The exit is a plain opacity fade; the transform resets after
  // the fade completes (via transition-delay) so it's invisible during reset.
  const offScreen = entryTransform(animation);
  const panelStyle: React.CSSProperties = isActive
    ? {
        transform: "none",
        opacity: 1,
        transition: `transform ${SLIDE_DURATION_MS}ms ${SLIDE_EASING}, opacity 0.05s ease`,
      }
    : {
        transform: offScreen,
        opacity: 0,
        transition: `opacity ${SLIDE_BACK_DURATION_MS}ms ease-out, transform 0s linear ${SLIDE_BACK_DURATION_MS}ms`,
      };

  return (
    <section
      ref={containerRef}
      className={`flex flex-col bg-black absolute inset-0 ${isActive ? "" : "pointer-events-none"}`}
      style={{ ...panelStyle, height: "100dvh" }}
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
