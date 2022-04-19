const express = require('express');
var morgan = require('morgan');
const mongoose = require('mongoose');

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
app.use(morgan('tiny'));

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

// redirects
app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'New Blog'});
});
//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:'Error'});
});