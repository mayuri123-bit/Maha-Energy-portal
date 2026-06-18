import React, { useState } from "react";
import { MapPin, Search, Star, ShieldCheck, Mail, Phone, CalendarCheck, CheckCircle2, User, PhoneCall, AlertCircle } from "lucide-react";
import { Installer, SolarConsultationRequest } from "../types";

const INSTALLERS_DATA: Installer[] = [
  {
    id: "inst-1",
    name: "Maha Rooftop Solar Solutions Ltd",
    city: "Pune",
    rating: 4.9,
    reviewsCount: 142,
    experienceYears: 8,
    approvedPMYojana: true,
    contact: "+91 98230 45678",
    address: "Senapati Bapat Road, Near Shivaji Nagar, Pune",
    certifications: ["ISO 9001:2015 Approved", "MNRE Registered Tier-1 Contractor"],
  },
  {
    id: "inst-2",
    name: "Sahyadri Green Tech Systems",
    city: "Pune",
    rating: 4.8,
    reviewsCount: 96,
    experienceYears: 6,
    approvedPMYojana: true,
    contact: "+91 95521 12345",
    address: "Deccan Gymkhana, Opp Fergusson College, Pune",
    certifications: ["MEDA State Authorized Distributor", "BEE 5-Star Sourcing Partner"],
  },
  {
    id: "inst-3",
    name: "Maratha Clean-Energy Corporation",
    city: "Mumbai",
    rating: 4.7,
    reviewsCount: 185,
    experienceYears: 10,
    approvedPMYojana: true,
    contact: "+91 88880 98765",
    address: "Link Road, Andheri West, Mumbai",
    certifications: ["National Roof Sizing Certified", "PM-Surya Approved Channel partner"],
  },
  {
    id: "inst-4",
    name: "Vidarbha Sol-Power Engineers",
    city: "Nagpur",
    rating: 4.8,
    reviewsCount: 74,
    experienceYears: 5,
    approvedPMYojana: true,
    contact: "+91 91122 33445",
    address: "Dharampeth, Near Traffic Park, Nagpur",
    certifications: ["Grid-Tie Integration Certified"],
  },
  {
    id: "inst-5",
    name: "Nashik Sun-Tech Solar LLC",
    city: "Nashik",
    rating: 4.6,
    reviewsCount: 52,
    experienceYears: 4,
    approvedPMYojana: false,
    contact: "+91 94220 54321",
    address: "College Road, Near Canada Corner, Nashik",
    certifications: ["Rooftop PV System Integrator"],
  },
];

