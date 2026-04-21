"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from "react";
import DonutAnimation from "./components/DonutAnimation";
import { Experience } from "./components/Experience";
import { ProjectCard } from "./components/ProjectCard";
import { projects } from "./data/projects";

type View = "menu" | "about" | "experience" | "works" | "contact";

const SLIDE_DURATION = "0.42s";
const SLIDE_BACK_DURATION_MS = 500;
const SLIDE_EASING = "cubic-bezier(0.33, 1.1, 0.68, 1)";
const SWIPE_THRESHOLD = 100;
const WHEEL_RESET_MS = 150;
const SWIPE_COOLDOWN_MS = 500;

type SwipeDirection = "left" | "right" | "up" | "down";

const swipeCooldownRef = { current: 0 };

function useSwipe(onSwipe: (direction: SwipeDirection) => void, enabled: boolean) {
  const wheelAccumRef = useRef({ x: 0, y: 0 });
  const wheelResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const onSwipeRef = useRef(onSwipe);
  onSwipeRef.current = onSwipe;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !enabled) return;

    const onWheel = (e: WheelEvent) => {
      if (Date.now() < swipeCooldownRef.current) return;

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
          onSwipeRef.current(x > 0 ? "left" : "right");
        } else {
          onSwipeRef.current(y > 0 ? "up" : "down");
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
  }, [enabled]);

  return containerRef;
}

function SiteHeader() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/Excalibur%20Logo%205.svg"
        alt=""
        className="h-8 w-8 shrink-0 object-contain invert"
        aria-hidden
      />
      <span className="font-[family-name:var(--font-geist-sans)] text-lg font-medium text-white/90">
        Greg&apos;s site
      </span>
    </div>
  );
}

const chevronPath = "M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z";
const ChevronUp = () => (
  <svg className="w-5 h-5 shrink-0 transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d={chevronPath} />
  </svg>
);
const ChevronRight = () => (
  <svg className="w-5 h-5 shrink-0 rotate-90 transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d={chevronPath} />
  </svg>
);
const ChevronDown = () => (
  <svg className="w-5 h-5 shrink-0 rotate-180 transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d={chevronPath} />
  </svg>
);
const ChevronLeft = () => (
  <svg className="w-5 h-5 shrink-0 -rotate-90 transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d={chevronPath} />
  </svg>
);

const PanelNavContext = createContext<{
  onBack: () => void;
  swipeBackDirection: SwipeDirection;
} | null>(null);

