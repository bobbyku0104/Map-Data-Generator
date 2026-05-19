import axios from "axios";

/**
 * Fetch business leads from OpenWebNinja API and filter those without a website
 * @param {string} keyword - Search term (e.g., "plumber")
 * @param {number} limit - Maximum number of leads to fetch
 * @returns {Promise<Array>} List of formatted leads without websites
 */
export const getLeadsByKeyword = async (keyword, limit) => {
  const response = await axios.get(
    "https://api.openwebninja.com/local-business-data/search",
    {
      headers: {
        "X-API-Key": process.env.OPENWEBNINJA_API_KEY,
        Accept: "*/*",
      },
      params: {
        query: keyword,
        limit,
      },
    }
  );

  const data = response.data?.data || [];

  // Format raw API data into clean, consistent fields
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

    const mapUrl =
      item.place_link ||
      (item.place_id
        ? `https://www.google.com/maps/place/?q=place_id:${item.place_id}`
        : item.latitude && item.longitude
          ? `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`
          : "");

    return {
      name: item.name || "N/A",
      address: item.address || "N/A",
      phone: phone,
      email: item.email || item.contact?.email || "",
      rating: typeof item.rating === "number" ? item.rating : "N/A",
      website: item.website || "",
      reviews: typeof reviewCount === "number" ? reviewCount : reviewCount || 0,
      link: mapUrl,
    };
  });

  // Filter out businesses that already have a website (focusing on leads)
  return leads.filter((item) => !item.website || item.website === "N/A");
};
