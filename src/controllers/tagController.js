const Tag = require('../models/Tag');
const ApiError = require('../utils/ApiError');
const { sendSuccess } = require('../utils/responseHandler');

// Create tag
exports.createTag = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return next(new ApiError('Tag name is required', 400));
    }

    const existing = await Tag.findOne({ name });
    if (existing) {
      return next(new ApiError('Tag already exists', 409));
    }

    const tag = new Tag({ name });
    await tag.save();

    sendSuccess(res, tag, 'Tag created successfully', 201);
  } catch (err) {
    next(err);
  }
};

// Get all tags
exports.getAllTags = async (req, res, next) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });
    sendSuccess(res, tags, 'Tags fetched successfully');
  } catch (err) {
    next(err);
  }
};
