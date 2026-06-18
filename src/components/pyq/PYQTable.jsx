// src/components/pyq/PYQTable.jsx
import React from 'react';
import { CaretDown, CaretUp, Warning, Lightbulb, Compass, CornersOut, CornersIn } from '@phosphor-icons/react';
import { subjectColors, subjectNames } from '../../data/pyq/analysisData';

export default function PYQTable({
  displayQuestions,
  isCrossYearSearch,
  selectedYear,
  expandedRows,
  onToggleRow,
  onExpandAll,
  onCollapseAll
}) {
  const allExpanded = displayQuestions.length > 0 && expandedRows.size === displayQuestions.length;
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-heading font-semibold text-slate-800">
          Question Database ({displayQuestions.length} Questions Found)
        </h3>
        <div className="flex gap-2">
          <button
            onClick={allExpanded ? onCollapseAll : onExpandAll}
            className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 transition-colors font-medium flex items-center gap-1 cursor-pointer"
          >
            {allExpanded ? (
              <>
                <CornersIn className="w-3.5 h-3.5" />
                <span>Collapse All</span>
              </>
            ) : (
              <>
                <CornersOut className="w-3.5 h-3.5" />
                <span>Expand All</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-slate-100">
        {displayQuestions.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            No questions match your search parameters. Try resetting filters.
          </div>
        ) : (
          displayQuestions.map((q) => {
            const key = isCrossYearSearch ? `${q.year}-${q.q}` : `${selectedYear}-${q.q}`;
            const isExpanded = expandedRows.has(key);
            const color = subjectColors[q.subject] || '#64748b';
            
            return (
              <div key={key} className="transition-all hover:bg-slate-50/50">
                {/* Header Row */}
                <div 
                  onClick={() => onToggleRow(key)}
                  className="p-4 sm:p-5 flex items-start gap-4 cursor-pointer"
                >
                  <span 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5" 
                    style={{ backgroundColor: color }}
                  >
                    Q {q.q}
                  </span>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {isCrossYearSearch && (
                        <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                          {q.year}
                        </span>
                      )}
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide">
                        {subjectNames[q.subject]}
                      </span>
                    </div>
                    
                    <h4 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                      {q.theme}
                    </h4>
                    
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {q.whyAsked}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0 self-center">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center border border-slate-200">
                      {q.ans}
                    </span>
                    {isExpanded ? (
                      <CaretUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <CaretDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>
                
                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/50 space-y-4 animate-fade-in">
                    <div className="grid gap-4 md:grid-cols-2">
                      
                      {/* Left: Language Trap */}
                      <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs">
                          <Warning className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>LANGUAGE TRAP WARNING</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-mono">
                          {q.language}
                        </p>
                      </div>
                      
                      {/* Right: Why Asked */}
                      <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-1.5 text-indigo-800 font-bold text-xs">
                          <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0" />
                          <span>CONCEPTUAL ANCHOR</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {q.whyAsked}
                        </p>
                      </div>
                      
                    </div>
                    
                    {/* Bottom: Logical Diagnosis */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs">
                        <Compass className="w-4 h-4 text-brand-red shrink-0" />
                        <span>STEP-BY-STEP LOGICAL DIAGNOSIS</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif whitespace-pre-line">
                        {q.diagnosis}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
