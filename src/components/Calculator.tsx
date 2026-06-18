import { useState, useEffect } from "react";
import { Calculator, HelpCircle, Leaf, Sparkles, CheckCircle2, ChevronRight, Sprout, Building, Home } from "lucide-react";
import { SolarCalculatorResult } from "../types";

export default function SolarCalculator() {
  const [monthlyBill, setMonthlyBill] = useState<string>("2500");
  const [sector, setSector] = useState<"residential" | "commercial">("residential");
  const [roofType, setRoofType] = useState<string>("Concrete Flat");
  const [result, setResult] = useState<SolarCalculatorResult | null>(null);

  const calculateSolar = (billVal: number) => {
    if (isNaN(billVal) || billVal <= 0) {
      setResult(null);
      return;
    }

    // Assumptions for Maharashtra electrical billing & solar generation
    // avg Tariff rate per unit (kWh): Residential ~ ₹8.5, Commercial ~ ₹11.5
    const unitRate = sector === "residential" ? 8.5 : 11.5;
    const unitsConsumed = billVal / unitRate;

    // Sizing: 1 kW solar plant generates ~120 units (kWh) per month in Maharashtra (approx 4 units/day)
    const rawRecommendedKw = unitsConsumed / 120;
    // Round to nearest 0.5 kW for practical setups, minimum 1 kW, maximum 100 kW
    const recommendedKw = Math.max(1, Math.min(100, Math.round(rawRecommendedKw * 2) / 2));

    // Panel requirement: Using standard high-efficiency 540W panels (0.54 kW per panel)
    const panelsNeeded = Math.ceil(recommendedKw / 0.54);

    // Required Roof Area: approx 80 sq. feet per kW of solar panel
    const requiredAreaSqFt = recommendedKw * 85;

    // Sourcing pricing estimate in MH: approx ₹62,000 per kW for small system, slight volume scale discounts
    const ratePerKw = recommendedKw <= 3 ? 65000 : recommendedKw <= 10 ? 58000 : 52000;
    const estimatedCost = recommendedKw * ratePerKw;

    // Subsidy (Residential Central PM Surya Ghar Yojana):
    // 1 kW: ₹30,000
    // 2 kW: ₹60,000
    // 3 kW or above: Max ₹78,000
    // Commercial setups get 0 direct cash subsidy, but qualify for 40% accelerated depreciation tax write-off
    let stateSubsidy = 0;
    if (sector === "residential") {
      if (recommendedKw >= 3) {
        stateSubsidy = 78000;
      } else if (recommendedKw === 2.5) {
        stateSubsidy = 69000;
      } else if (recommendedKw === 2) {
        stateSubsidy = 60000;
      } else if (recommendedKw === 1.5) {
        stateSubsidy = 45000;
      } else {
        stateSubsidy = 30500;
      }
    }

    const netInvestment = Math.max(0, estimatedCost - stateSubsidy);

    // Generation metrics: 1 kW yields approx 1440 kWh (units) per year in MH sun patterns
    const annualGenerationKwh = recommendedKw * 1440;

    // Savings metrics
    const monthlySavings = Math.min(billVal, (annualGenerationKwh / 12) * unitRate);
    const annualSavings = monthlySavings * 12;

    // Simple payback period: Net investment / annual savings
    const paybackYears = Number((netInvestment / annualSavings).toFixed(1));

    // Lifetime metrics (25 years panel warrantied operation line)
    const lifetimeSavings = annualSavings * 25;

    // Ecological impact (Grid emission factor India: ~0.82 kg CO2 per kWh)
    const co2SavedTonnes = Number(((annualGenerationKwh * 0.82) / 1000).toFixed(2));
    // Each mature tree absorbs ~22 kg CO2 per year
    const treesPlantedEquivalent = Math.round((co2SavedTonnes * 1000) / 22);

    setResult({
      monthlyBill: billVal,
      recommendedKw,
      panelsNeeded,
      requiredAreaSqFt,
      estimatedCost,
      stateSubsidy,
      netInvestment,
      annualGenerationKwh,
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      paybackYears: isNaN(paybackYears) ? 0 : paybackYears,
      lifetimeSavings: Math.round(lifetimeSavings),
      co2SavedTonnes,
      treesPlantedEquivalent,
    });
  };

  useEffect(() => {
    const numericBill = parseFloat(monthlyBill);
    if (!isNaN(numericBill) && numericBill > 0) {
      calculateSolar(numericBill);
    } else {
      setResult(null);
    }
  }, [monthlyBill, sector, roofType]);

  return (
    <section id="calculator" className="py-20 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold block mb-3">
            📊 INSTANT ESTIMATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Solar Investment Cost & Savings Calculator
          </h2>
          <p className="mt-4 text-slate-400 font-sans font-light">
            Calculated using current Maharashtra state utility tariffs, PM Surya Ghar central subsidies, and local solar irradiance levels.
          </p>
        </div>

        {/* Calculator workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Controls Form Panel */}
          <div className="lg:col-span-5 bg-slate-800/40 p-6 md:p-8 rounded-3xl border border-slate-700/60 shadow-lg text-left">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-amber-500" />
              Configure Your Profile
            </h3>

            {/* Monthly bill input */}
            <div className="mb-6">
              <label htmlFor="input-monthly-bill" className="block text-sm font-semibold text-slate-300 mb-2">
                Monthly Electricity Bill Value (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold font-sans">
                  ₹
                </span>
                <input
                  id="input-monthly-bill"
                  type="number"
                  min="500"
                  max="500000"
                  step="100"
                  placeholder="Enter monthly bill (e.g. 2500)"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3.5 pl-9 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-lg font-semibold"
                />
              </div>
              <p className="mt-1 text-xs text-slate-400 font-mono">
                Suggested range: ₹500 - ₹1,00,000+
              </p>
            </div>

            {/* Tariff sector select */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Tariff Connection Segment
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSector("residential")}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-medium transition-all ${
                    sector === "residential"
                      ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm shadow-amber-500/10"
                      : "bg-slate-950 border-slate-700 text-slate-400 hover:text-white"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  Residential
                </button>
                <button
                  type="button"
                  onClick={() => setSector("commercial")}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-medium transition-all ${
                    sector === "commercial"
                      ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm shadow-amber-500/10"
                      : "bg-slate-950 border-slate-700 text-slate-400 hover:text-white"
                  }`}
                >
                  <Building className="h-4 w-4" />
                  Commercial
                </button>
              </div>
            </div>

            {/* Rooftop construction select */}
            <div className="mb-6">
              <label htmlFor="select-roof-type" className="block text-sm font-semibold text-slate-300 mb-2">
                Rooftop Construction Type
              </label>
              <select
                id="select-roof-type"
                value={roofType}
                onChange={(e) => setRoofType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-300 rounded-xl py-3.5 px-4 focus:outline-none focus:border-amber-500"
              >
                <option>Concrete Flat Rooftop</option>
                <option>Sloped Tin/Metal Shed</option>
                <option>Industrial Galvanized Shed</option>
                <option>Asbestos/Tile Slant</option>
              </select>
            </div>

            {/* State Subsidy note */}
            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-xs text-amber-300/90 leading-relaxed font-sans">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-400">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                PM Surya Ghar Scheme Included
              </div>
              {sector === "residential" ? (
                "Residential installations from 1-3 kW receive up to ₹78,000 central subsidy. Larger systems above 3kW get a flat ₹78,000 subvention."
              ) : (
                "Commercial organizations are ineligible for direct cash subsidies but benefit from up to 40% accelerated yearly tax depreciation in India."
              )}
            </div>
          </div>

          {/* Results Output Canvas */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {result ? (
              <div className="bg-slate-800/20 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl text-left h-full flex flex-col justify-between">
                
                {/* Upper parameters summary */}
                <div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                    <div>
                      <span className="text-slate-400 text-xs font-mono uppercase tracking-wider">Estimated System Capacity</span>
                      <div className="text-3xl font-extrabold text-white">
                        {result.recommendedKw} <span className="text-amber-400 text-xl font-bold">kW Solar PV</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 text-xs font-mono uppercase tracking-wider">Footprint Needed</span>
                      <div className="text-lg font-bold text-slate-200">
                        ~{result.requiredAreaSqFt} <span className="text-sm font-normal text-slate-400">sq. ft</span>
                      </div>
                    </div>
                  </div>

                  {/* Primary Money Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                      <span className="text-[11px] text-slate-400 font-mono uppercase">Gross Cost</span>
                      <div className="text-xl font-bold text-white mt-1">
                        ₹{result.estimatedCost.toLocaleString("en-IN")}
                      </div>
                      <span className="text-[10px] text-slate-400">System & Install</span>
                    </div>

                    <div className="bg-slate-900/60 p-4 rounded-2xl border border-dashed border-emerald-500/20">
                      <span className="text-[11px] text-emerald-400 font-mono uppercase">Lump-Sum Subsidy</span>
                      <div className="text-xl font-bold text-emerald-400 mt-1">
                        {result.stateSubsidy > 0 ? `- ₹${result.stateSubsidy.toLocaleString("en-IN")}` : "₹0"}
                      </div>
                      <span className="text-[10px] text-slate-400">Direct Cashback</span>
                    </div>

                    <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 p-4 rounded-2xl border border-amber-500/20">
                      <span className="text-[11px] text-amber-300 font-mono uppercase">Net Investment</span>
                      <div className="text-xl font-extrabold text-amber-400 mt-1">
                        ₹{result.netInvestment.toLocaleString("en-IN")}
                      </div>
                      <span className="text-[10px] text-slate-400">Net Citizen Outflow</span>
                    </div>
                  </div>

                  {/* Metrics List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-t border-white/5 pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Annual Yield Generation:</span>
                        <span className="text-white font-semibold font-mono">{Math.round(result.annualGenerationKwh).toLocaleString("en-IN")} kWh (units)</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Recommended 540W Panels:</span>
                        <span className="text-white font-semibold">{result.panelsNeeded} Modules</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Calculated Payback Period:</span>
                        <span className="text-amber-300 font-semibold font-mono">{result.paybackYears} Years</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Estimated Monthly Savings:</span>
                        <span className="text-emerald-400 font-semibold font-mono">₹{result.monthlySavings.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Projected Lifetime Earnings:</span>
                        <span className="text-emerald-400 font-bold font-mono">₹{result.lifetimeSavings.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Central Portal Approval Rate:</span>
                        <span className="text-green-500 font-semibold">98.4% (Rapid)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ecological benefits footer */}
                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Sprout className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Carbon Mitigation</div>
                      <div className="text-sm font-semibold text-white">Your Solar Green Handprint</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center sm:text-right">
                      <div className="text-base font-extrabold text-emerald-400 font-mono">-{result.co2SavedTonnes}t</div>
                      <div className="text-[10px] text-slate-400">CO2 Emissions / Yr</div>
                    </div>
                    <div className="h-8 w-px bg-slate-800"></div>
                    <div className="text-center sm:text-right">
                      <div className="text-base font-extrabold text-emerald-400 font-mono">{result.treesPlantedEquivalent}</div>
                      <div className="text-[10px] text-slate-400">Trees Offset / Yr</div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-slate-800/10 p-12 rounded-3xl border border-dashed border-slate-800 h-full flex flex-col items-center justify-center text-center">
                <Calculator className="h-12 w-12 text-slate-600 mb-4 animate-bounce" />
                <h4 className="text-lg font-bold text-slate-300">Awaiting Profile Parameters</h4>
                <p className="text-sm text-slate-500 max-w-sm mt-2 font-sans font-light">
                  Input a valid monthly electricity bill in Rupees on the left to see recommended solar capacities, cashbacks, and financial projections.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
