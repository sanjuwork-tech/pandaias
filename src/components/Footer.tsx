import React from "react";
import { Sparkle, Handshake, CheckCircle } from "@phosphor-icons/react";
import logo from "../../assets/Logonew.png";

interface FooterProps {
  setActivePage: (page: string) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-900 mt-12 py-16" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Philosophy column */}
          <div className="md:col-span-2 space-y-4" id="footer-philosophy-col">
            <div className="flex items-center space-x-2">
              <div className="w-24 h-8 bg-white rounded-md overflow-hidden flex items-center justify-center shrink-0">
                <img src={logo} alt="PandaIAS Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              We celebrate quiet consistency, structured focus, and disciplined consistency. Walk steadily like a panda, showing up every single day.
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-brand-red pt-2">
              <Handshake className="w-3.5 h-3.5" />
              <span>Calm. Focused. Unstoppable.</span>
            </div>
          </div>

          {/* Quick links column */}
          <div className="space-y-3" id="footer-links-col">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-white">THE PLATFORM</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => setActivePage("home")} 
                  className="hover:text-white transition duration-200 cursor-pointer"
                >
                  Home Classroom
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActivePage("resources")} 
                  className="hover:text-white transition duration-200 cursor-pointer"
                >
                  Survivor's Resources
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActivePage("about")} 
                  className="hover:text-white transition duration-200 cursor-pointer"
                >
                  Our Honest Story
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActivePage("contact")} 
                  className="hover:text-white transition duration-200 cursor-pointer"
                >
                  24/7 Support Line
                </button>
              </li>
            </ul>
          </div>

          {/* Core Trust column */}
          <div className="space-y-4" id="footer-trust-col">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-white">OUR COVENANT</h4>
            <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-navy-300 shrink-0 mt-0.5" />
                <span>No deceptive non-refundable clauses.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-navy-300 shrink-0 mt-0.5" />
                <span>3-Day Full trial starts at just ₹249.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-navy-300 shrink-0 mt-0.5" />
                <span>Direct phone access to real ex-aspirants.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PandaIAS Companion Institute. Built on the bedrock of disciplined consistency.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0" id="footer-legal-bar">
            <span>UPSC is a marathon. Walk slow, walk long.</span>
            <span>Supporting aspirants nationwide.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
