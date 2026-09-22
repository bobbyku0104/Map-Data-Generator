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

    if (user.freeUsed && !user.subscriptionActive) {
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

    // Consume the user's free search access quota only if not subscribed
    if (!user.subscriptionActive) {
      user.freeUsed = true;
      user.leadLimit = 25;
      await user.save();
    }

    console.log(`[Controller] Fetched ${filteredLeads.length} leads for: "${keyword}"`);

    res.status(200).json(filteredLeads);
  } catch (error) {
    console.error("[Controller Error]:", error.response?.data || error.message);

    // Upstream 401/403 means our API key is bad, not the user's session —
    // report it as 502 so the client doesn't log the user out.
    const upstreamStatus = error.response?.status;
    const statusCode = upstreamStatus
      ? ([401, 403].includes(upstreamStatus) ? 502 : upstreamStatus)
      : 500;
    const upstreamError = error.response?.data?.error;
    const apiMessage =
      error.response?.data?.message ||
      (typeof upstreamError === "object" ? upstreamError?.message : upstreamError) ||
      error.message ||
      "Failed to fetch leads";

    // The lead API rejects us once the plan quota is used up
    const message =
      upstreamStatus === 429
        ? "Lead API quota exceeded. Please check your OpenWebNinja plan usage."
        : `Failed to fetch leads: ${apiMessage}`;

    res.status(statusCode).json({ success: false, message });
  }
};
