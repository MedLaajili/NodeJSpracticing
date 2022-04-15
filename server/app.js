const express = require('express');
var morgan = require('morgan');
// express app
const app = express();

//Register view engine
app.set('view engine','ejs');

//listen for requests
app.listen(3000);

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