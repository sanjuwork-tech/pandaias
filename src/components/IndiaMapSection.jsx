import React from 'react';
import { ChatCircleText } from '@phosphor-icons/react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import indiaStatesGeo from './india-states.json';

const REGIONS = [
  {
    city: 'Delhi NCR',
    state: 'Delhi',
    coords: [77.21, 28.64],
    tier: 'high',
    language: 'Hindi + English',
    connectivity: 'Metro bandwidth, high peer density',
    need: 'Noise filtering, disciplined PYQ diagnosis, answer-writing feedback',
    support: 'Mentor-led topic triage',
  },
  {
    city: 'Patna',
    state: 'Bihar',
    coords: [85.14, 25.61],
    tier: 'high',
    language: 'Hindi + English',
    connectivity: 'Mobile-first, mixed broadband',
    need: 'Affordable structure, bilingual explanations, repeatable revision plan',
    support: 'Low-cost PYQ and syllabus path',
  },
  {
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    coords: [80.95, 26.85],
    tier: 'high',
    language: 'Hindi + English',
    connectivity: 'Mobile-first with city coaching clusters',
    need: 'Peer circle, mains linkage, daily consistency',
    support: 'Samvad study rooms',
  },
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    coords: [77.59, 12.97],
    tier: 'high',
    language: 'English + Kannada',
    connectivity: 'Strong broadband, working aspirants',
    need: 'Time-boxed prep, career bridge, weekend revision',
    support: 'Logged skill evidence',
  },
  {
    city: 'Hyderabad',
    state: 'Telangana',
    coords: [78.49, 17.39],
    tier: 'mid',
    language: 'English + Telugu',
    connectivity: 'Good broadband, mobile revision',
    need: 'Test discipline, optional planning, policy career pathways',
    support: 'Dashboard operating system',
  },
  {
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    coords: [77.41, 23.26],
    tier: 'mid',
    language: 'Hindi',
    connectivity: 'Mobile-heavy, mixed reliability',
    need: 'Offline-friendly study material and topic clarity',
    support: '2G friendly prep assets',
  },
  {
    city: 'Guwahati',
    state: 'Assam',
    coords: [91.74, 26.14],
    tier: 'emerging',
    language: 'English + Assamese',
    connectivity: 'Regional bandwidth variation',
    need: 'Remote mentoring, language-sensitive current affairs, peer confidence',
    support: 'Regional Samvad signals',
  },
  {
    city: 'Leh',
    state: 'Ladakh',
    coords: [77.58, 34.17],
    tier: 'remote',
    language: 'English + Hindi',
    connectivity: 'Low bandwidth and seasonal limits',
    need: 'Offline preparation, compact downloads, reliable guidance',
    support: 'Low-data learning mode',
  },
  {
    city: 'Thiruvananthapuram',
    state: 'Kerala',
    coords: [76.94, 8.52],
    tier: 'emerging',
    language: 'English + Malayalam',
    connectivity: 'Good mobile access',
    need: 'GS integration, interview clarity, career continuity',
    support: 'Career bridge pathways',
  },
];

const TIER_COLOR = {
  high: '#db2777',      // Brand Pink
  mid: '#f472b6',       // Light Pink
  emerging: '#fbcfe8',  // Pale Pink
  remote: '#fce7f3',    // Softest Pink
};

export default function IndiaMapSection() {

  return (
    <section id="community" className="bg-[#FAF9F6] py-20 border-y border-slate-200">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-red-light px-4 py-1.5 text-xs font-mono font-bold text-brand-red border border-brand-red/10 uppercase tracking-wider">
            <ChatCircleText className="h-4 w-4 animate-pulse" />
            PandaIAS Samvad Map
          </div>
          <h2 className="mb-3 font-display font-bold text-3xl sm:text-4xl text-navy-950">
            Ambition has no postal code.
          </h2>
          <p className="mx-auto max-w-2xl text-slate-500 text-sm leading-relaxed">
            Click a region on the map to understand the local study reality. Then tell us what aspirants from your place need most.
          </p>
        </div>

        <div className="flex flex-col items-center max-w-2xl mx-auto">
          {/* Live Aspirants Counter */}
          <div className="mb-6 inline-flex items-center gap-3 bg-white border border-brand-red/20 rounded-full px-5 py-2.5 shadow-xs">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-red"></span>
            </span>
            <span className="text-sm font-bold text-navy-950 font-display">
              <span className="text-brand-red text-lg">2,847</span> Live Aspirants
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">across India</span>
          </div>

          <div className="relative flex flex-col items-center bg-white p-6 rounded-2xl border border-brand-red/20 shadow-xs w-full">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 1000,
                center: [82.0, 22.0],
              }}
              width={500}
              height={600}
              style={{ width: '100%', maxWidth: 500, height: 'auto' }}
            >
              <Geographies geography={indiaStatesGeo}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#FDF2F8"
                      stroke="#db2777"
                      strokeWidth={0.6}
                      style={{
                        default: { outline: 'none' },
                        hover: { fill: '#fce7f3', outline: 'none', transition: 'all 0.2s' },
                        pressed: { fill: '#fbcfe8', outline: 'none' },
                      }}
                    />
                  ))
                }
              </Geographies>

              {REGIONS.map((region) => {
                const color = TIER_COLOR[region.tier];
                return (
                  <Marker
                    key={region.city}
                    coordinates={region.coords}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle r={10} fill={color} fillOpacity={0.2} />
                    <circle
                      r={5}
                      fill={color}
                      fillOpacity={0.9}
                      stroke="white"
                      strokeWidth={1}
                    />
                  </Marker>
                );
              })}
            </ComposableMap>

            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4 w-full">
              {[
                { color: TIER_COLOR.high, label: 'Coaching clusters' },
                { color: TIER_COLOR.mid, label: 'Mobile-first cities' },
                { color: TIER_COLOR.emerging, label: 'Regional growth' },
                { color: TIER_COLOR.remote, label: 'Remote access' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: item.color }} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

