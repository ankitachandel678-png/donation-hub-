const express = require('express');
const router = express.Router();
const { getSchools, getSchool, getUrgentNeeds } = require('../controllers/schoolController');

router.get('/', getSchools);
router.get('/urgent-needs', getUrgentNeeds);
router.get('/:id', getSchool);

module.exports = router;