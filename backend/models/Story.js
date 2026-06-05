const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    raised: { type: Number, default: 0 },
    donors: { type: Number, default: 0 },
    studentsImpacted: { type: Number, required: true },
    date: { type: String, required: true },
    icon: { type: String, required: true },
    featured: { type: Boolean, default: false },
    quote: String,
    quoteAuthor: String,
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
    images: [String],
    videoUrl: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Story', storySchema);