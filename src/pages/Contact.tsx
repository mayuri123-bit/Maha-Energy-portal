import React, { useState } from "react";
import PageTransition from "../components/PageTransition";
import ChatAssistant from "../components/ChatAssistant";
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userSubject, setUserSubject] = useState("Solar Installation Grievance");
  const [userMsg, setUserMsg] = useState("");
  const [ticketSuccess, setTicketSuccess] = useState(false);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail || !userMsg) return;

    setTicketSuccess(true);
    setTimeout(() => {
      setTicketSuccess(false);
      setUserName("");
      setUserEmail("");
      setUserMsg("");
    }, 4000);
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-[#030712] pt-24 pb-16 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold block mb-3">
              📞 CONNECT & LOG RESOLUTIONS
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Maha Energy Support & Assistance Desk
            </h1>
            <p className="mt-4 text-sm text-slate-400 font-sans font-light leading-relaxed">
              Log solar subvention tickets with our ministerial team or chat directly with "Maha Energy Sahayak" for instantaneous, expert solar guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Ticket Submission Form Column */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl flex flex-col justify-between text-left h-full">
              <div>
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-amber-500" />
                  Log Support Grievance
                </h3>

                {ticketSuccess ? (
                  <div className="py-12 text-center flex flex-col items-center select-none animate-in zoom-in-95">
                    <CheckCircle2 className="h-12 w-12 text-green-400 mb-3 animate-bounce" />
                    <h4 className="font-bold text-white text-base">Support Ticket Logged!</h4>
                    <p className="text-xs text-slate-400 mt-2 max-w-sm leading-relaxed">
                      Your query has been logged in Maharashtra Renewable Energy's administrative database as an active ticket file. A dispatcher representative will follow up shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleTicketSubmit} className="space-y-4">
                    
                    {/* Name */}
                    <div>
                      <label htmlFor="input-support-name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Consumer or Full Name
                      </label>
                      <input
                        id="input-support-name"
                        type="text"
                        required
                        placeholder="e.g. Mayuri Narwade"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="input-support-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Official Email Address
                      </label>
                      <input
                        id="input-support-email"
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
                      />
                    </div>

                    {/* Category Selection */}
                    <div>
                      <label htmlFor="select-support-subject" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Inquiry Category Segment
                      </label>
                      <select
                        id="select-support-subject"
                        value={userSubject}
                        onChange={(e) => setUserSubject(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-amber-500"
                      >
                        <option>Solar Installation Grievance</option>
                        <option>Direct Cashback Verification Delay</option>
                        <option>Net Metering MSEDCL Reconciliator Issue</option>
                        <option>Other General Inquiries</option>
                      </select>
                    </div>

                    {/* Message Body */}
                    <div>
                      <label htmlFor="input-support-msg" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Disclose Supporting Statement Details
                      </label>
                      <textarea
                        id="input-support-msg"
                        required
                        rows={4}
                        placeholder="Detail your inquiry or invoice reference..."
                        value={userMsg}
                        onChange={(e) => setUserMsg(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-amber-500 font-sans font-light leading-relaxed resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 font-bold text-slate-950 rounded-xl text-xs flex items-center justify-center gap-1 hover:shadow-lg shadow-amber-500/10 cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Dispatch Ticket Record
                    </button>

                  </form>
                )}
              </div>

              {/* Direct Official Addresses */}
              <div className="mt-10 pt-5 border-t border-slate-850 space-y-3.5 text-xs text-slate-400">
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-amber-500" />
                  <span>MEDA MH Office, SB Road, Pune, 411016</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-emerald-500" />
                  <span className="font-mono">1800-200-3435 (Helpline Number)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-purple-400" />
                  <span className="font-mono">support_renewables@maha.gov.in</span>
                </div>
              </div>
            </div>

            {/* AI Assistant Chat Module Column */}
            <div className="lg:col-span-7">
              <ChatAssistant embeddedOnly={true} />
            </div>

          </div>

        </div>
      </div>
    </PageTransition>
  );
}
