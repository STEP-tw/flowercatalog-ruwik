let fs = require('fs');
let http = require('http');
let webApp = require('./webApp.js');

const giveFileType = function(url){
  return url.slice(url.lastIndexOf('.'));
}

const contentTypeOfFiles = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.jpg': 'img/jpg',
  '.pdf': 'text/pdf',
  '.gif': 'img/gif',
  '.ico': 'img/ico'
}

const giveContentType = function(url){
  let fileType = giveFileType(url);
  return contentTypeOfFiles[fileType];
}

const readAndWriteFile = function(filePath,res){
  fs.readFile(filePath,(err,data)=>{
    if(err){
      res.statusCode = 404;
      res.write('<h1>file not found</h1>');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type',giveContentType(filePath));
      res.write(data);
    };
    res.end();
  });
};


const app = webApp.create();
app.get('/',(req,res)=>{
  res.redirect('/index.html');
  return;
});

app.get('/index.html',(req,res)=>{
  readAndWriteFile('./index.html',res);
})

app.get('/public/css/index.css',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.get('/public/docs/freshorigins.jpg',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.get('/public/docs/animated-flower-image-0021.gif',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.get('/public/html/abeliophyllum.html',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.get('/public/css/abeliophyllum.css',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.get('/public/docs/pbase-Abeliophyllum.jpg',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.get('/public/docs/Abeliophyllum.pdf',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.get('/public/html/ageratum.html',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.get('/public/html/ageratum.html',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.get('/public/css/ageratum.css',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.get('/public/docs/pbase-agerantum.jpg',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.get('/public/docs/Ageratum.pdf',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.get('/public/html/guestBook.html',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.get('/public/css/guestBook.css',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.get('/public/html/login.html',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.post('/public/html/writeCommentHere.html',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.post('/public/html/guestBook.html',(req,res)=>{
  res.redirect('/public/html/writeCommentHere.html');
  return;
})

app.get('/public/html/writeCommentHere.html',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})


app.get('/data/data.js',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.get('/public/css/guestBook.css',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

app.get('/js/updateComments.js',(req,res)=>{
  readAndWriteFile('.'+req.url,res);
})

const server = http.createServer(app);
const port = 8000;
server.listen(port);
console.log(`listening on port ${port}`);
