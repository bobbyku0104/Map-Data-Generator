import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Code2, Globe, LogOut } from "lucide-react";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-linear-to-br from-blue-600 to-blue-700 text-white p-2 rounded-xl shadow-lg shadow-blue-200">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-slate-900 leading-tight tracking-tight">
              Lead<span className="text-blue-600">Sync</span>
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              Business Intelligence
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            <Globe className="w-4 h-4" />
            API Docs
          </button>
          
          <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>
          
          <div className="p-2 text-slate-400">
            <Code2 className="w-5 h-5" />
          </div>

          {currentUser ? (
            <div className="flex items-center gap-3 animate-in fade-in duration-300">
              {/* User Avatar */}
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full shadow-inner">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                  {getInitials(currentUser.name)}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-800 leading-none">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-slate-500 leading-none mt-0.5 truncate max-w-[120px]">
                    {currentUser.email}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 border border-transparent hover:border-red-100 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95">
              Get Pro
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}


