# Panda IAS — Calm. Focused. Unstoppable.

Panda IAS is a premium, empathy-driven companion platform engineered specifically for UPSC Civil Services Examination (CSE) aspirants. Breaking away from corporate coaching formulas and high upfront commercial paywalls, Panda IAS stands as a supportive, honest mentor, offering interactive cognitive instruments and conceptual pathways to protect student dignity and foster disciplined consistency.

---

## 🚀 Key Features

- **Interactive UPSC Syllabus Metro Map:** An intuitive, station-by-station visualization mapping every aspect of the UPSC syllabus directly to microthemes, recommended sources, exam weightage, and critical MCQ trap patterns.
- **UPSC Prelims PYQ Analysis Engine:** A comprehensive analytical database decodifying 12 years (2014-2025) of Prelims questions by cognitive demand levels (factual, conceptual, analytical), trap types (extreme word traps, dual options), and detailed ex-aspirant logical diagnoses.
- **Integrity Quiz:** A lightweight, gamified quiz enabling students to evaluate their resilience quotient and receive helpful mental support signals.
- **India Samvad Map:** An interactive geo-visualization depicting regional preparation realities and connecting aspirants nationwide to customized mentoring threads.
- **Mental Support Integration:** 24/7 emergency SOS panel offering calm guidance during moments of high-stakes preparation pressure.
- **Static Companion Chatbot:** A lightweight, floating, rule-based Q&A chatbot built with custom asset branding, featuring name-guessing interaction and direct resource links to help navigate courses and guides.

---

## 🛠️ Technology Stack

- **Framework:** React 19 (Single Page Application)
- **Bundler:** Vite
- **Language:** TypeScript & JavaScript
- **Styling:** Tailwind CSS v4 & custom CSS tokens
- **Animations:** Framer Motion (`motion/react`)
- **Icons:** Phosphor Icons (`@phosphor-icons/react`)

---

## 📂 Project Architecture

```bash
pandaias/
├── assets/                  # Shared images and visual brand assets
├── src/
│   ├── pages/               # Main layout and route-level views
│   │   ├── Home.tsx         # Direct, powerful homepage and quiz
│   │   ├── AboutUs.tsx      # Core story, manifestos, and allies council
│   │   ├── Contact.tsx      # Support tickets and emergency SOS panel
│   │   ├── Resources.tsx    # Resource hub selectors
│   │   ├── PYQAnalysisPage.jsx # Granular Prelims analytics engine
│   │   └── UPSCMetroMapPage.jsx # Integrated Syllabus Metro Map frame
│   ├── components/          # Reusable shell layout structures
│   │   ├── Header.tsx       # Dynamic navigation header & resources dropdown
│   │   ├── Footer.tsx       # Core brand values & covenant guidelines
│   │   ├── IndiaMapSection.jsx # GeoJSON-driven state map visualization
│   │   ├── Chatbot.tsx      # Reduced-scale floating companion chatbot
│   │   └── pyq/             # PYQ sub-components (dashboard, tables, filter bars)
│   ├── data/                # Mock questions & historical stats (2014-2025)
│   ├── lib/                 # Numerical calculators & analytical aggregators
│   ├── services/            # Simulated analytics & tracking telemetry
│   ├── App.tsx              # Main orchestrator and layout routing
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Custom styling and CSS utility overrides
│   ├── types.ts             # Shared TypeScript structures
│   └── data.ts              # Static homepage values & metadata
├── index.html               # Main HTML shell containing SEO elements
├── package.json             # Build pipelines and package manifests
└── tsconfig.json            # TypeScript build parameters
```

---

## 💻 Local Development

### Prerequisites
- Node.js (version 18+ recommended)
- npm (Node Package Manager)

### Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd pandaias
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```
   *(Note: Use `--legacy-peer-deps` due to peer conflicts between React 19 and react-simple-maps).*

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) (or the active port displayed in your terminal).

### Production Build
To build the application for deployment:
```bash
npm run build
```
This compiles the TypeScript files, packs the assets, and outputs a minified, production-ready bundle inside the `/dist` directory, fully prepared to be deployed directly on **Vercel** or other static hosting providers.
