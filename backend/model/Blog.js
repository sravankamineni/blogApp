const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
