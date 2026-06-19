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
        "A busy physical therapy clinic is a particular kind of environment — patients are often in pain, uncertain about their recovery, and moving through a space that can feel clinical and impersonal. The job description is logistical: set up stations, maintain cleanliness, assist with equipment. The actual job is making people feel safe enough to do hard things.",
      approach:
        "I focused on the human layer first. Before explaining an exercise, I'd try to read where the patient was — anxious, frustrated, checked-out — and meet them there. Explaining why an exercise works (the mechanism, not just the instruction) helped compliance more than repetition. People do things they understand.",
      execution: [
        "Guided patients through prescribed exercise routines, explaining mechanisms and expected outcomes",
        "Prepared and maintained rehabilitation stations including hydrotherapy, ice/heat, and HyperIce setups for lymphedema patients",
        "Maintained clinic cleanliness and equipment readiness across a high-volume schedule",
        "Provided consistent, calm presence for patients navigating difficult or unfamiliar recovery processes",
      ],
      signal:
        "This role sits differently from the rest of my experience, and I include it intentionally. It taught me that communication under load — when someone is uncomfortable, confused, or just wants to be heard — is a skill you can get better at. I use it differently now when I'm talking to users, running workshops, or explaining a technical decision to a non-technical stakeholder. The context changes; the underlying skill doesn't.",
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
        "MESA serves first-generation and underrepresented students in STEM, but the program didn't have a structured way to teach prototyping or product thinking — skills that are increasingly expected even in early internships. The gap wasn't motivation; it was exposure.",
      approach:
        "I chose the hackathon format deliberately over a lecture series because I wanted students to learn by doing and that it didn't matter if they didn't finish but that the ideation and prototyping process was more important than the product. I ran workshops on Figma and React not because they're the only tools, but because they are directly applicable skills in the modern tech world.\n\nOn the data side, I chose to build pipelines in R rather than just export spreadsheets, because I wanted the analysis to be reproducible — if someone asked a different question next year, the infrastructure would still be there.",
      execution: [
        "Designed and led hands-on workshops in UI/UX, prototyping, and web development for 50+ students",
        "Built R data pipelines to collect, clean, and analyze feedback across ~370 students and advisors",
        "Produced reports that surfaced patterns in engagement and curriculum gaps",
      ],
      signal:
        "The reports informed outreach and curriculum decisions indirectly — they didn't single-handedly change a policy, but they gave advisors language and evidence for conversations they were already having. That's a quieter kind of impact, but it's honest. What I'd do differently: get earlier buy-in from advisors on what questions they actually needed answered, before building the pipeline.",
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
        "Driver postings up 45%, NPS +16%, scaled from 200 to 1,100+ users. Retention at semester transitions remained the unsolved problem — and the one I'd tackle first if I went back.",
    },
  },
  {
    id: "4",
    title: "Assistant Visualization Researcher",
    organization: "DataLab · Davis, CA",
    description:
      "Integrated 3D Gaussian Splatting into Linux environment to improve accuracy and clarity of images in VR spaces",
    period: "Nov '23 – Sep '24",
    image: "/experiences/Datalab.png",
    url: "https://datalab.ucdavis.edu/",
    details: {
      context:
        "The lab was exploring how to represent physical spaces in VR with enough accuracy to be useful for research purposes. Existing photogrammetry methods were producing images that were too noisy or geometrically imprecise for the use cases being explored.",
      approach:
        "3D Gaussian Splatting was a relatively new technique at the time that represented scenes as collections of 3D gaussians rather than meshes — it produces significantly cleaner results for static scenes and was worth testing in this context. The challenge wasn't the algorithm itself; it was getting the toolchain running correctly in a Linux environment with finicky GPU driver dependencies.",
      execution: [
        "Integrated 3D Gaussian Splatting pipeline into a Linux research environment",
        "Diagnosed driver conflicts using Bash scripts and identified the correct Nvidia installation path",
        "Improved image accuracy and visual clarity in the VR output",
      ],
      signal:
        "Like the data science role, this work also landed in the same funding cut. The technical integration worked, but the research direction didn't get to continue. What I took from it: debugging environments is underrated as a skill — the actual algorithm implementation was maybe 20% of the work. Getting the infrastructure to not fight you is the other 80%.",
    },
  },
  {
    id: "3",
    title: "Assistant Data Scientist",
    organization: "CAIEF · Davis, CA",
    description:
      "Collected literature corpus for upcoming Center for Artificial Intelligence and Experimental Futures (CAIEF) at UC Davis",
    period: "Mar '24 – Jun '24",
    image: "/experiences/Datalab.png",
    url: "https://caief.ucdavis.edu/",
    details: {
      context:
        "The College of Letters and Science was building an AI Humanities Center (CAIEF) and needed a corpus of literary works to train and test research workflows. The problem wasn't that the works didn't exist — it was that there was no systematic way to find, extract, and organize them at scale.",
      approach:
        "Elsevier had the literary corpus CAIEF needed, but no structured way to extract it at scale. I chose R for the scraping workflow because the text processing libraries mapped well to the problem and because I could make the pipeline reproducible for whoever came after me. I prioritized building a searchable metadata structure from the start — not a flat file dump — the difference between researchers finding things in minutes versus hours.",
      execution: [
        "Built a custom R web scraping workflow against Elsevier to identify, extract, and process 4,000+ literary works",
        "Created a searchable metadata database keyed to CAIEF research needs",
        "Developed data cleaning pipelines with logging to maintain integrity throughout collection",
      ],
      signal:
        "The database was used and the pipeline worked. Then the program's funding was cut. The work is technically there — 4,000+ works, clean and searchable — but dormant. That outcome taught me something about research infrastructure: it's only as durable as the institutional support around it. Building good tools isn't enough if the context that needs them disappears.",
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
        "Quizlet is convenient but passive — flashcards without spacing logic don't actually build retention. Anki has the algorithm but the UX is dated and intimidating for most students. The opportunity was in the middle: spaced repetition with an interface people would actually want to open.",
      approach:
        "My role was frontend — I focused on making the study experience feel low-friction and visually clear. A flashcard app lives or dies on how fast you can get into a flow state; if the UI interrupts you, the algorithm doesn't matter. I worked within a student team which meant shipping iteratively and adapting based on what teammates were building on the backend.",
      execution: [
        "Built the frontend study experience focused on flow and visual clarity",
        "Collaborated with a cross-functional student team to ship features iteratively",
        "Iterated on UI based on user feedback throughout the academic year",
      ],
      signal:
        "The product shipped and got written up. What I learned about working on a team with fixed scope and timeline: frontend decisions that seem cosmetic (spacing, transition speed, card flip behavior) actually determine whether someone uses the tool or abandons it after one session. I've been more deliberate about interaction details ever since.",
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
        "TOKI is a travel agency in Tokyo, and the two problems I was brought in to work on were pretty different from each other: agents were spending too much time building itineraries from scratch, and the finance team had no clean way to see where money was going across their different events.",
      approach:
        "For the chatbot, I used Flask and LangChain with OpenAI's API — a conversational interface made sense because agents already worked in natural language with clients. The goal was route mapping and ideation: give agents a fast way to explore options and rough out a trip before doing the detail work themselves. It wasn't meant to replace their judgment, just to get them past the blank page faster.\n\nFor the financial side, the problem was that all their data lived in sheets that weren't organized in a way that let you ask useful questions. I built pipelines to restructure everything by event, so the team could actually see what was happening per trip rather than wading through a flat dump of transactions.",
      execution: [
        "Developed an AI travel chatbot with Flask, LangChain, and OpenAI's API for route mapping and itinerary ideation",
        "Enabled agents to support 3x more customers per week by reducing time spent on planning scaffolding",
        "Built data pipelines to reorganize financial records by event, giving the ops team cleaner insight into per-trip costs",
        "Worked with the finance team to structure the data around the questions they actually needed answered",
      ],
      signal:
        "3x customer capacity per agent was the headline. What the internship actually taught me was more foundational: working with early LLMs in production in 2023 meant running into their real limits constantly — hallucinated itinerary details, formatting inconsistencies that broke agent trust, context window gaps that caused the model to lose track of earlier conversation. Those failures gave me an early, grounded understanding that LLMs are fundamentally prediction models, not knowledge bases. That distinction matters — it changes how you prompt, what you trust, and when you don't hand something off to the model at all.",
    },
  },
];
