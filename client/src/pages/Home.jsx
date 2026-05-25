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
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md cursor-pointer"
            onClick={() => setShowDeniedModal(false)}
          ></div>
          
          {/* Modal Container */}
          <div className="relative bg-white/95 backdrop-blur-lg border border-slate-200 shadow-2xl rounded-3xl p-8 max-w-sm w-full text-center animate-in zoom-in-95 duration-200 z-10">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
              <AlertCircle className="w-8 h-8 animate-bounce" />
            </div>
            
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Free Access Denied
            </h3>
            
            <p className="text-slate-500 mt-3 font-medium leading-relaxed">
              You have already used your first free lead search access. Sourcing more high-value leads requires a subscription.
            </p>
            
            <div className="mt-6 flex flex-col gap-3">
              <button 
                onClick={() => alert("Subscription purchase page coming soon!")}
                className="w-full bg-blue-600 hover:bg-blue-750 text-white p-3 rounded-xl font-bold transition-all duration-200 shadow-lg shadow-blue-200/50 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                Upgrade to Pro
              </button>
              
              <button 
                onClick={() => setShowDeniedModal(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 p-3 rounded-xl font-semibold transition-all duration-150 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


