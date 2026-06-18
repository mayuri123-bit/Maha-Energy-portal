import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import PageTransition from "../components/PageTransition";
import { Sun, ArrowRight, Sparkles, Cpu, Zap, ShieldCheck, Landmark, BarChart3, Users, Globe } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  // Active statistics counters
  const [stats, setStats] = useState({
    citizens: 124500,
    capacity: 345,
    carbonOffset: 79200,
  });

  useEffect(() => {
    // Generate organic micro-counting updates for visual interaction
    const interval = setInterval(() => {
      setStats((prev) => ({
        citizens: prev.citizens + Math.floor(Math.random() * 3),
        capacity: +(prev.capacity + Math.random() * 0.05).toFixed(2),
        carbonOffset: prev.carbonOffset + Math.floor(Math.random() * 2),
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const featureCards = [
    {
      title: "Real-time Bill Analytics",
      description: "Lookup current consumer cycles, review historical metrics, and reconcile solar energy generation credit claims.",
      icon: <Zap className="h-6 w-6 text-emerald-400" />,
      link: "/services?tab=billing",
      accent: "from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-400",
    },
    {
      title: "Solar Sizing Simulator",
      description: "Evaluate load capacities, space dimensions, rooftop orientations, and generate direct break-even metrics in Pune or Mumbai.",
      icon: <Sun className="h-6 w-6 text-amber-500" />,
      link: "/services?tab=calculator",
      accent: "from-amber-500/10 to-transparent border-amber-500/20 text-amber-400",
    },
    {
      title: "Active State Feeder Networks",
      description: "Explore current solar pilot projects, sub-feeder connections, and progress metrics under our state projects timeline.",
      icon: <Cpu className="h-6 w-6 text-blue-400" />,
      link: "/projects",
      accent: "from-blue-500/10 to-transparent border-blue-500/20 text-blue-400",
    },
    {
      title: "GIS Satellitary Intelligence",
      description: "Calculate direct solar irradiance coefficients using state-of-the-art GIS satellite data for Maharashtra's terrain.",
      icon: <Globe className="h-6 w-6 text-purple-400" />,
      link: "/skills",
      accent: "from-purple-500/10 to-transparent border-purple-500/20 text-purple-400",
    },
  ];

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-[#030712] pt-24 pb-16 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none"></div>
        <div className="absolute inset-x-0 top-[35%] h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>

        {/* Hero Frame */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Main Grid: Info | Interactive Graphic */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[75vh]">
            
            {/* Visual Column Block */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Promo Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider font-mono select-none animate-pulse">
                <Sparkles className="h-3.5 w-3.5" />
                <span>PM Surya Ghar Portal Active</span>
              </div>

              {/* Title Section */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
                A clean energy era is launching in <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">Maharashtra</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl font-sans font-extralight leading-relaxed">
                Connect and solarize your property through Maharashtra Ministry's modern intelligence hub. Track real-time net-metering metrics, secure flat ₹78,000 cashbacks, and transition seamlessly with approved partners.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 select-none">
                <button
                  onClick={() => navigate("/services?tab=calculator")}
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-bold px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  Configure My Panel Setup
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate("/about")}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 px-8 py-4 rounded-2xl text-sm font-semibold transition-colors flex items-center justify-center cursor-pointer"
                >
                  View State Progress
                </button>
              </div>

              {/* Trust markers */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-900">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  <div className="text-left">
                    <div className="text-white text-xs font-bold leading-none">MEDA Reg.</div>
                    <span className="text-[10px] text-slate-500 font-mono">Ministry Database</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Landmark className="h-5 w-5 text-amber-500" />
                  <div className="text-left">
                    <div className="text-white text-xs font-bold leading-none">₹78k Subsidy</div>
                    <span className="text-[10px] text-slate-500 font-mono">Instant Cashback</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Cpu className="h-5 w-5 text-blue-400" />
                  <div className="text-left">
                    <div className="text-white text-xs font-bold leading-none">IoT Sync</div>
                    <span className="text-[10px] text-slate-500 font-mono">Net-Metering API</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Aesthetic Graphic Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full max-w-md mx-auto aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden glassmorphism p-3 border border-white/5 shadow-2xl group flex items-center justify-center">
                <img
                  src="/src/assets/images/maha_solar_hero_1781673232744.jpg"
                  alt="Solar panel array installation Pune Maharashtra"
                  className="w-full h-full object-cover rounded-2xl opacity-90 transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded Glassmorphic interactive overlay element */}
                <div className="absolute bottom-6 left-6 right-6 glassmorphism p-4 rounded-2xl border border-white/10 flex items-center gap-3 backdrop-blur-md">
                  <div className="p-2 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 rounded-xl">
                    <Sun className="h-5 w-5 animate-spin-slow" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-mono text-amber-400 tracking-wide">PM SURYA GHAR INITIATIVE</div>
                    <div className="text-xs font-bold text-white leading-tight">MSEDCL Net-Meter Validated</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Cumulative Telemetry Metrics section */}
          <div className="py-12 px-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center select-none shadow-md">
            
            <div className="relative border-r border-slate-800/80 last:border-0 md:px-4">
              <div className="flex justify-center mb-1 bg-amber-500/10 text-amber-400 p-2 rounded-xl mx-auto w-fit">
                <Users className="h-5 w-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                {stats.citizens.toLocaleString("en-IN")}
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1 font-semibold">
                Authorized MH Solar Citizens
              </div>
            </div>

            <div className="relative border-r border-slate-800/80 last:border-0 md:px-4">
              <div className="flex justify-center mb-1 bg-purple-500/10 text-purple-400 p-2 rounded-xl mx-auto w-fit">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                {stats.capacity} MW
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1 font-semibold">
                On-Grid Connected Load
              </div>
            </div>

            <div className="relative md:px-4">
              <div className="flex justify-center mb-1 bg-emerald-500/10 text-emerald-400 p-2 rounded-xl mx-auto w-fit">
                <Globe className="h-5 w-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                {stats.carbonOffset.toLocaleString("en-IN")} Tonnes
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1 font-semibold">
                Aggregate CO₂ Intercepted
              </div>
            </div>

          </div>

          {/* Premium Highlight Card Services */}
          <div className="mt-28 mb-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold block mb-2">
                ⚡ PORTAL CAPABILITIES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Modern Citizen Operations Gateway
              </h2>
              <p className="mt-2 text-sm text-slate-400 font-sans font-light">
                Utilize highly precise, state-backed calculation models and interactive simulators to plan your solar transition stress-free.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featureCards.map((feat, i) => (
                <div
                  key={i}
                  onClick={() => navigate(feat.link)}
                  className="group relative flex flex-col justify-between bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 hover:border-amber-500/20 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer shadow-lg select-none"
                >
                  <div>
                    {/* Circle icon */}
                    <div className="p-3 w-fit rounded-xl bg-slate-950 border border-slate-800 text-slate-300 group-hover:border-amber-400/20 transition-all mb-5">
                      {feat.icon}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-400 transition-colors text-left leading-tight">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans text-left font-light mb-4">
                      {feat.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono font-semibold text-amber-400 mt-auto pt-2">
                    Proceed to tool
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
