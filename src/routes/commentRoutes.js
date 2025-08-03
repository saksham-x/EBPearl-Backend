const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/blogs/:blogId/comments',authMiddleware, commentController.addComment);
router.get('/blogs/:blogId/comments', commentController.getCommentsByBlog);
router.put('/:commentId',authMiddleware, commentController.updateComment);
router.delete('/:commentId',authMiddleware, commentController.deleteComment);

module.exports = router;
