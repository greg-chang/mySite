"use client";

import { animate } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { experiences } from "../data/experiences";

const rowClassName =
  "group relative -mx-6 px-6 py-5 md:-mx-10 md:px-10 rounded-lg";

const scrollTargetClassName =
  "scroll-mt-36 md:scroll-mt-44 [scroll-margin-bottom:2.5rem]";

export function Experience() {
  const [activeExperienceId, setActiveExperienceId] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useLayoutEffect(() => {
    if (!activeExperienceId) return;
    const el = sectionRefs.current[activeExperienceId];
    if (!el) return;

    let scrollParent: HTMLElement | null = el.parentElement;
    while (scrollParent) {
      const { overflowY } = window.getComputedStyle(scrollParent);
      if (overflowY === "auto" || overflowY === "scroll") break;
      scrollParent = scrollParent.parentElement;
    }
    if (!scrollParent) return;

    let controls: { stop: () => void } | undefined;
    const frame = requestAnimationFrame(() => {
      const containerRect = scrollParent!.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const target =
        scrollParent!.scrollTop +
        elRect.top -
        containerRect.top -
        containerRect.height / 2 +
        elRect.height / 2;

      controls = animate(scrollParent!.scrollTop, Math.max(0, target), {
        type: "spring",
        stiffness: 140,
        damping: 24,
        mass: 0.7,
        onUpdate: (latest) => {
          scrollParent!.scrollTop = latest;
        },
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      controls?.stop();
    };
  }, [activeExperienceId]);

  return (
    <div className="w-full">
      {experiences.map((exp) => {
        const isActive = activeExperienceId === exp.id;

        return (
          <div key={exp.id} className={`${rowClassName} mb-10 last:mb-0`}>
            <div
              ref={(el) => {
                sectionRefs.current[exp.id] = el;
              }}
              className={scrollTargetClassName}
            >
              <button
                type="button"
                className="block w-full cursor-pointer bg-transparent p-0 text-left"
                onClick={() => setActiveExperienceId(isActive ? null : exp.id)}
                aria-expanded={isActive}
              >
                <h2 className="mb-5 text-3xl font-light text-white/90 transition-transform duration-300 group-hover:translate-x-2 md:text-4xl lg:text-5xl">
                  {exp.title}
                </h2>
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
                  <p className="min-w-0 flex-1 text-base font-light text-white/70 transition-transform duration-300 group-hover:translate-x-2 md:text-lg">
                    {exp.description}
                  </p>
                  <span className="shrink-0 text-left text-base font-light text-white/80 transition-transform duration-300 group-hover:translate-x-2 md:text-right md:group-hover:translate-x-0 md:text-lg">
                    {exp.period}
                  </span>
                </div>
              </button>

              {isActive && exp.details && (
                <div className="mt-5 max-w-2xl rounded-lg border border-white/15 bg-white/6 p-4 text-sm font-light text-white/75 md:ml-6 md:text-base">
                  <ul className="space-y-2">
                    {exp.details.map((detail) => (
                      <li key={detail} className="leading-relaxed">
                        {detail}
                      </li>
                    ))}
                  </ul>
                  {exp.url && (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm text-white/90 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
                    >
                      Visit site
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="mt-5 w-full border-t border-white/25" />
          </div>
        );
      })}
    </div>
  );
}
