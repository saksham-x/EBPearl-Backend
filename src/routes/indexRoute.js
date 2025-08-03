const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes');
const tagRoutes = require('./tagRoutes');
const validate = require('../middlewares/validateMiddleware');
const { createBlogSchema } = require('../validations/blog.validation');

router.use('/auth', authRoutes);
router.use('/blogs',validate(createBlogSchema), blogRoutes);
router.use('/comments', commentRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
