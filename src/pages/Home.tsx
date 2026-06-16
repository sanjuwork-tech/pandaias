import React, { useState } from "react";
import { 
  Handshake, ShieldCheck, Compass, Flame, Trophy, 
  ArrowRight, Sparkle, BookOpen, Quotes, Info, Check, X,
  Question, CaretRight, CheckCircle, Warning, Play, Hourglass, Plant, Medal
} from "@phosphor-icons/react";
import { SURVIVAL_TRAITS, CONTROVERSY_DETAILS, SURVIVOR_QUIZ_QUESTIONS } from "../data";
import { Course, SurvivalTrait } from "../types";
import { motion, AnimatePresence } from "motion/react";
import IndiaMapSection from "../components/IndiaMapSection";

export default function Home({ setActivePage }: { setActivePage: (page: string) => void }) {
  // Selected trait for philosophy viewer
  const [selectedTrait, setSelectedTrait] = useState<string>("patience");
  
  // Trial Modal state
  const [activeTrialCourse, setActiveTrialCourse] = useState<Course | null>(null);
  const [trialCompleted, setTrialCompleted] = useState<boolean>(false);
  const [trialForm, setTrialForm] = useState({ name: "", email: "", phone: "", center: "Major Metro Hub" });

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Activate trait select
  const currentTraitData = SURVIVAL_TRAITS.find(t => t.id === selectedTrait) || SURVIVAL_TRAITS[0];

  // Map icon strings to Phosphor components
  const getTraitIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case "Hourglass": return <Hourglass className={className} />;
      case "Compass": return <Compass className={className} />;
      case "Sprout": return <Plant className={className} />;
      case "Trophy": return <Trophy className={className} />;
      case "Award": return <Medal className={className} />;
      default: return <ShieldCheck className={className} />;
    }
  };

  const handleQuizAnswer = (point: string) => {
    const updated = [...quizScore, point];
    setQuizScore(updated);
    if (currentQuizIndex + 1 < SURVIVOR_QUIZ_QUESTIONS.length) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setQuizScore([]);
    setQuizFinished(false);
  };

  const submitTrialForm = (e: React.FormEvent) => {
    e.preventDefault();
    setTrialCompleted(true);
  };

  const closeTrialModal = () => {
    setActiveTrialCourse(null);
    setTrialCompleted(false);
    setTrialForm({ name: "", email: "", phone: "", center: "Major Metro Hub" });
  };

  return (
    <div className="space-y-20 py-8" id="home-page-container">
      
      {/* 1. HERO SECTION: Direct, powerful, empathetic */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" 
        id="hero-banner"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          className="inline-flex items-center space-x-2 bg-brand-red-light text-brand-red px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-brand-red/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          whileHover={{ scale: 1.03 }}
        >
          <Sparkle className="w-3.5 h-3.5 text-brand-red animate-pulse" />
          <span>FOR THOSE WHO REFUSED TO QUIT.</span>
        </motion.div>
        
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-navy-950 tracking-tight max-w-4xl mx-auto leading-[1.15]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="block">Even one who stumbles can</span>
          <span className="block text-brand-red">rise again</span>
          <span className="block">through <span className="text-navy-900 bg-brand-red-light px-2 rounded-md border border-brand-red/15">perseverance</span>.</span>
        </motion.h1>
 
        <motion.p 
          className="mt-8 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span className="font-semibold text-navy-900 block">We are here to stand with you as true companions, support your mental well-being, and transform your resilience into nation-building power.</span>
        </motion.p>
 
        {/* Companion Call-to-action */}
        <motion.div 
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.button
            onClick={() => {
              const element = document.getElementById("trial-section");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-hover text-white font-medium text-base px-8 py-4 rounded-xl shadow-lg transition duration-200 hover:shadow-xl flex items-center justify-center space-x-3 cursor-pointer"
            id="hero-primary-cta"
          >
            <span>Try a Course module</span>
            <ArrowRight className="w-5 h-5 animate-bounce-right" />
          </motion.button>
          
          <motion.button
            onClick={() => {
              const element = document.getElementById("quiz-section");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base px-8 py-4 rounded-xl border border-slate-200 shadow-xs transition duration-200 flex items-center justify-center space-x-2 cursor-pointer"
            id="hero-secondary-cta"
          >
            <Question className="w-5 h-5 text-slate-400" />
            <span>Test Your Survival Quotient</span>
          </motion.button>
        </motion.div>
 
        {/* Handholding reassuring ribbon */}
        <motion.div 
          className="mt-12 p-5 bg-white border border-slate-200/80 rounded-2xl max-w-2xl mx-auto flex items-center space-x-4 text-left shadow-xs hover:shadow-md transition-shadow duration-300"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="bg-emerald-50 text-emerald-700 p-2.5 rounded-full shrink-0">
            <Handshake className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-navy-950">Our Absolute Shoulder Promise</h4>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              UPSC is a brutal marathon of isolation. We don't demand upfront lakhs or push pushy sales executives. Try or test any premium module starting from just ₹249. If you feel it holds your hand and clarifies concepts, stay. Otherwise, we still remain your companions.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* 2. RESILIENCE MANIFESTO: Origin story, positive symbolism, Gita verse, Inspirational figures */}
      <section className="bg-white border-y border-slate-200/80 py-20 overflow-hidden" id="resilience-manifesto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: CJI Context */}
            <motion.div 
              className="lg:col-span-5 space-y-6" 
              id="origin-context-card"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="bg-navy-950 text-white p-8 rounded-2xl shadow-xl border border-navy-900 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 transition-transform duration-500 group-hover:scale-110">
                  <Quotes className="w-36 h-36" />
                </div>
                
                <div className="inline-block bg-brand-red/20 text-brand-red text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-brand-red/30">
                  THE ORIGIN
                </div>

                <p className="text-slate-200 text-sm leading-relaxed pt-2">
                  {CONTROVERSY_DETAILS.quote}
                </p>

                <div className="mt-6 border-t border-navy-800 pt-4 space-y-3">
                  <h5 className="text-sm font-bold tracking-tight text-white">At PANDA IAS, we focus on the positive symbolism:</h5>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-red shrink-0" /><span>A panda <strong className="text-white">does not rush</strong>.</span></li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-red shrink-0" /><span>It <strong className="text-white">does not waste energy</strong>.</span></li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-red shrink-0" /><span>It <strong className="text-white">remains calm</strong> under pressure.</span></li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-red shrink-0" /><span>It <strong className="text-white">survives</strong> through patience and persistence.</span></li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Right: Gita verse + Brand manifesto + Inspirational figures */}
            <motion.div 
              className="lg:col-span-7 space-y-6" 
              id="resilience-response"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="text-xs font-mono font-bold text-brand-red tracking-widest uppercase block">Why we named ourselves Panda IAS</span>
              
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-950 leading-tight">
                India’s First Academy Dedicated to Disciplined Consistency.
              </h2>

              {/* Brand manifesto */}
              <div className="bg-navy-50/50 border-l-4 border-brand-red p-6 rounded-r-xl space-y-3">
                <p className="text-navy-900 font-serif font-medium italic text-sm sm:text-base leading-relaxed">
                  {CONTROVERSY_DETAILS.ourStand}
                </p>
                <p className="text-xs text-slate-500 text-right font-medium">— Founding Manifesto</p>
              </div>

              {/* Gita Philosophical Box */}
              <div className="p-6 bg-brand-red-light border border-brand-red/20 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <BookOpen className="w-24 h-24 text-brand-red" />
                </div>
                <h5 className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider mb-2">Bhagavad Gita 2.50</h5>
                <p className="text-sm sm:text-base font-bold text-navy-950 font-serif mb-2 leading-relaxed">
                  बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते ।<br />
                  तस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम् ॥
                </p>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "One who is engaged in disciplined action rids himself of both good and bad reactions even in this life. Therefore, strive for Yoga, which is the art of all work—excellence in action comes through disciplined consistency."
                </p>
              </div>
            </motion.div>

          </div>

          {/* Inspirational figures — FULL WIDTH */}
          <motion.div
            className="mt-12 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="bg-brand-red text-white px-6 py-4 rounded-xl text-center text-base sm:text-lg font-semibold">
              Indian civilisation celebrates not those who never fall, but those who rise repeatedly.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white border border-slate-200 rounded-xl hover:border-brand-red/40 transition-colors duration-200 hover:shadow-md">
                <h5 className="font-bold text-lg text-navy-950">Mahatma Gandhi</h5>
                <p className="text-sm text-slate-500 mt-2">faced failures before success.</p>
              </div>
              <div className="text-center p-6 bg-white border border-slate-200 rounded-xl hover:border-brand-red/40 transition-colors duration-200 hover:shadow-md">
                <h5 className="font-bold text-lg text-navy-950">B. R. Ambedkar</h5>
                <p className="text-sm text-slate-500 mt-2">overcame immense adversity.</p>
              </div>
              <div className="text-center p-6 bg-white border border-slate-200 rounded-xl hover:border-brand-red/40 transition-colors duration-200 hover:shadow-md">
                <h5 className="font-bold text-lg text-navy-950">Sarojini Naidu</h5>
                <p className="text-sm text-slate-500 mt-2">transformed setbacks into achievements.</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 text-center italic">
              Their journeys were not about privilege; they were about <strong className="text-brand-red not-italic">persistence</strong>.
            </p>
          </motion.div>

        </div>
      </section>
      {/* 3. PANDA WISDOM: Interactive biological facts to UPSC lessons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="panda-wisdom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold text-brand-red tracking-widest uppercase">The Biology of Success</span>
          <h2 className="text-3xl font-display font-bold text-navy-950 mt-2">
            The Calm Panda Blueprint: Adapting Nature's Most Disciplined Instincts
          </h2>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed">
            At PANDA IAS, we believe in the power of calm determination and disciplined consistency. Click any trait below to see its UPSC lesson:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Selector Tabs column */}
          <div className="lg:col-span-4 flex flex-col space-y-3 justify-center" id="traits-selection-column">
            {SURVIVAL_TRAITS.map((trait) => {
              const isActive = selectedTrait === trait.id;
              return (
                <motion.button
                  key={trait.id}
                  id={`trait-btn-${trait.id}`}
                  onClick={() => setSelectedTrait(trait.id)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-4.5 rounded-xl border transition-all duration-200 flex items-center space-x-4 cursor-pointer focus:outline-hidden ${
                    isActive
                      ? "border-brand-red bg-navy-900 text-white shadow-md ring-1 ring-brand-red"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className={`p-2.5 rounded-md ${isActive ? "bg-brand-red text-white" : "bg-navy-50 text-navy-700"}`} id={`trait-icon-bg-${trait.id}`}>
                    {getTraitIcon(trait.iconName, "w-5 h-5")}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold block ${isActive ? "text-white" : "text-navy-950"}`}>{trait.title}</h4>
                    <span className={`text-[11px] block font-mono ${isActive ? "text-slate-300" : "text-slate-500"}`}>{trait.tagline}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Interactive Viewer Card */}
          <div className="lg:col-span-8 bg-white border border-slate-200 p-8 sm:p-10 rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden" id="trait-interactive-viewer">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTrait}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Header inside viewer */}
                  <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
                    <div className="bg-navy-100 text-navy-900 p-3 rounded-full">
                      {getTraitIcon(currentTraitData.iconName, "w-6 h-6 text-navy-800")}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display text-navy-950">{currentTraitData.title}</h3>
                      <span className="text-xs font-mono font-medium text-navy-600 uppercase tracking-wider">{currentTraitData.tagline}</span>
                    </div>
                  </div>

                  {/* Biological Fact Block */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block font-sans">BIOLOGY SCIENTIFIC FACT</span>
                    <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 font-sans">
                      {currentTraitData.biologyFact}
                    </p>
                  </div>

                  {/* Aspirants Lesson Block */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono font-bold text-navy-500 uppercase tracking-widest block font-sans">THE CIVIL SERVANT LESSON</span>
                    <p className="text-navy-950 font-serif text-base font-normal leading-relaxed">
                      {currentTraitData.aspirantLesson}
                    </p>
                  </div>
                </div>

                {/* Supportive callout */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-4 font-sans">
                  <span className="text-slate-500 italic">No matter how competitive or intense the pressure feels, your capacity to survive is absolute.</span>
                  <button 
                    onClick={() => setActivePage("about")}
                    className="text-navy-700 hover:text-navy-900 font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Read more survivor hacks</span>
                    <CaretRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 5. COURSE TRIAL BANNER: High Handholding, Transparent trial packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24" id="trial-section">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold text-brand-red tracking-widest uppercase">The Companion Academy</span>
          <h2 className="text-3xl font-display font-bold text-navy-950 mt-2">
            Something big is coming soon.
          </h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            We don't sell 2-year upfront packages. We don't employ aggressive counsellors who pester you. We are building companion modules designed to hold your hand through every stage of UPSC preparation.
          </p>
        </div>

        {/* Emotional anchor section */}
        <div className="mt-16 bg-navy-900 text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden shadow-lg border border-navy-950 text-center space-y-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-display font-medium text-navy-100">
              Remember: We are not another coaching academy. <br/>We are trying to set a trend.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              "We have made sure our prices correspond to what a regular student pays for tea or a simple pencil daily. If this platform resolves your conceptual gridlocks, we will guide you forward with absolute fairness. If you are unsatisfied, your hand-holding fees are returned with a thank you note."
            </p>
            <div className="flex items-center justify-center space-x-2 text-xs font-mono text-navy-300">
              <ShieldCheck className="w-4 h-4" />
              <span>Full compliance, zero locked-in terms, no pushy sales.</span>
            </div>
          </div>
        </div>

      </section>

      {/* India Map Section */}
      <IndiaMapSection />

      {/* 4. SURVIVOR RESILIENCE QUIZ (Interactive, High Gamification) */}
      <section className="bg-slate-100 border-y border-slate-200 py-16" id="quiz-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold text-brand-red tracking-widest uppercase">KNOW YOUR SELF</span>
            <h2 className="text-3xl font-display font-medium text-navy-950 mt-1">UPSC Survivor Integrity Quiz</h2>
            <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
              How do you respond when the pressure mounts, PGs get cold, and mock scores deviate? Find your real administrative survival quotient below.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 sm:p-8 overflow-hidden" id="quiz-box-container">
            <AnimatePresence mode="wait">
              {!quizFinished ? (
                <motion.div
                  key={`q-${currentQuizIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  
                  {/* Indicator tracker */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>QUESTION {currentQuizIndex + 1} OF {SURVIVOR_QUIZ_QUESTIONS.length}</span>
                    <div className="flex space-x-1">
                      {SURVIVOR_QUIZ_QUESTIONS.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-4 h-1 rounded-full transition-all duration-300 ${idx <= currentQuizIndex ? "bg-navy-700" : "bg-slate-200"}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question */}
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-navy-950 leading-snug">
                    {SURVIVOR_QUIZ_QUESTIONS[currentQuizIndex].question}
                  </h3>

                  {/* Options list */}
                  <div className="space-y-3 pt-2">
                    {SURVIVOR_QUIZ_QUESTIONS[currentQuizIndex].options.map((option, oIdx) => (
                      <motion.button
                        key={oIdx}
                        id={`quiz-option-${currentQuizIndex}-${oIdx}`}
                        onClick={() => handleQuizAnswer(option.point)}
                        whileHover={{ scale: 1.01, x: 2 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.1 }}
                        className="w-full text-left p-4 rounded-xl border border-slate-200 bg-white hover:border-navy-400 hover:bg-navy-50/40 text-xs sm:text-sm text-slate-700 font-medium transition-colors duration-200 cursor-pointer flex items-start space-x-3"
                      >
                        <span className="bg-slate-100 group-hover:bg-navy-100 text-slate-700 text-xs font-mono w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold mt-0.5">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{option.text}</span>
                      </motion.button>
                    ))}
                  </div>

                </motion.div>
              ) : (
                // Quiz completion state
                <motion.div
                  key="quiz-finished"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-6 space-y-6"
                >
                  <div className="inline-flex bg-navy-50 text-navy-800 p-4 rounded-full justify-center animate-bounce">
                    <Handshake className="w-10 h-10" />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-navy-950">
                    Quiz Complete: You are a True Survivor.
                  </h3>
                  
                  <div className="max-w-xl mx-auto space-y-4 bg-slate-50/70 p-5 rounded-xl border border-slate-100 text-left">
                    <h4 className="text-xs font-mono font-bold text-navy-700 uppercase tracking-wider block font-sans">Your Cumulative Companion Analysis:</h4>
                    <ul className="space-y-2 text-xs text-slate-600 font-sans">
                      {quizScore.map((result, rIdx) => (
                        <li key={rIdx} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>Question {rIdx + 1}:</strong> {result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-sm text-slate-500 max-w-lg mx-auto font-sans">
                    Remember: No mental state is permanent. Fear and anxiety are normal. We are here to companion you so you don't feel alone in the dark room. We can review your daily schedules, study maps, or answers for free.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 font-sans">
                    <button
                      onClick={resetQuiz}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold hover:bg-slate-50 cursor-pointer text-slate-600"
                      id="quiz-reset-btn"
                    >
                      Take Quiz Again
                    </button>
                    <button
                      onClick={() => setActivePage("contact")}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 shadow-md cursor-pointer"
                      id="quiz-advisor-btn"
                    >
                      Schedule Free Mental Health Check-in
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>



      {/* 6. REALISTIC DOCK / TRIAL MODAL */}
      <AnimatePresence>
        {activeTrialCourse && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="bg-white rounded-2xl max-w-md w-full border border-slate-200 overflow-hidden shadow-2xl relative"
            >
              
              {/* Close button */}
              <button 
                onClick={closeTrialModal}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                id="close-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                {!trialCompleted ? (
                  // Trial checkout form
                  <motion.form 
                    key="modal-form"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={submitTrialForm} 
                    className="p-6 sm:p-8 space-y-5"
                  >
                    <div className="inline-flex bg-navy-50 text-navy-800 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase border border-navy-100">
                      Secure Companion Activation
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-display font-bold text-navy-950">
                        Reserve Spot for {activeTrialCourse.id === "gs-foundation-trial" ? "Concept Mastery" : activeTrialCourse.id === "editorial-linkage-trial" ? "Analytical Linkages" : "Ethics & Essay Companion"}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 font-sans">
                        This module is currently being finalized. Pre-register today for ₹0. You will only pay ₹{activeTrialCourse.trialPrice} when the cohort is officially launched.
                      </p>
                    </div>

                    <div className="border border-slate-100 bg-slate-50 p-3.5 rounded-lg space-y-1.5 text-xs text-slate-600 font-sans">
                      <div className="flex justify-between font-bold">
                        <span>{activeTrialCourse.title} (Cohort Trial)</span>
                        <span className="text-brand-red">₹0 (Pay ₹{activeTrialCourse.trialPrice} on Launch)</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium">Includes direct 1:1 ex-aspirant evaluation and companionship access.</p>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-3.5 font-sans">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Your Aspirant Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={trialForm.name}
                          onChange={(e) => setTrialForm({...trialForm, name: e.target.value})}
                          className="w-full text-xs p-3 rounded-lg border border-slate-200 outline-hidden focus:border-navy-600 focus:ring-1 focus:ring-navy-600 font-sans"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block font-sans">Primary Email</label>
                        <input 
                          type="email" 
                          required
                          placeholder="e.g. rahul@gmail.com"
                          value={trialForm.email}
                          onChange={(e) => setTrialForm({...trialForm, email: e.target.value})}
                          className="w-full text-xs p-3 rounded-lg border border-slate-200 outline-hidden focus:border-navy-600 focus:ring-1 focus:ring-navy-600 font-sans"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block font-sans">WhatsApp / Call Number (For Notes & Daily Prompts)</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="e.g. +91 9988776655"
                          value={trialForm.phone}
                          onChange={(e) => setTrialForm({...trialForm, phone: e.target.value})}
                          className="w-full text-xs p-3 rounded-lg border border-slate-200 outline-hidden focus:border-navy-600 focus:ring-1 focus:ring-navy-600 font-sans"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block font-sans">Primary Study Base Hub</label>
                        <select 
                          value={trialForm.center}
                          onChange={(e) => setTrialForm({...trialForm, center: e.target.value})}
                          className="w-full text-xs p-3 rounded-lg border border-slate-200 outline-hidden focus:border-navy-600 focus:bg-white bg-slate-50 font-sans"
                        >
                          <option value="Major Metro Hub">Major Metro Study Hub</option>
                          <option value="State Capital Hub">State Capital Hub</option>
                          <option value="District Level Hub">District Level Hub</option>
                          <option value="Preparing from Home Store">Preparing from Home / Self-Study</option>
                        </select>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      id="submit-model-btn"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full bg-brand-red hover:bg-brand-red-hover text-white font-semibold text-xs py-3.5 rounded-lg text-center uppercase tracking-wider shadow-md transition duration-150 cursor-pointer"
                    >
                      Confirm Free Pre-Registration
                    </motion.button>
                  </motion.form>
                ) : (
                  // Success state
                  <motion.div 
                    key="modal-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="p-8 text-center space-y-5"
                  >
                    <div className="inline-flex bg-emerald-50 text-emerald-800 p-3.5 rounded-full animate-bounce">
                      <Check className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-xl font-display font-bold text-navy-950">
                      Spot Reserved, {trialForm.name}!
                    </h3>
                    
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      We have registered your pre-registration details. A senior ex-aspirant companion will reach out via WhatsApp <strong>(+91-{trialForm.phone})</strong> as soon as this cohort goes live to send over early-access study maps and reserve your space.
                    </p>

                    <div className="bg-slate-50 p-4 border border-emerald-100 rounded-xl space-y-1 text-xs text-left text-slate-600 font-sans">
                      <span className="font-bold text-navy-900 block font-mono text-[9px] uppercase text-emerald-800">COVENANT PACT</span>
                      <p className="text-[11px] leading-relaxed">
                        "Remember, selection is not won by panic, but by showing up with disciplined consistency. You are entering this platform as a student building quiet resilience, but you will leave it as an administrator ready to serve this nation with excellence."
                      </p>
                    </div>

                    <motion.button
                      onClick={closeTrialModal}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-navy-950 hover:bg-navy-900 text-white font-semibold text-xs py-3 rounded-lg text-center uppercase tracking-wider transition cursor-pointer font-sans"
                      id="cohort-finish-btn"
                    >
                      Enter Classroom Portal
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
