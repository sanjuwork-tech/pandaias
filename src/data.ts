import { TeamMember, SurvivalTrait } from "./types";

export const SURVIVAL_TRAITS: SurvivalTrait[] = [
  {
    id: "patience",
    title: "P – Patience",
    tagline: "Stay committed despite delays",
    biologyFact: "Pandas feed almost exclusively on bamboo, eating up to 38kg of it daily. Because bamboo has low nutritional value, they must chew patiently for up to 12 hours a day, demonstrating ultimate focus on a singular, slow process.",
    aspirantLesson: "The UPSC preparation journey can be long and full of delays. Stay committed to your daily routine, chewing through the syllabus patiently, knowing that growth takes time.",
    iconName: "Hourglass"
  },
  {
    id: "awareness",
    title: "A – Awareness",
    tagline: "Understand society, governance, and yourself",
    biologyFact: "Pandas are highly sensitive to their habitat, using a keen sense of smell and spatial awareness to navigate complex mountainous terrains and locate resources efficiently.",
    aspirantLesson: "A successful civil servant must develop a deep awareness of their surrounding society, structural governance issues, and their own mental boundaries.",
    iconName: "Compass"
  },
  {
    id: "nurturing",
    title: "N – Nurturing Growth",
    tagline: "Improve a little every day",
    biologyFact: "A newborn panda cub is extremely small, weighing only about 100 grams. It grows steadily through nurturing and consistent care, eventually becoming a strong, resilient adult.",
    aspirantLesson: "Do not expect instant mastery. Master one micro-theme, one answer structure, or one article at a time. Nurture your knowledge base steadily every day.",
    iconName: "Sprout"
  },
  {
    id: "discipline",
    title: "D – Discipline",
    tagline: "Consistency over motivation",
    biologyFact: "Pandas do not hibernate like other bears. Regardless of freezing winter snow or scorching summer heat, they show up every day, maintaining their steady foraging discipline year-round.",
    aspirantLesson: "Motivation is temporary and will fail you. True selection is won by discipline—showing up to write that mock answer even on days when your energy is low.",
    iconName: "Trophy"
  },
  {
    id: "achievement",
    title: "A – Achievement",
    tagline: "Success as a result of sustained effort",
    biologyFact: "Pandas are excellent tree climbers and swimmers, skills developed through constant childhood play and trial-and-error, enabling them to reach safety and food in demanding environments.",
    aspirantLesson: "Your final name on the rank list is not a stroke of luck or temporary brilliance. It is the natural achievement resulting from years of sustained, quiet effort.",
    iconName: "Award"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Prashanth N",
    role: "Founder & CEO",
    bio: "Visionary behind the academys' student-first approach to UPSC preparation. An oracle in Ethics, Essay, and Mains Answer Writing, he is known for helping aspirants transform ideas into tech enabled impactful answers and develop the clarity, integrity, and analytical depth expected of future civil servants.",
    yearsOfStruggle: 6,
    specialization: "Ethics & Essay Oracle | Mains Answer Writing Coach",
    image: "prashanth.jpg"
  },
  {
    name: "Anusha PC",
    role: "Managing Director",
    bio: "A trusted UPSC mentor known for simplifying Anthropology and mastering Prelims strategy. Beyond academics, she serves as a constant companion, emotional anchor, and unwavering supporter throughout the preparation journey. Her mission is to help aspirants build knowledge, confidence, resilience, and the determination needed for success.",
    yearsOfStruggle: 4,
    specialization: "Anthropology Expert | Prelims Wizard | Constant Companion",
    image: "anusha.jpg"
  },
  {
    name: "Varun Amidal",
    role: "Vice President",
    bio: "A dedicated UPSC mentor specializing in Political Science & International Relations (PSIR) and CSAT. Known for his approachable nature, patient listening, and long-term mentorship, he helps aspirants navigate challenges with clarity and confidence. His guidance combines academic excellence, strategic preparation, and genuine care for every student's growth.",
    yearsOfStruggle: 5,
    specialization: "PSIR Expert | CSAT Strategist | Smiling Mentor",
    image: "varun.png"
  },
  {
    name: "Sanjeeva Reddy",
    role: "CTO",
    bio: "A tech lead dedicated to engineering seamless learning workspaces and resilient cognitive tools. Sanju ensures that the platform delivers high-speed, interactive syllabus mapping and analytical workspaces for aspirants.",
    yearsOfStruggle: 3,
    specialization: "Tech Architecture | Platform Operations",
    image: "sanjeeva.png"
  },
  {
    name: "Riya P Kabadi",
    role: "CFO and HR",
    bio: "Manages the academy's fiscal operations and builds supportive mentor networks. Riya ensures that our trial companion cohorts remain highly affordable while selecting top-tier, empathetic mentors for handholding.",
    yearsOfStruggle: 3,
    specialization: "Finance Operations | Talent Acquisition",
    image: "riya.png"
  }
];

