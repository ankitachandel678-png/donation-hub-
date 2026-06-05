const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const donationSchema = new mongoose.Schema({
    donationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation' },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    item: { type: String, required: true },
    receiptId: { type: String },
    schoolName: { type: String },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ['Donor', 'School Admin', 'Volunteer', 'Admin'], default: 'Donor' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    totalDonated: { type: Number, default: 0 },
    donations: [donationSchema],
    joinDate: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
    profileImage: { type: String },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);