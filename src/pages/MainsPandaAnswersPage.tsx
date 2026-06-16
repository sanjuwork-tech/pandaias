import React, { useState, useMemo, useEffect } from "react";
import { ArrowLeft, MagnifyingGlass, BookOpen, Clock, Tag, X, ListNumbers, ShieldCheck, Sparkle, Trophy } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import raw2023 from "../data/PandaMainsAnswers/2023GS.json";
import raw2024 from "../data/PandaMainsAnswers/2024GS.json";
import raw2025 from "../data/PandaMainsAnswers/2025gs.json";

interface AnswerSection {
  section_id: number;
  type: "introduction" | "heading" | "sub_heading" | "conclusion" | string;
  heading_text: string | null;
  heading_color: string | null;
  content: string | null;
  items?: string[];
}

interface PandaAnswerItem {
  resource_type: string;
  platform: string;
  question: {
    text: string;
    year: number;
    paper: string;
    marks: number;
    word_limit: number;
    syllabus_tags: string[];
  };
  answer: AnswerSection[];
}

const pandaAnswersData = [
  ...(raw2025 as PandaAnswerItem[]),
  ...(raw2024 as PandaAnswerItem[]),
  ...(raw2023 as PandaAnswerItem[])
];

interface MainsPandaAnswersPageProps {
  setActivePage?: (page: string) => void;
}