function usePanelNav() {
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
function BackToMenuButton() {
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

interface PanelProps {
  isActive: boolean;
  animation: string;
  onBack: () => void;
  onSwipeBack: () => void;
  swipeBackDirection: SwipeDirection;
  children: ReactNode;
  header?: ReactNode;
}

function Panel({ isActive, animation, onBack, onSwipeBack, swipeBackDirection, children, header }: PanelProps) {
  const handleSwipe = useCallback((direction: SwipeDirection) => {
    if (direction === swipeBackDirection) {
      onSwipeBack();
    }
  }, [swipeBackDirection, onSwipeBack]);

  const containerRef = useSwipe(handleSwipe, isActive);

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

interface MenuProps {
  isActive: boolean;
  onNavigate: (view: View) => void;
}

function Menu({ isActive, onNavigate }: MenuProps) {
  const handleSwipe = useCallback((direction: SwipeDirection) => {
    switch (direction) {
      case "left": onNavigate("works"); break;
      case "right": onNavigate("experience"); break;
      case "up": onNavigate("about"); break;
      case "down": onNavigate("contact"); break;
    }
  }, [onNavigate]);

  const containerRef = useSwipe(handleSwipe, isActive);

  return (
    <section
      ref={containerRef}
      className={`h-screen flex flex-col items-center justify-center absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div className="flex flex-col items-center gap-8">
        <SiteHeader />
        <nav className="flex flex-col gap-4 font-[family-name:var(--font-geist-sans)]" aria-label="Main menu">
        <button
          type="button"
          onClick={() => onNavigate("about")}
          className="text-xl font-light text-white/70 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-left flex items-center gap-2"
        >
          <ChevronDown />
          About
        </button>
        <button
          type="button"
          onClick={() => onNavigate("experience")}
          className="text-xl font-light text-white/70 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-left flex items-center gap-2"
        >
          <ChevronLeft />
          Experience
        </button>
        <button
          type="button"
          onClick={() => onNavigate("works")}
          className="text-xl font-light text-white/70 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-left flex items-center gap-2"
        >
          <ChevronRight />
          Works
        </button>
        <button
          type="button"
          onClick={() => onNavigate("contact")}
          className="text-xl font-light text-white/70 hover:text-white transition-colors bg-transparent border-none cursor-pointer text-left flex items-center gap-2"
        >
          <ChevronUp />
          Contact
        </button>
      </nav>
      </div>
    </section>
  );
}

function AboutContent() {
  return (
    <div className="flex flex-1 flex-col overflow-auto px-6 pb-6 pt-14 font-sans font-light md:px-10 md:pb-10 md:pt-16">
      <div className="mb-12 flex items-start justify-between gap-4 md:mb-16">
        <h1 className="min-w-0 flex-1 text-4xl font-light text-white md:text-5xl lg:text-6xl">About</h1>
        <BackToMenuButton />
      </div>
      <p className="mx-auto max-w-lg text-center text-white/70">
        I&apos;ve seen people put passwords on their personal sites and I kind of liked the exclusivity of it—but I don&apos;t care for the actual privateness. So my little entry into this site was just to have some fun. What better way to have fun than to explode a donut? I liked the exclusivity though, and wanted to pull you into my world and how I like to design.
      </p>
    </div>
  );
}

function ExperienceContent() {
  return (
    <div className="flex flex-1 w-full overflow-auto px-6 pb-6 pt-14 font-sans font-light md:px-10 md:pb-10 md:pt-16">
      <div className="flex w-full flex-col">
        <div className="mb-12 flex items-start justify-between gap-4 md:mb-16">
          <h1 className="min-w-0 flex-1 text-4xl font-light text-white md:text-5xl lg:text-6xl">
            Experiences
          </h1>
          <BackToMenuButton />
        </div>
        <Experience />
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="flex flex-1 flex-col overflow-auto px-6 pb-6 pt-14 font-sans font-light md:px-10 md:pb-10 md:pt-16">
      <div className="mb-12 flex items-start justify-between gap-4 md:mb-16">
        <h1 className="min-w-0 flex-1 text-4xl font-light text-white md:text-5xl lg:text-6xl">Contact</h1>
        <BackToMenuButton />
      </div>
      <p className="mx-auto max-w-md text-center text-white/70">
        This is the Contact page. Add your email, social links, or a contact form here.
      </p>
    </div>
  );
}

function WorksContent() {
  return (
    <div className="flex flex-1 flex-col overflow-auto px-6 pb-6 pt-14 font-sans font-light md:px-10 md:pb-10 md:pt-16">
      <div className="mb-12 flex items-start justify-between gap-4 md:mb-16">
        <h1 className="min-w-0 flex-1 text-4xl font-light text-white md:text-5xl lg:text-6xl">Works</h1>
        <BackToMenuButton />
      </div>
      <p className="mb-6 max-w-xl text-white/70">
        This is the Works page. Showcase your projects and case studies in the grid below.
      </p>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map(({ id, ...project }) => (
          <ProjectCard key={id} {...project} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [animationDone, setAnimationDone] = useState(false);
  const [view, setView] = useState<View>("menu");

  const goToMenu = () => setView("menu");

  return (
    <div className="h-screen w-full overflow-hidden bg-black text-white relative">
      {/* Donut animation */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${animationDone ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <DonutAnimation onComplete={() => setAnimationDone(true)} />
      </div>

      {/* Main content */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${animationDone ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <Menu isActive={view === "menu"} onNavigate={setView} />

        <Panel
          isActive={view === "about"}
          animation="slideInFromBottom"
          onBack={goToMenu}
          onSwipeBack={goToMenu}
          swipeBackDirection="down"
        >
          <AboutContent />
        </Panel>

        <Panel
          isActive={view === "experience"}
          animation="slideInFromLeft"
          onBack={goToMenu}
          onSwipeBack={goToMenu}
          swipeBackDirection="left"
        >
          <ExperienceContent />
        </Panel>

        <Panel
          isActive={view === "contact"}
          animation="slideInFromTop"
          onBack={goToMenu}
          onSwipeBack={goToMenu}
          swipeBackDirection="up"
        >
          <ContactContent />
        </Panel>

        <Panel
          isActive={view === "works"}
          animation="slideInFromRight"
          onBack={goToMenu}
          onSwipeBack={goToMenu}
          swipeBackDirection="right"
        >
          <WorksContent />
        </Panel>
      </div>
    </div>
  );
}
