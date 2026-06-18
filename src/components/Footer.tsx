import React from "react";
import logo from "../../assets/Logonew.png";
import lbsnaaImage from "../../assets/LBSNAA.png";

interface FooterProps {
  setActivePage: (page: string) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  return (
    <footer className="w-full bg-slate-50 mt-16 pt-12 border-t border-slate-200" id="app-footer">
      {/* 1. Centered header text & logo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-6 space-y-4">
        <h3 className="text-xl sm:text-2xl font-serif text-navy-950 font-semibold tracking-wide">
          Your journey to the ultimate training ground.
        </h3>
        <div className="flex justify-center">
          <div className="w-[150px] h-[50px] flex items-center justify-center shrink-0 cursor-pointer" onClick={() => setActivePage("home")}>
            <img src={logo} alt="PandaIAS Logo" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      {/* 2. Full-Width LBSNAA Silhouette Image */}
      <div className="w-full overflow-hidden flex justify-center border-b border-slate-200 bg-white">
        <img 
          src={lbsnaaImage} 
          alt="LBSNAA Silhouette" 
          className="w-full max-w-7xl h-auto max-h-48 md:max-h-60 object-contain select-none pointer-events-none" 
        />
      </div>

      {/* 3. Navy Bottom Banner */}
      <div className="bg-navy-950 text-slate-300 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-6">
          {/* Horizontal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            <button 
              onClick={() => setActivePage("home")} 
              className="hover:text-white transition duration-200 cursor-pointer"
            >
              Home Classroom
            </button>
            <span className="text-slate-700">|</span>
            <button 
              onClick={() => setActivePage("resources")} 
              className="hover:text-white transition duration-200 cursor-pointer"
            >
              Survivor's Resources
            </button>
            <span className="text-slate-700">|</span>
            <button 
              onClick={() => setActivePage("about")} 
              className="hover:text-white transition duration-200 cursor-pointer"
            >
              Our Honest Story
            </button>
            <span className="text-slate-700">|</span>
            <button 
              onClick={() => setActivePage("contact")} 
              className="hover:text-white transition duration-200 cursor-pointer"
            >
              24/7 Support Line
            </button>
          </div>

          {/* Legal / Copyright Bottom Row */}
          <div className="w-full border-t border-navy-900 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center md:text-left">
            <p className="order-2 md:order-1">
              UPSC is a marathon. Walk slow, walk long.
            </p>
            <p className="order-1 md:order-2 font-medium">
              © {new Date().getFullYear()} PandaIAS Companion Institute. Built on the bedrock of disciplined consistency.
            </p>
            <p className="order-3">
              Supporting aspirants nationwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
