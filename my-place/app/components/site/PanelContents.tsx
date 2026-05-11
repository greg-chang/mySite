"use client";

import { useCallback, useState } from "react";
import { Experience } from "../Experience";
import { projects } from "../../data/projects";
import { useVerticalSwipe, type SwipeDirection } from "../../hooks/usePanelSwipe";
import { ChevronDown, ChevronUp } from "./SiteChevrons";
import { BackToMenuButton } from "./Panel";

function AboutSkeletonBlock({ lines }: { lines: number[] }) {
  return (
    <div className="space-y-2.5" aria-hidden>
      {lines.map((widthPct, i) => (
        <div
          key={i}
          className="h-2.5 rounded-full bg-white/8"
          style={{ width: `${widthPct}%` }}
        />
      ))}
    </div>
  );
}

export function AboutContent() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-auto px-6 pb-6 pt-14 font-sans font-light md:px-10 md:pb-10 md:pt-16">
      <div className="relative z-10 mb-12 flex items-start justify-between gap-4 md:mb-16">
        <h1 className="min-w-0 flex-1 text-4xl font-light text-white md:text-5xl lg:text-6xl">About</h1>
        <BackToMenuButton />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-2xl flex-1 space-y-12 pb-36 pr-0 sm:pr-28 md:space-y-14 md:pb-44 md:pr-36">
        <section>
          <h2 className="mb-4 text-[0.68rem] font-normal uppercase tracking-[0.35em] text-white/45">Who I am</h2>
          <AboutSkeletonBlock lines={[100, 96, 88, 72]} />
        </section>
        <section>
          <h2 className="mb-4 text-[0.68rem] font-normal uppercase tracking-[0.35em] text-white/45">What I do</h2>
          <AboutSkeletonBlock lines={[100, 92, 84]} />
        </section>
        <section>
          <h2 className="mb-4 text-[0.68rem] font-normal uppercase tracking-[0.35em] text-white/45">What I care about</h2>
          <AboutSkeletonBlock lines={[100, 78, 90, 65]} />
        </section>
        <section>
          <h2 className="mb-4 text-[0.68rem] font-normal uppercase tracking-[0.35em] text-white/45">Right now</h2>
          <AboutSkeletonBlock lines={[100, 88]} />
        </section>
      </div>

      /* <img
        src="/Pictures/GregWave.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-[-10%] left-[10%] h-[90vh] select-none object-contain opacity-80 brightness-90 contrast-125"
      />
    </div>
  );
}

export function ExperienceContent() {
  return (
    <div className="flex flex-1 w-full overflow-auto px-6 pb-6 pt-14 font-sans font-light md:px-10 md:pb-10 md:pt-16">
      <div className="flex w-full flex-col">
        <div className="mb-12 flex items-start justify-between gap-4 md:mb-16">
          <h1 className="min-w-0 flex-1 text-4xl font-light text-white md:text-5xl lg:text-6xl">Experiences</h1>
          <BackToMenuButton />
        </div>
        <Experience />
      </div>
    </div>
  );
}

export function ContactContent() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden px-6 pb-6 pt-14 font-sans font-light md:px-10 md:pb-10 md:pt-16">
      {/* <img
        src="/Pictures/GregWave.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-[-10%] left-[10%] h-[90vh] select-none object-contain opacity-80 brightness-90 contrast-125"
      />
      <img
        src="/Pictures/GregPoints.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-[-10%] right-0 z-0 w-[40vw] opacity-80 brightness-90 contrast-125 "
      /> */}

      <div className="relative z-10 mb-12 flex items-start justify-between gap-4 md:mb-16">
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
      className="flex flex-1 flex-col overflow-hidden px-6 pb-6 pt-6 font-sans font-light md:px-10 md:pb-10 md:pt-16"
    >
      <div className="mb-12 flex items-start justify-between gap-4 md:mb-16">
        <h1 className="min-w-0 flex-1 text-4xl font-light text-white md:text-5xl lg:text-6xl">Works</h1>
        <BackToMenuButton />
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-start gap-4 pt-2 md:pt-0">
        <button
          type="button"
          onClick={goToPreviousProject}
          className="flex h-12 w-20 items-center justify-center text-white/50 transition-colors hover:text-white [&_svg]:h-9 [&_svg]:w-9"
          aria-label="Previous project"
        >
          <ChevronUp />
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
          <ChevronDown />
        </button>
      </div>
    </div>
  );
}
