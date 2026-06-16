import React, { useEffect, useCallback } from 'react';
import metroMapHtml from '../upsc-metro-map.html?raw';


const integratedMetroMapHtml = metroMapHtml.replace(
  '</head>',
  `<style>
    .topbar,
    .hero,
    .footer {
      display: none !important;
    }

    body {
      background: #fafafa !important;
      overflow-x: hidden !important;
    }

    body:before {
      opacity: .035 !important;
    }

    .controls {
      position: static !important;
      top: auto !important;
      z-index: 2 !important;
      border: 1px solid #E2E8F0 !important;
      border-radius: 22px !important;
      margin: 0 0 16px !important;
      background: #FFFFFF !important;
      box-shadow: 0 16px 40px rgba(10, 10, 10, .05) !important;
    }

    .wrap {
      padding: 0 !important;
    }

    .map-card {
      border-color: #E2E8F0 !important;
      border-radius: 24px !important;
      overflow: hidden !important;
      box-shadow: 0 18px 45px rgba(10, 10, 10, .06) !important;
    }

    .map-info-strip {
      background: #FFFFFF !important;
      border-bottom-color: #E2E8F0 !important;
    }

    .map-head {
      background: #fafafa !important;
      border-bottom-color: #E2E8F0 !important;
    }

    .legend,
    .how {
      margin-left: 0 !important;
      margin-right: 0 !important;
      border-color: #E2E8F0 !important;
      border-radius: 24px !important;
      box-shadow: 0 18px 45px rgba(10, 10, 10, .04) !important;
    }
  </style></head>`,
);

export default function UPSCMetroMapPage({ setActivePage }) {
  // Listen for navigation messages from the iframe (PYQ link clicks)
  const handleMessage = useCallback((event) => {
    if (event.data && event.data.type === 'navigate' && event.data.page) {
      if (setActivePage) {
        setActivePage(event.data.page);
      }
    }
  }, [setActivePage]);

  useEffect(() => {
    document.title = "UPSC Syllabus Metro Map | PandaIAS";
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="pt-24">
        <section className="border-b border-slate-200 bg-slate-50 px-6 py-12">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-brand-red">
              Our Resources / Syllabus Atlas
            </p>
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <h1 className="font-display text-4xl font-bold leading-tight text-navy-950 md:text-5xl">
                  UPSC Syllabus Metro Map | PandaIAS
                </h1>
                <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed text-sm sm:text-base">
                  A visual command centre where every syllabus station opens microthemes, sources,
                  PYQ direction, current affairs linkage, and MCQ traps.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs card-blueprint">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand-red">
                  Mentor Use Case
                </p>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500">
                  Use this when the syllabus feels shapeless. Choose a station, read what exactly
                  belongs there, then connect it with PYQs instead of reading blindly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 md:px-6 md:py-10 bg-slate-50">
          <div className="mx-auto max-w-[1680px]">
            <iframe
              title="UPSC Syllabus Metro Map"
              srcDoc={integratedMetroMapHtml}
              className="h-[1120px] w-full rounded-[28px] border border-slate-200 bg-white shadow-xs"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
