const mongoose = require('../config/db');

const tagSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
