"use client";

import { useEffect, useRef, useState } from "react";
import { Experience } from "../components/Experience";
import { projects } from "../data/projects";
import { PanelHeader } from "../components/PanelHeader";

function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 45, pauseMs = 1600, enabled = true) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    if (!enabled) return;

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
  }, [enabled, displayed, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

const TYPEWRITER_WORDS = [
  "seeking new adventures",
  "looking to learn!",
  "a coffee addict",
  "a fan of Jazz",
  "always open for a chat",
  "likely at the parkour gym",
  "also a bad tennis player",
  "down to climb",
  "figuring it out",
  "",
];

export function AboutContent({ isActive }: { isActive: boolean }) {
  const typed = useTypewriter(TYPEWRITER_WORDS, 80, 45, 1600, isActive);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) scrollRef.current?.scrollTo({ top: 0 });
  }, [isActive]);

  const books = [
    { title: "Creativity Inc", author: "Ed Catmull" },
    { title: "The Fifth Discipline", author: "Peter Senge" },
    { title: "On Earth We're Briefly Gorgeous", author: "Ocean Vuong" },
  ];

  const hobbies = [
    "Parkour / Tricking",
    "Trampolining",
    "Skateboarding",
    "Climbing",
    "Tennis",
    "Badminton",
    "Ping Pong",
    "Photography",
    "Digital Art",
  ];

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden font-sans font-light min-h-0">

      <PanelHeader title="About" />

      {/* Body: content left, image right — scroll together under header */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-none min-h-0 md:flex">

        {/* Left: content */}
        <div className="flex flex-col px-6 pb-16 pt-36 md:flex-1 md:px-10 md:pb-20 md:pt-40">

          {/* Typewriter hero */}
          <div className="mb-10 md:mb-14">
            <p className="mb-2 text-sm font-normal uppercase tracking-[0.35em] text-white/45">I'm</p>
            <p className="min-h-14 text-5xl font-light text-white md:text-6xl lg:text-7xl">
              {typed}
              <span className="ml-1 inline-block w-[2px] animate-[blink_1s_step-end_infinite] bg-white align-middle leading-none">&nbsp;</span>
            </p>
          </div>

          <hr className="mb-10 border-white/8 md:mb-14" />

          {/* Intro */}
          <section className="mb-10 md:mb-14">
            <div className="max-w-prose space-y-4 text-base font-light leading-relaxed text-white/65">
              <p>I'm a builder who works at the intersection of product, data, and human connection. My background spans product management, research, and engineering, but the bottom-line is the same: understanding how people actually behave before deciding what to build.</p>
              <p>I'm especially interested in how data and storytelling work together — using what people do, not just what they say, to shape something that genuinely helps them. Through roles in product, research, and education, I've worked on problems involving growth, trust, and usability, always considering how something is.</p>
              <p>With training across data analysis, engineering, and direct user research, I bring a grounded, people-first lens to technical work. I'm currently seeking opportunities where I can combine that curiosity with building — places where understanding people and shipping good products aren't separate jobs.</p>
            </div>
          </section>

          <hr className="mb-10 border-white/8 md:mb-14" />

          {/* Values */}
          <section className="mb-10 md:mb-14">
            <p className="mb-6 text-sm font-normal uppercase tracking-[0.35em] text-white/45">Values</p>
            <div className="space-y-8">
              {[
                {
                  n: "01",
                  title: "Candor",
                  body: "I try to talk to people the way I'd talk to a friend, and to withhold judgment long enough to hear them out. When I disagree, I'd rather try and figure out how someone got to that mindset than telling them why they're wrong. I'm curious how people see the world, not just what they think about it.",
                },
                {
                  n: "02",
                  title: "Curiosity",
                  body: "I like asking why and how because I find it fascinating to learn how people see things. Whether it's someone explaining their field or describing why they made a decision, I find that the best conversations happen when you let someone go deep on what they actually care about.",
                },
                {
                  n: "03",
                  title: "Humility",
                  body: "I've been wrong enough times to know that being right is less useful than being open. I'd rather ask the question and take it a little slow than assume and miss something important.",
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

          {/* Skills */}
          <section className="mb-10 md:mb-14">
            <p className="mb-6 text-sm font-normal uppercase tracking-[0.35em] text-white/45">Skills</p>
            <div className="space-y-5">
              {[
                {
                  label: "Languages",
                  items: ["Python", "JavaScript / TypeScript", "SQL", "R", "C / C++", "Go", "HTML / CSS"],
                },
                {
                  label: "Frameworks",
                  items: ["React", "React Native", "Next.js", "NestJS", "Node.js", "Express", "Svelte", "Tailwind", "FastAPI", "Flask", "LangChain", "Gin", "Gorm"],
                },
                {
                  label: "Tools",
                  items: ["Git", "Figma", "Postman", "Photoshop", "Notion", "Docker", "Pytest", "Vitest", "ESLint", "Supabase", "PostHog", "Cloudflare"],
                },
              ].map(({ label, items }) => (
                <div key={label}>
                  <p className="mb-2.5 text-xs font-normal uppercase tracking-[0.25em] text-white/30">{label}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 px-3 py-1 text-sm font-light text-white/60"
                      >
                        {item}
                      </span>
                    ))}
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

          {/* Hobbies */}
          <section className="pb-8 md:pb-10">
            <p className="mb-4 text-sm font-normal uppercase tracking-[0.35em] text-white/45">Hobbies</p>
            <p className="text-base leading-loose text-white/55">
              {hobbies.join(" · ")}
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
    <div className="relative flex flex-1 w-full flex-col overflow-hidden font-sans font-light min-h-0">
      <PanelHeader title="Experiences" />
      <div className="flex flex-1 overflow-auto overscroll-none min-h-0 px-6 pb-6 pt-36 md:px-10 md:pb-10 md:pt-44">
        <div className="flex w-full flex-col">
          <Experience />
        </div>
      </div>
    </div>
  );
}

export function ContactContent() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden font-sans font-light min-h-0">
      <PanelHeader title="Contact" />
      <div className="flex flex-1 flex-col items-center justify-center overflow-hidden touch-none px-6 pb-6 pt-36 md:px-10 md:pb-40 md:pt-44">
        <div className="flex flex-col items-start gap-4 border border-white p-4 text-white/70 relative">
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
    </div>
  );
}

