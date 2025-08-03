const Comment = require('../models/Comment');

// Create comment
exports.addComment = async (req, res) => {
  try {
    const { authorName, text } = req.body;
    const { blogId } = req.params;

    if (!authorName || !text) {
      return res.status(400).json({ message: 'authorName and text are required' });
    }

    const comment = new Comment({ blogId, authorName, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all comments for a blog
exports.getCommentsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blogId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (text) comment.text = text;

    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deleted = await Comment.findByIdAndDelete(commentId);
    if (!deleted) return res.status(404).json({ message: 'Comment not found' });

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
