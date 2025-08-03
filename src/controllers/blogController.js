const Blog = require('../models/Blog');
const ApiError = require('../utils/ApiError');
const { sendSuccess } = require('../utils/responseHandler');

// Create a blog
exports.createBlog = async (req, res,next) => {
  try {
    const { title, description, tags } = req.body;
      const blog = new Blog({ title, description,tags, author: req.user.id });
    await blog.save();

     sendSuccess(res, blog, 'Blog created successfully oo', 201);  
  } catch (error) {
   next(error);
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res, next) => {
  try {
    const { tag, search, sort } = req.query;
    const filter = {};

    if (tag) {
      filter.tags = tag; 
    }
      if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

     let sortOption = { createdAt: -1 };
    if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    }
    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .populate('tags', 'name')
      .populate('author', 'name email');
sendSuccess(res, blogs, 'Blogs fetched successfully');
  } catch (error) {
  next(error);
  }
};


// get my blog 
exports.getAllMyBlogs = async (req, res, next) => {
  try {
   const blogs = await Blog.find({ author: req.user.userId });
  sendSuccess(res, blogs, 'Your blogs');
  } catch (error) {
  next(error);
  }
};



// Get single blog by ID
exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('tags', 'name').populate('author', 'name email');
    if (!blog){
      return next(new ApiError('Blog not found', 404));
    }

    sendSuccess(res, blog, 'Blog fetched successfully');
    
  } catch (error) {
    next(error);}
};

// Update blog by ID
exports.updateBlog = async (req, res, next) => {
  try {
    const { title, description, tag } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog){
       return next(new ApiError('Blog not found', 404));
    }

    if (title) blog.title = title;
    if (description) blog.description = description;

    await blog.save();
 sendSuccess(res, blog, 'Blog updated successfully');
  } catch (error) {
    next(error);
  }
};

// Delete blog by ID
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return next(new ApiError('Blog not found', 404));
    }

    sendSuccess(res, blog, 'Blog deleted successfully');
  } catch (error) {
    next(error);}
};
