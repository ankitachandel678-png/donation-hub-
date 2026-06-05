const express = require('express');
const router = express.Router();
const { createDonation, getMyDonations, getDonationByReceipt } = require('../controllers/donationController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createDonation);
router.get('/my-donations', protect, getMyDonations);
router.get('/receipt/:receiptId', protect, getDonationByReceipt);

module.exports = router;