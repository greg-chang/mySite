"use client";

import { useRef, useEffect, useState } from "react";

// Donut animation created using help from https://www.a1k0n.net/2011/07/20/donut-math.html
const THETA_SPACING = 0.07;
const PHI_SPACING = 0.02;
const R1 = 1;
const R2 = 2;
const K2 = 5;
const LUMINANCE_CHARS = ".,-~:;=!*#$@";

// Camera FOV: half-angle in radians. Full FOV = 2*FOV.
// Smaller FOV = more zoomed in (donut looks bigger). Larger FOV = wider angle (donut looks smaller).
// e.g. Math.PI/6 = 30°, Math.PI/4 = 45°, Math.PI/3 = 60°, Math.PI/2 = 90°
const FOV_HALF_RADIANS = Math.PI / 3; // 60° full FOV

const COLS = 80;
const ROWS = 40;

const NORMAL_SPIN_A = 0.03; // 20% slower than 0.04
const NORMAL_SPIN_B = 0.01; // 20% slower than 0.02

const EXPLODE_SPEED = 0.5;
const EXPLODE_DRAG = 0.99;
const EXPLODE_DURATION_FRAMES = 120;
const CLICK_THRESHOLD = 6;
const EXPLODE_HOLD_OFF_SCREEN_FRAMES = 70;
const CONVERGE_LERP = 0.05;
const MENU_HOLD_MS = 650;
const LANDSCAPE_EXPLOSION_FILL = { width: 0.9, height: 0.65 };
const PORTRAIT_EXPLOSION_FILL = { width: 0.78, height: 0.88 };

const MENU_LINES = [
  "Greg's site",
  "",
  "v About",
  "",
  "< Experience",
  "",
  "> Works",
  "",
  "^ Contact",
];

type TargetPoint = {
  x: number;
  y: number;
  char: string;
};


function renderFrame(
  screenWidth: number,
  screenHeight: number,
  A: number,
  B: number,
  scale: number,
  offsetX: number,
  offsetY: number
): string[][] {
  // Perspective: center + offset + K1*scale*x/z. K1 = focal scale.
  const screenHalf = Math.min(screenWidth, screenHeight) / 2;
  const K1 = (screenHalf / Math.tan(FOV_HALF_RADIANS)) * scale;

  const output: string[][] = Array(screenHeight)
    .fill(null)
    .map(() => Array(screenWidth).fill(" "));
  const zbuffer: number[][] = Array(screenHeight)
    .fill(null)
    .map(() => Array(screenWidth).fill(0));

  const cosA = Math.cos(A);
  const sinA = Math.sin(A);
  const cosB = Math.cos(B);
  const sinB = Math.sin(B);

  for (let theta = 0; theta < 2 * Math.PI; theta += THETA_SPACING) {
    const costheta = Math.cos(theta);
    const sintheta = Math.sin(theta);

    for (let phi = 0; phi < 2 * Math.PI; phi += PHI_SPACING) {
      const cosphi = Math.cos(phi);
      const sinphi = Math.sin(phi);

      const circlex = R2 + R1 * costheta;
      const circley = R1 * sintheta;

      const x =
        circlex * (cosB * cosphi + sinA * sinB * sinphi) - circley * cosA * sinB;
      const y =
        circlex * (sinB * cosphi - sinA * cosB * sinphi) + circley * cosA * cosB;
      const z = K2 + cosA * circlex * sinphi + circley * sinA;
      const ooz = 1 / z;

      const xp = Math.floor(
        screenWidth / 2 + offsetX + K1 * ooz * x
      );
      const yp = Math.floor(
        screenHeight / 2 + offsetY - K1 * ooz * y
      );

      const L =
        cosphi * costheta * sinB -
        cosA * costheta * sinphi -
        sinA * sintheta +
        cosB * (cosA * sintheta - costheta * sinA * sinphi);

      if (L > 0) {
        if (
          xp >= 0 &&
          xp < screenWidth &&
          yp >= 0 &&
          yp < screenHeight &&
          ooz > zbuffer[yp][xp]
        ) {
          zbuffer[yp][xp] = ooz;
          const luminanceIndex = Math.min(
            Math.floor(L * 8),
            LUMINANCE_CHARS.length - 1
          );
          output[yp][xp] = LUMINANCE_CHARS[Math.max(0, luminanceIndex)];
        }
      }
    }
  }

  return output;
}

