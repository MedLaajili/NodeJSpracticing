const fs = require('fs');

// reading files
fs.readFile('./docs/article.txt', (err, data)=>{
    if (err) {
        console.log(err)
    }
    console.log(data.toString());
});

console.log('hello');

//writing files
fs.writeFile('./docs/article.txt','laajili Mohamed',(err)=>{
    if (err){
        console.log(err);
    }
    fs.readFile('./docs/article.txt', (err, data)=>{
        if (err) {
            console.log(err)
        }
        console.log(data.toString());
    });
})

//directories
if (!fs.existsSync('./assets')){
    fs.mkdir('./assets',(err)=>{
        if (err) {
            console.log(err);
        }
        console.log('folder created');
    });
} else {
    fs.rmdir('./assets',(err)=>{
        if (err){
            console.log(err);
        }
        console.log('folder deleted');
    });
};

// deleting files
if (fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt',(err)=>{
        if (err){
            console.log(err)
        }
        console.log('file deleted')
    });
}else {
    fs.writeFile('./docs/deleteme.txt','this article is gonna be deleted',(err)=>{
        if (err){
            console.log(err);
        }
        fs.readFile('./docs/deleteme.txt', (err, data)=>{
            if (err) {
                console.log(err)
            }
            console.log(data.toString());
        });
    })
}
/*
fs.mkdir('./clients&servers',(err)=>{
    if (err){
        console.log(err);
    }
    console.log('document created');
})
*/