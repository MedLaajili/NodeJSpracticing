const http = require('http');

const server = http.createServer((req,res)=>{
    console.log(req.url, req.method);
    
    //set header content type
    res.setHeader('Content-type','text/html');
    res.write('<head><title>MyPage</title></head>')
    res.write('<p>hello, ninjas</p>');
    res.end();
});

server.listen(3000,'localhost',()=>{
    console.log('listening for requests on port 3000');
});