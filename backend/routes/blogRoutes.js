const express = require('express');
const { getAllBlogs,createBlog, updateBlog,getById, deleteBlog, getUserById } = require('../controllers/blogController');
// const { protect } = require('../middlewares/authMiddleware');
const blogRouter = express.Router();

blogRouter.get('/', getAllBlogs);
blogRouter.post('/create', createBlog);
blogRouter.put("/update/:id",updateBlog)
blogRouter.get("/:id",getById)
blogRouter.delete("/:id",deleteBlog)
blogRouter.get("/user/:id",getUserById)





module.exports = blogRouter;
