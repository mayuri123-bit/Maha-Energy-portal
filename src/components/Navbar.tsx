import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Menu, X, ShieldAlert, PhoneCall } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Projects", path: "/projects" },
    { label: "Skills", path: "/skills" },
    { label: "Contact", path: "/contact" },
  ];

  const currentPath = location.pathname;

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#030712]/90 backdrop-blur-md shadow-lg border-b border-white/5 py-3"
          : "bg-gradient-to-b from-black/60 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Link to Home */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-102"
          >
            <div className="bg-amber-500 text-slate-950 p-2 rounded-xl shadow-md shadow-amber-500/20">
              <Sun className="h-6 w-6 animate-pulse" />
            </div>
            <div className="text-left">
              <span className="text-xl md:text-2xl font-bold font-sans tracking-tight text-white">
                Maha <span className="text-amber-400">Energy</span>
              </span>
              <div className="text-[10px] uppercase tracking-wider text-amber-300/85 font-mono -mt-1 font-semibold">
                Maharashtra State Solar Portal
              </div>
            </div>
          </Link>

          {/* Desktop Nav links with proper active paths */}
          <nav className="hidden md:flex items-center gap-1 select-none">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all ${
                    isActive
                      ? "text-amber-400 bg-white/10 font-bold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Quick Support Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold select-none">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            PM Surya Ghar Live Subsidies Active
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-1.5 rounded-lg hover:bg-white/5"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer Links */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "text-amber-400 bg-white/10 font-bold border-l-4 border-amber-400 pl-3"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-3 px-4 flex items-center justify-between border-t border-slate-800 text-xs font-mono text-amber-300">
              <span>⚡ PM Surya Ghar Subsidies Active</span>
              <span className="text-green-500">● LIVE</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
