// import { useState } from "react";
// import axios from "axios";
// import Hero from "../components/Hero";
// import LeadsTable from "../components/LeadsTable";
// import Navbar from "../components/Navbar";

// export default function Home() {
//   const [leads, setLeads] = useState([]);
//   const [location, setLocation] = useState("");
//   const [profession, setProfession] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSearch = async (loc, prof) => {
//     try {
//       setLoading(true);
//       setError("");

//       const keyword = encodeURIComponent(`${prof} in ${loc}`);

//       const res = await axios.get(`http://localhost:5000/clients/${keyword}`);

//       setLeads(res.data);
//       setLocation(loc);
//       setProfession(prof);

//     } catch (err) {
//       setError("Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <Hero onSearch={handleSearch} />

//       {loading && <p className="text-center mt-5 text-blue-500">Loading...</p>}

//       {error && <p className="text-center mt-5 text-red-500">{error}</p>}

//       {leads.length > 0 && (
//         <LeadsTable leads={leads} location={location} profession={profession} />
//       )}
//     </>
//   );
// }

import { useState, useRef } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import LeadsTable from "../components/LeadsTable";
import Navbar from "../components/Navbar";

export default function Home() {
  const [leads, setLeads] = useState([]);
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tableRef = useRef(null);

  const handleSearch = async (loc, prof) => {
    try {
      setLoading(true);
      setError("");

      const keyword = encodeURIComponent(`${prof} in ${loc}`);

      const res = await axios.get(`http://localhost:5000/clients/${keyword}`);

      setLeads(res.data);
      setLocation(loc);
      setProfession(prof);

      // 🔥 auto scroll
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Hero onSearch={handleSearch} />

      {loading && <p className="text-center mt-5 text-blue-500">Loading...</p>}
      {error && <p className="text-center mt-5 text-red-500">{error}</p>}

      {leads.length > 0 && (
        <div ref={tableRef}>
          <LeadsTable
            leads={leads}
            location={location}
            profession={profession}
          />
        </div>
      )}
    </>
  );
}
