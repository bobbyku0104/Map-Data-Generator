// import { useNavigate } from "react-router-dom";
// import { User, Mail, Lock } from "lucide-react";

// export default function Signup() {
//   const navigate = useNavigate();

//   const handleSignup = (e) => {
//     e.preventDefault();

//     alert("Account Created Successfully ");

//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-blue-100 px-4">
//       <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-200">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-purple-600 text-white flex items-center justify-center rounded-2xl mx-auto text-2xl font-bold shadow-lg">
//             B
//           </div>

//           <h2 className="text-4xl font-bold mt-4 text-gray-800">
//             Create Account
//           </h2>

//           <p className="text-gray-500 mt-2">Signup to continue</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSignup} className="space-y-5">
//           {/* Name */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               Full Name
//             </label>

//             <div className="flex items-center border rounded-xl mt-2 px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-green-500">
//               <User size={18} className="text-gray-400" />

//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 className="w-full p-3 bg-transparent outline-none"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               Email Address
//             </label>

//             <div className="flex items-center border rounded-xl mt-2 px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-green-500">
//               <Mail size={18} className="text-gray-400" />

//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full p-3 bg-transparent outline-none"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               Password
//             </label>

//             <div className="flex items-center border rounded-xl mt-2 px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-green-500">
//               <Lock size={18} className="text-gray-400" />

//               <input
//                 type="password"
//                 placeholder="Enter password"
//                 className="w-full p-3 bg-transparent outline-none"
//               />
//             </div>
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               Confirm Password
//             </label>

//             <div className="flex items-center border rounded-xl mt-2 px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-green-500">
//               <Lock size={18} className="text-gray-400" />

//               <input
//                 type="password"
//                 placeholder="Confirm password"
//                 className="w-full p-3 bg-transparent outline-none"
//               />
//             </div>
//           </div>

//           {/* Button */}
//           <button className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 text-white p-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl">
//             Create Account
//           </button>
//         </form>

//         {/* Login */}
//         <p className="text-center mt-6 text-gray-600">
//           Already have an account?
//           <span
//             onClick={() => navigate("/")}
//             className="text-green-600 ml-2 font-semibold cursor-pointer hover:underline"
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Account Created Successfully ");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-blue-100 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-200 transform transition-all duration-300 hover:scale-[1.02]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 text-white flex items-center justify-center rounded-2xl mx-auto text-3xl font-bold shadow-lg">
            B
          </div>

          <h2 className="text-3xl font-bold mt-5 text-gray-800">
            Create Account
          </h2>

          <p className="text-gray-500 mt-2">Sign up to get started</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Full Name
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl mt-2 px-3 bg-gray-50 focus-within:border-green-500 focus-within:bg-white transition-all duration-200">
              <User size={18} className="text-gray-400" />

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl mt-2 px-3 bg-gray-50 focus-within:border-green-500 focus-within:bg-white transition-all duration-200">
              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl mt-2 px-3 bg-gray-50 focus-within:border-green-500 focus-within:bg-white transition-all duration-200">
              <Lock size={18} className="text-gray-400" />

              <input
                type="password"
                placeholder="Enter password"
                className="w-full p-3 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Confirm Password
            </label>

            <div className="flex items-center border-2 border-gray-200 rounded-xl mt-2 px-3 bg-gray-50 focus-within:border-green-500 focus-within:bg-white transition-all duration-200">
              <Lock size={18} className="text-gray-400" />

              <input
                type="password"
                placeholder="Confirm password"
                className="w-full p-3 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Button */}
          <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 text-white p-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Create Account
          </button>
        </form>

        {/* Login */}
        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <span
            onClick={() => navigate("/")}
            className="text-green-600 ml-2 font-semibold cursor-pointer hover:text-green-700 hover:underline transition-all duration-200"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}