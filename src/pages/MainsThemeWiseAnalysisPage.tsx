import React, { useState, useMemo, useEffect } from "react";
import { ArrowLeft, MagnifyingGlass, BookOpen, Clock, Tag, ListNumbers, ShieldCheck, Sparkle, Trophy } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import gs1Data from "../data/Mainsthemewiseanalysis/GS1.json";
import gs2Data from "../data/Mainsthemewiseanalysis/GS2.json";
import gs3Data from "../data/Mainsthemewiseanalysis/GS3.json";
import gs4Data from "../data/Mainsthemewiseanalysis/GS4.json";

interface PYQQuestionItem {
  Subject: string;
  Topic: string;
  Microtheme: string;
  Question: string;
  Year: string | number;
  Marks: string | number;
}

const paperDataMap: Record<string, PYQQuestionItem[]> = {
  "GS 1": gs1Data as PYQQuestionItem[],
  "GS 2": gs2Data as PYQQuestionItem[],
  "GS 3": gs3Data as PYQQuestionItem[],
  "GS 4": gs4Data as PYQQuestionItem[]
};

const GS_PAPERS = [
  { id: "GS 1", name: "GS Paper 1", desc: "History, Geography & Society" },
  { id: "GS 2", name: "GS Paper 2", desc: "Polity, Governance & IR" },
  { id: "GS 3", name: "GS Paper 3", desc: "Economy, S&T, Environment & Security" },
  { id: "GS 4", name: "GS Paper 4", desc: "Ethics, Integrity & Aptitude" }
];

interface MainsThemeWiseAnalysisPageProps {
  setActivePage?: (page: string) => void;
}

