import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft, BookOpen, ShieldCheck, Scales, FileText } from "@phosphor-icons/react";
import { motion } from "motion/react";
import NavigationTree from "../data/constitution/NavigationTree";
import ArticleDetail from "../data/constitution/ArticleDetail";
import ContextPanel from "../data/constitution/ContextPanel";
import MobileDrawer from "../data/constitution/MobileDrawer";
import { type FilterTag } from "@/lib/constitution-helpers";

interface ConstitutionExplorerPageProps {
  setActivePage?: (page: string) => void;
}

export default function ConstitutionExplorerPage({ setActivePage }: ConstitutionExplorerPageProps) {
  const [selectedArticleId, setSelectedArticleId] = useState<string>("article_1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<FilterTag>("all");
  const [, setSavedUpdateCount] = useState<number>(0);

  // Read article ID from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const art = params.get("article");
    if (art) {
      setSelectedArticleId(art);
    }
  }, []);

  const handleSelectArticle = useCallback((id: string) => {
    setSelectedArticleId(id);
    // Push state to URL without full page reload
    const newUrl = `${window.location.origin}${window.location.pathname}?article=${id}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  }, []);

  const handleSavedChange = useCallback(() => {
    setSavedUpdateCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    document.title = "Constitution Explorer | PandaIAS";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex flex-col min-h-[calc(100vh-80px)]"
      id="constitution-explorer-root"
    >
      {/* Top Header Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5 shrink-0">
        <div className="space-y-1">
          {setActivePage && (
            <button
              onClick={() => {
                // Clear URL param when leaving
                const newUrl = `${window.location.origin}${window.location.pathname}`;
                window.history.pushState({ path: newUrl }, "", newUrl);
                setActivePage("resources");
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-red uppercase tracking-wider transition-colors cursor-pointer group mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Resources</span>
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-brand-red-light text-brand-red rounded-lg border border-brand-red/10">
              <Scales className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-navy-950">
              Indian Constitution Explorer
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-3xl">
            A three-dimensional constitutional diagnostic workspace mapping Articles to their plain language meanings, landmark Supreme Court judgments, and direct UPSC syllabus priorities.
          </p>
        </div>
      </div>

      {/* Main Multi-Pane Workspace Container */}
      <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col md:flex-row min-h-[550px] lg:min-h-[650px] relative">
        
        {/* Left Pane (Zone A) - Navigation Tree Sidebar (Desktop only) */}
        <div className="hidden md:block w-[280px] lg:w-[320px] shrink-0 border-r border-slate-200">
          <NavigationTree
            selectedArticleId={selectedArticleId}
            onSelectArticle={handleSelectArticle}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Middle Pane (Zone B) - Scrollable Article Detail */}
        <div className="flex-1 overflow-y-auto bg-[#FAFAF9]">
          <ArticleDetail
            articleId={selectedArticleId}
            onSelectArticle={handleSelectArticle}
            onSavedChange={handleSavedChange}
          />
        </div>

        {/* Right Pane (Zone C) - Supreme Court Judgments & UPSC Questions (Large screens only) */}
        <div className="hidden lg:block w-[340px] shrink-0">
          <ContextPanel articleId={selectedArticleId} />
        </div>

      </div>

      {/* Mobile-only bottom floating navigation bar drawer */}
      <MobileDrawer
        selectedArticleId={selectedArticleId}
        onSelectArticle={handleSelectArticle}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
    </motion.div>
  );
}
