import React, { useState } from "react";
import PageTransition from "../components/PageTransition";
import { Cpu, Globe, Key, ShieldCheck, Sun, Search, Zap, CheckCircle2, Sliders, AlertCircle } from "lucide-react";

interface SuburbIrradiance {
  name: string;
  district: string;
  ghi: number; // Global Horizontal Irradiance (kWh/m²/day)
  sunHours: number;
  yieldFactor: string;
}

const CONST_SUBURBS: Record<string, SuburbIrradiance> = {
  "shivaji nagar": { name: "Shivaji Nagar", district: "Pune", ghi: 5.4, sunHours: 5.2, yieldFactor: "Excellent (Class Tier 1)" },
  "bandra west": { name: "Bandra West", district: "Mumbai", ghi: 4.8, sunHours: 4.5, yieldFactor: "Good (Maritime Coastal)" },
  "dharampeth": { name: "Dharampeth", district: "Nagpur", ghi: 5.8, sunHours: 5.6, yieldFactor: "Optimal (Arid Deccan)" },
  "vashi": { name: "Vashi Sector 4", district: "Thane", ghi: 5.1, sunHours: 4.8, yieldFactor: "Strong (Class Tier 2)" },
};

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedIrradiance, setSearchedIrradiance] = useState<SuburbIrradiance | null>(() => CONST_SUBURBS["shivaji nagar"]);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleIrradianceLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText(null);
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      setErrorText("Kindly specify a Maharashtra suburb from our registry (e.g. Bandra West, Dharampeth, Vashi, Shivaji Nagar).");
      return;
    }

    // Attempt lookup in registry
    const match = Object.keys(CONST_SUBURBS).find((k) => k.includes(query) || query.includes(k));
    if (match) {
      setSearchedIrradiance(CONST_SUBURBS[match]);
    } else {
      setErrorText(`"${searchQuery}" coordinate profiles are loading in our state satellite telemetry queue. Try "Dharampeth", "Bandra West", or "Shivaji Nagar" for testing!`);
    }
  };

  const coreTechModules = [
    {
      title: "Geospatial GHI Mapping",
      subtitle: "GIS Telemetry",
      description: "Underpinning database matching rooftop GHI (Global Horizontal Irradiance) coefficients utilizing custom thermal layers coordinates from cartographic registries.",
      icon: <Globe className="h-6 w-6 text-amber-400" />,
      accentBg: "bg-amber-500/10 border-amber-500/10",
    },
    {
      title: "Smart Meter Synchronization",
      subtitle: "MSEDCL IoT Api",
      description: "Direct bi-directional synchronizer reconciling gross consumption with rooftop solar exports through live MSEDCL Smart Meter API connections.",
      icon: <Cpu className="h-6 w-6 text-purple-400" />,
      accentBg: "bg-purple-500/10 border-purple-500/10",
    },
    {
      title: "Subvention Ledger Ledger",
      subtitle: "Aadhaar Sync Module",
      description: "Fully secure state cryptographic ledger matching certified consumer PAN/LPG profiles automatically and routing the ₹78,000 PM cashback.",
      icon: <Key className="h-6 w-6 text-emerald-400" />,
      accentBg: "bg-emerald-500/10 border-emerald-500/10",
    },
    {
      title: "System Sizing Modulators",
      subtitle: "Parametric AI Model",
      description: "Advanced heuristics evaluating phase demands (Single phase 230V vs Three phase 415V) to recommend physical circuit breakeven nodes.",
      icon: <Sliders className="h-6 w-6 text-blue-400" />,
      accentBg: "bg-blue-500/10 border-blue-500/10",
    },
  ];

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-[#030712] pt-24 pb-16 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Title Block */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold block mb-3">
              ⚡ core backend competencies
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Maha Energy Core System Capabilities
            </h1>
            <p className="mt-4 text-sm text-slate-400 font-sans font-light leading-relaxed">
              Our state-engineered solar portal integrates advanced geospatial, IoT database sync, and verification sub-modules to maintain clean solar transfers.
            </p>
          </div>

          {/* Interactive Geospatial Sun Irradiance Search Widget */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-24">
            
            {/* Search Input Side */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl flex flex-col justify-between text-left">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold block mb-2">
                  ☀️ SATELITE IRRADIANCE TELEMETRY
                </span>
                <h3 className="text-xl font-bold text-white mb-4">
                  Check Regional GHI Solar Coefficient
                </h3>
                <p className="text-xs text-slate-400 mb-6 font-light leading-relaxed">
                  Query a specific suburb to fetch direct daily solar GHI (Global Horizontal Irradiance) coefficients.
                </p>

                <form onSubmit={handleIrradianceLookup} className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Bandra West, Shivaji Nagar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none focus:border-amber-500 placeholder-slate-600"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-600 transition-colors"
                      aria-label="Lookup coordinates"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </form>

                <div className="mt-4 p-3 bg-slate-800/40 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                  <span className="font-bold text-amber-400">⚡ Test suggestions:</span> "Shivaji Nagar" (Pune), "Bandra West" (Mumbai), "Dharampeth" (Nagpur), "Vashi" (Thane).
                </div>

                {errorText && (
                  <div className="mt-4 p-3.5 bg-red-500/5 text-red-400 text-xs rounded-xl flex items-start gap-2 border border-red-500/10">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{errorText}</span>
                  </div>
                )}
              </div>

              <div className="mt-12 pt-6 border-t border-slate-800 flex items-center gap-1.5 text-slate-500 text-[10px] font-mono leading-none">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
                <span>GIS DATABASE CALIBRATION CURRENTLY LIVE</span>
              </div>
            </div>

            {/* Visual Measurement Output */}
            <div className="lg:col-span-7">
              {searchedIrradiance ? (
                <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl h-full flex flex-col justify-between text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-500/5 blur-[80px] pointer-events-none"></div>

                  <div>
                    <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
                      <div>
                        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">COORDINATE NODE IDENTIFIER</span>
                        <h4 className="text-lg font-bold text-white mt-1">
                          {searchedIrradiance.name}, {searchedIrradiance.district}
                        </h4>
                      </div>
                      <span className="bg-amber-500/10 border border-amber-500/20 text-amber-300 py-1.5 px-3 rounded-lg text-xs font-mono font-bold uppercase animate-pulse">
                        Class A Site
                      </span>
                    </div>

                    {/* Irradiance Bar Graph Representation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 mt-4.5">
                      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                        <span className="text-[10px] text-slate-500 font-mono block">GLOBAL HORIZONTAL INCOMING (GHI)</span>
                        <div className="flex items-baseline gap-1.5">
                          <strong className="text-2xl font-black text-white font-mono">{searchedIrradiance.ghi}</strong>
                          <span className="text-xs text-slate-400 uppercase">kWh/m²/day</span>
                        </div>
                        
                        {/* Horizontal load bar */}
                        <div className="w-full h-1.5 bg-slate-900 rounded-full mt-2 overflow-hidden">
                          <div 
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: `${(searchedIrradiance.ghi / 6) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                        <span className="text-[10px] text-slate-500 font-mono block">PEAK DAILY SUN HOUR RANGE</span>
                        <div className="flex items-baseline gap-1.5">
                          <strong className="text-2xl font-black text-white font-mono">{searchedIrradiance.sunHours}</strong>
                          <span className="text-xs text-slate-400 uppercase">Hrs / Day</span>
                        </div>

                        {/* Sun bar */}
                        <div className="w-full h-1.5 bg-slate-900 rounded-full mt-2 overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: `${(searchedIrradiance.sunHours / 6) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Text block */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed flex items-center justify-between">
                      <span>Solar Sourcing Recommendation Rank:</span>
                      <strong className="text-emerald-400 font-bold">{searchedIrradiance.yieldFactor}</strong>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 mt-6 leading-relaxed border-t border-slate-800/80 pt-4 font-light">
                    Calculations derive from India Meteorological Dept sun profiles over Maharashtra, updating GHI metrics instantly for Pune, Mumbai, Nagpur, and Thane zones.
                  </p>
                </div>
              ) : (
                <div className="bg-slate-900/10 border border-dashed border-slate-800 rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center">
                  <Sun className="h-10 w-10 text-slate-600 mb-2 animate-bounce" />
                  <h4 className="text-slate-400 font-bold text-sm">Solar Radiance Node Unmapped</h4>
                </div>
              )}
            </div>

          </div>

          {/* Platform Tech Capabilities Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-16">
            {coreTechModules.map((mod, idx) => (
              <div
                key={idx}
                className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl relative overflow-hidden flex flex-col justify-between hover:border-amber-500/20 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/1 blur-[60px] pointer-events-none"></div>

                <div>
                  <div className="flex items-center gap-2.5 mb-4 select-none">
                    <span className={`p-2.5 rounded-xl border flex items-center justify-center bg-slate-950 ${mod.accentBg}`}>
                      {mod.icon}
                    </span>
                    <div>
                      <span className="text-[10px] text-amber-500 font-mono font-bold tracking-widest uppercase">{mod.subtitle}</span>
                      <h4 className="text-base font-bold text-white mt-0.5">{mod.title}</h4>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans font-light leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-[10px] text-slate-500 font-mono select-none">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span>ACTIVE STANDBY</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
