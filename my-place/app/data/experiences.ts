export type ExperienceEntry = {
  id: string;
  title: string;
  description: string;
  period: string;
  image: string;
  url?: string;
  details?: string[];
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
    details: [
      "Developed and led hands-on STEM workshops on UI/UX principles, prototyping, and web development with Figma and React for 50+ first-generation and underrepresented students.",
      "Built R data pipelines to collect, clean, and analyze feedback from roughly 370 students and advisors, producing reports that informed outreach strategy and curriculum improvements.",
    ],
  },
  {
    id: "2",
    title: "Product Manager",
    description:
      "Managed product development for UC Davis student exclusive ride-sharing website for 1100+ users",
    period: "Jul '24 - Sep '24",
    image: "/experiences/aggieworks.png",
    url: "https://aggieworks.org/",
    details: [
      "Scaled a student-exclusive ridesharing app from 200 to 1,100+ users while leading a cross-functional team of engineers, designers, and marketing.",
      "Led 40+ user interviews, analyzed SQL data, and shipped improvements around maps, notifications, security, and ride requests, improving NPS by 16%.",
      "Increased driver postings by 45% by aligning outreach with the academic calendar and using SQL and Python to target and automate communications.",
    ],
  },
  {
    id: "3",
    title: "Assistant Data Scientist",
    description:
      "Collected literature corpus for upcoming AI Humanities Center developed by College of Letters and Science",
    period: "Mar '24 - Jun '24",
    image: "/experiences/Datalab.png",
    url: "https://datalab.ucdavis.edu/",
    details: [
      "Built a custom R web scraping workflow to identify, extract, and process 4,000+ literary works relevant to CAIEF research needs.",
      "Created a searchable metadata database that reduced research lookup time from hours to minutes.",
      "Developed data cleaning pipelines and logging to maintain data integrity throughout collection.",
    ],
  },
  {
    id: "4",
    title: "Assistant Visualization Researcher",
    description:
      "Integrated 3D Gaussian Splatting into Linux environment to improve accuracy and clarity of images in VR spaces",
    period: "Nov '23 - Sept '24",
    image: "/experiences/Datalab.png",
    url: "https://datalab.ucdavis.edu/",
    details: [
      "Integrated 3D Gaussian Splatting into a Linux environment to improve image accuracy and clarity in VR.",
      "Troubleshot the Linux environment with Bash scripts and identified the correct Nvidia driver installation path.",
    ],
  },
  {
    id: "5",
    title: "Software Engineer",
    description:
      "Developed flashcard website that integrated space reptition to improve learning efficiency",
    period: "Oct '23 - Jun '24",
    image: "/experiences/codelablogo.png",
    url: "https://www.codelabdavis.com/",
    details: [
      "Built a flashcard learning experience focused on spaced repetition and study efficiency.",
      "Collaborated in a student software team environment to ship product features and iterate on user feedback.",
    ],
  },
  {
    id: "6",
    title: "Software Engineer Intern",
    description:
      "Developed AI powered travel iternerary planner and optimized finacial model for travel agency in Tokyo, Japan",
    period: "Jun '23 - Aug '23",
    image: "/experiences/TOKI.png",
    url: "https://www.toki.tokyo/",
    details: [
      "Developed an AI-powered travel chatbot with Flask, LangChain, and OpenAI's API, reducing manual planning time for travel agents.",
      "Enabled agents to support 3x more customers per week by streamlining itinerary planning workflows.",
      "Built a financial model with finance and business operations teams to improve budget tracking and reporting efficiency.",
    ],
  },
];
