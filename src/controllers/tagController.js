const Tag = require('../models/Tag');

// Create tag
exports.createTag = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Tag name is required' });

    const existing = await Tag.findOne({ name });
    if (existing) return res.status(409).json({ message: 'Tag already exists' });

    const tag = new Tag({ name });
    await tag.save();
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all tags
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
