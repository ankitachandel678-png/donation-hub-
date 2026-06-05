const express = require('express');
const router = express.Router();
const { getCampaigns, getCampaign } = require('../controllers/campaignController');

router.get('/', getCampaigns);
router.get('/:id', getCampaign);

module.exports = router;