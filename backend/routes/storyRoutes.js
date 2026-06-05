const express = require('express');
const router = express.Router();
const { getStories, getStory } = require('../controllers/storyController');

router.get('/', getStories);
router.get('/:id', getStory);

module.exports = router;