export type ExperienceEntry = {
  id: string;
  title: string;
  description: string;
  period: string;
  image: string;
  url?: string;
};

export const experiences: ExperienceEntry[] = [
  {
    id: "1",
    title: "Software Engineer Mentor",
    description:
      "Led hackathon to teach prototyping, design, and coding to 50 students & created data report analyzing 370+ MESA students",
    period: "Oct '24 - Aug '25",
    image: "/experiences/MESA.png",
    url: "https://mesausa.org/",
  },
  {
    id: "2",
    title: "Product Manager",
    description:
      "Managed product development for UC Davis student exclusive ride-sharing website for 1100+ users",
    period: "Jul '24 - Sep '24",
    image: "/experiences/aggieworks.png",
    url: "https://aggieworks.org/",
  },
  {
    id: "3",
    title: "Assistant Data Scientist",
    description:
      "Collected literature corpus for upcoming AI Humanities Center developed by College of Letters and Science",
    period: "Mar '24 - Jun '24",
    image: "/experiences/Datalab.png",
    url: "https://datalab.ucdavis.edu/",
  },
  {
    id: "4",
    title: "Assistant Visualization Researcher",
    description:
      "Integrated 3D Gaussian Splatting into Linux environment to improve accuracy and clarity of images in VR spaces",
    period: "Nov '23 - Sept '24",
    image: "/experiences/Datalab.png",
    url: "https://datalab.ucdavis.edu/",
  },
  {
    id: "5",
    title: "Software Engineer",
    description:
      "Developed flashcard website that integrated space reptition to improve learning efficiency",
    period: "Oct '23 - Jun '24",
    image: "/experiences/codelablogo.png",
    url: "https://www.codelabdavis.com/",
  },
  {
    id: "6",
    title: "Software Engineer Intern",
    description:
      "Developed AI powered travel iternerary planner and optimized finacial model for travel agency in Tokyo, Japan",
    period: "Jun '23 - Aug '23",
    image: "/experiences/TOKI.png",
    url: "https://www.toki.tokyo/",
  },
];
