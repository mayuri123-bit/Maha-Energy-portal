import React from "react";
import { Trees, CheckCircle2, Leaf, HeartPulse } from "lucide-react";

export default function HomeAbout() {
  const points = [
    {
      title: "Reduce Electricity Bills",
      description: "Switching to solar can lower your monthly utility costs by up to 80-90% by producing your own reliable power.",
      icon: <CheckCircle2 className="h-5 w-5 text-amber-500" />,
    },
    {
      title: "Clean Footprint & Living",
      description: "Mitigate thousands of metric tonnes of CO2 emissions, reducing coal reliance and building a pollution-free environment.",
      icon: <Leaf className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Direct Subvention Subsidies",
      description: "Under India's PM Surya Ghar Muft Bijli Yojana, reap up to ₹78,000 direct bank cashbacks with rapid verification approvals.",
      icon: <Trees className="h-5 w-5 text-emerald-500" />,
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text block */}
          <div className="flex flex-col text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500 mb-3">
              🌱 ECO-FRIENDLY REVOLUTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans text-white tracking-tight leading-tight mb-4">
              Clean Energy. Smart Living.
            </h2>
            <p className="text-slate-300 font-sans font-light text-base sm:text-lg mb-8 leading-relaxed">
              Transition to clean energy effortlessly. Maharashtra is leading the way in solar rooftop deployment, helping local households and enterprises optimize utility expenses while securing cleaner air for posterity.
            </p>

            {/* Bullets */}
            <div className="space-y-6">
              {points.map((point, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 mt-0.5 p-2 rounded-lg bg-slate-900 border border-slate-800">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">
                      {point.title}
                    </h4>
                    <p className="text-sm text-slate-400 font-sans font-light leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image block */}
          <div className="relative">
            {/* Soft ambient lighting inside split */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-blue-500/10 blur-[60px] pointer-events-none"></div>

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop"
                alt="Aesthetic solar panels under natural direct skylight in Pune"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent"></div>

              {/* Float statistic panel */}
              <div className="absolute bottom-6 right-6 left-6 p-6 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-white/5 flex justify-between items-center text-center">
                <div>
                  <div className="text-2xl font-bold text-amber-400">25 Years</div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Warranty Life</div>
                </div>
                <div className="h-8 w-px bg-slate-800"></div>
                <div>
                  <div className="text-2xl font-bold text-green-400">2.8 Tonnes</div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">CO2 Prevented / Yr</div>
                </div>
                <div className="h-8 w-px bg-slate-800"></div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">₹72,000</div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Avg. Yearly Savings</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
