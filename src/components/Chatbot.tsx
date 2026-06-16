import React, { useState, useEffect, useRef } from "react";
import { 
  ChatTeardropText, X, PaperPlaneRight, ArrowLeft, 
  MapTrifold, BookOpen, MagnifyingGlass, Compass, 
  Handshake, UserCheck, ShieldCheck 
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import chatbotIcon from "../../assets/Chatbot.png";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  actions?: { label: string; action: () => void; primary?: boolean }[];
}

interface ChatbotProps {
  setActivePage: (page: string) => void;
}

export default function Chatbot({ setActivePage }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [userName, setUserName] = useState("");
  const [step, setStep] = useState<"name_input" | "guess_confirm" | "main_menu" | "resource_detail">("name_input");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chatbot conversation
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "1",
          sender: "bot",
          text: "Hi, I am your panda! 🐼",
          timestamp: new Date()
        },
        {
          id: "2",
          sender: "bot",
          text: "Let me guess your name... Wait, tell me your name below first and let's see if my panda intuition is calibrated today!",
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  // Scroll to bottom whenever messages list updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const simulateBotResponse = (text: string, delay = 800, actions?: { label: string; action: () => void; primary?: boolean }[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text,
          timestamp: new Date(),
          actions
        }
      ]);
    }, delay);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    const name = nameInput.trim();
    setUserName(name);
    setNameInput("");

    // Add user's name message
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: "user",
        text: `My name is ${name}`,
        timestamp: new Date()
      }
    ]);

    setStep("guess_confirm");

    // Bot response guessing name
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text: `Aha! **${name}**! I knew it! (My panda intuition had a 99.9% hunch) 🎯`,
          timestamp: new Date()
        },
        {
          id: Math.random().toString(),
          sender: "bot",
          text: `Let me guess... you are an ambitious, calm, and focused aspirant striving to conquer the UPSC Civil Services Examination! Am I right?`,
          timestamp: new Date(),
          actions: [
            { 
              label: "Spot on! How did you know?", 
              action: () => handleGreetingConfirm("Spot on! How did you know?") 
            },
            { 
              label: "Exactly! Show me the syllabus.", 
              action: () => handleGreetingConfirm("Exactly! Show me the syllabus.") 
            }
          ]
        }
      ]);
    }, 1000);
  };

  const handleGreetingConfirm = (userChoiceText: string) => {
    // Add user's choice message
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: "user",
        text: userChoiceText,
        timestamp: new Date()
      }
    ]);

    setStep("main_menu");

    // Bot introduces resources
    simulateBotResponse(
      `Welcome to the sanctuary! 🐼 We focus on quiet consistency, and with the right resources, you will master the UPSC syllabus.

Our platform is built on ground-level empathy and total honesty. What would you like to explore first?`,
      1000,
      getMainMenuActions()
    );
  };

  const getMainMenuActions = () => [
    { label: "🗺️ Syllabus Metro Map", action: () => selectResource("metro_map") },
    { label: "📝 Mains Panda Answers", action: () => selectResource("mains_answers") },
    { label: "🔍 Prelims PYQ Analysis", action: () => selectResource("prelims_pyq") },
    { label: "🏛️ Constitution Explorer", action: () => selectResource("constitution") },
    { label: "📖 Trial Courses (₹249)", action: () => selectResource("courses") },
    { label: "💬 Talk to a Mentor", action: () => selectResource("mentor") }
  ];

  const selectResource = (type: string) => {
    let userText = "";
    let botResponse = "";
    let routeAction = () => {};
    let routeLabel = "";

    switch (type) {
      case "metro_map":
        userText = "Tell me about the Syllabus Metro Map";
        botResponse = `The **Companion's Syllabus Metro Map** is our signature interactive tool! It strips down the complex terms of the UPSC syllabus into simple, clickable metro lines and stations, linking each micro-topic directly to relevant resources. Avoid studying blindly—let's keep your direction locked in!`;
        routeLabel = "🗺️ Open Syllabus Metro Map";
        routeAction = () => {
          setActivePage("metro-map");
          setIsOpen(false);
        };
        break;
      case "mains_answers":
        userText = "Tell me about Mains Panda Answers";
        botResponse = `We have loaded detailed blueprints for **UPSC Mains PYQs (2023, 2024, and 2025)** under the **Panda Answers** section. Instead of unachievable academic model answers, we show you how to write structured, honest answers in exactly 7 minutes under exam pressure! Check them out on our resources page.`;
        routeLabel = "📝 View Panda Answers";
        routeAction = () => {
          setActivePage("mains-panda-answers");
          setIsOpen(false);
        };
        break;
      case "prelims_pyq":
        userText = "Show me the Prelims PYQ Analysis";
        botResponse = `Standard elimination shortcuts are dead post-2023. Our **Prelims PYQ Analysis** resource maps out past questions topic-by-topic to help you understand the examiner's mind, decode option traps, and build conceptual depth that stands the test of changes.`;
        routeLabel = "🔍 Browse Prelims PYQs";
        routeAction = () => {
          setActivePage("pyq-analysis");
          setIsOpen(false);
        };
        break;
      case "constitution":
        userText = "What is the Constitution Explorer?";
        botResponse = `Our new **Constitution Explorer** offers a clean dynamic column view to search, read, and master every article, part, and schedule of the Indian Constitution. It's the ultimate visual guide for GS Paper 2!`;
        routeLabel = "🏛️ Open Constitution Explorer";
        routeAction = () => {
          setActivePage("constitution-explorer");
          setIsOpen(false);
        };
        break;
      case "courses":
        userText = "What are the Trial Courses?";
        botResponse = `We don't charge ₹1.5 Lakhs upfront. You can unlock premium 3-day hand-holding cohorts (GS Foundation, Editorial Linkages, Ethics/Essay companion rooms) starting at just **₹249**! Log in and check them out to try our empathetic trial methodology today.`;
        routeLabel = "📖 Explore Trial Courses";
        routeAction = () => {
          setActivePage("home");
          // Scroll to courses section
          setTimeout(() => {
            const el = document.getElementById("courses-pricing-section");
            el?.scrollIntoView({ behavior: "smooth" });
          }, 300);
          setIsOpen(false);
        };
        break;
      case "mentor":
        userText = "How do I reach a mentor?";
        botResponse = `Need an emotional anchor, a study planner check-in, or syllabus clarity? Our mentors (Prashanth, Anusha, Varun, Riya, and Sanju) are ex-aspirants who have lived the struggle. We will support you. Head to our Contact page to send a query or check our resources!`;
        routeLabel = "💬 Go to Contact Page";
        routeAction = () => {
          setActivePage("contact");
          setIsOpen(false);
        };
        break;
    }

    // Add user message
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: "user",
        text: userText,
        timestamp: new Date()
      }
    ]);

    setStep("resource_detail");

    // Bot response
    simulateBotResponse(
      botResponse,
      900,
      [
        { label: routeLabel, action: routeAction, primary: true },
        { label: "🔙 Back to Main Menu", action: goToMainMenu }
      ]
    );
  };

  const goToMainMenu = () => {
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: "user",
        text: "Show me the options again",
        timestamp: new Date()
      }
    ]);

    setStep("main_menu");
    simulateBotResponse(
      "Sure thing! Here are the core navigation options and resources of Panda IAS:",
      600,
      getMainMenuActions()
    );
  };

  const triggerReset = () => {
    setMessages([
      {
        id: "1",
        sender: "bot",
        text: "Hi, I am your panda! 🐼",
        timestamp: new Date()
      },
      {
        id: "2",
        sender: "bot",
        text: "Let me guess your name... Wait, tell me your name below first and let's see if my panda intuition is calibrated today!",
        timestamp: new Date()
      }
    ]);
    setUserName("");
    setNameInput("");
    setStep("name_input");
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        id="chatbot-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[41px] h-[41px] rounded-full bg-navy-950 border border-slate-700 shadow-2xl hover:scale-105 hover:bg-slate-900 active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden flex items-center justify-center group"
        aria-label="Open support chat"
      >
        <img 
          src={chatbotIcon} 
          alt="Chatbot Trigger" 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:rotate-6"
        />
        {/* Visual Pulse Indicator */}
        <span className="absolute top-0 right-0 w-2 h-2 bg-brand-red border border-navy-950 rounded-full animate-pulse"></span>
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            id="chatbot-window"
            className="fixed bottom-14 right-4 sm:bottom-16 sm:right-6 z-50 w-[224px] sm:w-[244px] h-[333px] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans"
          >
            {/* Header */}
            <div className="bg-navy-950 px-3 py-2 flex items-center justify-between border-b border-slate-800 text-white shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-7.5 h-7.5 rounded-full bg-white/10 p-0.5 overflow-hidden flex items-center justify-center border border-white/20">
                  <img src={chatbotIcon} alt="Panda Assistant" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold font-mono tracking-wider text-brand-red-light uppercase leading-none">Panda Bot</h4>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span className="text-[9px] text-slate-400 font-medium leading-none">Companion - Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={triggerReset}
                  className="text-slate-400 hover:text-white p-0.5 rounded-sm transition-colors text-[9px] uppercase font-mono font-bold tracking-widest mr-1 cursor-pointer"
                  title="Reset conversation"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white p-0.5 rounded-full transition-colors cursor-pointer"
                  id="close-chatbot-btn"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Message display area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50/50" id="chatbot-messages-container">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-[11px] leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-brand-red text-white rounded-br-none shadow-xs"
                        : "bg-white border border-slate-200 text-navy-950 rounded-bl-none shadow-xs"
                    }`}
                  >
                    {/* Render basic markdown bold styling */}
                    {msg.text.split("\n\n").map((para, i) => (
                      <p key={i} className={i > 0 ? "mt-1.5" : ""}>
                        {para.split("**").map((chunk, j) => 
                          j % 2 === 1 ? <strong key={j} className="font-bold text-brand-red-dark">{chunk}</strong> : chunk
                        )}
                      </p>
                    ))}
                  </div>
                  <span className="text-[8px] text-slate-400 font-mono mt-0.5 px-0.5">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  {/* Render inline action choices if this is the last message and has actions */}
                  {msg.actions && msg.actions.length > 0 && messages[messages.length - 1].id === msg.id && (
                    <div className="mt-2 flex flex-wrap gap-1.5 w-full justify-start">
                      {msg.actions.map((act, index) => (
                        <button
                          key={index}
                          onClick={act.action}
                          className={`text-[10px] px-2.5 py-1.5 rounded-md font-medium cursor-pointer transition-all duration-150 border active:translate-y-0.5 ${
                            act.primary 
                              ? "bg-brand-red text-white border-brand-red hover:bg-brand-red-hover hover:scale-[1.02]" 
                              : "bg-white text-navy-950 border-slate-200 hover:bg-slate-50 hover:text-brand-red"
                          }`}
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-1.5 bg-white border border-slate-200 rounded-xl rounded-bl-none px-3 py-2 shadow-xs max-w-[65px]">
                  <div className="w-1 h-1 bg-navy-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 bg-navy-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-1 bg-navy-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area - dynamically shown in name_input stage */}
            <div className="p-2 border-t border-slate-200 bg-white shrink-0">
              {step === "name_input" ? (
                <form onSubmit={handleNameSubmit} className="flex gap-1.5 items-center">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Enter your name..."
                    maxLength={30}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] focus:outline-hidden focus:border-brand-red text-navy-950 font-sans"
                    id="chatbot-name-input"
                  />
                  <button
                    type="submit"
                    className="bg-navy-950 hover:bg-slate-900 text-white p-2 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Send name"
                  >
                    <PaperPlaneRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 px-0.5 py-0.5">
                  <span>Conversation is guiding resources</span>
                  <button 
                    onClick={goToMainMenu}
                    className="text-brand-red hover:underline uppercase font-bold tracking-wider cursor-pointer"
                  >
                    Main Menu
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
