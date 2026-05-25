import * as leadService from "../services/leadService.js";
import User from "../models/User.js";

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

    // Verify user access limit before fetching
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.freeUsed) {
      return res.status(403).json({
        success: false,
        message: "subscription required ",
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

    // Consume the user's free search access quota and set lead limit
    user.freeUsed = true;
    user.leadLimit = 25;
    await user.save();

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