export function WorksContent() {
  return (
    <div className="relative flex flex-1 w-full flex-col overflow-hidden font-sans font-light min-h-0">
      <PanelHeader title="Works" />
      <div className="flex flex-1 overflow-x-hidden overflow-y-auto overscroll-none min-h-0 px-6 pt-40 md:px-10 md:pt-48" style={{ paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }}>
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 md:gap-14 lg:gap-16">
          {projects.map((project, index) => {
            const imageLeft = index % 2 === 0;
            const Wrapper = project.url ? "a" : "article";
            const wrapperProps = project.url
              ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <Wrapper
                key={project.id}
                {...wrapperProps}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 group"
              >
                <div
                  className={`flex items-center justify-center ${
                    imageLeft ? "md:order-1" : "md:order-2"
                  }`}
                >
                  {project.imageSrc ? (
                    <img
                      src={project.imageSrc}
                      alt={project.imageAlt || project.title}
                      draggable="false"
                      className={
                        project.imageClassName ??
                        "max-h-64 max-w-md rounded-lg object-contain md:max-h-80 select-none pointer-events-none"
                      }
                    />
                  ) : (
                    <span className="font-mono text-sm uppercase tracking-[0.2em] text-white/40">
                      No image
                    </span>
                  )}
                </div>

                <div
                  className={`flex flex-col justify-center ${
                    imageLeft ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <h2 className="text-3xl font-light uppercase text-white md:text-4xl lg:text-5xl">
                    {project.title}
                  </h2>
                  <p className="mt-5 max-w-md text-base font-light leading-relaxed text-white/65 md:mt-6 md:text-lg">
                    {project.description}
                  </p>
                  {project.url && (
                    <span className="mt-5 inline-block text-sm text-white/90 underline decoration-white/30 underline-offset-4 group-hover:text-white md:mt-6">
                      Visit site
                    </span>
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}
