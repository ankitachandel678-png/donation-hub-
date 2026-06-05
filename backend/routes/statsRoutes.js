const express = require('express');
const router = express.Router();
const School = require('../models/School');
const Donation = require('../models/Donation');
const User = require('../models/User');

const getStats = async (req, res) => {
    try {
        const [schoolsCount, donationsTotal, donorsCount] = await Promise.all([
            School.countDocuments(),
            Donation.aggregate([
                { $match: { status: 'completed' } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ]),
            User.countDocuments({ role: 'Donor' })
        ]);

        const stats = {
            schoolsSupported: `${schoolsCount}+`,
            studentsImpacted: `${donorsCount * 10}+`,
            fundsRaised: `₹${((donationsTotal[0]?.total || 0) / 100000).toFixed(1)}Cr+`,
            donorSatisfaction: `98%`
        };

        res.status(200).json({ success: true, stats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

router.get('/', getStats);

module.exports = router;