type Particle = {
  x: number;
  y: number;
  char: string;
  vx: number;
  vy: number;
  targetX?: number;
  targetY?: number;
};

// chPx / emPx: rendered character width / line-height in pixels at explosion time.
// speedPx: target pixels-per-frame for the fastest particle (viewport-corner bound).
// Velocities are normalised in pixel space so the explosion expands as a circle
// visually, regardless of the non-square character cells or screen size.
function frameToParticles(
  frame: string[][],
  chPx: number,
  emPx: number,
  speedPx: number,
): Particle[] {
  const centerX = COLS / 2;
  const centerY = ROWS / 2;
  const out: Particle[] = [];
  for (let j = 0; j < ROWS; j++)
    for (let i = 0; i < COLS; i++) {
      const ch = frame[j][i];
      if (ch === " ") continue;
      const dx = i - centerX;
      const dy = j - centerY;
      // Convert to pixel space so the outward direction is visually circular.
      const dxPx = dx * chPx;
      const dyPx = dy * emPx;
      const distPx = Math.sqrt(dxPx * dxPx + dyPx * dyPx);
      let vx: number;
      let vy: number;
      if (distPx < 1) {
        const angle = Math.random() * 2 * Math.PI;
        vx = (Math.cos(angle) * speedPx) / chPx;
        vy = (Math.sin(angle) * speedPx) / emPx;
      } else {
        vx = (dxPx / distPx) * speedPx / chPx;
        vy = (dyPx / distPx) * speedPx / emPx;
      }
      // Safety: ensure minimum visual speed
      const actualPx = Math.sqrt((vx * chPx) ** 2 + (vy * emPx) ** 2);
      if (actualPx < speedPx * 0.5) {
        const angle = Math.random() * 2 * Math.PI;
        vx = (Math.cos(angle) * speedPx) / chPx;
        vy = (Math.sin(angle) * speedPx) / emPx;
      }
      out.push({ x: i, y: j, char: ch, vx, vy });
    }
  return out;
}

function particlesToFrame(particles: Particle[]): string[][] {
  const frame = Array(ROWS)
    .fill(null)
    .map(() => Array(COLS).fill(" ") as string[]);
  for (const p of particles) {
    const col = Math.round(p.x);
    const row = Math.round(p.y);
    if (row >= 0 && row < ROWS && col >= 0 && col < COLS)
      frame[row][col] = p.char;
  }
  return frame;
}

function getMenuTargetPoints(): TargetPoint[] {
  const points: TargetPoint[] = [];
  const startY = Math.floor((ROWS - MENU_LINES.length) / 2);

  MENU_LINES.forEach((line, lineIndex) => {
    const startX = Math.floor((COLS - line.length) / 2);
    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      const char = line[charIndex];
      if (char === " ") continue;
      points.push({
        x: startX + charIndex,
        y: startY + lineIndex,
        char,
      });
    }
  });

  return points;
}

function assignMenuTargets(particles: Particle[]) {
  const targets = getMenuTargetPoints();
  if (targets.length === 0) return;

  particles.forEach((particle, index) => {
    const target = targets[index % targets.length];
    particle.targetX = target.x;
    particle.targetY = target.y;
    particle.char = target.char;
  });
}

function getCenteredBounds(widthCols: number, heightRows: number) {
  const clampedWidth = Math.min(COLS, Math.max(2, widthCols));
  const clampedHeight = Math.min(ROWS, Math.max(2, heightRows));
  const centerX = COLS / 2;
  const centerY = ROWS / 2;

  return {
    minX: centerX - clampedWidth / 2,
    maxX: centerX + clampedWidth / 2 - 1,
    minY: centerY - clampedHeight / 2,
    maxY: centerY + clampedHeight / 2 - 1,
  };
}

function getExplosionBounds(chPx = 8, emPx = 14) {
  const isPortrait =
    typeof window !== "undefined" && window.innerHeight > window.innerWidth;
  const fill = isPortrait ? PORTRAIT_EXPLOSION_FILL : LANDSCAPE_EXPLOSION_FILL;

  if (typeof window === "undefined") {
    return getCenteredBounds(COLS * fill.width, ROWS * fill.height);
  }

  return getCenteredBounds(
    (window.innerWidth * fill.width) / chPx,
    (window.innerHeight * fill.height) / emPx,
  );
}

