import React, { useState } from "react";
import { 
  PhoneCall, EnvelopeSimple, MapPin, Clock, Handshake, 
  PaperPlane, Check, Warning, Smiley, Sparkle 
} from "@phosphor-icons/react";
import { motion } from "motion/react";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    targetYear: "2026",
    reason: "I feel lonely/burnt out — need to talk with a companion",
    message: ""
  });

  // Emotional SOS state
  const [sosActivated, setSosActivated] = useState<boolean>(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleSosTrigger = () => {
    setSosActivated(true);
    window.open("https://telemanas.mohfw.gov.in/home", "_blank");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16" 
      id="contact-root"
    >
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-mono font-bold text-brand-red tracking-widest uppercase">The Companion Embassy</span>
        <h1 className="text-3xl sm:text-4xl font-display font-medium text-navy-950">
          A Shoulder & A Helping Hand
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Need academic coordination, schedule auditing, or just a human voice to help you dismantle self-doubt? We are right here with you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left column: Contact Info & Emergency SOS Panel */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          
          <div className="space-y-6">
            <h3 className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
              COMPANION HUB
            </h3>

            {/* Address points */}
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-start space-x-4 shadow-xs hover:shadow-md transition-shadow duration-300">
                <MapPin className="w-5 h-5 text-navy-700 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed space-y-1">
                  <h4 className="font-bold text-navy-950 text-sm">100% Online & Accessible</h4>
                  <p className="text-slate-500">We operate entirely online to eliminate physical overhead and pass the savings directly to you. Your desk is our classroom.</p>
                  <p className="text-slate-400 font-mono text-[10px] mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Available 24/7 digitally & telephonically</span>
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-start space-x-4 shadow-xs hover:shadow-md transition-shadow duration-300">
                <EnvelopeSimple className="w-5 h-5 text-navy-700 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed space-y-1">
                  <h4 className="font-bold text-navy-950 text-sm">Direct Companion Inbox</h4>
                  <p className="text-slate-500">companions@pandaias.org</p>
                  <p className="text-[10px] text-slate-400">Checked directly by our academic leads three times daily</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-start space-x-4 shadow-xs hover:shadow-md transition-shadow duration-300">
                <PhoneCall className="w-5 h-5 text-navy-700 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed space-y-1">
                  <h4 className="font-bold text-navy-950 text-sm">The 24/7 Aspirant Line</h4>
                  <p className="text-slate-500">1800-889-2026 (Toll-Free Support)</p>
                  <p className="text-slate-400 font-mono text-[10px]">Speak to ex-aspirants who are trained listeners</p>
                </div>
              </div>
            </div>
          </div>

          {/* EMERGENCY MENTAL SOS TRIGGER BOX */}
          <div className="bg-navy-950 text-white p-6 sm:p-8 rounded-2xl space-y-5 border border-navy-900 animate-breathe-red relative overflow-hidden flex-1 flex flex-col justify-between mt-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-red-500/20 text-red-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase border border-red-500/30">
                <Warning className="w-3 h-3 animate-pulse" />
                <span>2 AM Emergency Support</span>
              </div>
              <h4 className="text-lg font-display font-bold text-slate-100">Feeling crushed or facing self-doubt right now?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                If the pressure of the upcoming attempts feels unbearable, or your small room feels like it is closing in, do not struggle alone. Hit the emotional SOS below. Read our direct companion emergency words.
              </p>
            </div>

            {!sosActivated ? (
              <button
                onClick={handleSosTrigger}
                className="w-full bg-brand-red hover:bg-brand-red-hover text-white font-bold text-xs py-3 rounded-lg text-center uppercase tracking-widest mt-4 transition cursor-pointer"
                id="sos-trigger-btn"
              >
                Press Emergency SOS Button
              </button>
            ) : (
              // Calming Response directly on screen
              <div className="bg-navy-900 p-4 rounded-xl border border-red-500/30 text-xs text-slate-200 space-y-3 animate-fade-in mt-4">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold font-mono text-[10px]">
                  <Smiley className="w-4 h-4" />
                  <span>TRANSMITTING EMERGENCY CALM</span>
                </div>
                <p className="italic leading-relaxed font-serif text-slate-200">
                  "Breathe. Just breathe. Look at your desk. You have fought through hundreds of silent nights. Your worth is not bound to a UPSC roll-number PDF. You are highly capable, calm, focused, and unstoppable. You do not have to conquer the whole syllabus tonight. Close the books. Drink a glass of water. Turn off the light. Sleep peacefully. We are here holding your hands. Tomorrow is a fresh morning."
                </p>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>From your PandaIAS Companion Team</span>
                  <button 
                    onClick={() => setSosActivated(false)} 
                    className="text-slate-500 hover:text-white underline cursor-pointer"
                  >
                    Reset SOS
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right column: Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-10 rounded-2xl shadow-xs" id="contact-form-layout">
          
          {!formSubmitted ? (
            <form onSubmit={handleFormSubmit} className="space-y-5">
              
              <div className="space-y-1">
                <div className="inline-flex bg-navy-50 text-navy-800 px-2 rounded-full text-[9px] font-mono uppercase font-bold">
                  DIGNIFIED REGISTRATION
                </div>
                <h3 className="text-xl font-display font-medium text-navy-950 mt-1">Open a Support Thread</h3>
                <p className="text-xs text-slate-500">
                  We look at each message thoroughly. Your companion thread is safe and confidential.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Your Aspirant Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyanshu Jha"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs p-3 rounded-lg border border-slate-200 outline-hidden focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Primary Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. priyanshu@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs p-3 rounded-lg border border-slate-200 outline-hidden focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">WhatsApp Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 9900881122"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-3 rounded-lg border border-slate-200 outline-hidden focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">CSE Target Year</label>
                  <select
                    value={formData.targetYear}
                    onChange={(e) => setFormData({ ...formData, targetYear: e.target.value })}
                    className="w-full text-xs p-3 rounded-lg border border-slate-200 outline-hidden focus:border-navy-600 bg-white"
                  >
                    <option value="2026">CSE 2026 (Upcoming cycle)</option>
                    <option value="2027">CSE 2027</option>
                    <option value="2028">CSE 2028 or later</option>
                    <option value="Undecided">Undecided / First-timer</option>
                  </select>
                </div>
              </div>

              {/* Contact Reason selection */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Reason for Contacting Us</label>
                <select
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full text-xs p-3 rounded-lg border border-slate-200 outline-hidden focus:border-navy-600 bg-white"
                  id="contact-reason-select"
                >
                  <option value="I feel lonely/burnt out — need to talk with a companion">I feel lonely/burnt out — need to talk with a companion</option>
                  <option value="Requesting a full schedule/study plan review">Requesting a full schedule/study plan review</option>
                  <option value="Question about our 3-day trial course starting from ₹249">Question about our 3-day trial course starting from ₹249</option>
                  <option value="General inquiries & resource support">General inquiries & resource support</option>
                </select>
              </div>

              {/* Message Box */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Vent or Describe your question</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  required
                  placeholder="Tell us what is on your mind. Is your PG leaking? Are your mock scores stuck? Or do you need assistance with essays?"
                  className="w-full text-xs sm:text-sm p-4 rounded-lg border border-slate-200 outline-hidden focus:border-navy-600 focus:ring-1 focus:ring-navy-600 bg-white leading-relaxed"
                  id="contact-message-body"
                />
              </div>

              {/* Submission button */}
              <button
                type="submit"
                className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs py-3.5 rounded-lg text-center uppercase tracking-wider shadow-md transition hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center space-x-2"
                id="contact-submit-btn"
              >
                <PaperPlane className="w-4 h-4" />
                <span>Submit Companion Ticket</span>
              </button>

            </form>
          ) : (
            // Form success screen
            <div className="text-center py-10 space-y-6" id="form-success-alert">
              <div className="inline-flex bg-emerald-50 text-emerald-800 p-4 rounded-full">
                <Check className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold text-navy-950">We have received your thread, {formData.name}.</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Your ticket code is <strong className="font-mono text-navy-900">PND-{Math.floor(Math.random() * 9000 + 1000)}</strong>. A senior companion listed on our website will personally ping you on WhatsApp or call you within 3-4 hours.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 max-w-md mx-auto text-left space-y-2">
                <h4 className="text-[10px] font-mono tracking-widest font-bold text-navy-800 uppercase flex items-center gap-1">
                  <Handshake className="w-3.5 h-3.5" />
                  <span>The Handholding Promise</span>
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-serif">
                  "Thank you for reaching out. If you requested a schedule audit or mentioned feeling alone, sleep comfortably tonight. We will listen, hold your hand, and ensure your preparation remains dignified."
                </p>
              </div>

              <button
                onClick={() => {
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    targetYear: "2026",
                    reason: "I feel lonely/burnt out — need to talk with a companion",
                    message: ""
                  });
                  setFormSubmitted(false);
                }}
                className="text-xs text-navy-600 hover:text-navy-900 font-semibold underline cursor-pointer"
                id="reopen-form-btn"
              >
                Open another thread
              </button>
            </div>
          )}

        </div>

      </div>

    </motion.div>
  );
}
