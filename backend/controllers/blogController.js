const { default: mongoose } = require('mongoose');
const Blog = require('../model/Blog');
const User = require('../model/User');

exports.createBlog = async (req, res, next) => {
    const { title, content, user } = req.body;
    let existingUser
    try {
        existingUser = await User.findById(user)
    }
    catch (err) {
        return console.log(err)

    }
    if (!existingUser) {
        return res.status(400).json({ message: "Unable to find user by this ID" })

    }
    const blog = new Blog({ title, content, user });
    try {
        const session = await mongoose.startSession();
        session.startTransaction()
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session })
        await session.commitTransaction();

    } catch (error) {
        res.status(400).json({ message: 'Blog creation failed', error });
    }
    return res.status(201).json({ blog });
};

exports.getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find()

    } catch (error) {
        return res.status(400).json({ message: 'Fetching blogs failed', error });
    }
    if (!blogs) {
        return res.status(404).json({ message: "No Blogs Found" })
    }
    return res.status(200).json({ blogs });
};


exports.updateBlog = async (req, res, next) => {
    const { title, content } = req.body;
    const blogId = req.params.id;

    let blog
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            content
        })

    } catch (error) {
        res.status(400).json({ message: 'Blog Update failed', error });
    }
    if (!blog) {
        res.status(500).json({ message: 'Unable to Update the Bog' });
    }
    return res.status(200).json({ blog });


};


exports.getById = async (req, res, next) => {
    const id = req.params.id;

    let blog;
    try {
        blog = await Blog.findById(id)

    } catch (error) {
        res.status(400).json({ message: 'Blog Not Found', error });
    }
    if (!blog) {
        res.status(500).json({ message: 'No Blog Found' });
    }
    return res.status(200).json({ blog });


};


exports.deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        
        blog = await Blog.findByIdAndDelete(id).populate("user")
     
        await blog.user.blogs.pull(blog)
        await blog.user.save()

    } catch (error) {
        return res.status(400).json({ message: 'Blog Not Deleted', error });
    }
    if (!blog) {
        return res.status(500).json({ message: 'Unable to Delete' });
    }
    return res.status(200).json({ message: "blog deleted successfully" });


};

exports.getUserById = async (req, res, next) => {
    const userId = req.params.id;

    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs")

    } catch (error) {
        res.status(400).json({error});
    }
    if (!userBlogs) {
        res.status(404).json({ message: 'No Blogs Found' });
    }
    return res.status(200).json({ userBlogs });


};