export default function MainsPandaAnswersPage({ setActivePage }: MainsPandaAnswersPageProps) {
  const [selectedPaper, setSelectedPaper] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedQuestion, setSelectedQuestion] = useState<PandaAnswerItem | null>(null);

  // Set document title
  useEffect(() => {
    document.title = "UPSC Mains Panda Answers | PandaIAS";
  }, []);

  // Compute unique filters dynamically
  const uniquePapers = useMemo(() => {
    const papers = pandaAnswersData.map(item => item.question.paper);
    return ["All", ...Array.from(new Set(papers))];
  }, []);

  const uniqueTags = useMemo(() => {
    const tags = pandaAnswersData.flatMap(item => item.question.syllabus_tags);
    return ["All", ...Array.from(new Set(tags))];
  }, []);

  const uniqueYears = useMemo(() => {
    const years = pandaAnswersData.map(item => String(item.question.year));
    const sortedYears = Array.from(new Set(years)).sort((a, b) => Number(b) - Number(a));
    return ["All", ...sortedYears];
  }, []);

  // Filtered items based on search and selects
  const filteredQuestions = useMemo(() => {
    return pandaAnswersData.filter((item) => {
      const matchPaper = selectedPaper === "All" || item.question.paper === selectedPaper;
      const matchTag = selectedTag === "All" || item.question.syllabus_tags.includes(selectedTag);
      const matchYear = selectedYear === "All" || String(item.question.year) === selectedYear;
      
      const textToSearch = `${item.question.text} ${item.question.syllabus_tags.join(" ")}`.toLowerCase();
      const matchSearch = !searchQuery.trim() || textToSearch.includes(searchQuery.toLowerCase());
      
      return matchPaper && matchTag && matchYear && matchSearch;
    });
  }, [selectedPaper, selectedTag, selectedYear, searchQuery]);

  // Statistics summaries
  const stats = useMemo(() => {
    const totalCount = pandaAnswersData.length;
    const papersCount = uniquePapers.length - 1; // Subtract "All"
    const tagsCount = uniqueTags.length - 1; // Subtract "All"
    const avgMarks = pandaAnswersData.reduce((acc, curr) => acc + curr.question.marks, 0) / (totalCount || 1);

    return {
      totalCount,
      papersCount,
      tagsCount,
      avgMarks: avgMarks.toFixed(0)
    };
  }, [uniquePapers, uniqueTags]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 relative"
      id="mains-panda-answers-root"
    >
      {/* Header section with Back Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          {setActivePage && (
            <button
              onClick={() => setActivePage("resources")}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-red uppercase tracking-wider transition-colors cursor-pointer group mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Resources</span>
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-brand-red-light text-brand-red rounded-lg border border-brand-red/10">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-navy-950">
              UPSC Mains Panda Answers
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl">
            Read high-scoring answer blueprints for UPSC GS Mains questions. Review structure, introduction techniques, multi-dimensional body points, and progressive conclusions mapped to specific syllabus tags.
          </p>
        </div>
      </div>

      {/* Summary KPI Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 p-5 rounded-xl flex items-center gap-4 shadow-xs card-blueprint">
          <div className="p-3 bg-brand-red-light text-brand-red rounded-xl shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Panda Answers</span>
            <span className="text-2xl font-display font-bold text-navy-950 font-mono mt-0.5 block">
              {stats.totalCount}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 p-5 rounded-xl flex items-center gap-4 shadow-xs card-blueprint">
          <div className="p-3 bg-brand-red-light text-brand-red rounded-xl shrink-0">
            <ListNumbers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">GS Papers</span>
            <span className="text-2xl font-display font-bold text-navy-950 font-mono mt-0.5 block">
              {stats.papersCount}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 p-5 rounded-xl flex items-center gap-4 shadow-xs card-blueprint">
          <div className="p-3 bg-brand-red-light text-brand-red rounded-xl shrink-0">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Syllabus Themes</span>
            <span className="text-2xl font-display font-bold text-navy-950 font-mono mt-0.5 block">
              {stats.tagsCount}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 p-5 rounded-xl flex items-center gap-4 shadow-xs card-blueprint">
          <div className="p-3 bg-brand-red-light text-brand-red rounded-xl shrink-0">
            <Sparkle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Target Marks</span>
            <span className="text-2xl font-display font-bold text-navy-950 font-mono mt-0.5 block">
              10 & 15 M
            </span>
          </div>
        </div>
      </div>

      {/* Advanced Filter controls */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search bar */}
          <div className="w-full md:flex-1 relative flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
            <MagnifyingGlass className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
            <input
              type="text"
              placeholder="Search by keywords inside questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 p-0 text-sm focus:outline-hidden text-slate-800 placeholder-slate-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-slate-400 hover:text-slate-600 bg-slate-200/50 hover:bg-slate-200/80 px-2 py-0.5 rounded-md font-bold transition-all shrink-0 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Selector elements */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {/* GS Paper Select */}
            <div className="flex flex-col min-w-[120px] grow md:grow-0">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">GS Paper</label>
              <select
                value={selectedPaper}
                onChange={(e) => setSelectedPaper(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden hover:border-slate-300"
              >
                {uniquePapers.map(paper => (
                  <option key={paper} value={paper}>{paper === "All" ? "All Papers" : paper}</option>
                ))}
              </select>
            </div>

            {/* Tag Select */}
            <div className="flex flex-col min-w-[150px] grow md:grow-0">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Syllabus Tag</label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden hover:border-slate-300"
              >
                {uniqueTags.map(tag => (
                  <option key={tag} value={tag}>{tag === "All" ? "All Tags" : tag}</option>
                ))}
              </select>
            </div>

            {/* Year Select */}
            <div className="flex flex-col min-w-[100px] grow md:grow-0">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Exam Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden hover:border-slate-300"
              >
                {uniqueYears.map(yr => (
                  <option key={yr} value={yr}>{yr === "All" ? "All Years" : yr}</option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Main content area - Cards list grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="mains-panda-answers-list">
        {filteredQuestions.length === 0 ? (
          <div className="col-span-full bg-white border border-slate-200/80 rounded-xl p-12 text-center text-sm text-slate-400 font-medium">
            No Panda Answers match your filters. Reset search query or selection filters to browse all items.
          </div>
        ) : (
          filteredQuestions.map((item, idx) => (
            <motion.div
              layoutId={`q-card-${idx}`}
              key={item.question.text + idx}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300 relative card-blueprint"
            >
              <div className="space-y-4">
                {/* Metatags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-brand-red-light text-brand-red border border-brand-red/10 px-2 py-0.5 rounded-sm">
                    {item.question.paper}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-sm">
                    Mains {item.question.year}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-sm">
                    {item.question.marks} Marks
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-sm">
                    {item.question.word_limit} Words
                  </span>
                </div>

                {/* Question title */}
                <h3 className="text-sm font-bold text-navy-950 leading-relaxed font-sans line-clamp-4">
                  {item.question.text}
                </h3>
              </div>

              {/* Action and syllabus tags at bottom */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1">
                  {item.question.syllabus_tags.map(tag => (
                    <span key={tag} className="text-[9px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => setSelectedQuestion(item)}
                  className="bg-navy-900 hover:bg-black text-white text-[11px] font-bold uppercase tracking-wider py-2 px-3.5 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Panda Answer
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Right Sidebar Drawer - Slide in Answer details */}
      <AnimatePresence>
        {selectedQuestion && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedQuestion(null)}
              className="fixed inset-0 z-100 bg-black/45 backdrop-blur-xs transition-opacity"
            />

            {/* Sidebar drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="fixed inset-y-0 right-0 z-101 w-full md:w-[650px] bg-white shadow-2xl flex flex-col h-full border-l border-slate-200"
              id="panda-answer-drawer"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50/70">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-brand-red-light text-brand-red border border-brand-red/10 px-2 py-0.5 rounded-sm">
                      {selectedQuestion.question.paper}
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-sm">
                      {selectedQuestion.question.year}
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-sm">
                      {selectedQuestion.question.marks} Marks
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-sm">
                      {selectedQuestion.question.word_limit} Words
                    </span>
                  </div>
                  <h2 className="text-sm font-bold text-navy-950 font-sans leading-relaxed">
                    {selectedQuestion.question.text}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/60 cursor-pointer shrink-0 transition-colors"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer scrollable content body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Metainfo card */}
                <div className="flex flex-wrap gap-1.5 items-center pb-4 border-b border-slate-100 text-slate-500">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px] font-bold uppercase tracking-wider mr-1">Syllabus Mapping:</span>
                  {selectedQuestion.question.syllabus_tags.map(tag => (
                    <span key={tag} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-200/50">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Structured panda answer content sections */}
                <div className="space-y-6">
                  {selectedQuestion.answer.map((sec) => {
                    switch (sec.type) {
                      case "introduction":
                        return (
                          <div 
                            key={sec.section_id} 
                            className="p-4 bg-slate-50/60 border-l-4 border-brand-red rounded-r-xl border border-y-slate-200/50 border-r-slate-200/50"
                          >
                            <span className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider block mb-1">
                              Introduction
                            </span>
                            <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                              {sec.content}
                            </p>
                          </div>
                        );

                      case "heading":
                        return (
                          <h3
                            key={sec.section_id}
                            className="text-xs font-bold font-display tracking-wider uppercase pt-3 pb-1 border-b border-slate-100"
                            style={{ color: sec.heading_color ? `#${sec.heading_color}` : "var(--color-navy-950)" }}
                          >
                            {sec.heading_text}
                          </h3>
                        );

                      case "sub_heading":
                        return (
                          <div key={sec.section_id} className="space-y-2 pl-0.5">
                            {sec.heading_text && (
                              <h4 className="text-xs font-bold text-navy-900 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-red/60 shrink-0" />
                                {sec.heading_text}
                              </h4>
                            )}
                            {sec.content && (
                              <p className="text-xs text-slate-600 leading-relaxed pl-3">
                                {sec.content}
                              </p>
                            )}
                            {sec.items && sec.items.length > 0 && (
                              <ul className="list-disc pl-7 space-y-1.5 text-xs text-slate-600 leading-relaxed">
                                {sec.items.map((item, itemIdx) => (
                                  <li key={itemIdx} className="marker:text-brand-red/50 pl-0.5">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );

                      case "conclusion":
                        return (
                          <div 
                            key={sec.section_id} 
                            className="p-4 bg-brand-red-light/50 border border-brand-red/10 rounded-xl space-y-1"
                          >
                            <span className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider block">
                              Conclusion
                            </span>
                            <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                              {sec.content}
                            </p>
                          </div>
                        );

                      default:
                        // General fallback
                        return (
                          <div key={sec.section_id} className="space-y-2">
                            {sec.heading_text && (
                              <h4 className="text-xs font-bold text-navy-900">{sec.heading_text}</h4>
                            )}
                            {sec.content && (
                              <p className="text-xs text-slate-600 leading-relaxed">{sec.content}</p>
                            )}
                            {sec.items && sec.items.length > 0 && (
                              <ul className="list-disc pl-6 space-y-1 text-xs text-slate-600">
                                {sec.items.map((item, itemIdx) => (
                                  <li key={itemIdx}>{item}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                    }
                  })}
                </div>

              </div>

              {/* Drawer footer information block */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 text-[10px] text-center text-slate-400 font-medium font-mono">
                PANDA IAS • SOURCE: PANDAMANSWERS
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
