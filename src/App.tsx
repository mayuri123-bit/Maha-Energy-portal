import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import ChatAssistant from "./components/ChatAssistant";
import Footer from "./components/Footer";
import { Sun, ShieldAlert, KeyRound, Mail, Sparkles, MessageSquare, X, CheckCircle } from "lucide-react";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("maha_citizen_auth") === "true";
  });
  const [email, setEmail] = useState("mayuri@mahaenergy.gov.in");
  const [password, setPassword] = useState("solar2026");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  // App layout states
  const [showFloatingAI, setShowFloatingAI] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError("Please enter your MSEDCL registered email and confidential passkey.");
      return;
    }

    setLoginError(null);
    setLoginSuccess(true);

    // Simulate cryptographic state authorization
    setTimeout(() => {
      setIsLoggedIn(true);
      localStorage.setItem("maha_citizen_auth", "true");
      setLoginSuccess(false);
      navigate("/"); // Ensure we land cleanly on Home
    }, 1500);
  };

  const handleSignOut = () => {
    if (confirm("Disconnect currently authenticated citizen profile?")) {
      setIsLoggedIn(false);
      localStorage.removeItem("maha_citizen_auth");
      navigate("/");
    }
  };

  // Scroll to absolute ceiling on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712] relative overflow-hidden select-none px-4 sm:px-6 py-12 font-sans">
        {/* Glow Spheres */}
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none animate-pulse duration-4000"></div>
        
        {/* Grid Overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          
          {/* Brand Logo Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-amber-500 text-slate-950 p-3 rounded-2xl shadow-xl shadow-amber-500/20 mb-3 animate-pulse">
              <Sun className="h-8 w-8 text-slate-950" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Maha <span className="text-amber-400">Energy Portal</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-mono">
              Maharashtra State Electricity Department
            </p>
          </div>

          {/* Secure Form Entry */}
          <div className="bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl relative">
            <h2 className="text-xl font-bold text-slate-100 text-center mb-6">
              Citizen Secure Gateway
            </h2>

            {loginSuccess ? (
              <div className="py-8 text-center flex flex-col items-center animate-in zoom-in-95">
                <CheckCircle className="h-12 w-12 text-green-400 animate-bounce mb-3" />
                <h3 className="font-extrabold text-white text-base">Security Cleared</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-[240px]">
                  Fetching consumer bill profiles and localized solar irradiance statistics...
                </p>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-5 text-left">
                
                {/* Registered email */}
                <div>
                  <label htmlFor="auth-email" className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5 text-amber-400" /> registered Email Address
                  </label>
                  <input
                    id="auth-email"
                    type="email"
                    required
                    placeholder="Enter registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-amber-500 font-medium font-mono"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1 font-mono">
                    Citizen Demo ID: mayuri@mahaenergy.gov.in
                  </span>
                </div>

                {/* Secure Password key */}
                <div>
                  <label htmlFor="auth-password" className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1">
                    <KeyRound className="h-3.5 w-3.5 text-amber-400" /> confidential Passkey
                  </label>
                  <input
                    id="auth-password"
                    type="password"
                    required
                    placeholder="Enter passkey"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-amber-500 font-medium font-mono"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1 font-mono">
                    Demo Password: solar2026
                  </span>
                </div>

                {loginError && (
                  <div className="p-3 bg-red-500/5 border border-red-500/10 text-red-400 text-xs rounded-xl flex items-center gap-1.5 font-sans leading-relaxed">
                    <ShieldAlert className="h-4 w-4 flex-shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                {/* Confirm Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 font-bold text-slate-950 rounded-xl tracking-wide text-sm shadow-md shadow-amber-500/10 hover:shadow-amber-500/20 hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-1 select-none cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  Request Authorization
                </button>

                {/* Extra Support references */}
                <div className="flex justify-between items-center text-[10.5px] text-slate-400 mt-4 pt-4 border-t border-slate-800">
                  <a href="#reset" onClick={(e) => { e.preventDefault(); alert("Verification email dispatch initiated."); }} className="hover:text-amber-300 transition-colors">
                    Passkey Reset?
                  </a>
                  <a href="#help" onClick={(e) => { e.preventDefault(); alert("Citizen Helpdesk line: 1800-MSEDCL-MH"); }} className="hover:text-amber-300 transition-colors">
                    Helpdesk Support
                  </a>
                </div>

              </form>
            )}
          </div>

          <div className="text-center mt-6 text-[10px] text-slate-500 font-mono">
            © 2026 Government of Maharashtra State Power Corporation (MSEDCL)
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans overflow-x-hidden antialiased flex flex-col justify-between">
      
      {/* Sticky Navigation bar */}
      <Navbar />

      {/* Pages Switchboard Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* State Unified Footer */}
      <Footer />

      {/* Floating Support AI Chat trigger bubble */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
        
        {/* Notification pop bubble */}
        {!showFloatingAI && (
          <div className="bg-slate-900 border border-slate-800 text-slate-200 text-xs py-2.5 px-4 rounded-2xl shadow-xl animate-bounce flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500 anim-pulse"></span>
            Sahayak AI is online!
          </div>
        )}

        {/* Floating conversational overlay */}
        {showFloatingAI && (
          <div className="w-[330px] sm:w-[380px] shadow-2xl animate-in slide-in-from-bottom-6 duration-300">
            <ChatAssistant embeddedOnly={false} onClose={() => setShowFloatingAI(false)} />
          </div>
        )}

        {/* Bubble Button */}
        <button
          onClick={() => setShowFloatingAI(!showFloatingAI)}
          className={`h-14 w-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer ${
            showFloatingAI
              ? "bg-slate-800 text-white border border-slate-700"
              : "bg-purple-500 hover:bg-purple-600 text-slate-950"
          }`}
          aria-label="Expand AI Assist Chat"
        >
          {showFloatingAI ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageSquare className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Log out Session controls */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={handleSignOut}
          className="text-[10px] py-1.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-red-400 rounded-lg transition-colors font-mono uppercase font-bold cursor-pointer"
        >
          Citizen Sign Out
        </button>
      </div>

    </div>
  );
}
