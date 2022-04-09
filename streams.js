const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog.txt',{encoding:'utf8'});
const writeStream = fs.createWriteStream('./docs/blog3.txt');

/*
readStream.on('data',(chunk)=>{
    console.log('----New chunk----');
    //console.log(chunk);
    writeStream.write('\nNew chunk\n');
    writeStream.write(chunk);
});
*/

//piping
//readStream.pipe(writeStream);

if(fs.existsSync('./docs/blog3.txt')){
    fs.unlink('./docs/blog3.txt',()=>console.log('file deleted'));
}else{
    readStream.pipe(writeStream);
    console.log('file created'); 
}