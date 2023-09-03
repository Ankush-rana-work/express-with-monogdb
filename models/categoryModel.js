const mongoose = require('../config/db');

const categoryModel = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    subcategories: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default : null },
});

const Category = mongoose.model('Category', categoryModel);

module.exports = Category;
