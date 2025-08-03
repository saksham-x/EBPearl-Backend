const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/blogs/:blogId/comments', commentController.addComment);
router.get('/blogs/:blogId/comments', commentController.getCommentsByBlog);
router.put('/comments/:commentId', commentController.updateComment);
router.delete('/comments/:commentId', commentController.deleteComment);

module.exports = router;
