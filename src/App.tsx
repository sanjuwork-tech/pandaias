import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import PYQAnalysisPage from "./pages/PYQAnalysisPage";
import UPSCMetroMapPage from "./pages/UPSCMetroMapPage";
import MainsPYQAnalysisPage from "./pages/MainsPYQAnalysisPage";
import MainsPandaAnswersPage from "./pages/MainsPandaAnswersPage";
import MainsThemeWiseAnalysisPage from "./pages/MainsThemeWiseAnalysisPage";
import ConstitutionExplorerPage from "./pages/ConstitutionExplorerPage";
import { Sparkle, X, Handshake } from "@phosphor-icons/react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Chatbot from "./components/Chatbot";
import pandaImage from "../assets/panda.png";
export default function App() {
  const [activePage, setActivePage] = useState<string>("home");
  const [showTopToast, setShowTopToast] = useState<boolean>(true);
  const { scrollY } = useScroll();
  const translateY = useTransform(scrollY, [0, 2000], [0, 400]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  // Dynamic Page Rendering
  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Home setActivePage={setActivePage} />;
      case "resources":
        return <Resources setActivePage={setActivePage} />;
      case "pyq-analysis":
        return <PYQAnalysisPage />;
      case "mains-pyq":
        return <MainsPYQAnalysisPage setActivePage={setActivePage} />;
      case "mains-panda-answers":
        return <MainsPandaAnswersPage setActivePage={setActivePage} />;
      case "mains-theme-analysis":
        return <MainsThemeWiseAnalysisPage setActivePage={setActivePage} />;
      case "constitution-explorer":
        return <ConstitutionExplorerPage setActivePage={setActivePage} />;
      case "metro-map":
        return <UPSCMetroMapPage setActivePage={setActivePage} />;
      case "about":
        return <AboutUs />;
      case "contact":
        return <Contact />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 bg-dot-grid relative selection:bg-brand-red-light selection:text-navy-950">
      
      {/* 0. WELCOME & LAUNCH SCREEN REMOVED */}

      {/* 1. EMOTIONAL BANNER AT THE TOP (Dismissible) */}
      {showTopToast && (
        <div 
          id="top-empathy-toast" 
          className="bg-brand-red text-white text-xs py-3.5 px-4 sm:px-6 relative text-center border-b border-brand-red-hover flex items-center justify-center gap-3"
        >
          <div className="flex items-center gap-2 max-w-4xl mx-auto text-left sm:text-center leading-relaxed">
            <Handshake className="w-4 h-4 text-white/70 shrink-0 hidden sm:inline" />
            <span>
              PANDA IAS is not about an animal — it is about the power of calm determination in a world obsessed with speed. We are your companions.
            </span>
          </div>
          <button 
            onClick={() => setShowTopToast(false)} 
            className="text-white/60 hover:text-white shrink-0 ml-4 cursor-pointer focus:outline-hidden"
            id="dismiss-toast-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. THE SIGNATURE HEADER */}
      <Header activePage={activePage} setActivePage={setActivePage} />

      {/* 3. CORE DYNAMIC VIEWPORT (Main container) */}
      <main className="flex-1 w-full overflow-hidden" id="main-content-viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. THE TRUSTED FOOTER */}
      <Footer setActivePage={setActivePage} />

      {/* 5. FLOATING COMPANION CHATBOT */}
      <Chatbot setActivePage={setActivePage} />

      {/* 6. FLOATING SCROLL-LINKED MASCOT (application-wide) */}
      <motion.div 
        className="fixed right-4 top-[25vh] z-30 pointer-events-none select-none hidden lg:block"
        style={{ y: translateY }}
      >
        <img 
          src={pandaImage} 
          alt="Panda Mascot" 
          className="w-32 h-32 object-contain opacity-85" 
        />
      </motion.div>

    </div>
  );
}
