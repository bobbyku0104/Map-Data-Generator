import { useState } from "react";
import { Search, MapPin, Briefcase, Sparkles } from "lucide-react";

export default function Hero({ onSearch }) {
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [limit, setLimit] = useState(25);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location && profession) {
      setIsLoading(true);
      await onSearch(location, profession, limit);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4" />
          AI-Powered Lead Generation
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Generate Business
          <br />
          Leads Instantly
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl">
          Enter location & profession to discover thousands of qualified
          business leads in seconds
        </p>

        {/* Search Card */}
        <div className="w-full max-w-3xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-4xl p-6 md:p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] gap-4">
                {/* Location Input */}
                <div className="relative group flex items-center justify-center">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter location (e.g., New York, NY)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-14 pl-10 pr-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 placeholder-gray-400"
                  />
                </div>

                {/* Profession Input */}
                <div className="relative group flex items-center justify-center">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter profession (e.g., Plumber, Dentist)"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full h-14 pl-10 pr-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 placeholder-gray-400"
                  />
                </div>

                {/* Result Limit Input */}
                <div className="relative group flex items-center justify-center">
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="w-full h-14 pr-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 flex items-center justify-center"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                disabled={!location || !profession || isLoading}
                className="relative w-full h-14 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg transition-all transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" />
                    <span>Search Leads</span>
                  </div>
                )}
              </button>
            </form>

            {/* Example prompts */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-3">Try these examples:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { loc: "Los Angeles, CA", prof: "Electrician" },
                  { loc: "Chicago, IL", prof: "Dentist" },
                  { loc: "Houston, TX", prof: "Plumber" },
                ].map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setLocation(example.loc);
                      setProfession(example.prof);
                    }}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {example.prof} in {example.loc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
