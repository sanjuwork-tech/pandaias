import React from "react";
import { BookOpen, Compass, Brain, ArrowRight, Sparkle, TrendUp, ShieldCheck, ListNumbers, Scales } from "@phosphor-icons/react";
import { motion } from "motion/react";

interface ResourcesProps {
  setActivePage: (page: string) => void;
}

export default function Resources({ setActivePage }: ResourcesProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16" 
      id="resources-root"
    >
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold text-brand-red tracking-widest uppercase bg-brand-red-light px-3.5 py-1 rounded-full border border-brand-red/10">
          PandaIAS Repository
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-navy-950">
          Our Advanced Resources & Tools
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
          We do not sell generic PDF books or copy-pasted compilations. We engineer interactive cognitive instruments, syllabus mapping engines, and deep question diagnostics to build your administrative persistence.
        </p>
      </div>

      {/* Interactive Resource Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
      >
        
        {/* Card 1: UPSC Syllabus Metro Map */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } }
          }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="card-blueprint bg-white border border-slate-200 p-8 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300 group"
        >
          <div className="space-y-5">
            <div className="w-12 h-12 bg-brand-red-light rounded-xl flex items-center justify-center text-brand-red border border-brand-red/10">
              <Compass className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider">Interactive Syllabus Atlas</span>
              <h3 className="text-xl font-display font-bold text-navy-950">
                UPSC Syllabus Metro Map
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                An interactive command centre mapping syllabus sections to microthemes, sources, exam priorities, and cognitive MCQ traps. Never read blindly again.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[11px] text-slate-500 leading-relaxed">
              <strong>Interactive Stations:</strong> Click any syllabus junction to expand detailed microtheme analysis, structural revision checklists, and ex-aspirant guidelines instantly.
            </div>
          </div>

          <button
            onClick={() => setActivePage("metro-map")}
            className="mt-8 bg-[#171717] hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl transition duration-150 flex items-center justify-center gap-2 cursor-pointer w-full shadow-xs"
          >
            <span>Launch Syllabus Map</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Card 2: UPSC Prelims PYQ Analysis */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } }
          }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="card-blueprint bg-white border border-slate-200 p-8 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300 group"
        >
          <div className="space-y-5">
            <div className="w-12 h-12 bg-brand-red-light rounded-xl flex items-center justify-center text-brand-red border border-brand-red/10">
              <Brain className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider">Question Diagnosis Engine</span>
              <h3 className="text-xl font-display font-bold text-navy-950">
                UPSC Prelims PYQ Analysis
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                A granular database covering 12 years (2014-2025) and 1,197+ questions decoded by cognitive demands, logical trap patterns, and step-by-step diagnostic workflows.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[11px] text-slate-500 leading-relaxed">
              <strong>Pattern Analytics:</strong> Fully filterable dashboard displaying subject distributions, extreme keyword frequency stats, and cognitive demand charts.
            </div>
          </div>

          <button
            onClick={() => setActivePage("pyq-analysis")}
            className="mt-8 bg-[#171717] hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl transition duration-150 flex items-center justify-center gap-2 cursor-pointer w-full shadow-xs"
          >
            <span>Analyze Prelims Patterns</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Card 3: UPSC Mains PYQ Analysis */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } }
          }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="card-blueprint bg-white border border-slate-200 p-8 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300 group"
        >
          <div className="space-y-5">
            <div className="w-12 h-12 bg-brand-red-light rounded-xl flex items-center justify-center text-brand-red border border-brand-red/10">
              <TrendUp className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider">Subjective Weightage Tracker</span>
              <h3 className="text-xl font-display font-bold text-navy-950">
                UPSC Mains PYQ Analysis
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                A structured weightage grid crossing 13 years (2013-2025) of subjective questions mapped directly to official syllabus themes. Find exactly where questions strike.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[11px] text-slate-500 leading-relaxed">
              <strong>Interactive Heatmap:</strong> Drill down by GS Papers 1, 2, 3, and 4 horizontally, filter syllabus items dynamically, and view microtheme priority distribution trends.
            </div>
          </div>

          <button
            onClick={() => setActivePage("mains-pyq")}
            className="mt-8 bg-[#171717] hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl transition duration-150 flex items-center justify-center gap-2 cursor-pointer w-full shadow-xs"
          >
            <span>Analyze Subjective Trends</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Card 4: UPSC Mains Panda Answers */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } }
          }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="card-blueprint bg-white border border-slate-200 p-8 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300 group"
        >
          <div className="space-y-5">
            <div className="w-12 h-12 bg-brand-red-light rounded-xl flex items-center justify-center text-brand-red border border-brand-red/10">
              <ShieldCheck className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider">High Scoring Blueprints</span>
              <h3 className="text-xl font-display font-bold text-navy-950">
                UPSC Mains Panda Answers
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Step-by-step expert solutions covering UPSC GS Mains questions. Analyze the structural flow, logical layout, data insertions, and high-impact conclusions.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[11px] text-slate-500 leading-relaxed">
              <strong>Answer Structure:</strong> Inspect complete answers in an interactive sidebar panel mapped specifically to syllabus tags, microthemes, and core priorities.
            </div>
          </div>

          <button
            onClick={() => setActivePage("mains-panda-answers")}
            className="mt-8 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl transition duration-150 flex items-center justify-center gap-2 cursor-pointer w-full shadow-md"
          >
            <span>Explore Panda Answers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Card 5: UPSC Mains Theme Wise Analysis */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } }
          }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="card-blueprint bg-white border border-slate-200 p-8 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300 group"
        >
          <div className="space-y-5">
            <div className="w-12 h-12 bg-brand-red-light rounded-xl flex items-center justify-center text-brand-red border border-brand-red/10">
              <ListNumbers className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider">Syllabus Mapping Engine</span>
              <h3 className="text-xl font-display font-bold text-navy-950">
                UPSC Mains Theme Wise Analysis
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Subjective questions grouped by GS Papers (GS1-GS4), subjects, topics, and microthemes. Understand the exact syllabus linkage and priority areas.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[11px] text-slate-500 leading-relaxed">
              <strong>Interactive Grid:</strong> Drill down into microthemes, filter by year and marks, and identify recurrent trends across a decade of Mains examinations.
            </div>
          </div>

          <button
            onClick={() => setActivePage("mains-theme-analysis")}
            className="mt-8 bg-[#171717] hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl transition duration-150 flex items-center justify-center gap-2 cursor-pointer w-full shadow-xs"
          >
            <span>Analyze Subjective Themes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Card 6: Constitution Explorer */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } }
          }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="card-blueprint bg-white border border-slate-200 p-8 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300 group"
        >
          <div className="space-y-5">
            <div className="w-12 h-12 bg-brand-red-light rounded-xl flex items-center justify-center text-brand-red border border-brand-red/10">
              <Scales className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider font-bold">Article Diagnostic Workspace</span>
              <h3 className="text-xl font-display font-bold text-navy-950">
                Indian Constitution Explorer
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                A multi-dimensional workspace mapping Articles to plain language meanings, landmark Supreme Court judgments, and direct UPSC syllabus priorities.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[11px] text-slate-500 leading-relaxed">
              <strong>Three-Pane Layout:</strong> Interactive navigation tree, complete article breakdown, and landmark judicial case/UPSC question linkages.
            </div>
          </div>

          <button
            onClick={() => setActivePage("constitution-explorer")}
            className="mt-8 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl transition duration-150 flex items-center justify-center gap-2 cursor-pointer w-full shadow-md animate-pulse"
          >
            <span>Explore Constitution</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </motion.div>

      {/* Promising Companion Banner */}
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/50 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="p-3 bg-brand-red-light text-brand-red rounded-full shrink-0 border border-brand-red/10">
          <Sparkle className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-navy-950">PandaIAS Support Integrity</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            All primary mapping tools and analytical platforms remain completely open-access and free. No paywalls, no popups, and no advertising. We stand with you as companions through the journey.
          </p>
        </div>
      </div>

    </motion.div>
  );
}