export default function DonutAnimation({ onMenuReady }: { onMenuReady?: () => void } = {}) {
  const preRef = useRef<HTMLPreElement>(null);
  const ARef = useRef(0);
  const BRef = useRef(0);
  const scaleRef = useRef(1);
  const offsetXRef = useRef(0);
  const offsetYRef = useRef(0);
  const explodingRef = useRef(false);
  const hasStartedExplosionRef = useRef(false);
  const convergeRef = useRef(false);
  const particlesRef = useRef<Particle[]>([]);
  const explodeFrameRef = useRef(0);
  const atEdgeSinceFrameRef = useRef<number | null>(null);
  // Viewport-relative clamp bounds in grid coords.
  const explodeBoundsRef = useRef(getExplosionBounds());
  const pointerDownXRef = useRef(0);
  const pointerDownYRef = useRef(0);
  const hasMovedRef = useRef(false);
  const [showIntroCta, setShowIntroCta] = useState(true);
  const menuFormedRef = useRef(false);
  const menuHoldTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onMenuReadyRef = useRef(onMenuReady);
  onMenuReadyRef.current = onMenuReady;
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let animationId: number;
    const TARGET_FRAME_MS = 1000 / 60;

    const tick = (now: number) => {
      if (explodingRef.current) {
        const particles = particlesRef.current;
        const { minX, maxX, minY, maxY } = explodeBoundsRef.current;
        // dt compensation: scale steps so the animation runs at the same
        // wall-clock speed on 120 Hz displays as on 60 Hz.
        const dt = lastTimeRef.current !== null ? now - lastTimeRef.current : TARGET_FRAME_MS;
        lastTimeRef.current = now;
        const t = Math.min(dt / TARGET_FRAME_MS, 3);
        for (const p of particles) {
          p.x += p.vx * t;
          p.y += p.vy * t;
          if (p.x < minX) { p.x = minX; p.vx = 0; }
          if (p.x > maxX) { p.x = maxX; p.vx = 0; }
          if (p.y < minY) { p.y = minY; p.vy = 0; }
          if (p.y > maxY) { p.y = maxY; p.vy = 0; }
          p.vx *= EXPLODE_DRAG ** t;
          p.vy *= EXPLODE_DRAG ** t;
        }
        const frame = particlesToFrame(particles);
        const text = frame.map((row) => row.join("")).join("\n");
        if (preRef.current) preRef.current.textContent = text;
        explodeFrameRef.current += t;
        const allAtEdge = particles.every((p) => p.vx === 0 && p.vy === 0);
        if (allAtEdge && atEdgeSinceFrameRef.current === null)
          atEdgeSinceFrameRef.current = explodeFrameRef.current;
        const holdElapsed =
          atEdgeSinceFrameRef.current !== null
            ? explodeFrameRef.current - atEdgeSinceFrameRef.current
            : 0;
        const timeout =
          explodeFrameRef.current >= EXPLODE_DURATION_FRAMES;
        const holdDone = holdElapsed >= EXPLODE_HOLD_OFF_SCREEN_FRAMES;
        if ((allAtEdge && holdDone) || timeout) {
          explodingRef.current = false;
          atEdgeSinceFrameRef.current = null;
          assignMenuTargets(particlesRef.current);
          convergeRef.current = true;
        }
      } else if (convergeRef.current) {
        const particles = particlesRef.current;
        let allDone = true;
        for (const p of particles) {
          if (p.targetX === undefined || p.targetY === undefined) continue;
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
            p.x += dx * CONVERGE_LERP;
            p.y += dy * CONVERGE_LERP;
            allDone = false;
          } else {
            p.x = p.targetX;
            p.y = p.targetY;
          }
        }
        if (allDone) {
          convergeRef.current = false;
          menuFormedRef.current = true;
          const frame = particlesToFrame(particles);
          const text = frame.map((row) => row.join("")).join("\n");
          if (preRef.current) preRef.current.textContent = text;
          menuHoldTimeoutRef.current = setTimeout(() => {
            onMenuReadyRef.current?.();
          }, MENU_HOLD_MS);
        } else {
          const frame = particlesToFrame(particles);
          const text = frame.map((row) => row.join("")).join("\n");
          if (preRef.current) preRef.current.textContent = text;
        }
      } else if (!menuFormedRef.current) {
        const dt = lastTimeRef.current !== null ? now - lastTimeRef.current : TARGET_FRAME_MS;
        lastTimeRef.current = now;
        const scale = Math.min(dt / TARGET_FRAME_MS, 3);
        ARef.current += NORMAL_SPIN_A * scale;
        BRef.current += NORMAL_SPIN_B * scale;
        const frame = renderFrame(
          COLS,
          ROWS,
          ARef.current,
          BRef.current,
          scaleRef.current,
          offsetXRef.current,
          offsetYRef.current
        );
        const text = frame.map((row) => row.join("")).join("\n");
        if (preRef.current) preRef.current.textContent = text;
      } else {
        if (preRef.current) preRef.current.textContent = "";
      }
      if (!menuFormedRef.current) {
        animationId = requestAnimationFrame(tick);
      }
    };

    animationId = requestAnimationFrame((now) => {
      lastTimeRef.current = now;
      tick(now);
    });
    return () => {
      cancelAnimationFrame(animationId);
      if (menuHoldTimeoutRef.current) clearTimeout(menuHoldTimeoutRef.current);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    if (menuFormedRef.current) return;
    if (hasStartedExplosionRef.current) return;
    hasMovedRef.current = false;
    pointerDownXRef.current = e.clientX;
    pointerDownYRef.current = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!hasMovedRef.current) {
      const dx = e.clientX - pointerDownXRef.current;
      const dy = e.clientY - pointerDownYRef.current;
      if (Math.sqrt(dx * dx + dy * dy) > CLICK_THRESHOLD) {
        hasMovedRef.current = true;
      }
    }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    if (menuFormedRef.current) return;
    if (hasStartedExplosionRef.current) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      return;
    }
    if (explodingRef.current) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      return;
    }
    if (!hasMovedRef.current) {
      hasStartedExplosionRef.current = true;
      setShowIntroCta(false);
      const frame = renderFrame(
        COLS,
        ROWS,
        ARef.current,
        BRef.current,
        scaleRef.current,
        offsetXRef.current,
        offsetYRef.current
      );

      // Measure actual rendered character dimensions so velocities and bounds
      // are correct for this device's viewport and font size.
      let chPx = 8;   // sensible fallbacks
      let emPx = 14;
      if (preRef.current) {
        const cs = getComputedStyle(preRef.current);
        emPx = parseFloat(cs.fontSize);
        const probe = document.createElement("span");
        probe.style.cssText =
          `position:fixed;top:-9999px;left:-9999px;visibility:hidden;white-space:pre;` +
          `font-family:${cs.fontFamily};font-size:${cs.fontSize};` +
          `font-weight:${cs.fontWeight};letter-spacing:${cs.letterSpacing};`;
        probe.textContent = "M".repeat(COLS);
        document.body.appendChild(probe);
        chPx = probe.getBoundingClientRect().width / COLS;
        document.body.removeChild(probe);
      }

      // Size the explosion wall from viewport percentages, converted to grid coords.
      explodeBoundsRef.current = getExplosionBounds(chPx, emPx);

      // Speed: fastest particle (grid corner) arrives in ~60 % of the timeout
      // budget, keeping wall-collision timing consistent across screen sizes.
      const gridCornerDist = Math.sqrt(
        (COLS / 2 * chPx) ** 2 + (ROWS / 2 * emPx) ** 2
      );
      const speedPx = gridCornerDist / (EXPLODE_DURATION_FRAMES * 0.6);

      particlesRef.current = frameToParticles(frame, chPx, emPx, speedPx);
      explodingRef.current = true;
      explodeFrameRef.current = 0;
      atEdgeSinceFrameRef.current = null;
    }
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black touch-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <pre
        ref={preRef}
        className="font-mono text-white leading-none tracking-tight select-none w-full h-full flex items-center justify-center pointer-events-none m-0"
        style={{
          fontSize: "clamp(0.7rem, min(100vw / 80, 150vh / 80), 2rem)",
          fontFamily:
            "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace",
        }}
      >
        {"\n".repeat(ROWS)}
      </pre>

      {showIntroCta && (
        <p className="absolute left-1/2 top-[75%] -translate-x-1/2 pointer-events-none font-mono text-xs sm:text-sm text-zinc-500 whitespace-nowrap text-center px-4">
          You put everything on the bagel ...
          <br />
          Click to proceed!
        </p>
      )}

    </div>
  );
}