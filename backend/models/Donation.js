const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    amount: { type: Number, required: true },
    item: { type: String, required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', index: true },
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
    receiptId: { type: String, unique: true, index: true },
    paymentId: String,
    orderId: String,
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending', index: true },
    donorName: String,
    donorEmail: String,
    message: String,
    isAnonymous: { type: Boolean, default: false },
    transactionDate: { type: Date, default: Date.now, index: true },
}, { timestamps: true });

donationSchema.pre('save', function(next) {
    if (!this.receiptId) {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        this.receiptId = `DDH/${year}/${month}/${random}`;
    }
    next();
});

module.exports = mongoose.model('Donation', donationSchema);