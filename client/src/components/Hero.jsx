import { useState } from "react";

export default function Hero({ onSearch }) {
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location && profession) {
      onSearch(location, profession);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-12 bg-white">
      <h1 className="text-4xl font-bold mb-4">
        Generate Business Leads Instantly
      </h1>

      <p className="text-gray-500 mb-8">
        Enter location & profession to find businesses
      </p>

      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-2xl border">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-3 border rounded-lg"
            />

            <input
              type="text"
              placeholder="Profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="p-3 border rounded-lg"
            />
          </div>

          <button className="w-full bg-blue-500 text-white py-3 rounded-lg">
            Search Leads
          </button>
        </form>
      </div>
    </div>
  );
}

