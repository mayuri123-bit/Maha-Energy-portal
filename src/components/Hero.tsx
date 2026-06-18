import { ArrowRight, Sparkles, Sun, Info, ShieldCheck, Zap } from "lucide-react";

interface HeroProps {
  onActionClick: (target: string) => void;
}

export default function Hero({ onActionClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center bg-slate-950 pt-28 pb-16 overflow-hidden select-none"
    >
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[10%] left-[5%] w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[5%] w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none animate-pulse duration-4000"></div>

      {/* Grid Pattern overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text Area */}
          <div className="lg:col-span-7 flex flex-col items-start text-left mt-2 md:mt-0">
            {/* Tag block */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-6 font-mono shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-spin" />
              <span>⚡ MH-MSEDCL Approved Solar Initiative</span>
            </div>

            {/* Title / Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans text-white tracking-tight leading-tight mb-6">
              Future of Clean Energy in <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">
                Maharashtra
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-sans font-light max-w-2xl mb-8 leading-relaxed">
              Power your home or workspace with the sun. Log in to pay utility bills instantly, discover PM Surya Ghar subvented installers, perform granular ROI solar sizing, and chat with our active AI adviser.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                id="hero-get-started"
                onClick={() => onActionClick("calculator")}
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg shadow-amber-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Estimate Savings
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                id="hero-explore-installers"
                onClick={() => onActionClick("installers")}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300"
              >
                Browse Installers
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center gap-6 text-slate-400 border-t border-white/5 pt-8 w-full">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-400" />
                <span className="text-xs uppercase tracking-wide font-mono">75,000+ MH Citizen Rooftops</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-400" />
                <span className="text-xs uppercase tracking-wide font-mono">Instant Pay & Subsidies</span>
              </div>
            </div>
          </div>

          {/* Hero Image Section */}
          <div className="lg:col-span-12 xl:col-span-5 relative w-full flex justify-center items-center">
            <div className="relative w-full max-w-lg lg:max-w-none aspect-[4/3] sm:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 border border-white/10 bg-slate-900 group">
              {/* Custom high-fidelity generated solar hero image */}
              <img
                src="/src/assets/images/maha_solar_hero_1781673232744.jpg"
                alt="State-of-the-art Residential Solar Panel Installation in Maharashtra"
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

              {/* Float badge inside image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-xl flex items-center gap-3">
                <span className="flex-shrink-0 bg-amber-500/20 text-amber-300 p-2 rounded-xl">
                  <Sun className="h-5 w-5 text-amber-500 animate-spin-slow" />
                </span>
                <div className="text-left">
                  <div className="text-white text-sm font-bold">PM Surya Ghar Yojana</div>
                  <div className="text-slate-300 text-xs">Unlock up to ₹78,000 Direct Bank Subsidy</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
