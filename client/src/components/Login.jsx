import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Login Logic

    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-200">
        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center rounded-2xl mx-auto text-2xl font-bold shadow-lg">
            B
          </div>

          <h2 className="text-4xl font-bold mt-4 text-gray-800">
            Welcome Back
          </h2>

          <p className="text-gray-500 mt-2">Login to continue your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-3 focus-within:ring-2 focus-within:ring-blue-500 bg-gray-50">
              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-3 focus-within:ring-2 focus-within:ring-blue-500 bg-gray-50">
              <Lock size={18} className="text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 bg-transparent outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-500" />
                ) : (
                  <Eye size={20} className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" />
              Remember me
            </label>

            <p className="text-blue-600 cursor-pointer hover:underline">
              Forgot Password?
            </p>
          </div>

          {/* Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white p-3 rounded-xl font-semibold shadow-md hover:shadow-xl">
            Login
          </button>
        </form>

        {/* Signup */}
        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 ml-2 font-semibold cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
