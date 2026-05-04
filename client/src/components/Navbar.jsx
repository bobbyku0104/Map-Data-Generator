import { Zap, Code2, Globe } from "lucide-react";

export default function Navbar() {
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
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
          >
            <Code2 className="w-5 h-5" />
          </a>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95">
            Get Pro
          </button>
        </div>
      </div>
    </nav>
  );
}


