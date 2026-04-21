"use client";

import { experiences } from "../data/experiences";

const rowClassName =
  "group relative -mx-6 px-6 py-5 md:-mx-10 md:px-10 rounded-lg";

export function Experience() {
  return (
    <div className="w-full">
      {experiences.map((exp) => {
        const inner = (
          <>
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
            <div className="mt-5 w-full border-t border-white/25" />
          </>
        );

        if (exp.url) {
          return (
            <a
              key={exp.id}
              href={exp.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${rowClassName} mb-10 block cursor-pointer last:mb-0`}
            >
              {inner}
            </a>
          );
        }

        return (
          <div key={exp.id} className={`${rowClassName} mb-10 last:mb-0`}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
