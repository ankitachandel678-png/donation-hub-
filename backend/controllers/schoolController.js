const School = require('../models/School');

// @desc    Get all schools
// @route   GET /api/schools
// @access  Public
const getSchools = async (req, res) => {
    try {
        const { search, state, urgent, city } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        if (state) {
            query.state = { $regex: state, $options: 'i' };
        }

        if (city) {
            query.city = { $regex: city, $options: 'i' };
        }

        if (urgent === 'true') {
            query['needs.urgent'] = true;
        }

        const schools = await School.find(query).sort('-createdAt');

        res.status(200).json({
            success: true,
            count: schools.length,
            schools,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get single school
// @route   GET /api/schools/:id
// @access  Public
const getSchool = async (req, res) => {
    try {
        const school = await School.findById(req.params.id);

        if (!school) {
            return res.status(404).json({
                success: false,
                message: 'School not found',
            });
        }

        res.status(200).json({
            success: true,
            school,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Create school (Admin only)
// @route   POST /api/schools
// @access  Private/Admin
const createSchool = async (req, res) => {
    try {
        const school = await School.create(req.body);

        res.status(201).json({
            success: true,
            school,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Update school
// @route   PUT /api/schools/:id
// @access  Private/Admin
const updateSchool = async (req, res) => {
    try {
        const school = await School.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!school) {
            return res.status(404).json({
                success: false,
                message: 'School not found',
            });
        }

        res.status(200).json({
            success: true,
            school,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete school
// @route   DELETE /api/schools/:id
// @access  Private/Admin
const deleteSchool = async (req, res) => {
    try {
        const school = await School.findByIdAndDelete(req.params.id);

        if (!school) {
            return res.status(404).json({
                success: false,
                message: 'School not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'School deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get urgent needs
// @route   GET /api/schools/urgent/needs
// @access  Public
const getUrgentNeeds = async (req, res) => {
    try {
        const schools = await School.find({ 'needs.urgent': true });
        
        const urgentNeeds = [];
        schools.forEach(school => {
            school.needs.forEach(need => {
                if (need.urgent) {
                    urgentNeeds.push({
                        schoolId: school._id,
                        schoolName: school.name,
                        schoolLocation: school.location,
                        schoolIcon: school.icon,
                        ...need.toObject(),
                        percentage: (need.raised / need.price) * 100
                    });
                }
            });
        });

        res.status(200).json({
            success: true,
            count: urgentNeeds.length,
            urgentNeeds,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get schools by state
// @route   GET /api/schools/state/:state
// @access  Public
const getSchoolsByState = async (req, res) => {
    try {
        const schools = await School.find({ 
            state: { $regex: req.params.state, $options: 'i' } 
        });
        
        res.status(200).json({
            success: true,
            count: schools.length,
            schools,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getSchools,
    getSchool,
    createSchool,
    updateSchool,
    deleteSchool,
    getUrgentNeeds,
    getSchoolsByState,
};