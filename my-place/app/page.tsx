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
const INITIAL_SETTINGS_DELAY_MS = 100;

type SwipeDirection = "left" | "right" | "up" | "down";

const swipeCooldownRef = { current: 0 };

function getDefaultSwipePreference() {
  if (typeof navigator === "undefined") return true;

  const platform = navigator.platform.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();
  const isApplePlatform =
    platform.includes("mac") ||
    platform.includes("iphone") ||
    platform.includes("ipad") ||
    userAgent.includes("mac os") ||
    userAgent.includes("iphone") ||
    userAgent.includes("ipad");

  return isApplePlatform;
}

function useSwipe(onSwipe: (direction: SwipeDirection) => void, enabled: boolean, naturalSwipe: boolean) {
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
  naturalSwipe: boolean;
  onSwipe?: () => void;
  children: ReactNode;
  header?: ReactNode;
}

function Panel({ isActive, animation, onBack, onSwipeBack, swipeBackDirection, naturalSwipe, onSwipe, children, header }: PanelProps) {
  const handleSwipe = useCallback((direction: SwipeDirection) => {
    onSwipe?.();
    if (direction === swipeBackDirection) {
      onSwipeBack();
    }
  }, [swipeBackDirection, onSwipeBack, onSwipe]);

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

interface MenuProps {
  isActive: boolean;
  onNavigate: (view: View) => void;
  naturalSwipe: boolean;
  onSwipe?: () => void;
}

function Menu({ isActive, onNavigate, naturalSwipe, onSwipe }: MenuProps) {
  const handleSwipe = useCallback((direction: SwipeDirection) => {
    onSwipe?.();
    switch (direction) {
      case "left": onNavigate("works"); break;
      case "right": onNavigate("experience"); break;
      case "up": onNavigate("about"); break;
      case "down": onNavigate("contact"); break;
    }
  }, [onNavigate, onSwipe]);

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

function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 45, pauseMs = 1600) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseMs);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 0);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed);
      } else {
        setWordIndex((i) => i + 1);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

const TYPEWRITER_WORDS = [
  "candid",
  "curious",
  "always exploring",
  "a climber",
  "a skater",
  "a parkour practitioner",
  "a reader",
  "a people person",
  "a trampolinist",
  "a bad tennis player",
];

function AboutContent() {
  const typed = useTypewriter(TYPEWRITER_WORDS);

  const books = [
    { title: "Creativity Inc", author: "Ed Catmull" },
    { title: "The Fifth Discipline", author: "Peter Senge" },
    { title: "On Earth We're Briefly Gorgeous", author: "Ocean Vuong" },
  ];

  const sports = [
    "Parkour / Freerunning / Tricking",
    "Trampolining",
    "Skateboarding",
    "Climbing",
    "Tennis",
    "Badminton",
    "Ping Pong",
  ];

  return (
    <div className="flex flex-1 flex-col overflow-auto px-6 pb-16 pt-14 font-sans font-light md:px-10 md:pb-20 md:pt-16">
      <div className="mb-16 flex items-start justify-between gap-4 md:mb-20">
        <h1 className="min-w-0 flex-1 text-4xl font-light text-white md:text-5xl lg:text-6xl">About</h1>
        <BackToMenuButton />
      </div>

      {/* Typewriter hero */}
      <div className="mb-16 md:mb-24">
        <p className="mb-2 text-xs uppercase tracking-widest text-white/25">I am</p>
        <p className="min-h-[3.5rem] text-4xl font-light text-white md:text-5xl lg:text-6xl">
          {typed}
          <span className="ml-1 inline-block w-[2px] animate-[blink_1s_step-end_infinite] bg-white align-middle leading-none">&nbsp;</span>
        </p>
      </div>

      <hr className="mb-16 border-white/8 md:mb-20" />

      {/* Values */}
      <section className="mb-16 md:mb-20">
        <p className="mb-10 text-xs uppercase tracking-widest text-white/25">Values</p>
        <div className="space-y-10">
          {[
            {
              n: "01",
              title: "Candidness",
              body: "Ed Catmull wrote about this in Creativity Inc — a candid environment lets people express more, generate better ideas, and genuinely enjoy each other’s company. In every setting I’ve been in, how willing people were to be candid with one another always determined how successful and enjoyable working together actually was. I try to create spaces where people feel safe to speak their mind, share mistakes, and say the hard things.",
            },
            {
              n: "02",
              title: "Curiosity",
              body: "I love picking up new skills, going to new places, and hearing about other people’s experiences. I want to experience as much as possible while I’m here — both the bad and the good. Understanding the worlds we live in and the worlds we build is something I find endlessly fascinating.",
            },
          ].map(({ n, title, body }) => (
            <div key={n} className="flex gap-6 md:gap-10">
              <span className="shrink-0 pt-0.5 font-mono text-xs text-white/20">{n}</span>
              <div>
                <p className="mb-3 text-base text-white">{title}</p>
                <p className="max-w-prose text-sm leading-relaxed text-white/55">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="mb-16 border-white/8 md:mb-20" />

      {/* Books */}
      <section className="mb-16 md:mb-20">
        <p className="mb-8 text-xs uppercase tracking-widest text-white/25">Reading</p>
        <ul>
          {books.map((b) => (
            <li
              key={b.title}
              className="flex items-baseline justify-between gap-6 border-b border-white/6 py-4 first:border-t"
            >
              <span className="text-sm text-white">{b.title}</span>
              <span className="shrink-0 text-xs text-white/35">{b.author}</span>
            </li>
          ))}
        </ul>
      </section>

      <hr className="mb-16 border-white/8 md:mb-20" />

      {/* Movement */}
      <section>
        <p className="mb-6 text-xs uppercase tracking-widest text-white/25">Movement</p>
        <p className="text-sm leading-loose text-white/55">
          {sports.join(" · ")}
        </p>
      </section>
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

function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 cursor-pointer rounded-2xl border border-white p-0.5 transition-colors duration-300 ${
        checked ? "bg-white" : "bg-black"
      }`}
      aria-label={`${checked ? "Turn off" : "Turn on"} ${label}`}
      aria-pressed={checked}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full transition-all duration-300 ease-out ${
          checked ? "left-[22px] bg-black" : "left-0.5 bg-white"
        }`}
      />
    </button>
  );
}

function NaturalSwipePreview({ naturalSwipe }: { naturalSwipe: boolean }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      <div className="flex h-24 items-center justify-center overflow-hidden rounded-md border border-white/15 bg-black/30">
        <div
          className={`flex gap-2 ${
            naturalSwipe ? "animate-swipe-fingers-natural" : "animate-swipe-fingers-standard"
          }`}
          aria-hidden
        >
          <span className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.7)]" />
          <span className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.7)]" />
        </div>
      </div>

      <div className="relative h-24 overflow-hidden rounded-md border border-white/15 bg-black/30">
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-2 ${
            naturalSwipe ? "animate-swipe-single-page-natural" : "animate-swipe-single-page-standard"
          }`}
          aria-hidden
        >
          <span className="h-1 w-24 rounded bg-white/80" />
        </div>
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-2 ${
            naturalSwipe ? "animate-swipe-two-page-natural" : "animate-swipe-two-page-standard"
          }`}
          aria-hidden
        >
          <span className="h-1 w-20 rounded bg-white/80" />
          <span className="h-1 w-28 rounded bg-white/65" />
        </div>
      </div>
    </div>
  );
}

