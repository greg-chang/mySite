"use client";

import { useCallback, useEffect, useState } from "react";
import { Experience } from "../components/Experience";
import { projects } from "../data/projects";
import { useVerticalSwipe, type SwipeDirection } from "../hooks/usePanelSwipe";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { BackToMenuButton } from "./Panel";

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
  "curious",
  "always exploring",
  "a climber",
  "a skater",
  "at the parkour gym ... most likely",
  "a reader",
  "a people person",
  "a observationalist?",
  "also a bad tennis player",
];

export function AboutContent() {
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
    <div className="relative flex flex-1 flex-col overflow-hidden font-sans font-light">

      {/* Transparent floating header */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-start justify-between gap-4 px-6 pb-10 pt-14 backdrop-blur-sm mask-[linear-gradient(to_bottom,black_60%,transparent)] md:px-10 md:pt-16">
        <h1 className="min-w-0 flex-1 text-4xl font-light text-white md:text-5xl lg:text-6xl">About</h1>
        <BackToMenuButton />
      </div>

      {/* Body: content left, image right — scroll together under header */}
      <div className="flex flex-1 overflow-auto">

        {/* Left: content */}
        <div className="flex flex-1 flex-col px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-40">

          {/* Typewriter hero */}
          <div className="mb-10 md:mb-14">
            <p className="mb-2 text-sm font-normal uppercase tracking-[0.35em] text-white/45">I am</p>
            <p className="min-h-14 text-5xl font-light text-white md:text-6xl lg:text-7xl">
              {typed}
              <span className="ml-1 inline-block w-[2px] animate-[blink_1s_step-end_infinite] bg-white align-middle leading-none">&nbsp;</span>
            </p>
          </div>

          <hr className="mb-10 border-white/8 md:mb-14" />

          {/* Values */}
          <section className="mb-10 md:mb-14">
            <p className="mb-6 text-sm font-normal uppercase tracking-[0.35em] text-white/45">Values</p>
            <div className="space-y-8">
              {[
                {
                  n: "01",
                  title: "Candidness",
                  body: "Ed Catmull wrote about this in Creativity Inc — a candid environment lets people express more, generate better ideas, and genuinely enjoy each other's company. In every setting I've been in, how willing people were to be candid with one another always determined how successful and enjoyable working together actually was. I try to create spaces where people feel safe to speak their mind, share mistakes, and say the hard things.",
                },
                {
                  n: "02",
                  title: "Curiosity",
                  body: "I love picking up new skills, going to new places, and hearing about other people's experiences. I want to experience as much as possible while I'm here — both the bad and the good. Understanding the worlds we live in and the worlds we build is something I find endlessly fascinating.",
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-6 md:gap-10">
                  <span className="shrink-0 pt-0.5 font-mono text-sm text-white/20">{n}</span>
                  <div>
                    <p className="mb-2 text-lg text-white">{title}</p>
                    <p className="max-w-prose text-base leading-relaxed text-white/55">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="mb-10 border-white/8 md:mb-14" />

          {/* Books */}
          <section className="mb-10 md:mb-14">
            <p className="mb-6 text-sm font-normal uppercase tracking-[0.35em] text-white/45">Reading</p>
            <ul>
              {books.map((b) => (
                <li
                  key={b.title}
                  className="flex items-baseline justify-between gap-6 border-b border-white/6 py-3 first:border-t"
                >
                  <span className="text-base text-white">{b.title}</span>
                  <span className="shrink-0 text-sm text-white/35">{b.author}</span>
                </li>
              ))}
            </ul>
          </section>

          <hr className="mb-10 border-white/8 md:mb-14" />

          {/* Movement */}
          <section>
            <p className="mb-4 text-sm font-normal uppercase tracking-[0.35em] text-white/45">Movement</p>
            <p className="text-base leading-loose text-white/55">
              {sports.join(" · ")}
            </p>
          </section>
        </div>

        {/* Right: image scrolls with content */}
        <div className="hidden w-[35%] shrink-0 pt-28 md:block md:pt-44 lg:pt-52">
          <img
            src="/Pictures/GregWave.png"
            alt=""
            aria-hidden
            className="pointer-events-none w-full select-none object-cover brightness-75 contrast-110 [clip-path:inset(0_0_0%_0)]"
          />
        </div>
      </div>
    </div>
  );
}

export function ExperienceContent() {
  return (
    <div className="relative flex flex-1 w-full flex-col overflow-hidden font-sans font-light">
      <div className="absolute left-0 right-0 top-0 z-10 flex items-start justify-between gap-4 px-6 pb-10 pt-14 backdrop-blur-sm mask-[linear-gradient(to_bottom,black_60%,transparent)] md:px-10 md:pt-16">
        <h1 className="min-w-0 flex-1 text-4xl font-light text-white md:text-5xl lg:text-6xl">Experiences</h1>
        <BackToMenuButton />
      </div>
      <div className="flex flex-1 overflow-auto px-6 pb-6 pt-36 md:px-10 md:pb-10 md:pt-44">
        <div className="flex w-full flex-col">
          <Experience />
        </div>
      </div>
    </div>
  );
}

export function ContactContent() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden font-sans font-light">
      <div className="absolute left-0 right-0 top-0 z-10 flex items-start justify-between gap-4 px-6 pb-10 pt-14 backdrop-blur-sm mask-[linear-gradient(to_bottom,black_60%,transparent)] md:px-10 md:pt-16">
        <h1 className="min-w-0 flex-1 text-4xl font-light text-white md:text-5xl lg:text-6xl">Contact</h1>
        <BackToMenuButton />
      </div>
      <div className="absolute left-1/2 top-1/2  z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-start gap-4 border border-white p-4 text-white/70">
        <img
          src="/Pictures/GregHead.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-20%] h-20 -translate-x-1/2 -translate-y-1/2 select-none object-contain brightness-90 contrast-125"
        />
        <a href="mailto:changjgreg@gmail.com" className="flex items-center gap-3 transition-colors hover:text-white">
          <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
            <path d="M4 6h16v12H4z" />
            <path d="m4 7 8 6 8-6" />
          </svg>
          changjgreg@gmail.com
        </a>
        <a
          href="https://www.linkedin.com/in/gregjchang"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 transition-colors hover:text-white"
        >
          <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M6.94 8.98H3.8V20h3.14V8.98ZM5.37 7.49a1.82 1.82 0 1 0 0-3.64 1.82 1.82 0 0 0 0 3.64ZM20.2 13.96c0-3.06-1.63-4.48-3.81-4.48a3.29 3.29 0 0 0-2.98 1.64h-.04V8.98h-3.01V20h3.14v-5.45c0-1.44.27-2.83 2.05-2.83 1.76 0 1.78 1.65 1.78 2.92V20h3.14v-6.04h-.27Z" />
          </svg>
          LinkedIn
        </a>
        <a
          href="https://www.instagram.com/greg_chang_/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 transition-colors hover:text-white"
        >
          <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
            <rect x="4" y="4" width="16" height="16" rx="5" />
            <circle cx="12" cy="12" r="3.4" />
            <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
          </svg>
          @greg_chang_
        </a>
      </div>
    </div>
  );
}

export function WorksContent({ naturalSwipe }: { naturalSwipe: boolean }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [projectSlideDirection, setProjectSlideDirection] = useState<"up" | "down">("down");
  const activeProject = projects[activeProjectIndex];
  const goToPreviousProject = () => {
    setProjectSlideDirection("up");
    setActiveProjectIndex((index) => (index - 1 + projects.length) % projects.length);
  };
  const goToNextProject = () => {
    setProjectSlideDirection("down");
    setActiveProjectIndex((index) => (index + 1) % projects.length);
  };
  const handleProjectSwipe = useCallback((direction: Extract<SwipeDirection, "up" | "down">) => {
    if (direction === "up") {
      setProjectSlideDirection("up");
      setActiveProjectIndex((index) => (index - 1 + projects.length) % projects.length);
    } else if (direction === "down") {
      setProjectSlideDirection("down");
      setActiveProjectIndex((index) => (index + 1) % projects.length);
    }
  }, []);
  const worksSwipeRef = useVerticalSwipe<HTMLDivElement>(handleProjectSwipe, true, naturalSwipe);

  return (
    <div
      ref={worksSwipeRef}
      className="relative flex flex-1 flex-col overflow-hidden font-sans font-light"
    >
      <div className="absolute left-0 right-0 top-0 z-10 flex items-start justify-between gap-4 px-6 pb-10 pt-14 backdrop-blur-sm mask-[linear-gradient(to_bottom,black_60%,transparent)] md:px-10 md:pt-16">
        <h1 className="min-w-0 flex-1 text-4xl font-light text-white md:text-5xl lg:text-6xl">Works</h1>
        <BackToMenuButton />
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-start gap-4 px-6 pb-6 pt-28 md:px-10 md:pb-10 md:pt-32">
        <button
          type="button"
          onClick={goToPreviousProject}
          className="flex h-12 w-20 items-center justify-center text-white/50 transition-colors hover:text-white [&_svg]:h-9 [&_svg]:w-9"
          aria-label="Previous project"
        >
          <LuChevronUp />
        </button>

        <section className="relative w-full border border-white bg-black">
          <div className="border-b border-white brightness-50 px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] text-white/50">
            {activeProjectIndex + 1}/{projects.length}
          </div>

          <div
            key={activeProject.id}
            className={`grid md:grid-cols-[1.35fr_0.9fr] ${
              projectSlideDirection === "down"
                ? "animate-works-project-slide-from-bottom"
                : "animate-works-project-slide-from-top"
            }`}
          >
            <div className="relative flex min-h-[50vh] items-center justify-center border-b border-white bg-white/5 md:border-b-0 md:border-r">
              {activeProject.imageSrc ? (
                <img
                  src={activeProject.imageSrc}
                  alt={activeProject.imageAlt || activeProject.title}
                  className="max-h-56 max-w-[70%] object-contain grayscale invert"
                />
              ) : (
                <span className="font-mono text-sm uppercase tracking-[0.2em] text-white/40">No image</span>
              )}
            </div>

            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-light uppercase text-white md:text-5xl">{activeProject.title}</h2>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-white/65 md:text-lg">
                {activeProject.description}
              </p>
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={goToNextProject}
          className="flex h-12 w-20 items-center justify-center text-white/50 transition-colors hover:text-white [&_svg]:h-9 [&_svg]:w-9"
          aria-label="Next project"
        >
          <LuChevronDown />
        </button>
      </div>
    </div>
  );
}
