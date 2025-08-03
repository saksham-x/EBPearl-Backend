const Comment = require('../models/Comment');
const ApiError = require('../utils/ApiError');
const { sendSuccess } = require('../utils/responseHandler');

// Create comment
exports.addComment = async (req, res, next) => {
  try {
    const { authorName, text } = req.body;
    const { blogId } = req.params;

    if (!authorName || !text) {
      return next(new ApiError('authorName and text are required', 400));
    }

    const comment = new Comment({ blogId, authorName, text });
    await comment.save();

    sendSuccess(res, comment, 'Comment added successfully', 201);
  } catch (error) {
    next(error);
  }
};

// Get all comments for a blog
exports.getCommentsByBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blogId }).sort({ createdAt: -1 });

    sendSuccess(res, comments, 'Comments fetched successfully');
  } catch (error) {
    next(error);
  }
};

// Update a comment
exports.updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new ApiError('Comment not found', 404));
    }

    if (text) comment.text = text;

    await comment.save();

    sendSuccess(res, comment, 'Comment updated successfully');
  } catch (error) {
    next(error);
  }
};

// Delete a comment
exports.deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const deleted = await Comment.findByIdAndDelete(commentId);
    if (!deleted) {
      return next(new ApiError('Comment not found', 404));
    }

    sendSuccess(res, deleted, 'Comment deleted successfully');
  } catch (error) {
    next(error);
  }
};
