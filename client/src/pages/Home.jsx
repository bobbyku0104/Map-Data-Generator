import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import LeadsTable from "../components/LeadsTable";
import Navbar from "../components/Navbar";
import { Loader2, AlertCircle, Search, ChevronUp, Zap, Mail, MessageCircle, Link2 } from "lucide-react";

export default function Home() {
  const [leads, setLeads] = useState([]);
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [searchLimit, setSearchLimit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showDeniedModal, setShowDeniedModal] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);

  const tableRef = useRef(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        await axios.post(
          `${apiUrl}/api/client-access`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/";
          return;
        }
        if (err.response?.status === 403) {
          setShowDeniedModal(true);
        } else {
          setError("Verification failed. Please reload or contact support.");
        }
      } finally {
        setCheckingAccess(false);
      }
    };

    checkAccess();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = async (loc, prof, limit) => {
    try {
      setLoading(true);
      setError("");
      setLeads([]); // Clear previous leads while searching

      const keyword = encodeURIComponent(`${prof} in ${loc}`);

      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.get(
        `${apiUrl}/clients/${keyword}?limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLeads(res.data || []);
      setLocation(loc);
      setProfession(prof);
      setSearchLimit(limit);

      // 🔥 auto scroll to results
      if (res.data?.length > 0) {
        setTimeout(() => {
          tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
        return;
      }
      if (err.response?.status === 403) {
        setShowDeniedModal(true);
        return;
      }
      setError(err.response?.data?.message || "Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowDeniedModal(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (checkingAccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500 animate-pulse" />
        </div>
        <p className="mt-6 text-slate-400 font-semibold tracking-wider animate-pulse">
          VERIFYING ACCESS CONTROL...
        </p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero onSearch={handleSearch} />

        <div className="max-w-7xl mx-auto px-4 pb-24">
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 animate-in fade-in duration-500">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-600 animate-pulse" />
              </div>
              <p className="mt-6 text-slate-600 font-medium animate-pulse">
                Sourcing high-quality leads...
              </p>
            </div>
          )}

          {error && (
            <div className="mt-8 p-5 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 text-red-700 animate-in slide-in-from-top-4 duration-300 shadow-sm shadow-red-100/50">
              <div className="bg-red-100 p-2 rounded-xl">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              </div>
              <p className="font-semibold">{error}</p>
            </div>
          )}

          {!loading && leads.length > 0 && (
            <div ref={tableRef} className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              <LeadsTable
                leads={leads}
                location={location}
                profession={profession}
                limit={searchLimit}
              />
            </div>
          )}

          {!loading && !error && leads.length === 0 && location && (
            <div className="mt-12 text-center py-24 bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 animate-in fade-in duration-500">
              <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-inner">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">No leads found</h3>
              <p className="text-slate-500 mt-3 max-w-sm mx-auto font-medium">
                We couldn't find any results for <span className="text-slate-900">"{profession}"</span> in <span className="text-slate-900">"{location}"</span>. 
                Try different keywords or increase the limit.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-100 transition-all duration-300 z-50 hover:-translate-y-1 active:scale-95 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      {/* Premium Access Denied Modal Popup */}
      {showDeniedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
            onClick={handleCloseModal}
          ></div>
          
          {/* Modal Container (Sleek Dark Mode Glassmorphism) */}
          <div className="relative bg-slate-900/95 text-white backdrop-blur-2xl border border-slate-800 shadow-2xl rounded-[40px] p-6 sm:p-10 max-w-4xl w-full text-center animate-in zoom-in-95 duration-200 z-10 overflow-y-auto max-h-[90vh] no-scrollbar">
            
            {/* Close Button X */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors cursor-pointer p-2.5 rounded-full hover:bg-white/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon & Title */}
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-500/20 shadow-inner">
                <AlertCircle className="w-7 h-7 animate-bounce" />
              </div>
              
              <h3 className="text-3xl font-extrabold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                Free Access Denied
              </h3>
              
              <p className="text-slate-400 mt-2 font-medium leading-relaxed">
                You have already used your first free lead search access. Sourcing more high-value leads requires a subscription. Please upgrade to continue.
              </p>
            </div>

            {/* 3 Subscription Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Plan 1: Starter */}
              <div className="flex flex-col bg-slate-800/40 border border-slate-800 rounded-3xl p-6 transition-all duration-500 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:scale-[1.03] text-left relative overflow-hidden group">
                {/* Shine Sweep Effect on Hover */}
                <div className="animate-shine"></div>
                
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors duration-300">Starter</h4>
                  <p className="text-xs text-slate-400 mt-1">Perfect for getting started</p>
                </div>
                <div className="my-3 flex items-baseline">
                  <span className="text-4xl font-extrabold text-white group-hover:scale-105 transition-transform duration-300 origin-left">$9</span>
                  <span className="text-slate-400 text-sm ml-1">/ month</span>
                </div>
                
                <ul className="space-y-2.5 my-6 text-sm text-slate-300 flex-grow">
                  <li className="flex items-center gap-2 group/item">
                    <Zap className="w-4 h-4 text-blue-400 fill-current transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12" />
                    <span className="group-hover:text-slate-200 transition-colors">500 Leads / month</span>
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <Zap className="w-4 h-4 text-blue-400 fill-current transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12" />
                    <span className="group-hover:text-slate-200 transition-colors">Basic Lead Sourcing</span>
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <Zap className="w-4 h-4 text-blue-400 fill-current transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12" />
                    <span className="group-hover:text-slate-200 transition-colors">CSV / Email Export</span>
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <Zap className="w-4 h-4 text-blue-400 fill-current transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12" />
                    <span className="group-hover:text-slate-200 transition-colors">Standard Support</span>
                  </li>
                </ul>

                <button 
                  onClick={() => alert("Starter Subscription coming soon!")}
                  className="w-full bg-slate-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer text-center text-sm border border-slate-700 hover:border-transparent hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
                >
                  Pay Now
                </button>
              </div>

              {/* Plan 2: Pro (Unique Glowing Card) */}
              <div className="flex flex-col bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 border-none rounded-3xl p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-400/40 hover:-translate-y-3 hover:scale-[1.04] text-left relative scale-100 lg:scale-[1.02] shadow-xl overflow-hidden group">
                {/* Shine Sweep Effect on Hover */}
                <div className="animate-shine"></div>
                
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-white text-blue-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md border border-blue-100 animate-pulse">
                  Most Popular
                </div>
                <div className="mb-4">
                  <h4 className="text-lg font-extrabold text-white">Professional</h4>
                  <p className="text-xs text-blue-100 mt-1">Accelerate your pipeline</p>
                </div>
                <div className="my-3 flex items-baseline">
                  <span className="text-4xl font-black text-white group-hover:scale-105 transition-transform duration-300 origin-left">$29</span>
                  <span className="text-blue-100 text-sm ml-1">/ month</span>
                </div>
                
                <ul className="space-y-2.5 my-6 text-sm text-white flex-grow">
                  <li className="flex items-center gap-2 font-bold text-yellow-300 group/item">
                    <Zap className="w-4 h-4 text-yellow-300 fill-current transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12" />
                    <span>2,500 Leads / month</span>
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <Zap className="w-4 h-4 text-white fill-current transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12" />
                    <span>Advanced Maps Sourcing</span>
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <Zap className="w-4 h-4 text-white fill-current transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12" />
                    <span>Direct Excel / XLSX Export</span>
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <Zap className="w-4 h-4 text-white fill-current transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12" />
                    <span>WhatsApp / Email Lead Sync</span>
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <Zap className="w-4 h-4 text-white fill-current transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12" />
                    <span>Priority 24/7 Support</span>
                  </li>
                </ul>

                <button 
                  onClick={() => alert("Pro Subscription coming soon!")}
                  className="w-full bg-white hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-white text-blue-700 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer text-center text-sm shadow-md hover:shadow-lg hover:shadow-yellow-500/20 active:scale-[0.98]"
                >
                 Pay Now
                </button>
              </div>

              {/* Plan 3: Enterprise */}
              <div className="flex flex-col bg-slate-950 border border-slate-800 rounded-3xl p-6 transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 hover:scale-[1.03] text-left relative text-white overflow-hidden group">
                {/* Shine Sweep Effect on Hover */}
                <div className="animate-shine"></div>
                
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors duration-300">Enterprise</h4>
                  <p className="text-xs text-slate-400 mt-1">For power-users and teams</p>
                </div>
                <div className="my-3 flex items-baseline">
                  <span className="text-4xl font-extrabold text-white group-hover:scale-105 transition-transform duration-300 origin-left">$89</span>
                  <span className="text-slate-400 text-sm ml-1">/ month</span>
                </div>
                
                <ul className="space-y-2.5 my-6 text-sm text-slate-300 flex-grow">
                  <li className="flex items-center gap-2 text-blue-400 group/item">
                    <Zap className="w-4 h-4 text-blue-400 fill-current transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12" />
                    <span className="group-hover:text-slate-200 transition-colors">Unlimited Leads / month</span>
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <Zap className="w-4 h-4 text-blue-400 fill-current transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12" />
                    <span className="group-hover:text-slate-200 transition-colors">Dedicated Scraping Server</span>
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <Zap className="w-4 h-4 text-blue-400 fill-current transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12" />
                    <span className="group-hover:text-slate-200 transition-colors">Automated CRM Push (Webhook)</span>
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <Zap className="w-4 h-4 text-blue-400 fill-current transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12" />
                    <span className="group-hover:text-slate-200 transition-colors">Dedicated Account Manager</span>
                  </li>
                </ul>

                <button 
                  onClick={() => alert("Enterprise Subscription coming soon!")}
                  className="w-full bg-slate-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer text-center text-sm border border-slate-700 hover:border-transparent hover:shadow-lg hover:shadow-purple-500/20 active:scale-[0.98]"
                >
                  Pay Now
                </button>
              </div>

            </div>

            {/* Footer Close Button */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-center gap-3">
              <button 
                onClick={handleCloseModal}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold transition-all duration-150 cursor-pointer text-sm border border-slate-750"
              >
                Close & Stay on Search Page
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}


