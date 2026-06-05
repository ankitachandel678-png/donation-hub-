const mongoose = require('mongoose');

const needSchema = new mongoose.Schema({
    item: { type: String, required: true },
    price: { type: Number, required: true },
    raised: { type: Number, default: 0 },
    donors: { type: Number, default: 0 },
    urgent: { type: Boolean, default: false },
});

const schoolSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    location: { type: String, required: true },
    students: { type: Number, required: true },
    grades: { type: String, required: true },
    description: { type: String, required: true },
    needs: [needSchema],
    icon: { type: String, default: "🏫" },
    images: [String],
    verified: { type: Boolean, default: true },
    city: String,
    state: String,
    pincode: String,
    contactPerson: String,
    contactPhone: String,
    contactEmail: String,
    createdAt: { type: Date, default: Date.now, index: true },
});

schoolSchema.index({ name: 'text', location: 'text', description: 'text' });

module.exports = mongoose.model('School', schoolSchema);