import React, { useState, useRef, useEffect } from "react";
import { Message } from "../types";
import { Bot, Send, Trash2, HelpCircle, Loader2, RefreshCw, X, MessageSquare, ArrowRightLeft, Sparkles } from "lucide-react";

interface ChatAssistantProps {
  embeddedOnly?: boolean;
  onClose?: () => void;
}

export default function ChatAssistant({ embeddedOnly = false, onClose }: ChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Attempt to load conversation logs
    const logs = localStorage.getItem("maha_sahayak_conversations");
    if (logs) {
      try {
        return JSON.parse(logs);
      } catch (e) {
        // Fallback to default greeting
      }
    }
    return [
      {
        role: "assistant",
        content: "Namaskar! 🙏 I am 'Maha Energy Sahayak', your virtual solar adviser. Ask me anything about rooftop solar panels, monthly electricity billing optimization, MSEDCL net-metering, or India's flat ₹78,000 PM Surya Ghar cashbacks. Let's make Maharashtra greener!",
        timestamp: new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }),
      },
    ];
  });

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const starters = [
    "What is PM Surya Ghar Yojana?",
    "How much solar kW do I need?",
    "What is Net Metering in MH?",
    "How to verify state subsidies?",
  ];

  useEffect(() => {
    // Save history to local cache
    localStorage.setItem("maha_sahayak_conversations", JSON.stringify(messages));
    // Scroll down on changes
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (rawText: string) => {
    if (!rawText || rawText.trim() === "" || loading) return;

    const userMessage: Message = {
      role: "user",
      content: rawText,
      timestamp: new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }),
    };

    const newMessagesList = [...messages, userMessage];
    setMessages(newMessagesList);
    setInputValue("");
    setLoading(true);

    try {
      // Build proper history for the backed endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessagesList.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to establish AI link. Check API keys.");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        timestamp: new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        role: "assistant",
        content: `⚠️ System Notification: I'm currently operating in offline-compatibility mode as the Gemini API Key is loading or missing. \n\nTo configure the live AI Assistant, go to the top left 'Settings > Secrets' panel and declare: \n\`GEMINI_API_KEY="YOUR_KEY"\`. \n\nDirect Calculation: A standard 3kW system in Pune costs roughly ₹1,95,000 gross. Post direct central PM-Yojana subsidy of ₹78,000, your net cost is ₹1,17,000, paying back within 3-4 years! Let me know if you would like general solar guidelines.`,
        timestamp: new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (confirm("Reset conversation logs?")) {
      const resetList: Message[] = [
        {
          role: "assistant",
          content: "Namaskar! Chat logs reset. Ask me any queries about solar connections, billing rules, or national subsidies in Maharashtra.",
          timestamp: new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }),
        },
      ];
      setMessages(resetList);
      localStorage.removeItem("maha_sahayak_conversations");
    }
  };

  return (
    <div
      id="chat-assistant-panel"
      className={`bg-slate-900 border border-slate-800 flex flex-col justify-between ${
        embeddedOnly ? "h-[500px] rounded-3xl" : "h-[620px] rounded-3xl"
      } relative overflow-hidden shadow-2xl`}
    >
      {/* Dynamic Header */}
      <div className="flex bg-slate-950/60 p-4 border-b border-slate-800 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl overflow-hidden border border-purple-500/30 shadow-md flex-shrink-0">
            <img
              src="/src/assets/images/sahayak_avatar_1781673255214.jpg"
              alt="Maha Energy Sahayak AI assistant"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-left">
            <span className="font-bold text-white text-sm flex items-center gap-1.5 leading-snug">
              Maha Energy Sahayak
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            </span>
            <div className="text-[10px] uppercase font-mono tracking-wide text-amber-300">
              State Solar AI Adviser
            </div>
          </div>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleReset}
            className="p-1 px-2 hover:bg-slate-800 text-slate-500 hover:text-slate-200 transition-colors rounded-lg text-xs font-mono font-semibold flex items-center gap-1 select-none"
            title="Reset history"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </button>
          {!embeddedOnly && onClose && (
            <button
              onClick={onClose}
              className="p-1 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 ml-1"
              aria-label="Close assistant"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Canvas */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/30 scrollbar-thin">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div
              className={`rounded-xl flex-shrink-0 text-slate-950 overflow-hidden ${
                msg.role === "user"
                  ? "p-1.5 bg-slate-800 text-slate-300"
                  : "h-8 w-8 border border-purple-500/20"
              }`}
            >
              {msg.role === "user" ? (
                <div className="h-5 w-5 rounded-full bg-slate-700 text-[10px] flex items-center justify-center font-bold font-mono">
                  YOU
                </div>
              ) : (
                <img
                  src="/src/assets/images/sahayak_avatar_1781673255214.jpg"
                  alt="Maha Energy Sahayak Avatar"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            {/* Bubble */}
            <div className="flex flex-col max-w-[80%] text-left">
              <div
                className={`py-2.5 px-4 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed break-words border whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-slate-800 border-slate-750 text-slate-100 rounded-tr-none"
                    : "bg-slate-900 border-slate-800 text-slate-300 rounded-tl-none"
                }`}
              >
                {msg.content}
              </div>
              <span className="text-[9px] text-slate-600 font-mono mt-1 px-1 self-start select-none">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-start gap-2.5">
            <div className="h-8 w-8 rounded-xl overflow-hidden border border-purple-500/20 flex-shrink-0">
              <img
                src="/src/assets/images/sahayak_avatar_1781673255214.jpg"
                alt="Maha Energy Sahayak Avatar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <div className="py-2.5 px-4 rounded-2xl bg-slate-900 border border-slate-800 rounded-tl-none flex items-center gap-1.5">
                <Loader2 className="h-3.5 w-3.5 text-purple-400 animate-spin" />
                <span className="text-xs text-slate-400">Sahayak is composing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef}></div>
      </div>

      {/* Footer controls: prompt suggestions & input */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/80">
        
        {/* Rapid Suggestions list */}
        <div className="flex flex-wrap gap-1.5 mb-3 select-none">
          {starters.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="text-[10px] py-1 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-0.5"
            >
              <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" />
              {prompt}
            </button>
          ))}
        </div>

        {/* Submit Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="flex gap-2 relative"
        >
          <input
            type="text"
            placeholder="Ask Sahayak about panels, billing, subventions..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 text-white rounded-xl py-3 pl-4 pr-12 text-xs font-semibold focus:outline-none focus:border-purple-500 placeholder-slate-600"
          />
          <button
            type="submit"
            disabled={!inputValue || inputValue.trim() === "" || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-purple-500 hover:bg-purple-600 text-slate-900 rounded-lg disabled:opacity-30 disabled:hover:bg-purple-500 transition-colors flex items-center justify-center"
            aria-label="Send query"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
