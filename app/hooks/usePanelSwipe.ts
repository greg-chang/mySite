import { useRef, useEffect } from "react";

export type SwipeDirection = "left" | "right" | "up" | "down";

const SWIPE_THRESHOLD = 50;
const TOUCH_THRESHOLD = 60; // slightly higher than wheel — touch deltas are in physical px
const WHEEL_RESET_MS = 150;
const PROJECT_SWIPE_LOCK_MS = 900;

/**
 * Directional momentum lock — no time-based cooldowns.
 *
 * After a panel-nav swipe, same-axis same-sign events are treated as momentum
 * and ignored.  The lock clears when:
 *   a) delta falls below MOMENTUM_DEAD_PX  (momentum decayed)
 *   b) sign reverses                        (user deliberately reversed)
 *   c) WHEEL_RESET_MS passes with no events (mouse wheel / quick lift)
 *
 * Opposite-direction swipes are NEVER blocked.
 */
const MOMENTUM_DEAD_PX = 2;

const navLockRef = { current: null as { axis: "x" | "y"; sign: number } | null };
const navLockClearTimer = { current: null as ReturnType<typeof setTimeout> | null };

function clearNavLock() {
  navLockRef.current = null;
  if (navLockClearTimer.current) {
    clearTimeout(navLockClearTimer.current);
    navLockClearTimer.current = null;
  }
}

