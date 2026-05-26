"use client";

import { BackToMenuButton } from "../pages/Panel";

export interface PanelHeaderProps {
  title: string;
}

export function PanelHeader({ title }: PanelHeaderProps) {
  return (
    <div className="absolute left-0 right-0 top-0 z-10 flex items-start justify-between gap-4 px-6 pb-10 pt-14 backdrop-blur-sm mask-[linear-gradient(to_bottom,black_60%,transparent)] md:px-10 md:pt-16">
      <h1 className="min-w-0 flex-1 text-4xl font-light text-white md:text-5xl lg:text-6xl">{title}</h1>
      <BackToMenuButton />
    </div>
  );
}
