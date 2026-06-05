const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, subject and message',
            });
        }

        const contact = await Contact.create({
            name,
            email,
            phone,
            subject,
            message,
            status: 'pending'
        });

        // Send email notification to admin (optional)
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: `New Contact Form Submission: ${subject}`,
                html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                    <hr/>
                    <p><strong>Submitted on:</strong> ${new Date().toLocaleString()}</p>
                `,
            };
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.log('Email notification failed:', emailError.message);
            // Don't fail the request if email fails
        }

        res.status(201).json({
            success: true,
            message: 'Thank you for contacting us! We will get back to you soon.',
            contact: {
                id: contact._id,
                name: contact.name,
                email: contact.email,
                subject: contact.subject,
                createdAt: contact.createdAt
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get all contact messages (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
const getContacts = async (req, res) => {
    try {
        const { status, limit } = req.query;
        let query = {};

        if (status) query.status = status;

        let contactsQuery = Contact.find(query).sort('-createdAt');
        
        if (limit) {
            contactsQuery = contactsQuery.limit(parseInt(limit));
        }

        const contacts = await contactsQuery;

        // Get counts by status
        const pendingCount = await Contact.countDocuments({ status: 'pending' });
        const readCount = await Contact.countDocuments({ status: 'read' });
        const repliedCount = await Contact.countDocuments({ status: 'replied' });

        res.status(200).json({
            success: true,
            count: contacts.length,
            stats: {
                pending: pendingCount,
                read: readCount,
                replied: repliedCount,
                total: pendingCount + readCount + repliedCount
            },
            contacts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get single contact message (Admin only)
// @route   GET /api/contact/:id
// @access  Private/Admin
const getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found',
            });
        }

        // Mark as read if it was pending
        if (contact.status === 'pending') {
            contact.status = 'read';
            await contact.save();
        }

        res.status(200).json({
            success: true,
            contact,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Update contact status (Admin only)
// @route   PUT /api/contact/:id
// @access  Private/Admin
const updateContactStatus = async (req, res) => {
    try {
        const { status, reply } = req.body;

        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found',
            });
        }

        contact.status = status || contact.status;
        
        if (reply && status === 'replied') {
            // Send reply email to user
            try {
                const replyMailOptions = {
                    from: process.env.EMAIL_USER,
                    to: contact.email,
                    subject: `Re: ${contact.subject} - Digital Donation Hub`,
                    html: `
                        <h2>Thank you for reaching out to Digital Donation Hub</h2>
                        <p>Dear ${contact.name},</p>
                        <p>${reply}</p>
                        <br/>
                        <p>Best regards,<br/>Digital Donation Hub Team</p>
                    `,
                };
                await transporter.sendMail(replyMailOptions);
                contact.repliedAt = new Date();
            } catch (emailError) {
                console.log('Reply email failed:', emailError.message);
            }
        }

        await contact.save();

        res.status(200).json({
            success: true,
            message: 'Contact status updated successfully',
            contact,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete contact message (Admin only)
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contact message deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    submitContact,
    getContacts,
    getContact,
    updateContactStatus,
    deleteContact,
};