const Campaign = require('../models/Campaign');

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Public
const getCampaigns = async (req, res) => {
    try {
        const { featured, urgent, limit } = req.query;
        let query = {};

        if (featured === 'true') {
            query.featured = true;
        }

        if (urgent === 'true') {
            query.urgent = true;
        }

        let campaignsQuery = Campaign.find(query)
            .populate('school', 'name location')
            .sort('-createdAt');

        if (limit) {
            campaignsQuery = campaignsQuery.limit(parseInt(limit));
        }

        const campaigns = await campaignsQuery;

        // Add progress percentage to each campaign
        const campaignsWithProgress = campaigns.map(campaign => ({
            ...campaign.toObject(),
            progress: (campaign.raised / campaign.target) * 100
        }));

        res.status(200).json({
            success: true,
            count: campaigns.length,
            campaigns: campaignsWithProgress,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get single campaign
// @route   GET /api/campaigns/:id
// @access  Public
const getCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id)
            .populate('school', 'name location description icon');

        if (!campaign) {
            return res.status(404).json({
                success: false,
                message: 'Campaign not found',
            });
        }

        const campaignWithProgress = {
            ...campaign.toObject(),
            progress: (campaign.raised / campaign.target) * 100
        };

        res.status(200).json({
            success: true,
            campaign: campaignWithProgress,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Create campaign
// @route   POST /api/campaigns
// @access  Private/Admin
const createCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.create(req.body);

        res.status(201).json({
            success: true,
            campaign,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Update campaign
// @route   PUT /api/campaigns/:id
// @access  Private/Admin
const updateCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!campaign) {
            return res.status(404).json({
                success: false,
                message: 'Campaign not found',
            });
        }

        res.status(200).json({
            success: true,
            campaign,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete campaign
// @route   DELETE /api/campaigns/:id
// @access  Private/Admin
const deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndDelete(req.params.id);

        if (!campaign) {
            return res.status(404).json({
                success: false,
                message: 'Campaign not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Campaign deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get featured campaigns
// @route   GET /api/campaigns/featured
// @access  Public
const getFeaturedCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({ featured: true })
            .populate('school', 'name location')
            .limit(4)
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: campaigns.length,
            campaigns,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getCampaigns,
    getCampaign,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    getFeaturedCampaigns,
};