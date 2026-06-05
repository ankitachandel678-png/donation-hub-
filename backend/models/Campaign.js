const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    target: { type: Number, required: true },
    raised: { type: Number, default: 0 },
    donors: { type: Number, default: 0 },
    daysLeft: { type: Number, required: true },
    icon: { type: String, required: true },
    featured: { type: Boolean, default: false, index: true },
    urgent: { type: Boolean, default: false, index: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
    endDate: Date,
    createdAt: { type: Date, default: Date.now, index: true },
});

campaignSchema.virtual('progress').get(function() {
    return (this.raised / this.target) * 100;
});

module.exports = mongoose.model('Campaign', campaignSchema);