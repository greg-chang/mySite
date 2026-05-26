"use client";

import { useEffect, useRef } from "react";

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
          className={`flex gap-2 ${naturalSwipe ? "animate-swipe-fingers-natural" : "animate-swipe-fingers-standard"}`}
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

export function SettingsMenu({
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
        <svg
          className="h-5 w-5 transition-transform duration-300 ease-out group-hover:rotate-90"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden
        >
          <path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.4 1.07V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 8.6 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1.07-.4H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 0 .4-1.07V3a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 15.4 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.35.37.65.6 1 .31.23.69.37 1.07.4H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51.6Z" />
        </svg>
      </button>

      {isOpen && (
        <div className="animate-settings-panel-in absolute right-12 top-12 w-64 rounded-lg border border-white/20 bg-black/85 p-4 text-sm text-white/80 shadow-2xl backdrop-blur">
          <div className="relative flex items-center justify-between gap-4">
            <span>Default swipe</span>
            <ToggleSwitch checked={naturalSwipe} onChange={onNaturalSwipeChange} label="default swipe" />
          </div>
          <NaturalSwipePreview naturalSwipe={naturalSwipe} />
          <p className="mt-3 text-xs leading-relaxed text-white/45">Toggle if swipes feel inverted</p>
        </div>
      )}
    </div>
  );
}
