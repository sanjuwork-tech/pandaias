import React, { useState } from "react";
import { Compass, BookOpen, Users, PhoneCall } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import logo from "../../assets/Logonew.png";

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Header({ activePage, setActivePage }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Compass },
    { id: "resources", label: "Our Resources", icon: BookOpen },
    { id: "about", label: "About Us", icon: Users },
    { id: "contact", label: "Contact Companion", icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setActivePage("home")} 
            className="flex items-center space-x-3 cursor-pointer group"
            id="header-logo-container"
          >
            <div className="w-[180px] h-[60px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
              <img src={logo} alt="Panda IAS Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest" id="desktop-nav-menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              
              if (item.id === "resources") {
                return (
                  <div 
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <button
                      id={`nav-btn-${item.id}`}
                      onClick={() => setActivePage("resources")}
                      className={`flex items-center space-x-1.5 py-1 transition-all duration-200 cursor-pointer ${
                        activePage === "resources" || activePage === "pyq-analysis" || activePage === "mains-pyq" || activePage === "mains-panda-answers" || activePage === "mains-theme-analysis" || activePage === "metro-map" || activePage === "constitution-explorer"
                          ? "text-brand-red border-b-2 border-brand-red font-bold"
                          : "text-slate-500 hover:text-brand-red font-medium"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {showDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className="absolute top-full left-0 mt-1 w-56 bg-white border border-slate-200 rounded-lg shadow-lg py-1.5 z-50 font-sans"
                        >
                          <button
                            onClick={() => {
                              setActivePage("pyq-analysis");
                              setShowDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-brand-red font-semibold uppercase tracking-wider transition-colors duration-150 flex items-center gap-2 cursor-pointer text-[11px]"
                          >
                            <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                            <span>Prelims PYQ Analysis</span>
                          </button>
                          <button
                            onClick={() => {
                              setActivePage("mains-pyq");
                              setShowDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-brand-red font-semibold uppercase tracking-wider transition-colors duration-150 flex items-center gap-2 cursor-pointer text-[11px]"
                          >
                            <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                            <span>Mains PYQ Analysis</span>
                          </button>
                          <button
                            onClick={() => {
                              setActivePage("mains-panda-answers");
                              setShowDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-brand-red font-semibold uppercase tracking-wider transition-colors duration-150 flex items-center gap-2 cursor-pointer text-[11px]"
                          >
                            <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                            <span>Mains Panda Answers</span>
                          </button>
                          <button
                            onClick={() => {
                              setActivePage("mains-theme-analysis");
                              setShowDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-brand-red font-semibold uppercase tracking-wider transition-colors duration-150 flex items-center gap-2 cursor-pointer text-[11px]"
                          >
                            <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                            <span>Mains Theme Wise Analysis</span>
                          </button>
                          <button
                            onClick={() => {
                              setActivePage("constitution-explorer");
                              setShowDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-brand-red font-semibold uppercase tracking-wider transition-colors duration-150 flex items-center gap-2 cursor-pointer text-[11px]"
                          >
                            <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                            <span>Constitution Explorer</span>
                          </button>
                          <button
                            onClick={() => {
                              setActivePage("metro-map");
                              setShowDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-brand-red font-semibold uppercase tracking-wider transition-colors duration-150 flex items-center gap-2 cursor-pointer text-[11px]"
                          >
                            <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                            <span>UPSC Metro Map</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center space-x-1.5 py-1 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-brand-red border-b-2 border-brand-red font-bold"
                      : "text-slate-500 hover:text-brand-red font-medium"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Supportive Sub-cta */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex flex-col items-end text-right">
              <span className="text-[11px] font-mono text-slate-500 block">SUPPORT LINE</span>
              <span className="text-xs font-semibold text-navy-800 block">We listen. Always.</span>
            </div>
            <button
              id="header-quick-support-btn"
              onClick={() => setActivePage("contact")}
              className="bg-brand-red hover:bg-brand-red-hover text-white px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-200 shadow-md hover:shadow-lg active:translate-y-0.5 flex items-center space-x-2"
            >
              <span>Talk to Mentor</span>
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav Rail (Horizontal scrollable for lightweight mobile UX) */}
      <div className="md:hidden flex items-center justify-start overflow-x-auto whitespace-nowrap py-2 px-4 shadow-inner border-t border-slate-100 bg-slate-50/50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-nav-btn-${item.id}`}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase mr-2.5 transition-all cursor-pointer ${
                isActive
                  ? "bg-navy-900 text-white"
                  : "bg-white text-slate-600 border border-slate-200/80"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