export function useSwipe<T extends HTMLElement = HTMLElement>(
  onSwipe: (direction: SwipeDirection) => void,
  enabled: boolean,
  naturalSwipe: boolean,
) {
  const wheelAccumRef = useRef({ x: 0, y: 0 });
  const wheelResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<T | null>(null);

  // Sync refs on every render — the listener reads these instead of closing
  // over stale prop values.  This also means the listener never needs to be
  // re-registered when enabled/naturalSwipe change, eliminating the ~16 ms
  // gap that previously occurred during panel transitions.
  const enabledRef = useRef(enabled);
  const naturalSwipeRef = useRef(naturalSwipe);
  const onSwipeRef = useRef(onSwipe);
  enabledRef.current = enabled;
  naturalSwipeRef.current = naturalSwipe;
  onSwipeRef.current = onSwipe;

  // Reset accumulator whenever enabled changes (no listener remount needed).
  useEffect(() => {
    wheelAccumRef.current = { x: 0, y: 0 };
    if (wheelResetTimeoutRef.current) {
      clearTimeout(wheelResetTimeoutRef.current);
      wheelResetTimeoutRef.current = null;
    }
  }, [enabled]);

  // Mount once — never remounts.
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!enabledRef.current) return;

      // Directional momentum guard.
      const lock = navLockRef.current;
      if (lock) {
        const delta = lock.axis === "x" ? e.deltaX : e.deltaY;
        if (Math.sign(delta) === lock.sign && Math.abs(delta) >= MOMENTUM_DEAD_PX) {
          if (navLockClearTimer.current) clearTimeout(navLockClearTimer.current);
          navLockClearTimer.current = setTimeout(clearNavLock, WHEEL_RESET_MS);
          return;
        }
        clearNavLock();
      }

      // Let scrollable children scroll before treating the gesture as a page swipe.
      if (e.deltaY !== 0) {
        let node: Element | null = e.target as Element;
        while (node) {
          const { overflowY } = window.getComputedStyle(node);
          if ((overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight) {
            if (e.deltaY < 0 && node.scrollTop > 0) return;
            if (e.deltaY > 0 && node.scrollTop < node.scrollHeight - node.clientHeight - 1) return;
            break;
          }
          node = node.parentElement;
        }
      }

      if (wheelResetTimeoutRef.current) clearTimeout(wheelResetTimeoutRef.current);

      wheelAccumRef.current.x += e.deltaX;
      wheelAccumRef.current.y += e.deltaY;

      const { x, y } = wheelAccumRef.current;
      const absX = Math.abs(x);
      const absY = Math.abs(y);

      if (absX >= SWIPE_THRESHOLD || absY >= SWIPE_THRESHOLD) {
        wheelAccumRef.current = { x: 0, y: 0 };

        if (absX > absY) {
          navLockRef.current = { axis: "x", sign: Math.sign(x) };
          onSwipeRef.current(x > 0 === naturalSwipeRef.current ? "left" : "right");
        } else {
          navLockRef.current = { axis: "y", sign: Math.sign(y) };
          onSwipeRef.current(y > 0 === naturalSwipeRef.current ? "up" : "down");
        }

        if (navLockClearTimer.current) clearTimeout(navLockClearTimer.current);
        navLockClearTimer.current = setTimeout(clearNavLock, WHEEL_RESET_MS);
        return;
      }

      wheelResetTimeoutRef.current = setTimeout(() => {
        wheelAccumRef.current = { x: 0, y: 0 };
      }, WHEEL_RESET_MS);
    };

    // --- Touch support ---
    // Touch is always direct — no naturalSwipe flip (there's no "inverted touch" on phones).
    // We snapshot the scrollable-parent state at touchstart so the check at touchend
    // sees the original scroll position, not the post-scroll one.
    let touchStartX = 0;
    let touchStartY = 0;
    let touchScrollSnap: { scrollTop: number; scrollHeight: number; clientHeight: number } | null = null;

    const onTouchStart = (e: TouchEvent) => {
      if (!enabledRef.current) return;
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;

      // Snapshot the nearest scrollable parent so we can check scroll boundaries at touchend.
      touchScrollSnap = null;
      let node: Element | null = e.target as Element;
      while (node) {
        const { overflowY } = window.getComputedStyle(node);
        if ((overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight) {
          touchScrollSnap = {
            scrollTop: node.scrollTop,
            scrollHeight: node.scrollHeight,
            clientHeight: node.clientHeight,
          };
          break;
        }
        node = node.parentElement;
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!enabledRef.current) return;
      if (e.changedTouches.length !== 1) return;

      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      if (absX < TOUCH_THRESHOLD && absY < TOUCH_THRESHOLD) return;

      // If the gesture was primarily vertical and a scrollable parent had room to
      // scroll in that direction, treat it as a content scroll, not a page swipe.
      if (absY > absX && touchScrollSnap) {
        const { scrollTop, scrollHeight, clientHeight } = touchScrollSnap;
        if (dy > 0 && scrollTop > 0) return; // finger down = content scrolling up, still had room
        if (dy < 0 && scrollTop < scrollHeight - clientHeight - 1) return; // finger up = scrolling down
      }

      if (absX > absY) {
        onSwipeRef.current(dx > 0 ? "right" : "left");
      } else {
        onSwipeRef.current(dy > 0 ? "down" : "up");
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      if (wheelResetTimeoutRef.current) clearTimeout(wheelResetTimeoutRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return containerRef;
}

// /** Vertical project carousel inside the Works panel. */
// export function useVerticalSwipe<T extends HTMLElement = HTMLElement>(
//   onSwipe: (direction: Extract<SwipeDirection, "up" | "down">) => void,
//   enabled: boolean,
//   naturalSwipe: boolean,
// ) {
//   const wheelAccumRef = useRef({ x: 0, y: 0 });
//   const wheelResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const gestureLockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const gestureLockedRef = useRef(false);
//   const containerRef = useRef<T | null>(null);
//   const enabledRef = useRef(enabled);
//   const naturalSwipeRef = useRef(naturalSwipe);
//   const onSwipeRef = useRef(onSwipe);
//   enabledRef.current = enabled;
//   naturalSwipeRef.current = naturalSwipe;
//   onSwipeRef.current = onSwipe;

//   useEffect(() => {
//     wheelAccumRef.current = { x: 0, y: 0 };
//     gestureLockedRef.current = false;
//     if (wheelResetTimeoutRef.current) {
//       clearTimeout(wheelResetTimeoutRef.current);
//       wheelResetTimeoutRef.current = null;
//     }
//     if (gestureLockTimeoutRef.current) {
//       clearTimeout(gestureLockTimeoutRef.current);
//       gestureLockTimeoutRef.current = null;
//     }
//   }, [enabled]);

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     const onWheel = (e: WheelEvent) => {
//       if (!enabledRef.current) return;

//       if (wheelResetTimeoutRef.current) clearTimeout(wheelResetTimeoutRef.current);
//       wheelResetTimeoutRef.current = setTimeout(() => {
//         wheelAccumRef.current = { x: 0, y: 0 };
//       }, WHEEL_RESET_MS);

//       if (gestureLockedRef.current) {
//         e.stopPropagation();
//         return;
//       }

//       wheelAccumRef.current.x += e.deltaX;
//       wheelAccumRef.current.y += e.deltaY;

//       const { x, y } = wheelAccumRef.current;
//       const absX = Math.abs(x);
//       const absY = Math.abs(y);

//       if (absX >= SWIPE_THRESHOLD || absY >= SWIPE_THRESHOLD) {
//         wheelAccumRef.current = { x: 0, y: 0 };
//         if (absX > absY) return; // horizontal-dominant: let useSwipe handle panel nav

//         e.stopPropagation();
//         gestureLockedRef.current = true;
//         if (gestureLockTimeoutRef.current) clearTimeout(gestureLockTimeoutRef.current);
//         gestureLockTimeoutRef.current = setTimeout(() => {
//           gestureLockedRef.current = false;
//         }, PROJECT_SWIPE_LOCK_MS);
//         onSwipeRef.current(y > 0 === naturalSwipeRef.current ? "up" : "down");
//       }
//     };

//     el.addEventListener("wheel", onWheel, { passive: true });
//     return () => {
//       el.removeEventListener("wheel", onWheel);
//       if (wheelResetTimeoutRef.current) clearTimeout(wheelResetTimeoutRef.current);
//       if (gestureLockTimeoutRef.current) clearTimeout(gestureLockTimeoutRef.current);
//     };
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   return containerRef;
// }
