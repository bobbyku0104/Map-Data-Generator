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

app.get("/clients/:keyword", async (req, res) => {
  const api_key = process.env.OPENWEBNINJA_API_KEY;
  try {
    const keyword = req.params.keyword;

    const response = await axios.get(
      "https://api.openwebninja.com/local-business-data/search",
      {
        headers: {
          "X-API-Key": api_key,
          Accept: "*/*",
        },
        params: {
          query: keyword,
          limit: 20,
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to fetch data",
    });
  }
});

// Server start (ONLY ONCE)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
