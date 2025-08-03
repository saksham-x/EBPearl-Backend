const Blog = require('../models/Blog');

// Create a blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    const blog = new Blog({ title, description,tags });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
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
      .populate('tags', 'name');

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


// Get single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' }).populate('tags',"name");
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update blog by ID
exports.updateBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (title) blog.title = title;
    if (description) blog.description = description;

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete blog by ID
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
