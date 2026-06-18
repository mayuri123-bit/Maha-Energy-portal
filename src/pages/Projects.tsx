import { useState, useEffect } from "react";
import PageTransition from "../components/PageTransition";
import Installers from "../components/Installers";
import { Cpu, Zap, Award, Search, Sparkles, Filter, ChevronRight, BarChart3 } from "lucide-react";

interface ProjectItem {
  id: string;
  name: string;
  district: "Pune" | "Mumbai" | "Nagpur" | "Thane";
  capacityKwp: number;
  annualSavingsInr: string;
  status: "Synchronized" | "Active" | "Expansion";
  techStack: string[];
  co2OffsetTonnes: number;
  highlightText: string;
  imgUrl: string;
}

const PILOT_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    name: "CyberCity Smart Rooftop Grid",
    district: "Pune",
    capacityKwp: 120,
    annualSavingsInr: "₹9.2 Lakhs",
    status: "Synchronized",
    techStack: ["Bifacial Panels", "Smart String Inverter", "Net-Meter Model III"],
    co2OffsetTonnes: 98,
    highlightText: "Provides completely self-sufficient communal and corridor lighting across 5 corporate towers under standard Net-Metering protocols.",
    imgUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "proj-2",
    name: "Agri-Feeder Solarization Feed",
    district: "Nagpur",
    capacityKwp: 2500,
    annualSavingsInr: "₹1.4 Crores",
    status: "Active",
    techStack: ["Ground Mount PV", "SCADA telemetry tracking", "IoT Feeder Gateways"],
    co2OffsetTonnes: 2050,
    highlightText: "Powering agricultural water pump systems across Nagpur district, providing 450 farming families with stable daytime electricity credits.",
    imgUrl: "https://images.unsplash.com/photo-1620000617482-821324eb9a14?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "proj-3",
    name: "Suburban Green Housing Collective",
    district: "Thane",
    capacityKwp: 45,
    annualSavingsInr: "₹3.8 Lakhs",
    status: "Synchronized",
    techStack: ["Monocrystalline PERC", "Micro-inverters", "Aadhaar ledger Sync"],
    co2OffsetTonnes: 36,
    highlightText: "Community-driven rooftop canopy installed across four residential lanes, zeroing corridor and elevator maintenance bills.",
    imgUrl: "https://images.unsplash.com/photo-1548613053-22003a8a0499?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "proj-4",
    name: "Bandra Suburban School Grid",
    district: "Mumbai",
    capacityKwp: 35,
    annualSavingsInr: "₹2.9 Lakhs",
    status: "Expansion",
    techStack: ["Flexible Roof Canopies", "DCR Certified cells"],
    co2OffsetTonnes: 28,
    highlightText: "Educational clean energy project. Supplies classrooms with solar power, directing surplus units to Maharashtra's local utility.",
    imgUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop",
  }
];

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState<"All" | "Pune" | "Mumbai" | "Nagpur" | "Thane">("All");

  const filteredProjects = PILOT_PROJECTS.filter((p) => {
    return selectedFilter === "All" || p.district === selectedFilter;
  });

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-[#030712] pt-24 pb-16 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-mono font-bold block mb-3">
              🏢 state pilot installations & partners
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              State Solar Projects & Contractor Directory
            </h1>
            <p className="mt-4 text-sm text-slate-400 font-sans font-light leading-relaxed">
              Explore notable green grids currently synchronized with Maharashtra State Electricity Board, and connect with certified solar technicians.
            </p>
          </div>

          {/* Interactive State Projects filter section */}
          <div className="mb-28 text-left">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 border-b border-slate-800 pb-5">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight font-sans">
                  Active State Feeder Feeds
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Re-filtered by urban district sectors to highlight solar load capacities.
                </p>
              </div>

              {/* Sorter Pills */}
              <div className="flex flex-wrap gap-1.5 self-stretch sm:self-auto select-none">
                {(["All", "Pune", "Mumbai", "Nagpur", "Thane"] as const).map((dist) => (
                  <button
                    key={dist}
                    onClick={() => setSelectedFilter(dist)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide border uppercase transition-all cursor-pointer ${
                      selectedFilter === dist
                        ? "bg-blue-500/10 border-blue-500 text-blue-400 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-405 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    {dist}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-slate-900/60 rounded-3xl overflow-hidden border border-slate-800 hover:border-blue-500/20 transition-all duration-300 flex flex-col justify-between shadow-lg"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-950 p-2">
                    <img
                      src={project.imgUrl}
                      alt={project.name}
                      className="w-full h-full object-cover rounded-2xl opacity-80 group-hover:scale-102 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    <div className="absolute top-4 right-4 flex gap-1.5 select-none">
                      <span className="px-2.5 py-1 rounded bg-slate-950/90 text-[10px] font-bold font-mono tracking-wider text-blue-400 uppercase border border-slate-800">
                        {project.district}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-slate-950/90 text-[10px] font-bold font-mono tracking-wider text-emerald-400 uppercase border border-slate-880/80 animate-pulse">
                        ● {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 text-left flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans font-light">
                        {project.highlightText}
                      </p>

                      <div className="flex flex-wrap gap-1.5 my-4">
                        {project.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-950 text-slate-400 text-[10px] py-1 px-2.5 rounded font-mono border border-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Numeric Stats banner inside block */}
                    <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 font-mono">
                      <div>
                        <span className="text-[10px] text-slate-500 block">CONNECTED LOAD</span>
                        <strong className="text-white text-sm font-bold font-mono">{project.capacityKwp} kWp</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block">CARBON MITIGATION</span>
                        <strong className="text-emerald-400 text-xs font-bold font-mono">-{project.co2OffsetTonnes} CO₂ Tons/yr</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Certified Approved Contractors Sourcing module */}
          <div className="border-t border-slate-900 pt-16">
            <Installers />
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
