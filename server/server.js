const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Home route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// API Route
app.post("/leads", async (req, res) => {
  try {
    const { location, profession } = req.body;

    const query = `${profession} in ${location}`;

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${process.env.API_KEY}`;

    const response = await axios.get(url);

    const results = response.data.results;

    const leads = results.map((place) => ({
      name: place.name,
      address: place.formatted_address,
      rating: place.rating || "N/A",
      website: "",
    }));

    res.json(leads);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Server start (ONLY ONCE)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