export default function MainsThemeWiseAnalysisPage({ setActivePage }: MainsThemeWiseAnalysisPageProps) {
  const [selectedPaper, setSelectedPaper] = useState<string>("GS 1");
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [selectedMicrotheme, setSelectedMicrotheme] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Set document title
  useEffect(() => {
    document.title = "UPSC Mains Theme Wise Analysis | PandaIAS";
  }, []);

  // Get current dataset based on selected paper
  const currentDataset = useMemo(() => {
    return paperDataMap[selectedPaper] || [];
  }, [selectedPaper]);

  // Reset filters when paper changes
  useEffect(() => {
    setSelectedSubject("All");
    setSelectedTopic("All");
    setSelectedMicrotheme("All");
    setSelectedYear("All");
    setSearchQuery("");
  }, [selectedPaper]);

  // Dynamically compute subjects based on selected paper
  const uniqueSubjects = useMemo(() => {
    const subjects = currentDataset.map(item => item.Subject).filter(Boolean);
    return ["All", ...Array.from(new Set(subjects))];
  }, [currentDataset]);

  // Dynamically compute topics based on paper & subject
  const uniqueTopics = useMemo(() => {
    let dataset = currentDataset;
    if (selectedSubject !== "All") {
      dataset = dataset.filter(item => item.Subject === selectedSubject);
    }
    const topics = dataset.map(item => item.Topic).filter(Boolean);
    return ["All", ...Array.from(new Set(topics))];
  }, [currentDataset, selectedSubject]);

  // Dynamically compute microthemes based on paper, subject & topic
  const uniqueMicrothemes = useMemo(() => {
    let dataset = currentDataset;
    if (selectedSubject !== "All") {
      dataset = dataset.filter(item => item.Subject === selectedSubject);
    }
    if (selectedTopic !== "All") {
      dataset = dataset.filter(item => item.Topic === selectedTopic);
    }
    const microthemes = dataset.map(item => item.Microtheme).filter(Boolean);
    return ["All", ...Array.from(new Set(microthemes))];
  }, [currentDataset, selectedSubject, selectedTopic]);

  // Dynamically compute years
  const uniqueYears = useMemo(() => {
    const years = currentDataset.map(item => String(item.Year)).filter(Boolean);
    // Sort years descending
    const sortedYears = Array.from(new Set(years)).sort((a, b) => Number(b) - Number(a));
    return ["All", ...sortedYears];
  }, [currentDataset]);

  // Filtered dataset
  const filteredDataset = useMemo(() => {
    return currentDataset.filter((item) => {
      const matchSubject = selectedSubject === "All" || item.Subject === selectedSubject;
      const matchTopic = selectedTopic === "All" || item.Topic === selectedTopic;
      const matchMicrotheme = selectedMicrotheme === "All" || item.Microtheme === selectedMicrotheme;
      const matchYear = selectedYear === "All" || String(item.Year) === selectedYear;

      const textToSearch = `${item.Question} ${item.Subject} ${item.Topic} ${item.Microtheme}`.toLowerCase();
      const matchSearch = !searchQuery.trim() || textToSearch.includes(searchQuery.toLowerCase());

      return matchSubject && matchTopic && matchMicrotheme && matchYear && matchSearch;
    });
  }, [currentDataset, selectedSubject, selectedTopic, selectedMicrotheme, selectedYear, searchQuery]);

  // KPI Statistics
  const stats = useMemo(() => {
    const totalQuestions = filteredDataset.length;
    const subjects = new Set(filteredDataset.map(item => item.Subject)).size;
    const microthemes = new Set(filteredDataset.map(item => item.Microtheme)).size;
    
    // Average marks
    const validMarks = filteredDataset.map(item => Number(item.Marks)).filter(n => !isNaN(n));
    const avgMarks = validMarks.length > 0 ? validMarks.reduce((a, b) => a + b, 0) / validMarks.length : 0;

    return {
      totalQuestions,
      subjects,
      microthemes,
      avgMarks: avgMarks.toFixed(1)
    };
  }, [filteredDataset]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"
      id="mains-theme-analysis-root"
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
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-navy-950">
              UPSC Mains PYQs Theme Wise Analysis
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl">
            Analyze UPSC General Studies Mains subjective questions sorted cleanly by Subject, Topic, and Microtheme. Use tabs to switch papers, filter by years, and find key core themes.
          </p>
        </div>
      </div>

      {/* Horizontal GS Paper Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {GS_PAPERS.map((paper) => {
          const isActive = selectedPaper === paper.id;
          return (
            <button
              key={paper.id}
              onClick={() => setSelectedPaper(paper.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-24 ${
                isActive
                  ? "bg-navy-900 border-navy-900 text-white shadow-md scale-[1.02]"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/50"
              }`}
            >
              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isActive ? "text-brand-red-light" : "text-brand-red"}`}>
                {paper.id}
              </span>
              <div>
                <h3 className="text-sm font-bold leading-tight line-clamp-1">{paper.name}</h3>
                <p className={`text-[10px] leading-tight mt-1 line-clamp-1 ${isActive ? "text-slate-300" : "text-slate-400"}`}>
                  {paper.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Summary KPI Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 p-5 rounded-xl flex items-center gap-4 shadow-xs card-blueprint">
          <div className="p-3 bg-brand-red-light text-brand-red rounded-xl shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Total Questions</span>
            <span className="text-2xl font-display font-bold text-navy-950 font-mono mt-0.5 block">
              {stats.totalQuestions}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 p-5 rounded-xl flex items-center gap-4 shadow-xs card-blueprint">
          <div className="p-3 bg-brand-red-light text-brand-red rounded-xl shrink-0">
            <ListNumbers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Covered Subjects</span>
            <span className="text-2xl font-display font-bold text-navy-950 font-mono mt-0.5 block">
              {stats.subjects}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 p-5 rounded-xl flex items-center gap-4 shadow-xs card-blueprint">
          <div className="p-3 bg-brand-red-light text-brand-red rounded-xl shrink-0">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Microthemes</span>
            <span className="text-2xl font-display font-bold text-navy-950 font-mono mt-0.5 block">
              {stats.microthemes}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 p-5 rounded-xl flex items-center gap-4 shadow-xs card-blueprint">
          <div className="p-3 bg-brand-red-light text-brand-red rounded-xl shrink-0">
            <Sparkle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Average Marks</span>
            <span className="text-2xl font-display font-bold text-navy-950 font-mono mt-0.5 block">
              {stats.avgMarks} M
            </span>
          </div>
        </div>
      </div>

      {/* Advanced filters card */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-4">
        
        {/* Search bar */}
        <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
          <MagnifyingGlass className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
          <input
            type="text"
            placeholder="Search by keywords inside question content..."
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

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Subject Filter */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Subject Area</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden hover:border-slate-300"
            >
              {uniqueSubjects.map(subj => (
                <option key={subj} value={subj}>{subj === "All" ? "All Subjects" : subj}</option>
              ))}
            </select>
          </div>

          {/* Topic Filter */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Syllabus Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden hover:border-slate-300"
            >
              {uniqueTopics.map(topic => (
                <option key={topic} value={topic}>{topic === "All" ? "All Topics" : topic}</option>
              ))}
            </select>
          </div>

          {/* Microtheme Filter */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Microtheme</label>
            <select
              value={selectedMicrotheme}
              onChange={(e) => setSelectedMicrotheme(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden hover:border-slate-300"
            >
              {uniqueMicrothemes.map(mt => (
                <option key={mt} value={mt}>{mt === "All" ? "All Microthemes" : mt}</option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="flex flex-col">
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

      {/* Questions grid list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="mains-theme-questions-list">
        {filteredDataset.length === 0 ? (
          <div className="col-span-full bg-white border border-slate-200/80 rounded-xl p-12 text-center text-sm text-slate-400 font-medium">
            No subjective questions match your filters. Try selecting other combinations or clearing the search query.
          </div>
        ) : (
          filteredDataset.map((item, idx) => (
            <motion.div
              layout
              key={item.Question + idx}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300 card-blueprint"
            >
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-brand-red-light text-brand-red border border-brand-red/10 px-2 py-0.5 rounded-sm">
                    {item.Subject}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-sm">
                    Year: {item.Year}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-sm">
                    {item.Marks} Marks
                  </span>
                </div>

                {/* Question Text */}
                <h3 className="text-sm font-semibold text-navy-950 leading-relaxed font-sans">
                  {item.Question}
                </h3>
              </div>

              {/* Topic and Microtheme mapping */}
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-start gap-1.5 text-[10px] text-slate-500 leading-normal">
                  <span className="font-bold text-navy-900 shrink-0">Topic:</span>
                  <span className="font-medium">{item.Topic}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <span className="font-bold text-navy-900">Microtheme:</span>
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                    {item.Microtheme}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

    </motion.div>
  );
}
