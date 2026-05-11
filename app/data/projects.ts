export type Project = {
  id: string;
  title: string;
  description: string;
  /** Path under `public/` (e.g. `/photo.jpg`) or configured remote URL */
  imageSrc?: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    id: "sample-1",
    title: "Sample project",
    description: "Replace with your own summary, stack, or role.",
    imageSrc: "/next.svg",
    imageAlt: "Sample project preview",
  },
  {
    id: "sample-2",
    title: "Another piece of work",
    description: "Add as many entries as you need in this list.",
    imageSrc: "/globe.svg",
    imageAlt: "Another project preview",
  },
  {
    id: "placeholder",
    title: "Image coming soon",
    description: "Omit imageSrc to show the placeholder state until you have an asset.",
    imageAlt: "",
  },
];
