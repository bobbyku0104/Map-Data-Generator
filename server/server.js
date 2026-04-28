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
  res.send("Server running 🚀");
});

// MAIN API
app.get("/clients/:keyword", async (req, res) => {
  try {
    const keyword = req.params.keyword;

    const response = await axios.get(
      "https://api.openwebninja.com/local-business-data/search",
      {
        headers: {
          "X-API-Key": process.env.OPENWEBNINJA_API_KEY,
          Accept: "*/*",
        },
        params: {
          query: keyword,
          limit: 90,
        },
      },
    );

    const data = response.data?.data || [];

    console.log("Sample Data:", data[0]);

    const leads = data.map((item) => {
      const phone =
        item.phone ||
        item.phone_number ||
        item.contact?.phone ||
        item.contact?.phone_number ||
        (Array.isArray(item.phones) ? item.phones[0] : null) ||
        "N/A";

      const reviewCount =
        item.review_count || item.reviews || item.user_ratings_total || "N/A";

      return {
        name: item.name || "N/A",
        address: item.address || "N/A",
        phone: phone,
        rating: item.rating || "N/A",
        website: item.website || "",
        reviews: reviewCount,
      };
    });
    const filteredLeads = leads.filter(
      (item) => !item.website || item.website === "N/A",
    );

    res.json(filteredLeads);

    res.json(leads);
  } catch (error) {
    console.error("ERROR:", error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to fetch leads",
    });
  }
});

//  Start server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
