import React, { useEffect, useState, useMemo } from 'react';
import { ArrowRight, Briefcase, CheckCircle, Target } from '@phosphor-icons/react';
import SubjectStatCards from '../components/pyq/SubjectStatCards';
import SearchFilterBar from '../components/pyq/SearchFilterBar';
import PYQTable from '../components/pyq/PYQTable';
import PyqAnalyticsDashboard from '../components/pyq/PyqAnalyticsDashboard';
import { analysisData, totalStatistics, subjectColors, subjectNames } from '../data/pyq/analysisData';
import {
  yearQuestions, yearSubjectCounts, yearsReverse,
  droppedQuestionNotes, classifyCognitiveSkills,
  classifyTrapPatterns, extractSubTopics,
} from '../lib/pyq-analytics';
import { analyticsService } from '../services/analyticsService';

export default function PYQAnalysisPage() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTopicSubject, setSelectedTopicSubject] = useState('polity');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRows, setExpandedRows] = useState(new Set());

  const yearQuestionsList = useMemo(() => yearQuestions[selectedYear] || [], [selectedYear]);

  const crossYearResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results = [];
    for (let year = 2025; year >= 2014; year--) {
      const yearQs = yearQuestions[year] || [];
      yearQs.forEach((q) => {
        if (selectedSubject !== 'all' && q.subject !== selectedSubject) return;
        if (
          q.theme.toLowerCase().includes(query) ||
          q.whyAsked.toLowerCase().includes(query) ||
          q.language.toLowerCase().includes(query) ||
          q.diagnosis.toLowerCase().includes(query)
        ) {
          results.push({ ...q, year });
        }
      });
    }
    return results;
  }, [searchQuery, selectedSubject]);

  const isCrossYearSearch = searchQuery.trim().length > 0;

  const questions = yearQuestionsList.filter((q) => {
    if (selectedSubject !== 'all' && q.subject !== selectedSubject) return false;
    return true;
  });

  const displayQuestions = isCrossYearSearch ? crossYearResults : questions;

  const currentYearData = analysisData.find((y) => y.year === selectedYear) || analysisData[0];
  const currentStats = yearSubjectCounts[selectedYear] || currentYearData.statistics;

  const cognitiveSkills = useMemo(() => classifyCognitiveSkills(yearQuestionsList), [yearQuestionsList]);
  const trapPatternData = useMemo(() => classifyTrapPatterns(yearQuestionsList), [yearQuestionsList]);
  const subTopics = useMemo(() => extractSubTopics(yearQuestionsList, selectedTopicSubject), [yearQuestionsList, selectedTopicSubject]);

  const droppedNote = droppedQuestionNotes[selectedYear];
  const yearSummaryText = droppedNote
    ? `${currentYearData.totalQuestions} Valid Questions (${droppedNote})`
    : `${currentYearData.totalQuestions} Questions - No Dropped Questions`;

  const topSubjects = useMemo(() => (
    Object.entries(currentStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([subject, count]) => ({ subject, count, name: subjectNames[subject] || subject }))
  ), [currentStats]);

  const primarySkill = cognitiveSkills[0]?.skill || 'Pattern recognition';
  const primaryTrap = trapPatternData[0]?.type || 'Language traps';

  useEffect(() => {
    document.title = "UPSC Prelims PYQ Analysis 2014-2025 | PandaIAS";
    analyticsService.track('pyq_diagnosis_view', {
      year: selectedYear,
      subject: selectedSubject,
    });
  }, [selectedYear, selectedSubject]);

  const savePyqEvidence = async () => {
    await analyticsService.saveSkillEvidence({
      skill: primarySkill,
      evidence: `UPSC Prelims ${selectedYear}: ${topSubjects.map((item) => item.name).join(', ')} dominate the paper.`,
      source_year: selectedYear,
    }, 'pyq_analysis');
  };

  const toggleRow = (key) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const expandAll = () => {
    const allKeys = new Set(
      displayQuestions.map((q) =>
        isCrossYearSearch ? `${q.year}-${q.q}` : `${selectedYear}-${q.q}`
      )
    );
    setExpandedRows(allKeys);
  };

  const collapseAll = () => setExpandedRows(new Set());

  const resetFilters = () => {
    setSelectedSubject('all');
    setSearchQuery('');
    setExpandedRows(new Set());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-[#171717] text-white pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-mono text-xs tracking-widest text-brand-red uppercase mb-2">Free Companion Tool - No Login Required</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                UPSC Prelims PYQ Analysis | PandaIAS
              </h1>
              <p className="text-slate-400 mt-2 text-sm max-w-3xl leading-relaxed">
                Comprehensive Pattern Analysis {totalStatistics.yearRange} — {totalStatistics.totalQuestions} Questions Mapped by Cognitive Demands and Trap Patterns.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-sm text-slate-400 font-medium">Select Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(Number(e.target.value));
                  setExpandedRows(new Set());
                }}
                className="bg-white border-2 border-brand-red rounded-lg px-4 py-2 text-brand-red font-bold focus:ring-2 focus:ring-brand-red focus:outline-hidden cursor-pointer text-sm"
              >
                {yearsReverse.map((yearData) => (
                  <option key={yearData.year} value={yearData.year}>{yearData.year}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-8 pt-6 border-t border-slate-800 md:grid-cols-4">
            {[
              { label: 'Years Covered', value: '12' },
              { label: 'Questions Mapped', value: '1,197+' },
              { label: 'Subject Clusters', value: '8' },
              { label: 'Analysis Depth', value: 'Full Diagnosis' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="font-display text-xl font-bold text-white md:text-2xl">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">

        {/* Subject Stat Cards */}
        <SubjectStatCards
          currentStats={currentStats}
          selectedSubject={selectedSubject}
          onSelectSubject={setSelectedSubject}
        />

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs card-blueprint">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="mb-2 text-xs font-mono font-bold uppercase tracking-widest text-brand-red">Two-way diagnosis</p>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                What this paper says about your preparation
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                PYQs should not just show answers. They should tell you what to revise, what skill you are building,
                and how that evidence can enter your preparation logs.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {topSubjects.map((item) => (
                  <div key={item.subject} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-2xl font-bold text-[#171717]">{item.count}</div>
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-[#171717] p-5 text-white flex flex-col justify-between">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <Target className="h-6 w-6 text-brand-red animate-pulse" />
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Mentor note</h3>
                    <p className="text-xs text-slate-400">Generated from selected year and filters</p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
                  <li className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /> Your strongest visible skill signal is {primarySkill.toLowerCase()}.</li>
                  <li className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /> Watch for {primaryTrap.toLowerCase()} before attempting similar questions.</li>
                  <li className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /> We stand with you as companions to guide your study paths.</li>
                </ul>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={savePyqEvidence}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-red hover:bg-brand-red-hover px-4 py-3 text-xs font-bold text-white tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <Briefcase className="h-4 w-4" />
                  Log Skill Evidence
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
          onReset={resetFilters}
          isCrossYearSearch={isCrossYearSearch}
        />

        {/* Year Summary + Distribution */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-800">
                UPSC Prelims {selectedYear} Analysis | PandaIAS
              </h2>
              <p className="text-slate-500 text-sm">{yearSummaryText}</p>
            </div>
            <a
              href={currentYearData.documentPath}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-brand-red-hover transition-colors font-mono cursor-pointer"
              download
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF Analysis
            </a>
          </div>

          {/* Subject Distribution Bar */}
          <div className="h-8 rounded-lg overflow-hidden flex">
            {Object.entries(currentStats).map(([subject, count]) => (
              <div
                key={subject}
                className="h-full transition-all hover:opacity-80"
                style={{ width: `${(count / currentYearData.totalQuestions) * 100}%`, backgroundColor: subjectColors[subject] }}
                title={`${subjectNames[subject]}: ${count} questions`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-slate-500">
            {Object.entries(currentStats).map(([subject, count]) => (
              <span key={subject} className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: subjectColors[subject] }} />
                {subjectNames[subject]}: {count}
              </span>
            ))}
          </div>
        </div>

        {/* Questions Table */}
        <PYQTable
          displayQuestions={displayQuestions}
          isCrossYearSearch={isCrossYearSearch}
          selectedYear={selectedYear}
          expandedRows={expandedRows}
          onToggleRow={toggleRow}
          onExpandAll={expandAll}
          onCollapseAll={collapseAll}
        />

        {/* Footer Summary */}
        <div className="bg-[#171717] rounded-xl p-6 text-white border border-slate-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">Questions Shown</p>
              <p className="font-display text-2xl font-bold mt-1 text-brand-red">{displayQuestions.length}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">{isCrossYearSearch ? 'Years Covered' : 'Year'}</p>
              <p className="font-display text-xl font-bold mt-1 truncate">
                {isCrossYearSearch
                  ? [...new Set(displayQuestions.map((q) => q.year))].sort((a, b) => b - a).join(', ')
                  : selectedYear}
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">{isCrossYearSearch ? 'Search Results' : 'Valid Questions'}</p>
              <p className="font-display text-2xl font-bold mt-1">
                {isCrossYearSearch ? displayQuestions.length : currentYearData.totalQuestions}
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">Subject Filter</p>
              <p className="font-display text-lg font-bold mt-1 capitalize truncate">
                {selectedSubject === 'all' ? 'All Subjects' : selectedSubject}
              </p>
            </div>
          </div>
        </div>

        {/* Deep Analytics Visualizations */}
        <PyqAnalyticsDashboard
          cognitiveSkills={cognitiveSkills}
          trapPatternData={trapPatternData}
          subTopics={subTopics}
          selectedTopicSubject={selectedTopicSubject}
          onTopicSubjectChange={setSelectedTopicSubject}
        />

      </main>
    </div>
  );
}