export default function Installers() {
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [installerSearch, setInstallerSearch] = useState<string>("");
  const [consultModal, setConsultModal] = useState<Installer | null>(null);

  // Quote Request Form Local State
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientBillVal, setClientBillVal] = useState<string>("3000");
  const [quoteSuccess, setQuoteSuccess] = useState<boolean>(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  const cities = ["All", "Pune", "Mumbai", "Nagpur", "Nashik"];

  // Filter installers
  const filteredInstallers = INSTALLERS_DATA.filter((item) => {
    const matchesCity = selectedCity === "All" || item.city === selectedCity;
    const matchesSearch = item.name.toLowerCase().includes(installerSearch.toLowerCase()) ||
                          item.address.toLowerCase().includes(installerSearch.toLowerCase());
    return matchesCity && matchesSearch;
  });

  // Calculate dynamic Map iframe src
  let mapSearchQuery = "solar+panels+Maharashtra";
  if (selectedCity !== "All") {
    mapSearchQuery = `solar+energy+installers+${selectedCity}+Maharashtra`;
  }

  const handleRequestQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      setQuoteError("Please supply your full name and primary telephone contact.");
      return;
    }

    setQuoteError(null);
    setQuoteSuccess(true);

    // Save mock solicitation to localStorage
    const savedRequests: SolarConsultationRequest[] = JSON.parse(localStorage.getItem("maha_consultations") || "[]");
    const newReq: SolarConsultationRequest = {
      id: `REQ-${Date.now()}`,
      installerId: consultModal?.id || "general",
      installerName: consultModal?.name || "State Partner Network",
      userName: clientName,
      userPhone: clientPhone,
      userEmail: clientEmail,
      monthlyBillValue: parseFloat(clientBillVal) || 0,
      requestDate: new Date().toLocaleDateString("en-IN"),
      status: "Pending",
    };
    savedRequests.push(newReq);
    localStorage.setItem("maha_consultations", JSON.stringify(savedRequests));

    setTimeout(() => {
      // Clean up modal after timeout
      setQuoteSuccess(false);
      setConsultModal(null);
      setClientName("");
      setClientPhone("");
      setClientEmail("");
    }, 3000);
  };

  return (
    <section id="installers" className="py-20 bg-slate-900 border-b border-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-mono font-bold block mb-3">
            📍 MAP DIRECTORY
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Find Nearby Approved Solar Installers
          </h2>
          <p className="mt-4 text-slate-400 font-sans font-light">
            Locate MEDA certified and PM Surya Ghar approved solar engineering, procurement, and construction (EPC) contractors across Maharashtra.
          </p>
        </div>

        {/* Interactive Filters Grid */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* City Sorter pills */}
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all ${
                  selectedCity === city
                    ? "bg-blue-500 text-slate-950 shadow-md shadow-blue-500/10 font-bold"
                    : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Searh bar */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search installers..."
              value={installerSearch}
              onChange={(e) => setInstallerSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-4 text-xs font-semibold text-white focus:outline-none focus:border-blue-500 placeholder-slate-600"
            />
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          </div>
        </div>

        {/* List & Map Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive list */}
          <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-2 text-left">
            {filteredInstallers.length > 0 ? (
              filteredInstallers.map((installer) => (
                <div
                  key={installer.id}
                  className="bg-slate-800/30 p-5 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-all duration-300 shadow-md flex flex-col justify-between"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-white/5 pb-3 mb-3">
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-amber-300">
                        {installer.name}
                      </h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                        <MapPin className="h-3 w-3 text-red-400" />
                        {installer.address}
                      </p>
                    </div>
                    
                    {/* Rating star badge */}
                    <div className="flex items-center gap-1 bg-slate-950/60 py-1 px-2.5 rounded-lg border border-slate-800">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                      <span className="text-xs font-mono font-bold text-white">{installer.rating}</span>
                      <span className="text-[10px] text-slate-500">({installer.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Certifications and status description */}
                  <div className="flex flex-wrap gap-2.5 mb-4">
                    {installer.approvedPMYojana && (
                      <span className="inline-flex items-center gap-1 py-1 px-2.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold font-mono">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        APPROVED PM-SURYA GHAR
                      </span>
                    )}
                    <span className="inline-flex items-center py-1 px-2.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold font-mono">
                      {installer.experienceYears} Yrs Experience
                    </span>
                    {installer.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="inline-flex py-1 px-2.5 rounded bg-slate-950 text-slate-400 text-[10px] font-mono"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>

                  {/* Call to actions footer for item */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/5">
                    <div className="text-xs text-slate-400">
                      Primary Helpline: <span className="text-white font-mono font-bold">{installer.contact}</span>
                    </div>
                    <button
                      onClick={() => setConsultModal(installer)}
                      className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-slate-950 text-xs font-bold font-sans tracking-wide transition-all self-end sm:self-auto flex items-center gap-1"
                    >
                      <CalendarCheck className="h-3.5 w-3.5" />
                      Request Quote
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl">
                <AlertCircle className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                <h5 className="font-bold text-slate-400 text-sm">No Contractors Detected</h5>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  No installers in Mumbai-Maharashtra region match are registered matching "{installerSearch}".
                </p>
              </div>
            )}
          </div>

          {/* Right: Dynamic Embedded Map Frame */}
          <div className="lg:col-span-5 bg-slate-850 p-3 rounded-2xl border border-slate-800 shadow-2xl relative w-full h-[400px] lg:h-[500px]">
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-slate-950/90 backdrop-blur-md rounded-lg border border-slate-800 text-[10px] text-slate-400 uppercase font-mono font-bold">
              📍 Area focus: {selectedCity} Solar Installers
            </div>
            
            <iframe
              id="msedcl-installers-iframe"
              src={`https://maps.google.com/maps?q=${mapSearchQuery}&t=&z=11&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              title="Google Maps Nearby Solar Installers Maharashtra State"
              className="rounded-xl opacity-90 filter grayscale contrast-110"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

        </div>

      </div>

      {/* Booking Form Overlay Modal Dialog box */}
      {consultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 text-left p-6 md:p-8 rounded-2xl max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3 mb-6">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-400 block mb-1">ENERGY QUOTATION ASSIGNMENT</span>
                <h4 className="text-md sm:text-lg font-bold text-white">{consultModal.name}</h4>
                <p className="text-xs text-slate-400">{consultModal.address}</p>
              </div>
              <button
                onClick={() => setConsultModal(null)}
                className="text-slate-500 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            {quoteSuccess ? (
              <div className="text-center py-6 flex flex-col items-center">
                <CheckCircle2 className="h-12 w-12 text-green-400 mb-3 animate-bounce" />
                <h5 className="font-bold text-white text-base">Solicitation Lodged Successfully!</h5>
                <p className="text-xs text-slate-400 mt-2 max-w-sm">
                  Solar engineer representative from <strong className="text-white">{consultModal.name}</strong> will reach out on your supplied telephone line within 24 working hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestQuote} className="space-y-4">
                
                {/* User full name */}
                <div>
                  <label htmlFor="input-client-name" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-blue-400" /> Full Name
                  </label>
                  <input
                    id="input-client-name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-xs font-semibold focus:outline-none"
                  />
                </div>

                {/* Telephone */}
                <div>
                  <label htmlFor="input-client-phone" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1 flex-row">
                    <Phone className="h-3.5 w-3.5 text-blue-400" /> Maharashtra Phone Number
                  </label>
                  <input
                    id="input-client-phone"
                    type="tel"
                    required
                    placeholder="e.g. +91 94000 00000"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-xs font-mono focus:outline-none"
                  />
                </div>

                {/* Email address */}
                <div>
                  <label htmlFor="input-client-email" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1 flex-row">
                    <Mail className="h-3.5 w-3.5 text-blue-400" /> Email Address (Optional)
                  </label>
                  <input
                    id="input-client-email"
                    type="email"
                    placeholder="name@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-xs focus:outline-none"
                  />
                </div>

                {/* User monthly bill */}
                <div>
                  <label htmlFor="input-client-bill" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Approximate Monthly Electric Utility Bill (₹)
                  </label>
                  <input
                    id="input-client-bill"
                    type="number"
                    placeholder="3000"
                    value={clientBillVal}
                    onChange={(e) => setClientBillVal(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-white text-xs focus:outline-none"
                  />
                </div>

                {quoteError && (
                  <div className="p-3 bg-red-500/5 text-red-400 text-xs rounded-xl flex items-center gap-1.5 border border-red-500/10">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{quoteError}</span>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setConsultModal(null)}
                    className="flex-1 py-3 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs text-center border border-slate-700/50 hover:bg-slate-750"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1"
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                    Confirm Request
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
