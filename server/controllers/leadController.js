import * as leadService from "../services/leadService.js";

/**
 * Fetch and filter leads based on search query
 * GET /api/clients/:keyword
 */
export const getLeads = async (req, res) => {
  try {
    const keyword = req.params.keyword;

    // Validate request parameter
    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Keyword parameter is required",
      });
    }

    // Process and validate limit parameter
    const requestedLimit = Number(req.query.limit);
    const limit =
      Number.isInteger(requestedLimit) &&
      requestedLimit > 0 &&
      requestedLimit <= 500
        ? requestedLimit
        : 50;

    // Fetch and filter leads using the service
    const filteredLeads = await leadService.getLeadsByKeyword(keyword, limit);

    console.log(`[Controller] Fetched ${filteredLeads.length} leads for: "${keyword}"`);

    res.status(200).json(filteredLeads);
  } catch (error) {
    console.error("[Controller Error]:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
};
