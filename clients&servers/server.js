const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    console.log(req.url, req.method);
    
    /*set header content type
    res.setHeader('Content-type','text/html');
    res.write('<head><title>MyPage</title></head>')
    res.write('<p>hello, ninjas</p>');
    res.end();
    */

    //send an html file
    res.setHeader('Content-type','text/html');
    fs.readFile('./views/index.html',(err,data)=>{
        if (err){
            console.log(err);
            res.end();
        }
        //  res.write(data); we're only returninig just one page of data so we can pass it as argument to the end method without using write method
        res.end(data);
    })

});

server.listen(3000,'localhost',()=>{
    console.log('listening for requests on port 3000');
});