const chevronPath = "M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z";

export function ChevronUp() {
  return (
    <svg className="w-5 h-5 shrink-0 transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d={chevronPath} />
    </svg>
  );
}

export function ChevronRight() {
  return (
    <svg className="w-5 h-5 shrink-0 rotate-90 transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d={chevronPath} />
    </svg>
  );
}

export function ChevronDown() {
  return (
    <svg className="w-5 h-5 shrink-0 rotate-180 transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d={chevronPath} />
    </svg>
  );
}

export function ChevronLeft() {
  return (
    <svg className="w-5 h-5 shrink-0 -rotate-90 transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d={chevronPath} />
    </svg>
  );
}
