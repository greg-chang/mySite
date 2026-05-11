"use client";

import Image from "next/image";
import type { Project } from "../data/projects";

export type ProjectCardProps = Omit<Project, "id">;

export function ProjectCard({ title, description, imageSrc, imageAlt }: ProjectCardProps) {
  return (
    <article className="group w-full overflow-hidden rounded-xl border border-white/20 bg-white/5">
      <div className="relative aspect-4/3 w-full bg-white/6 md:aspect-16/10">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized={imageSrc.endsWith(".svg")}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/40 text-sm">Add imageSrc for this project</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-white/90">{title}</h3>
        <p className="mt-1 text-sm text-white/50">{description}</p>
      </div>
    </article>
  );
}
