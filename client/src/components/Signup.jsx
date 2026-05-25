import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Loader2, AlertCircle, Sparkles } from "lucide-react";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.post(`${apiUrl}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-50 overflow-hidden px-4 py-12">
      {/* Dynamic Background Glow Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-400/20 rounded-full filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-purple-400/20 rounded-full filter blur-[120px] animate-pulse duration-[6000ms]"></div>
      </div>

      {/* Main Glassmorphic Container */}
      <div className="relative w-full max-w-md bg-white/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.08)] rounded-[32px] p-8 md:p-10 border border-white/60 animate-fade-in-down">
        
        {/* Brand Emblem & Headings */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center rounded-2xl mx-auto text-2xl font-black shadow-lg shadow-blue-500/30 transform hover:rotate-12 transition-transform duration-300">
            <Sparkles className="w-7 h-7" />
          </div>

          <h2 className="text-3xl font-extrabold mt-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Create Account
          </h2>

          <p className="text-slate-500 mt-2 font-medium text-sm">
            Sign up to start sourcing qualified leads
          </p>
        </div>

        {/* Error Notification Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-2xl flex items-center gap-3 text-red-700 animate-in slide-in-from-top-2 duration-300 shadow-sm">
            <div className="bg-red-100 p-1.5 rounded-lg flex-shrink-0">
              <AlertCircle className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-xs font-semibold leading-relaxed">{error}</p>
          </div>
        )}

        {/* Interactive Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="text-xs font-bold text-slate-700 tracking-wider uppercase ml-1">
              Full Name
            </label>

            <div className="flex items-center border border-slate-200 rounded-2xl mt-2 px-4 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-300 shadow-inner">
              <User size={18} className="text-slate-400 mr-2 flex-shrink-0" />

              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="w-full py-3.5 bg-transparent outline-none text-slate-800 placeholder-slate-400 font-medium text-sm"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="text-xs font-bold text-slate-700 tracking-wider uppercase ml-1">
              Email Address
            </label>

            <div className="flex items-center border border-slate-200 rounded-2xl mt-2 px-4 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-300 shadow-inner">
              <Mail size={18} className="text-slate-400 mr-2 flex-shrink-0" />

              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full py-3.5 bg-transparent outline-none text-slate-800 placeholder-slate-400 font-medium text-sm"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="text-xs font-bold text-slate-700 tracking-wider uppercase ml-1">
              Password
            </label>

            <div className="flex items-center border border-slate-200 rounded-2xl mt-2 px-4 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-300 shadow-inner">
              <Lock size={18} className="text-slate-400 mr-2 flex-shrink-0" />

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full py-3.5 bg-transparent outline-none text-slate-800 placeholder-slate-400 font-medium text-sm"
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="text-xs font-bold text-slate-700 tracking-wider uppercase ml-1">
              Confirm Password
            </label>

            <div className="flex items-center border border-slate-200 rounded-2xl mt-2 px-4 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-300 shadow-inner">
              <Lock size={18} className="text-slate-400 mr-2 flex-shrink-0" />

              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="w-full py-3.5 bg-transparent outline-none text-slate-800 placeholder-slate-400 font-medium text-sm"
              />
            </div>
          </div>

          {/* Glowing Form Button */}
          <button
            type="submit"
            disabled={loading}
            className="relative w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3.5 rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-blue-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden cursor-pointer mt-2"
          >
            {/* Sweeping Shine Overlay */}
            <div className="animate-shine"></div>

            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-1" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>

        {/* Login Redirect Area */}
        <p className="text-center mt-8 text-slate-500 text-sm font-medium">
          Already have an account?{" "}
          <span
            onClick={() => !loading && navigate("/")}
            className="text-blue-600 font-bold cursor-pointer hover:text-indigo-700 transition-colors inline-flex items-center gap-0.5 group"
          >
            <span>Login</span>
            <span className="transform group-hover:translate-x-0.5 transition-transform duration-200">&rarr;</span>
          </span>
        </p>

      </div>
    </div>
  );
}