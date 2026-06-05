const Donation = require('../models/Donation');
const User = require('../models/User');
const School = require('../models/School');
const Campaign = require('../models/Campaign');

// @desc    Create donation
// @route   POST /api/donations
// @access  Private
const createDonation = async (req, res) => {
    try {
        const { amount, item, schoolId, campaignId, isAnonymous, message } = req.body;

        if (!amount || !item) {
            return res.status(400).json({
                success: false,
                message: 'Please provide amount and item',
            });
        }

        // Create donation record
        const donation = await Donation.create({
            user: req.user.id,
            amount,
            item,
            school: schoolId,
            campaign: campaignId,
            isAnonymous: isAnonymous || false,
            message: message || '',
            donorName: isAnonymous ? 'Anonymous' : req.user.name,
            donorEmail: req.user.email,
            status: 'completed',
        });

        // Update user's total donated
        const user = await User.findById(req.user.id);
        user.totalDonated += amount;
        user.donations.push({
            donationId: donation._id,
            amount,
            date: new Date(),
            item,
            receiptId: donation.receiptId,
            schoolName: schoolId ? (await School.findById(schoolId))?.name : 'General'
        });
        await user.save();

        // Update school needs
        if (schoolId) {
            const school = await School.findById(schoolId);
            const needIndex = school.needs.findIndex(n => n.item === item);
            if (needIndex !== -1) {
                school.needs[needIndex].raised += amount;
                school.needs[needIndex].donors += 1;
                await school.save();
            }
        }

        // Update campaign
        if (campaignId) {
            const campaign = await Campaign.findById(campaignId);
            campaign.raised += amount;
            campaign.donors += 1;
            await campaign.save();
        }

        res.status(201).json({
            success: true,
            message: 'Donation successful!',
            donation: {
                id: donation._id,
                amount: donation.amount,
                item: donation.item,
                receiptId: donation.receiptId,
                date: donation.createdAt,
            },
            receiptId: donation.receiptId,
            totalDonated: user.totalDonated
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get user's donations
// @route   GET /api/donations/my-donations
// @access  Private
const getMyDonations = async (req, res) => {
    try {
        const donations = await Donation.find({ user: req.user.id })
            .populate('school', 'name location icon')
            .populate('campaign', 'title icon')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: donations.length,
            donations,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get donation by receipt ID
// @route   GET /api/donations/receipt/:receiptId
// @access  Private
const getDonationByReceipt = async (req, res) => {
    try {
        const donation = await Donation.findOne({ receiptId: req.params.receiptId })
            .populate('user', 'name email')
            .populate('school', 'name location');

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found',
            });
        }

        // Check if user is authorized to view this receipt
        if (donation.user._id.toString() !== req.user.id && req.user.role !== 'Admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this receipt',
            });
        }

        res.status(200).json({
            success: true,
            donation,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get all donations (Admin only)
// @route   GET /api/donations/all
// @access  Private/Admin
const getAllDonations = async (req, res) => {
    try {
        const { status, startDate, endDate } = req.query;
        let query = {};

        if (status) query.status = status;
        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const donations = await Donation.find(query)
            .populate('user', 'name email')
            .populate('school', 'name')
            .sort('-createdAt');

        // Calculate total
        const total = donations.reduce((sum, d) => sum + d.amount, 0);

        res.status(200).json({
            success: true,
            count: donations.length,
            totalAmount: total,
            donations,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get donation statistics
// @route   GET /api/donations/stats
// @access  Private/Admin
const getDonationStats = async (req, res) => {
    try {
        const totalDonations = await Donation.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const monthlyDonations = await Donation.aggregate([
            { $match: { status: 'completed' } },
            {
                $group: {
                    _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                    total: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 6 }
        ]);

        res.status(200).json({
            success: true,
            totalDonated: totalDonations[0]?.total || 0,
            monthlyStats: monthlyDonations,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createDonation,
    getMyDonations,
    getDonationByReceipt,
    getAllDonations,
    getDonationStats,
};