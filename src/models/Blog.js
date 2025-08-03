const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tags: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Tag',
}]
});

module.exports = mongoose.model('Blog', blogSchema);
