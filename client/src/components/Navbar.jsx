export default function Navbar() {
  return (
    <div className="bg-white shadow-lg border-b border-gray-100">
      <div className="flex items-center gap-3 px-6 py-3 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-2 rounded-xl shadow-md">
          <span className="text-xl">⚡</span>
        </div>
        <h1 className="text-xl font-bold text-gray-800 tracking-wide">
          Lead Generator
        </h1>
      </div>
    </div>
  );
}