export const CONTROVERSY_DETAILS = {
  quote: "Most coaching institutes celebrate aggression, speed, and competition. PANDA IAS celebrates something different: disciplined consistency. A panda is often misunderstood as slow, gentle, and quiet. Yet it survives in harsh environments, conserves energy intelligently, and demonstrates extraordinary focus on what matters.",
  source: "PANDA IAS Slogan: Calm. Focused. Unstoppable.",
  analysis: "The UPSC journey is not won by panic. It is won by consistency. It is won by patience. It is won by showing up every day for years. That is the Panda mindset.",
  ourStand: "PANDA IAS is not about an animal. It is about the power of calm determination in a world obsessed with speed."
};

export const SURVIVOR_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "You have spent 8 hours in a dark, windowless study cubicle. The air-conditioning breaks, and the air becomes humid. What is your response?",
    options: [
      {
        text: "I pack my bag in frustration, tell myself I can't study under these conditions, and feel a wave of anxiety.",
        point: "Fragile State (We will help build your stamina step-by-step.)"
      },
      {
        text: "I step out to drink cold water, take 5 deep breaths, conserve my energy like a calm panda, and move to a well-ventilated terrace to finish my daily targets.",
        point: "Survivor Class (Excellent adaptability! You possess real steady instincts.)"
      },
      {
        text: "I ignore the physical heat completely, telling myself pain is an illusion, but end up with severe burnout and brain-fog the next day.",
        point: "Rigid State (Stiffness breaks. Remember, we must survive safely to serve the state.)"
      }
    ]
  },
  {
    id: 2,
    question: "UPSC changes the Prelims pattern completely, removing standard historical chronology MCQs and replacing them with complex philosophical linkages. How do you respond?",
    options: [
      {
        text: "I go online, read 5 articles criticizing the Commission, and join the fear-mongering forums.",
        point: "Reacting State (Draining your fuel. Power comes from focus, not worry.)"
      },
      {
        text: "I accept that the change is identical for all 10 Lakh aspirants, scrap my rigid study logs, adapt my syllabus linkages, and master the new game of critical thinking.",
        point: "Adaptable Survivor (Brilliant! Real pandas adapt to the environment through calm and consistent focus.)"
      },
      {
        text: "I rely on the same notes and short-cuts, hoping that this year was just an anomaly.",
        point: "Inertial State (Inertia is dangerous in a dynamic exam. Let us help you shift gears.)"
      }
    ]
  },
  {
    id: 3,
    question: "You check your mock test results. You scored 68, while the average classmate scored 110. Your heart sinks. What is the immediate survival philosophy?",
    options: [
      {
        text: "My score doesn't define my final rank. A mock test is a research environment, not a court of final verdict. I will dissect each of my 32 incorrect answers with a calm head.",
        point: "Indestructible Mindset (Superb. This deep wisdom is what transforms students into administrators.)"
      },
      {
        text: "I spiral into self-doubt, thinking I shouldn't have named PandaIAS my home, and waste the entire evening browsing success stories.",
        point: "Vulnerable State (Let us hold your hands. This is why we are here—to catch you when you fall.)"
      },
      {
        text: "I burn the result sheet, pretend it never happened, and continue reading more books without correcting my structural errors.",
        point: "Avoidant State (Avoidance prolongs the struggle. Face the errors; they are your actual targets.)"
      }
    ]
  }
];
