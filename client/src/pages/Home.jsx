import { useState } from "react";
import Hero from "../components/Hero";
import LeadsTable from "../components/LeadsTable";
import Navbar from "../components/Navbar";

export default function Home() {
  const [leads, setLeads] = useState([]);
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");

  const handleSearch = (loc, prof) => {
    // Dummy data (later API connect)
    const data = [
      {
        name: "Sharma photographer Studio",
        address: "153, Main Road, bhopal",
        phone: "+91 8759080729",
        rating: 3.9,
        website: "sharmaphotographer.com",
      },
      {
        name: "Gupta photographer Services",
        address: "178, Station Road, bhopal",
        phone: "+91 9870109368",
        rating: 3.5,
        website: "",
      },
    ];

    setLeads(data);
    setLocation(loc);
    setProfession(prof);
  };

  return (
    <>
    <Navbar/>
      <Hero onSearch={handleSearch} />

      {leads.length > 0 && (
        <LeadsTable leads={leads} location={location} profession={profession} />
      )}
    </>
  );
}
