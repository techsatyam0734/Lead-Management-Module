import { Lead } from "../models/lead.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//Create a New Lead
const createLead = asyncHandler(async (req, res) => {
  try {
    const {leadData} = req.body;
    const lead = new Lead(leadData);
    await lead.save();
    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all the Total Leads

const getallLeads = asyncHandler(async (req, res) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Search Leads

const getLeads = asyncHandler(async (req, res) => {
  try {
    const { searchString } = req.query;

    if (!searchString) {
      return res.status(400).json({
        success: false,
        message: "SearchString is required!",
      });
    }

    const regex = new RegExp(searchString, "i");

    const stringFields = [
      "name",
      "email",
      "altEmail",
      "status",
      "qualification",
      "interestField",
      "source",
      "assignedTo",
      "jobInterest",
      "state",
      "city",
    ];

    const numberFields = ["passoutYear"];

    let stringfieldsMap = stringFields.map((field) => ({ [field]: regex }));
    let numberfieldsMap = !isNaN(searchString)
      ? numberFields.map((field) => ({ [field]: Number(searchString) }))
      : [];

    const query = {
      $or: [...stringfieldsMap, ...numberfieldsMap],
    };

    const results = await Lead.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Advanced Filter Leads
const advancedFilterLeads = asyncHandler(async (req, res) => {
  try {
    const { matchType, filters } = req.body;

    if (!filters || !Array.isArray(filters) || filters.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Kindly select at least one filter!",
      });
    }

    const conditions = filters.map((filter) => {
      const { field, value } = filter;

      if (field === "passoutYear" && !isNaN(value)) {
        return { [field]: Number(value) };
      }

      return { [field]: new RegExp(value, "i") };
    });

    const query =
      matchType === "AND" ? { $and: conditions } : { $or: conditions };

    const results = await Lead.find(query).sort({ createdAt: -1 });

    res.json({
      count: results.length,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export { createLead, getallLeads, getLeads, advancedFilterLeads };


