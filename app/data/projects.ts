export type Project = {
  id: string;
  title: string;
  description: string;
  /** Path under `public/` (e.g. `/photo.jpg`) or configured remote URL */
  imageSrc?: string;
  imageAlt: string;
  url?: string;
  imageClassName?: string;
};

export const projects: Project[] = [
  {
    id: "moober",
    title: "Moober",
    description:
      "Moober is a carpooling and uber/lyft splitting platform for UC Davis students to save money and gas",
    imageSrc: "/projects/MooberLogo.svg",
    imageAlt: "Moober project preview",
    imageClassName: "h-40 w-40 md:h-56 md:w-56 [image-rendering:pixelated] select-none pointer-events-none",
    url: "https://mooberdavis.com/",
  },
  {
    id: "espresso",
    title: "Espresso",
    description:
      "Espresso combines the usability of Quizlet and the space repetition algorithm from Anki",
    imageSrc: "/projects/Espresso-project.png",
    imageAlt: "Espresso project preview",
    url: "https://codelabdavis.medium.com/interactive-learning-tool-espresso-551f1263925d",
  },
];
