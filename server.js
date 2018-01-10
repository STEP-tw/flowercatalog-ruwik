let fs = require('fs');
let http = require('http');
let webApp = require('./webApp.js');
let nameOfUser = ''

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

const giveTime = function(){
  let timeAndDate = new Date();
  return timeAndDate.getHours()+':'+timeAndDate.getMinutes()+':'+timeAndDate.getSeconds();
};

const giveDate = function(){
  let date = new Date();
  return date.getDate()+"/"+(1+date.getMonth())+'/'+date.getFullYear();
};

const createCommentObject = function(name,comment){
  let commentGiven = {}
  commentGiven['name'] = name;
  commentGiven['comment'] = comment;
  commentGiven['date'] = giveDate();
  commentGiven['time'] = giveTime();
  return commentGiven;
}

const writeInDataBase = function(data){
  let content = fs.readFileSync('./data/data.js','utf8');
  content = content.slice(content.indexOf('['));
  content = JSON.parse(content);
  content.unshift(data);
  content = 'var data = '+JSON.stringify(content,null,2);
  fs.writeFile('./data/data.js',content,(err)=>{
    if(err){
      console.log('failed');
    };
  });
};

const storeData = function(data){
  let name = data.name;
  let comment = data.Comment;
  comment = decodeURIComponent(comment);
  name = decodeURIComponent(name);
  comment = comment.replace(/\+/g,' ');
  name = name.replace(/\+/g,' ');
  let dataToStore = createCommentObject(name,comment);
  writeInDataBase(dataToStore);
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

const replaceAndWriteFile = function(filePath,res,content,area){
  fs.readFile(filePath,(err,data)=>{
    if(err){
      res.statusCode = 404;
      res.write('<h1>file not found</h1>');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type',giveContentType(filePath));
      res.write(data.toString().replace(area,content));
    };
    res.end();
  });
}

const registered_users = [{userName:'manikm',name:'Manindra Krishna Motukuri'}]

let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};
let redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/public/html/login.html','/public/html/guestBook.html']) && req.user) res.redirect('/public/html/writeCommentHere.html');
}
let redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/logout']) && !req.user) res.redirect('/public/html/login.html');
}

const app = webApp.create();
app.use(loadUser);
app.use(redirectLoggedInUserToHome);
app.use(redirectLoggedOutUserToLogin);
app.get('/',(req,res)=>{
  res.redirect('/index.html');
  return;
});

app.get('/logout',(req,res)=>{
  res.setHeader('Set-Cookie',[`loginFailed=false,Expires=${new Date(1).toUTCString()}`,`sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/public/html/login.html');
});

app.get('/index.html',(req,res)=>{
  readAndWriteFile('./index.html',res);
})
app.get('/login',(req,res)=>{
  res.setHeader('Content-type','text/html');
  if(req.cookies.logInFailed) res.write('<p>Invalid User Name</p>');
  res.write('<form method="POST"> <input name="userName"><input type="submit"></form><a href="/">Home Page</a>');
  res.end();
});
app.post('/login',(req,res)=>{
  nameOfUser = req.body.userName;
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`logInFailed=true`);
    res.redirect('/login');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/public/html/writeCommentHere.html');
});

app.post('/udpateComments',(req,res)=>{
  storeData(req.body);
  res.redirect('/public/html/writeCommentHere.html');
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

app.get('/public/html/writeCommentHere.html',(req,res)=>{
  replaceAndWriteFile('.'+req.url,res,nameOfUser,'userName');
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
