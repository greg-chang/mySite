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
        "A busy PT clinic puts you in front of dozens of different people every day – different ages, backgrounds, races, income levels, life situations — all in some state of pain or uncertainty about their recovery.",
      approach:
        "I tried to meet each person where they were that day. Some people wanted to talk, some wanted quiet, some needed to be walked through the same explanation three times without feeling rushed. Staying genuine instead of performing \"professional\" was what really built trust over time.",
      execution: [
        "Guided patients through exercise routines, explaining mechanisms and expected outcomes in plain terms",
        "Prepared rehab stations including hydrotherapy, ice/heat, and HyperIce setups for lymphedema patients",
        "Built real relationships with patients across a wide range of ages, backgrounds, and life circumstances",
        "Maintained composure and warmth across a high-volume, emotionally varied daily schedule",
      ],
      signal:
        "This job was a daily test of the values I actually hold — candor, curiosity, humility — under real conditions, with real people. I came out of it having made genuine connections I wouldn't have otherwise met, and a much better sense of how to manage my own emotions while showing up for someone else's hard day.",
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
        "MESA serves first-generation and underrepresented students in STEM, but the program had no structured way to teach prototyping or product thinking. The gap was exposure.",
      approach:
        "I chose a hackathon format over lectures because building something directly teaches more than a curriculum does. On the data side for MESA, I built reproducible R pipelines and wrote data reports for future curriculum decisions.",
      execution: [
        "Designed and led hands-on workshops MESA's first hackathon in UI/UX, prototyping, and web development for 50+ students",
        "Built R data pipelines analyzing feedback across ~370 students and advisors",
        "Produced reports surfacing engagement patterns and demographic data",
      ],
      signal:
        "Led the first hackathon for MESA and the reports informed outreach and curriculum decisions indirectly.",
    },
  },
  {
    id: "2",
    title: "Product Manager → Software Engineer",
    organization: "Moober · Davis, CA",
    description:
      "Managed product development for UC Davis student exclusive ride-sharing website for 1100+ users",
    period: "Oct '24 – Sep '25",
    image: "/experiences/aggieworks.png",
    url: "https://aggieworks.org/products/moober",
    details: {
      context:
        "I joined as PM when Moober was early — the main problem was GTM, getting enough students to know it existed, while making sure the product itself wouldn't churn the users we did bring in.",
      approach:
        "I used SQL in Supabase to find when drivers actually posted (mostly right before breaks) and built outreach around that pattern instead of generic marketing. User interviews also surfaced a phone number privacy risk, which I took seriously enough to consult a cybersecurity researcher at Davis before designing a fix, keeping the platform student-only to protect the trust the product depended on.",
      execution: [
        "Ran 40+ user interviews and built automated, calendar-timed outreach with Python",
        "Shipped a privacy-gated contact system and improvements across communication preferences, notifications, and ride flows",
        "Led a cross-functional team of engineers, designers, and marketing",
      ],
      signal:
        "Driver postings up 45%, NPS +16%, scaled to 1,100+ users. A year later, I came back briefly to help the engineering team rebuild the backend for a new React Native app — built JWT auth in NestJS and migrated hosting off Vercel to a VPS, cutting costs 90%. It was a good way to stay close to technical work, and a strange kind of full-circle: I'd made the product calls as PM, then helped live inside their technical consequences as an engineer.",
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
        "Helped recover ~4,000 literary works with associated metadata (titles, volumes, issues, DOIs, ISSNs)",
        "Diagnosed a CrossRef API documentation change and a DataSci server package conflict that blocked remote execution",
      ],
      signal:
        "We recovered about 80% of every category before time ran out — solid, but incomplete. The program's funding was later paused, but the corpus was kept.",
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
        "The lab needed to represent physical spaces in VR for more realistic scenes. Existing photogrammetry methods were too noisy or imprecise.",
      approach:
        "3D Gaussian Splatting produced cleaner results for static scenes than mesh-based methods, so it was worth testing. The real challenge wasn't the algorithm — it was getting the toolchain stable in a Linux environment with finicky GPU drivers.",
      execution: [
        "Integrated a 3D Gaussian Splatting pipeline into a Linux research environment",
        "Diagnosed driver conflicts via Bash scripts and identified the correct Nvidia install path",
        "Improved image accuracy and visual clarity in VR output",
      ],
      signal:
        "The integration worked — cleaner, more accurate VR output than the photogrammetry baseline. The bigger lesson was about learning to navigate confusing environments and dependencies.",
    },
  },
  {
    id: "5",
    title: "Software Engineer",
    organization: "CodeLab · Davis, CA",
    description:
      "Developed flashcard website that integrated spaced repetition to improve learning efficiency",
    period: "Oct '23 – Jun '24",
    image: "/experiences/codelablogo.png",
    url: "https://codelabdavis.medium.com/interactive-learning-tool-espresso-551f1263925d",
    details: {
      context:
        "Quizlet is convenient but passive; Anki has the algorithm but dated, intimidating UX. The opportunity was spaced repetition with an interface people would actually want to open.",
      approach:
        "My role was frontend and backend making the space repetition study flow feel seamless and visually clear.",
      execution: [
        "Built the frontend study experience with a focus on flow state and visual clarity",
        "Shipped features iteratively with a cross-functional student team",
        "Iterated on UI based on ongoing user feedback",
        "Set up relationnal Database using Postgres"
      ],
      signal:
        "The product never fully shipped but the collaboration and UI/UX decisions — spacing, transition speed, card flip — taught me that experience is everything. I've been deliberate about interaction details ever since.",
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
        "TOKI needed UI improvements on their site, and separately, their travel employees wanted a faster way to ideate itinerary ideas for clients rather than starting from scratch each time.",
      approach:
        "The UI work was straightforward iteration on their existing frontend. The more interesting problem was the chatbot — I prototyped it with Flask and LangChain on top of OpenAI's API while it was still early and the tooling around it was thin, aiming to provide employees a starting point to base on improving their workflow.",
      execution: [
        "Shipped UI improvements on TOKI's  website",
        "Prototyped an internal chatbot using Flask, LangChain, and early OpenAI API access to help employees ideate travel itineraries",
        "Built a financial model with finance and ops teams to improve budget tracking",
      ],
      signal:
        "Working with the OpenAI API this early meant hitting real limits constantly — hallucinations, inconsistent formatting, context getting lost mid-conversation. It gave me an early, grounded sense that LLMs are prediction models, not knowledge bases, and a discernment about AI I've carried into every project since.",
    },
  },
];
