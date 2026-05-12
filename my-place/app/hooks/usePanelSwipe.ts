import { useRef, useEffect } from "react";

export type SwipeDirection = "left" | "right" | "up" | "down";

const SWIPE_COOLDOWN_MS = 500;
const SWIPE_THRESHOLD = 100;
const WHEEL_RESET_MS = 150;
const PROJECT_SWIPE_LOCK_MS = 900;

const swipeCooldownRef = { current: 0 };

export function useSwipe<T extends HTMLElement = HTMLElement>(
  onSwipe: (direction: SwipeDirection) => void,
  enabled: boolean,
  naturalSwipe: boolean,
) {
  const wheelAccumRef = useRef({ x: 0, y: 0 });
  const wheelResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<T | null>(null);
  const onSwipeRef = useRef(onSwipe);
  onSwipeRef.current = onSwipe;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !enabled) return;

    const onWheel = (e: WheelEvent) => {
      if (Date.now() < swipeCooldownRef.current) return;

      // If a scrollable child still has room to scroll in this direction, let it.
      if (e.deltaY !== 0) {
        let node: Element | null = e.target as Element;
        while (node && node !== el) {
          const { overflowY } = window.getComputedStyle(node);
          if ((overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight) {
            if (e.deltaY < 0 && node.scrollTop > 0) return;
            if (e.deltaY > 0 && node.scrollTop < node.scrollHeight - node.clientHeight - 1) return;
            break;
          }
          node = node.parentElement;
        }
      }

      if (wheelResetTimeoutRef.current) {
        clearTimeout(wheelResetTimeoutRef.current);
      }

      wheelAccumRef.current.x += e.deltaX;
      wheelAccumRef.current.y += e.deltaY;

      const { x, y } = wheelAccumRef.current;
      const absX = Math.abs(x);
      const absY = Math.abs(y);

      if (absX >= SWIPE_THRESHOLD || absY >= SWIPE_THRESHOLD) {
        e.preventDefault();
        swipeCooldownRef.current = Date.now() + SWIPE_COOLDOWN_MS;
        wheelAccumRef.current = { x: 0, y: 0 };

        if (absX > absY) {
          onSwipeRef.current(x > 0 === naturalSwipe ? "left" : "right");
        } else {
          onSwipeRef.current(y > 0 === naturalSwipe ? "up" : "down");
        }
        return;
      }

      wheelResetTimeoutRef.current = setTimeout(() => {
        wheelAccumRef.current = { x: 0, y: 0 };
      }, WHEEL_RESET_MS);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelResetTimeoutRef.current) clearTimeout(wheelResetTimeoutRef.current);
    };
  }, [enabled, naturalSwipe]);

  return containerRef;
}

// used in WorksContent.tsx for the vertical swipe handling & swipe back functionality
export function useVerticalSwipe<T extends HTMLElement = HTMLElement>(
  onSwipe: (direction: Extract<SwipeDirection, "up" | "down">) => void,
  enabled: boolean,
  naturalSwipe: boolean,
) {
  const wheelAccumRef = useRef({ x: 0, y: 0 });
  const wheelResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gestureLockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gestureLockedRef = useRef(false);
  const containerRef = useRef<T | null>(null);
  const onSwipeRef = useRef(onSwipe);
  onSwipeRef.current = onSwipe;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !enabled) return;

    const onWheel = (e: WheelEvent) => {
      if (wheelResetTimeoutRef.current) {
        clearTimeout(wheelResetTimeoutRef.current);
      }

      wheelResetTimeoutRef.current = setTimeout(() => {
        wheelAccumRef.current = { x: 0, y: 0 };
      }, WHEEL_RESET_MS);

      if (gestureLockedRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (Date.now() < swipeCooldownRef.current) {
        return;
      }

      wheelAccumRef.current.x += e.deltaX;
      wheelAccumRef.current.y += e.deltaY;

      const { x, y } = wheelAccumRef.current;
      const absX = Math.abs(x);
      const absY = Math.abs(y);

      if (absX >= SWIPE_THRESHOLD || absY >= SWIPE_THRESHOLD) {
        wheelAccumRef.current = { x: 0, y: 0 };

        if (absX > absY) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();
        swipeCooldownRef.current = Date.now() + SWIPE_COOLDOWN_MS;
        gestureLockedRef.current = true;
        if (gestureLockTimeoutRef.current) clearTimeout(gestureLockTimeoutRef.current);
        gestureLockTimeoutRef.current = setTimeout(() => {
          gestureLockedRef.current = false;
        }, PROJECT_SWIPE_LOCK_MS);
        onSwipeRef.current(y > 0 === naturalSwipe ? "up" : "down");
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelResetTimeoutRef.current) clearTimeout(wheelResetTimeoutRef.current);
      if (gestureLockTimeoutRef.current) clearTimeout(gestureLockTimeoutRef.current);
    };
  }, [enabled, naturalSwipe]);

  return containerRef;
}
