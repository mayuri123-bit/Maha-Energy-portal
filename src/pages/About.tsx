import { useState } from "react";
import PageTransition from "../components/PageTransition";
import { ShieldCheck, Calendar, Users, Award, ChevronRight, CheckCircle2, Building, ArrowUpRight } from "lucide-react";

export default function About() {
  const [activeTimeline, setActiveTimeline] = useState(2);

  const timelineSteps = [
    {
      year: "2018",
      title: "State Net Metering Policy",
      desc: "Maharashtra mandates grid-interactive solar connections for residential buildings, introducing initial billing credit codes.",
    },
    {
      year: "2021",
      title: "Agri-Feeder Solarization",
      desc: "Launched a state cabinet-funded pipeline to solarize agricultural water pumps, feeding 100,000 farmers clean local power.",
    },
    {
      year: "2024",
      title: "India PM Surya Ghar Initiative",
      desc: "Integrated flat central cashbacks of ₹78,000 for up to 3kW residential rooftop setups, triggering immediate private sign-ups.",
    },
    {
      year: "2026",
      title: "Decentralized Smart Microgrids",
      desc: "Implementing real-time state ledger syncs and IoT meters with regional utilities to pay green incentives automatically.",
    }
  ];

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-[#030712] pt-24 pb-16 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Block */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#a855f7] font-mono font-bold block mb-3">
              🏛️ OUR CONTEXT & MISSION
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Powering Maharashtra’s Sustainable Next-Gen Grid
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-400 font-sans font-light leading-relaxed">
              Maha Energy is the official, unified digital interface bridging Maharashtra's energy citizens with the Central Government's historic PM Surya Ghar Muft Bijli Yojana.
            </p>
          </div>

          {/* Two-Column split split elements */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
            
            {/* Mission Statements */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
                A Unified Alliance: MEDA & MSEDCL
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans font-light">
                Under directives from the Maharashtra Ministry of Energy, our digital intelligence layer acts in direct synchronization with the <strong>Maharashtra Energy Development Agency (MEDA)</strong> and <strong>MSEDCL (Mahadiscom)</strong>.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3.5 items-start">
                  <div className="p-2 ml-1 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mt-0.5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm leading-tight">National Security Clearances</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Every panel, meter calculation, and registered installer holds active certification under the MNRE (Ministry of New and Renewable Energy, India).
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="p-2 ml-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mt-0.5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm leading-tight">Direct Cashback Disbursement</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      No bureaucratic leakages. Subsidies are routed securely into the consumer's Aadhaar-linked utility clearance account in 30 days.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="p-2 ml-1 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mt-0.5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm leading-tight">State Grid Rebalancing</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Reduces peak coal load demands on thermal units in Vidarbha, moving local solar generation straight to suburban centers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Split Image Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-slate-800 shadow-2xl p-2.5 bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop"
                  alt="Aesthetic solar engineer Pune rooftop installation"
                  className="w-full h-full object-cover rounded-2xl opacity-90 transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-[10px] font-mono tracking-wider font-semibold">
                  MEDA ACCREDITED
                </div>
              </div>
            </div>

          </div>

          {/* Policy interactive milestone timeline block */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 mb-20 text-left relative shadow-lg">
            <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold block mb-2">
              ⚡ COMPREHENSIVE ROADMAP
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
              Maharashtra Solar Policy Evolution
            </h3>
            <p className="text-xs text-slate-400 mb-10 max-w-2xl font-light">
              Review how our clean energy legislation has evolved to incentivize rooftop installations. Select a milestone below to read technical implications.
            </p>

            {/* Steps buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {timelineSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTimeline(idx)}
                  className={`p-4 rounded-xl text-left border transition-all select-none cursor-pointer ${
                    activeTimeline === idx
                      ? "bg-amber-500/10 border-amber-500/40 text-white"
                      : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold text-amber-500 select-none">
                    STEP {idx + 1}
                  </div>
                  <div className="text-sm font-bold mt-1 font-mono">{step.year}</div>
                  <div className="text-xs font-semibold truncate mt-0.5">{step.title}</div>
                </button>
              ))}
            </div>

            {/* Step Detail Display */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 text-[11px] font-bold font-mono bg-amber-500 text-slate-950 rounded-md">
                  {timelineSteps[activeTimeline].year}
                </span>
                <h4 className="font-bold text-white text-base font-sans">
                  {timelineSteps[activeTimeline].title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {timelineSteps[activeTimeline].desc}
              </p>
            </div>
          </div>

          {/* Agencies Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 text-left">
              <span className="h-9 w-9 rounded-xl bg-purple-500/15 border border-purple-500/25 text-purple-400 flex items-center justify-center font-bold mb-4">
                <Building className="h-5 w-5" />
              </span>
              <h4 className="text-white font-bold text-lg mb-2">MEDA Mandates</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Maharashtra Energy Development Agency coordinates renewable programs, evaluates technical standards, and maintains the regional pool of certified installers to prevent project delivery errors.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 text-left">
              <span className="h-9 w-9 rounded-xl bg-amber-500/15 border border-amber-500/25 text-amber-400 flex items-center justify-center font-bold mb-4">
                <Award className="h-5 w-5" />
              </span>
              <h4 className="text-white font-bold text-lg mb-2">MNRE Approved Standards</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                National PM Surya Ghar subsidy rules dictate that only DCR (Domestic Content Requirement) certified silicon cells constitute eligible installations to trigger central cashbacks.
              </p>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
