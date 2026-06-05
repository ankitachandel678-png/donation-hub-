const Story = require('../models/Story');

// @desc    Get all stories
// @route   GET /api/stories
// @access  Public
const getStories = async (req, res) => {
    try {
        const { featured, limit, category } = req.query;
        let query = {};

        if (featured === 'true') {
            query.featured = true;
        }

        if (category) {
            query.category = category;
        }

        let storiesQuery = Story.find(query)
            .populate('school', 'name location')
            .sort('-createdAt');

        if (limit) {
            storiesQuery = storiesQuery.limit(parseInt(limit));
        }

        const stories = await storiesQuery;

        res.status(200).json({
            success: true,
            count: stories.length,
            stories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get single story
// @route   GET /api/stories/:id
// @access  Public
const getStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id)
            .populate('school', 'name location');

        if (!story) {
            return res.status(404).json({
                success: false,
                message: 'Story not found',
            });
        }

        res.status(200).json({
            success: true,
            story,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Create story
// @route   POST /api/stories
// @access  Private/Admin
const createStory = async (req, res) => {
    try {
        const story = await Story.create(req.body);

        res.status(201).json({
            success: true,
            story,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Update story
// @route   PUT /api/stories/:id
// @access  Private/Admin
const updateStory = async (req, res) => {
    try {
        const story = await Story.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!story) {
            return res.status(404).json({
                success: false,
                message: 'Story not found',
            });
        }

        res.status(200).json({
            success: true,
            story,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete story
// @route   DELETE /api/stories/:id
// @access  Private/Admin
const deleteStory = async (req, res) => {
    try {
        const story = await Story.findByIdAndDelete(req.params.id);

        if (!story) {
            return res.status(404).json({
                success: false,
                message: 'Story not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Story deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get featured stories
// @route   GET /api/stories/featured
// @access  Public
const getFeaturedStories = async (req, res) => {
    try {
        const stories = await Story.find({ featured: true })
            .populate('school', 'name location')
            .limit(3)
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: stories.length,
            stories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getStories,
    getStory,
    createStory,
    updateStory,
    deleteStory,
    getFeaturedStories,
};