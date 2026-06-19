export type ExperienceDetails = {
  context: string;
  approach: string;
  execution: string[];
  signal: string;
};

export type ExperienceEntry = {
  id: string;
  title: string;
  organization: string;
  description: string;
  period: string;
  image: string;
  url?: string;
  details?: ExperienceDetails;
};

export const experiences: ExperienceEntry[] = [
  {
    id: "7",
    title: "Physical Therapy Technician",
    organization: "Spear Physical Therapy · Brooklyn, NY",
    description:
      "Assisted physical therapists with patient care, rehabilitation station setup, and guided exercise routines in a high-volume clinic",
    period: "Oct '25 – May '26",
    image: "/experiences/MESA.png",
    details: {
      context:
        "A busy PT clinic puts you in front of dozens of different people every day — different ages, backgrounds, races, income levels, life situations — all in some state of pain or uncertainty about their recovery. It's less a job about equipment and more a daily test of how genuinely you can connect with people who have nothing in common except needing to be there.",
      approach:
        "I didn't try to have one approach that worked for everyone — I tried to actually meet each person where they were that day. Some people wanted to talk, some wanted quiet, some needed to be walked through the same explanation three times without feeling rushed. Staying genuine instead of performing \"professional\" was what actually built trust over time.",
      execution: [
        "Guided patients through exercise routines, explaining mechanisms and expected outcomes in plain terms",
        "Prepared rehab stations including hydrotherapy, ice/heat, and HyperIce setups for lymphedema patients",
        "Built real relationships with patients across a wide range of ages, backgrounds, and life circumstances",
        "Maintained composure and warmth across a high-volume, emotionally varied daily schedule",
      ],
      signal:
        "This was less a job and more a daily test of the values I actually hold — candor, curiosity, humility — under real conditions, with real people, not abstractions. I came out of it having made genuine friends I wouldn't have otherwise met, and a much better sense of how to manage my own emotions while showing up for someone else's hard day.",
    },
  },
  {
    id: "1",
    title: "Student Assistant (Hackathon Lead)",
    organization: "MESA · Davis, CA",
    description:
      "Led hackathon to teach prototyping, design, and coding to 50 students & created data report analyzing 370+ MESA students",
    period: "Oct '24 – Aug '25",
    image: "/experiences/MESA.png",
    url: "https://mesausa.org/",
    details: {
      context:
        "MESA serves first-generation and underrepresented students in STEM, but the program had no structured way to teach prototyping or product thinking. The gap wasn't motivation — it was exposure.",
      approach:
        "I chose a hackathon format over lectures because building and fixing something broken in a day teaches more than a curriculum does. On the data side, I built reproducible R pipelines rather than one-off spreadsheets, so the analysis could outlast me.",
      execution: [
        "Designed and led hands-on workshops in UI/UX, prototyping, and web development for 50+ students",
        "Built R data pipelines analyzing feedback across ~370 students and advisors",
        "Produced reports surfacing engagement patterns and curriculum gaps",
      ],
      signal:
        "The reports informed outreach and curriculum decisions indirectly — a quieter kind of impact, but honest. Next time, I'd get advisor buy-in on the questions before building the pipeline.",
    },
  },
  {
    id: "2",
    title: "Product Manager",
    organization: "Moober · Davis, CA",
    description:
      "Managed product development for UC Davis student exclusive ride-sharing website for 1100+ users",
    period: "Oct '24 – Jul '25",
    image: "/experiences/aggieworks.png",
    url: "https://aggieworks.org/products/moober",
    details: {
      context:
        "When I joined, Moober was early — the primary problem was GTM and getting enough students to know the product existed. But I also knew that scaling without fixing underlying product gaps would churn just as fast as it came in. That meant running two tracks simultaneously: visible marketing work to drive acquisition, and quieter behind-the-scenes fixes to make the product ready when users arrived.",
      approach:
        "I used SQL queries in Supabase to find behavioral patterns — when drivers posted, where they dropped off, what correlated with retention — and built targeted Python email blasts timed to those windows rather than pushing general awareness evenly. In parallel, user interviews surfaced three product issues worth fixing before scaling further: too much friction in the posting flow, no real incentive to return, and phone numbers being exposed in a way that created a genuine privacy risk. I consulted a cybersecurity researcher at Davis before designing a fix, keeping the platform student-only to protect the trust dynamic the whole product depended on.",
      execution: [
        "Ran 40+ user interviews and a targeted feedback campaign to diagnose driver drop-off",
        "Built automated Python outreach timed to high-demand academic calendar windows",
        "Shipped a privacy-gated contact system limiting number visibility to confirmed ride participants",
        "Shipped improvements across maps, notifications, security, and ride request flows",
      ],
      signal:
        "Driver postings up 45%, NPS +16%, scaled from 200 to 1,100+ users.",
    },
  },
  {
    id: "3",
    title: "Assistant Data Scientist",
    organization: "CAIEF · UC Davis · Davis, CA",
    description:
      "Collected literature corpus for upcoming AI Humanities Center developed by College of Letters and Science",
    period: "Mar '24 – Jun '24",
    image: "/experiences/Datalab.png",
    url: "https://caief.ucdavis.edu/",
    details: {
      context:
        "CAIEF (the college's planned AI Humanities Center) needed a literature corpus ready before the Center officially formed, so research could hit the ground running. No one had a systematic way to extract that volume of journal content from the UC Davis Library at scale.",
      approach:
        "I worked on a 3-person team building an RSelenium web crawler against the library system, since standard scraping didn't work on that site. I focused on the crawler mechanics and diagnosing what broke — page-load timing, pagination, ISSN parsing — while teammates handled data frame structuring and coordination. We ran into real infrastructure friction: CrossRef's API had changed since the original code was written, and the DataSci server didn't support a package the crawler depended on, so we ran it locally instead.",
      execution: [
        "Worked on the RSelenium crawler logic and diagnosed page-load, pagination, and crash issues across 14 journal categories",
        "Helped recover ~20,000 journals and associated metadata (titles, volumes, issues, DOIs, ISSNs)",
        "Diagnosed a CrossRef API documentation change and a DataSci server package conflict that blocked remote execution",
      ],
      signal:
        "We recovered about 80% of every category before time ran out — solid, but incomplete. The corpus got used, then the program's funding was cut and the work went dormant. Good infrastructure isn't enough if the institutional support around it disappears.",
    },
  },
  {
    id: "4",
    title: "Assistant Visualization Researcher",
    organization: "DataLab · UC Davis · Davis, CA",
    description:
      "Integrated 3D Gaussian Splatting into Linux environment to improve accuracy and clarity of images in VR spaces",
    period: "Nov '23 – Sep '24",
    image: "/experiences/Datalab.png",
    url: "https://datalab.ucdavis.edu/",
    details: {
      context:
        "The lab needed to represent physical spaces in VR accurately enough for research. Existing photogrammetry methods were too noisy or imprecise for that.",
      approach:
        "3D Gaussian Splatting produces cleaner results for static scenes than mesh-based methods, so it was worth testing. The real challenge wasn't the algorithm — it was getting the toolchain stable in a Linux environment with finicky GPU drivers.",
      execution: [
        "Integrated a 3D Gaussian Splatting pipeline into a Linux research environment",
        "Diagnosed driver conflicts via Bash scripts and identified the correct Nvidia install path",
        "Improved image accuracy and visual clarity in VR output",
      ],
      signal:
        "The integration worked — cleaner, more accurate VR output than the photogrammetry baseline. The bigger lesson was about where time actually goes: debugging environments is underrated as a skill. The algorithm was maybe 20% of the work; getting the infrastructure to stop fighting me was the other 80%.",
    },
  },
  {
    id: "5",
    title: "Software Engineer",
    organization: "CodeLab Davis · Davis, CA",
    description:
      "Developed flashcard website that integrated spaced repetition to improve learning efficiency",
    period: "Oct '23 – Jun '24",
    image: "/experiences/codelablogo.png",
    url: "https://codelabdavis.medium.com/interactive-learning-tool-espresso-551f1263925d",
    details: {
      context:
        "Quizlet is convenient but passive; Anki has the algorithm but dated, intimidating UX. The opportunity was spaced repetition with an interface people would actually want to open.",
      approach:
        "My role was frontend — making the study flow feel low-friction and visually clear, since a flashcard app lives or dies on whether the UI gets out of the way. I shipped iteratively within a student team, adapting to what teammates were building on the backend.",
      execution: [
        "Built the frontend study experience with a focus on flow state and visual clarity",
        "Shipped features iteratively with a cross-functional student team",
        "Iterated on UI based on ongoing user feedback",
      ],
      signal:
        "The product shipped and got written up. Cosmetic-seeming decisions — spacing, transition speed, card flip — actually determine whether someone keeps using a tool. I've been deliberate about interaction details ever since.",
    },
  },
  {
    id: "6",
    title: "Software Engineer Intern",
    organization: "TOKI · Tokyo, Japan",
    description:
      "Developed AI powered travel itinerary planner and optimized financial model for travel agency in Tokyo, Japan",
    period: "Jun '23 – Aug '23",
    image: "/experiences/TOKI.png",
    url: "https://www.toki.tokyo/",
    details: {
      context:
        "Travel agents at TOKI spent disproportionate time on itinerary planning — repetitive work that needed domain knowledge but not judgment at every step.",
      approach:
        "I used Flask and LangChain with OpenAI's API because agents already worked in natural language with clients — a chatbot in that same register lowered the switching cost. The goal was handling scaffolding, not replacing their judgment.",
      execution: [
        "Developed an AI travel chatbot with Flask, LangChain, and OpenAI's API",
        "Reduced manual itinerary planning time, enabling 3x more customers per agent per week",
        "Built a financial model with finance and ops teams to improve budget tracking",
      ],
      signal:
        "Working with early LLMs in 2023 meant hitting real limits constantly — hallucinations, formatting breaks, context loss. It gave me an early, grounded sense that LLMs are prediction models, not knowledge bases, and a discernment about AI I've carried into every project since.",
    },
  },
];
