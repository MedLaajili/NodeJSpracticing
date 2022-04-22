const express = require('express');
const router = express.Router();
const Blog = require('../Models/blog');
const BlogController = require('../Controllers/BlogController');
// Blog routes
router.get('/',BlogController.blog_index);
router.get('/create',BlogController.blog_create);
router.post('/',BlogController.blog_post);
// Display one blog
router.get('/:id',BlogController.blog_details);
//Delete a blog
router.delete('/:id',BlogController.blog_delete);

module.exports = router;