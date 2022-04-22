const express = require('express');
const router = express.Router();
const Blog = require('../Models/blog');
// Blog routes
router.get('/',(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('index',{title:'All Blogs', blogs:result})
    })
    .catch((err)=>{
        console.log(err);
    })
});
router.get('/create',(req,res)=>{
    res.render('create',{title:'New Blog'});
});
router.post('/',(req,res)=>{
    const blog = new Blog(req.body);

    blog.save().then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    })
})
// Display one blog
router.get('/:id',(req,res)=>{
    Blog.findById(req.params.id)
    .then((result)=>{
        res.render('details', {blog:result, title:'Blog Details'});
    })
    .catch((err)=>{
        console.log(err);
    });
});
//Delete a blog
router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/blogs'});
    })
    .catch((err)=>{
        console.log(err);
    });
});

module.exports = router;