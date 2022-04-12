const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req,res)=>{
    
    // Lodash
    const num = _.random(0,20);
    console.log(num);

    const greet= _.once(()=>{
        console.log('hello');
    })

    greet();
    greet();
    /*set header content type
    res.setHeader('Content-type','text/html');
    res.write('<head><title>MyPage</title></head>')
    res.write('<p>hello, ninjas</p>');
    res.end();
    */
    
    //set header content type
    res.setHeader('Content-type','text/html');
    
    let path = './views/';
    switch(req.url){
        case '/':
            path+='index.html';
            res.statusCode=200;
            break;
        case '/about':
            path+='about.html';
            res.statusCode=200;
            break;
        case'/abou-me':
            res.statusCode=301;
            res.setHeader('Location','./about');
        default:
            path+='404.html'
            res.statusCode=404;
            break;
    }
    //send an html file
    fs.readFile(path,(err,data)=>{
        if (err){
            console.log(err);
            res.end();
        }else{
            //  res.write(data); we're only returninig just one page of data so we can pass it as argument to the end method without using write method
            res.end(data);
        }
    })

});

server.listen(3000,'localhost',()=>{
    console.log('listening for requests on port 3000');
});