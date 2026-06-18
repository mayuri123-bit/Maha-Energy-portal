import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import SolarCalculator from "../components/Calculator";
import BillPay from "../components/BillPay";
import { Calculator, CreditCard, Sparkles, HelpCircle } from "lucide-react";

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "billing" ? "billing" : "calculator";
  const [activeTab, setActiveTab] = useState<"calculator" | "billing">(initialTab);

  // Sync tab active state with searchParams if update occurs of navigation
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "billing") {
      setActiveTab("billing");
    } else {
      setActiveTab("calculator");
    }
  }, [searchParams]);

  const handleTabChange = (tab: "calculator" | "billing") => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-[#030712] pt-24 pb-16 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-[5%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[450px] h-[450px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono font-bold block mb-3">
              ⚡ CITIZEN APPLICATIONS & SIMULATORS
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Maha Energy Utility Station
            </h1>
            <p className="mt-3 text-sm text-slate-400 font-sans font-light leading-relaxed">
              Explore solar yield sizing patterns or verify current meter bill readings instantly. Switch workspaces using the control deck below.
            </p>
          </div>

          {/* Toggle Deck */}
          <div className="max-w-md mx-auto mb-16 select-none">
            <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-2xl flex items-center gap-1">
              <button
                onClick={() => handleTabChange("calculator")}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === "calculator"
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Calculator className="h-4.5 w-4.5" />
                Solar Sizing Estimator
              </button>
              <button
                onClick={() => handleTabChange("billing")}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === "billing"
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <CreditCard className="h-4.5 w-4.5" />
                Direct Bill Pay
              </button>
            </div>
          </div>

          {/* Workspace Switcher Component displays */}
          <div className="relative">
            {activeTab === "calculator" ? (
              <div className="animate-in fade-in zoom-in-95 duration-400">
                <SolarCalculator />
              </div>
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-400">
                <BillPay />
              </div>
            )}
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
