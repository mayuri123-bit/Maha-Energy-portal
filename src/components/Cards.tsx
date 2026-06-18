import React from "react";
import { CreditCard, Calculator, MapPin, Bot, ArrowRight } from "lucide-react";

interface CardsSectionProps {
  onCardSelect: (category: "bill" | "calculator" | "installers" | "assistant") => void;
}

export default function Cards({ onCardSelect }: CardsSectionProps) {
  const cardsData = [
    {
      id: "bill" as const,
      title: "Pay Utility Bill",
      icon: <CreditCard className="h-6 w-6 text-emerald-400" />,
      tagline: "💡 Speed Payments",
      description: "Inquire MSEDCL accounts, view historic cycles, and complete simulated direct digital clearances securely.",
      colorClass: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
      accentBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
    },
    {
      id: "calculator" as const,
      title: "Solar Calculator",
      icon: <Calculator className="h-6 w-6 text-amber-400" />,
      tagline: "☀️ Sizing & ROI",
      description: "Estimate initial installation costs, central subvention discounts, solar plant footprint, and ecological impacts.",
      colorClass: "hover:border-amber-500/50 hover:shadow-amber-500/10",
      accentBg: "bg-amber-500/10 border-amber-500/20 text-amber-300",
    },
    {
      id: "installers" as const,
      title: "Approved Installers",
      icon: <MapPin className="h-6 w-6 text-blue-400" />,
      tagline: "📍 Direct Sourcing",
      description: "Find certified, PM-Yojana approved solar engineering experts in Pune, Mumbai, Thane, etc., and request quotes.",
      colorClass: "hover:border-blue-500/50 hover:shadow-blue-500/10",
      accentBg: "bg-blue-500/10 border-blue-500/20 text-blue-300",
    },
    {
      id: "assistant" as const,
      title: "Sahayak AI Assistant",
      icon: <Bot className="h-6 w-6 text-purple-400" />,
      tagline: "🤖 Expert Solar Advice",
      description: "Ask queries about central/state solar subsidies, billing concerns, requirements, and solar technical criteria on-the-fly.",
      colorClass: "hover:border-purple-500/50 hover:shadow-purple-500/10",
      accentBg: "bg-purple-500/10 border-purple-500/20 text-purple-300",
    },
  ];

  return (
    <section id="services" className="py-20 bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold block mb-3">
            🎯 HIGH IMPACT FEATURES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
            Maha Energy Citizen Action Services
          </h2>
          <p className="mt-4 text-slate-400 font-sans font-light">
            Providing Maharashtra residents and commercial operators with digital tools to streamline their solar transition, calculate solar yield, and query bills.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsData.map((card) => (
            <div
              key={card.id}
              onClick={() => onCardSelect(card.id)}
              className={`group relative flex flex-col justify-between bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer select-none ${card.colorClass} shadow-md`}
            >
              <div>
                {/* Icon wrapper */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 group-hover:bg-slate-900 transition-colors">
                    {card.icon}
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase py-1 px-2.5 rounded-full border ${card.accentBg}`}>
                    {card.tagline}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-sans font-light mb-6">
                  {card.description}
                </p>
              </div>

              {/* Back anchor indicator */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all mt-auto pt-2">
                Launch tool
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
