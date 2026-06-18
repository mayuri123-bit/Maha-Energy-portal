import React from "react";
import { Sun, Heart, ExternalLink, HelpCircle, PhoneCall, ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-slate-950 border-t border-slate-900 py-12 md:py-16 text-left relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/5 pb-12 mb-12">
          
          {/* Logo & Info column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
                <Sun className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Maha <span className="text-amber-400">Energy</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans max-w-sm leading-relaxed font-light">
              Autonomous state-citizen utility information interface managed under Maharashtra State Renewable Energy Corporation. Empowering local communities to transition to 100% net-zero solar infrastructure under central PM subventions.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>MEDA / MSEDCL RENEWABLES REGISTERED</span>
            </div>
          </div>

          {/* Quick Access Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs uppercase tracking-widest text-slate-400 font-mono font-bold">STATE REVOLUTION</h5>
            <ul className="space-y-2 text-xs text-slate-400 font-sans font-medium">
              <li>
                <a href="#home" className="hover:text-amber-300 transition-colors">MH Solar Citizen Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-300 transition-colors">Action Card Services</a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-300 transition-colors">PM Sizing Calculator</a>
              </li>
              <li>
                <a href="#installers" className="hover:text-amber-300 transition-colors">MEDA Approved Contractors</a>
              </li>
            </ul>
          </div>

          {/* Citizen support Hotline numbers */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="text-xs uppercase tracking-widest text-slate-400 font-mono font-bold">CITIZEN SUPPORTS</h5>
            <div className="space-y-3 text-xs text-slate-400 font-sans leading-relaxed">
              <div className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-emerald-500" />
                <div>
                  <div className="font-bold text-white font-mono">1800-200-3435</div>
                  <span className="text-[10px] text-slate-400">National PM Surya Ghar Helpline</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-blue-400" />
                <div>
                  <div className="font-bold text-white font-mono">msedcl_support@maha.gov.in</div>
                  <span className="text-[10px] text-slate-400">Regional Discom renewables support</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Base bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © {currentYear} Maha Energy State Portal. Registered under Maharashtra Energy Ministry.
          </div>
          <div className="flex items-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 text-rose-500 fill-current" /> for a clean Maharashtra
          </div>
        </div>

      </div>
    </footer>
  );
}
