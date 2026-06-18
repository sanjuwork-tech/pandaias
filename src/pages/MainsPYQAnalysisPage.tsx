import React, { useState, useMemo, useEffect } from "react";
import { ArrowLeft, MagnifyingGlass, Sparkle, TrendUp, Info, ListNumbers, BookOpen } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import rawMainsData from "../data/upscmainspyqanalysis2013-2025.json";

interface MainsSyllabusItem {
  Syllabus: string;
  Values: (number | null)[];
}

interface MainsDataType {
  [key: string]: MainsSyllabusItem[];
}

const mainsData = rawMainsData as MainsDataType;

const GS_PAPERS = [
  { id: "GS 1", name: "GS Paper 1", desc: "History, Geography & Indian Society" },
  { id: "GS 2", name: "GS Paper 2", desc: "Governance, Constitution, Polity & IR" },
  { id: "GS 3", name: "GS Paper 3", desc: "Economy, S&T, Environment & Security" },
  { id: "GS 4", name: "GS Paper 4", desc: "Ethics, Integrity & Aptitude" }
];

const YEARS = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

interface MainsPYQAnalysisPageProps {
  setActivePage?: (page: string) => void;
}

export default function MainsPYQAnalysisPage({ setActivePage }: MainsPYQAnalysisPageProps) {
  const [selectedPaper, setSelectedPaper] = useState<string>("GS 1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Set document title and track analytics
  useEffect(() => {
    document.title = "UPSC Mains PYQ Weightage Analysis (2013-2025) | PandaIAS";
    
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [selectedPaper]);

  const rawItems = useMemo(() => {
    return mainsData[selectedPaper] || [];
  }, [selectedPaper]);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return rawItems;
    const query = searchQuery.toLowerCase();
    return rawItems.filter(item => 
      item.Syllabus.toLowerCase().includes(query)
    );
  }, [rawItems, searchQuery]);

  // Calculate stats for the selected GS paper
  const stats = useMemo(() => {
    const totalTopics = rawItems.length;
    let totalQuestions = 0;
    let maxWeightage = 0;
    let topTopicName = "None";

    rawItems.forEach(item => {
      // The 14th element (index 13) is the Total sum of that row in the JSON.
      const topicTotal = item.Values[13] || 0;
      totalQuestions += topicTotal;
      if (topicTotal > maxWeightage) {
        maxWeightage = topicTotal;
        topTopicName = item.Syllabus;
      }
    });

    const averagePerYear = YEARS.length > 0 ? (totalQuestions / YEARS.length).toFixed(1) : "0";

    // Clean up top topic name (remove numbering prefix if exists)
    const cleanedTopTopic = topTopicName !== "None" 
      ? topTopicName.replace(/^\d+[\.\s]*/, "").split(/[-,;]/)[0].trim()
      : "N/A";

    return {
      totalTopics,
      totalQuestions,
      cleanedTopTopic,
      maxWeightage,
      averagePerYear
    };
  }, [rawItems]);

  // Calculate relative weightage bar width
  const getMaxRowTotal = useMemo(() => {
    let max = 0;
    rawItems.forEach(item => {
      const topicTotal = item.Values[13] || 0;
      if (topicTotal > max) max = topicTotal;
    });
    return max || 1;
  }, [rawItems]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"
      id="mains-pyq-root"
    >
      {/* Header and Back Button */}
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
              <TrendUp className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-navy-950">
              UPSC Mains Subjective Weightage Analysis
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl">
            A precise cross-examination of 13 years (2013-2025) of General Studies subjective papers. Tap on GS papers horizontally to evaluate question density trends and target high-yield syllabus blocks.
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

      {/* Statistics Block */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Questions */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-xl flex items-center gap-4 shadow-xs card-blueprint">
          <div className="p-3 bg-brand-red-light text-brand-red rounded-xl shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Total Questions</span>
            <span className="text-2xl font-display font-bold text-navy-950 font-mono mt-0.5 block">
              {stats.totalQuestions}
            </span>
          </div>
        </div>

        {/* Stat 2: Syllabus Topics */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-xl flex items-center gap-4 shadow-xs card-blueprint">
          <div className="p-3 bg-brand-red-light text-brand-red rounded-xl shrink-0">
            <ListNumbers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Syllabus Themes</span>
            <span className="text-2xl font-display font-bold text-navy-950 font-mono mt-0.5 block">
              {stats.totalTopics}
            </span>
          </div>
        </div>

        {/* Stat 3: Average Questions/Year */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-xl flex items-center gap-4 shadow-xs card-blueprint">
          <div className="p-3 bg-brand-red-light text-brand-red rounded-xl shrink-0">
            <Sparkle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Avg Questions/Year</span>
            <span className="text-2xl font-display font-bold text-navy-950 font-mono mt-0.5 block">
              {stats.averagePerYear}
            </span>
          </div>
        </div>

        {/* Stat 4: Top Yielding Sub-topic */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-xl flex items-center gap-4 shadow-xs card-blueprint">
          <div className="p-3 bg-brand-red-light text-brand-red rounded-xl shrink-0">
            <TrendUp className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">High Yield Theme</span>
            <span className="text-sm font-bold text-navy-950 truncate mt-1 block">
              {stats.cleanedTopTopic}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Total Weight: {stats.maxWeightage} Qs
            </span>
          </div>
        </div>
      </div>

      {/* Main Table and Filter Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-3">
          <MagnifyingGlass className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search syllabus themes or microthemes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-0 p-0 text-sm focus:outline-hidden text-slate-800 placeholder-slate-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-slate-400 hover:text-slate-600 bg-slate-200/70 hover:bg-slate-200 px-2 py-0.5 rounded-md font-bold transition-all"
            >
              Clear
            </button>
          )}
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed min-w-[950px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4 w-[280px]">Syllabus Topic Description</th>
                {YEARS.map(year => (
                  <th key={year} className="py-4 px-2 text-center w-[45px] font-mono">{year}</th>
                ))}
                <th className="py-4 px-2 text-center w-[55px] font-mono">Total</th>
                <th className="py-4 px-3 text-left w-[120px]">Weightage Visual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, idx) => (
                    <tr key={`skeleton-${idx}`} className="animate-pulse border-b border-slate-100">
                      {/* Description placeholder */}
                      <td className="p-4 w-[280px]">
                        <div className="h-3.5 bg-slate-200 rounded-sm w-3/4 mb-2" />
                        <div className="h-3 bg-slate-100 rounded-sm w-1/2" />
                      </td>
                      {/* Year cells placeholder */}
                      {YEARS.map(year => (
                        <td key={year} className="py-4 px-2 text-center w-[45px]">
                          <div className="h-3 bg-slate-200 rounded-sm w-4 mx-auto" />
                        </td>
                      ))}
                      {/* Total cell placeholder */}
                      <td className="py-4 px-2 text-center w-[55px]">
                        <div className="h-3.5 bg-slate-200 rounded-sm w-5 mx-auto" />
                      </td>
                      {/* Weightage Visual placeholder */}
                      <td className="py-4 px-3 w-[120px]">
                        <div className="h-1.5 bg-slate-200 rounded-full w-full mb-1.5" />
                        <div className="h-2 bg-slate-100 rounded-sm w-12" />
                      </td>
                    </tr>
                  ))
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={YEARS.length + 3} className="p-8 text-center text-xs text-slate-400 font-medium">
                      No matching syllabus topics found for your search query.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item, idx) => {
                    const syllabusClean = item.Syllabus;
                    const rowTotal = item.Values[13] || 0;
                    const relativeWidth = Math.max(5, Math.min(100, (rowTotal / getMaxRowTotal) * 100));

                    return (
                      <tr 
                        key={syllabusClean + idx} 
                        className="hover:bg-slate-50/50 transition-colors group text-xs text-slate-700"
                      >
                        {/* Syllabus Description */}
                        <td className="p-4 align-top leading-relaxed font-sans font-medium text-navy-900">
                          {syllabusClean}
                        </td>

                        {/* Year Columns (index 0 to 12) */}
                        {YEARS.map((year, yearIdx) => {
                          const val = item.Values[yearIdx];
                          const isHigh = val !== null && val >= 3;
                          const isMedium = val !== null && val > 0 && val < 3;
                          const isZero = val === null || val === 0;

                          return (
                            <td 
                              key={year} 
                              className={`py-4 px-2 align-middle text-center font-mono font-semibold transition-all ${
                                isHigh 
                                  ? "bg-brand-red-light/80 text-brand-red text-xs font-bold" 
                                  : isMedium 
                                  ? "text-slate-700" 
                                  : "text-slate-300 font-normal"
                              }`}
                            >
                              {isZero ? "-" : val}
                            </td>
                          );
                        })}

                        {/* Total Column (index 13) */}
                        <td className="py-4 px-2 align-middle text-center font-mono font-bold text-navy-950 bg-slate-50/30">
                          {rowTotal}
                        </td>

                        {/* Relative Weightage Bar Visualizer */}
                        <td className="py-4 px-3 align-middle">
                          <div className="flex flex-col gap-1 w-full">
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 ${
                                  rowTotal >= 25 
                                    ? "bg-brand-red" 
                                    : rowTotal >= 15 
                                    ? "bg-brand-red/70" 
                                    : "bg-slate-400"
                                }`}
                                style={{ width: `${relativeWidth}%` }}
                              />
                            </div>
                            <span className="text-[9px] font-mono text-slate-400 leading-none">
                              {((rowTotal / stats.totalQuestions) * 100).toFixed(1)}% of Paper
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Legend Indicator Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-wrap gap-4 text-[10px] font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold">Legend:</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-brand-red-light border border-brand-red/10 rounded-sm" />
            <span>High Density (3+ Questions in Year)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-mono text-slate-700 font-bold">1</span>
            <span>Standard Count (1-2 Questions)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-mono text-slate-300">-</span>
            <span>Zero / Unasked in Year</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