function SettingsMenu({
  naturalSwipe,
  onNaturalSwipeChange,
  isOpen,
  onOpenChange,
}: {
  naturalSwipe: boolean;
  onNaturalSwipeChange: (enabled: boolean) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };
    const onWheel = () => onOpenChange(false);

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("wheel", onWheel);
    };
  }, [isOpen, onOpenChange]);

  return (
    <div ref={containerRef} className="absolute right-4 top-4 z-50 font-mono">
      <button
        type="button"
        onClick={() => onOpenChange(!isOpen)}
        className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/80 backdrop-blur transition-colors hover:border-white/40 hover:text-white"
        aria-label="Open settings"
        aria-expanded={isOpen}
      >
        <svg className="h-5 w-5 transition-transform duration-300 ease-out group-hover:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.4 1.07V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 8.6 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1.07-.4H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 0 .4-1.07V3a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 15.4 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.35.37.65.6 1 .31.23.69.37 1.07.4H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51.6Z" />
        </svg>
      </button>

      {isOpen && (
        <div className="animate-settings-panel-in absolute right-12 top-12 w-64 rounded-lg border border-white/20 bg-black/85 p-4 text-sm text-white/80 shadow-2xl backdrop-blur">
          <div className="relative flex items-center justify-between gap-4">
            <span>Default swipe</span>
            <ToggleSwitch
              checked={naturalSwipe}
              onChange={onNaturalSwipeChange}
              label="default swipe"
            />
          </div>
          <NaturalSwipePreview naturalSwipe={naturalSwipe} />
          <p className="mt-3 text-xs leading-relaxed text-white/45">
            Defaults on for Apple devices and off for Windows/Linux. Toggle if swipes feel inverted.
          </p>
        </div>
      )}
    </div>
  );
}

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
      {/* Donut animation */}
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

      {/* Main content */}
      <div className={`absolute inset-0 ${menuReady ? "" : "pointer-events-none"}`}>
        <Menu
          isActive={menuReady && view === "menu"}
          onNavigate={setView}
          naturalSwipe={naturalSwipe}
          onSwipe={closeSettings}
        />

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
          <WorksContent />
        </Panel>
      </div>
    </div>
  );
}
