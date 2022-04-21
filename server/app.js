const express = require('express');
var morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./Models/blog');
const { render } = require('ejs');

//connect to mongoDB
const dbURI = 'mongodb+srv://laajili:test1234@nodetuto.n1hyy.mongodb.net/node-DB?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((result)=>app.listen(3000))
    .catch((err)=>console.log(err));
// express app
const app = express();

//Register view engine
app.set('view engine','ejs');

//middleware & statis files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
app.get('/add-blog',(req,res)=>{
    const blog = new Blog({
        title:'new blog',
        snippet:'about my blog',
        body:'more about my blog'
    });
    blog.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        });
});
app.get('/all-blog',(req,res)=>{
    Blog.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        });
});
app.get('/single-blog',(req,res)=>{
    Blog.findById('625f5594d7655e92d8c278fe')
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        });
});

//routes
app.get('/',(req,res)=>{
    const blogs = [
        {title:'Rich dad poor dad', snippet:'lorem ipsum dolor sit amet consectetur'},
        {title:'The Atomic Habits', snippet:'lorem ipsum dolor sit amet consectetur'},
        {title:'the Moneyball', snippet:'lorem ipsum dolor sit amet consectetur'}
    ];
    const message= "there's no available blogs right now"
    res.render('index',{title:'Home',blogs,message});
});
app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
});

// Blog routes
app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('index',{title:'All Blogs', blogs:result})
    })
    .catch((err)=>{
        console.log(err);
    })
});
app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'New Blog'});
});
app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body);

    blog.save().then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    })
})
// Display one blog
app.get('/blogs/:id',(req,res)=>{
    Blog.findById(req.params.id)
    .then((result)=>{
        res.render('details', {blog:result, title:'Blog Details'});
    })
    .catch((err)=>{
        console.log(err);
    });
});
//Delete a blog
app.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/blogs'});
    })
    .catch((err)=>{
        console.log(err);
    });
});
//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:'Error'});
});