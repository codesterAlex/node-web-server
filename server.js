const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');

// app.use((req,res, next)=>{
//   res.render('maintain.hbs',{
//     hmaintain : 'Sorry, Website is temporary of service',
//     pmaintain : 'We are maintaing our server. we will be back soon'
//   })
// });
app.use(express.static(__dirname+'/public'));
app.use((req,res, next)=>{
  var now  = new Date().toString();
  var log = `${now}: ${req.method} : ${req.url}`;
  fs.appendFile('server.log',log+'\n', (err)=>{
    if(err)
    {
      console.log("Sorry couldn't append the file.")
    }
  })
  console.log(`${now}: ${req.method} : ${req.url}`);
  next();
});

hbs.registerHelper('getYear',() =>{
  return new Date().getFullYear();
});

hbs.registerHelper('changeIt',(text)=>{
  return text.toUpperCase();
});


app.get('/', (req, res) =>{
  res.render('index.hbs',{
    pageTitle :'Home Page',
    mainHeading : 'Home Page',
    someWords : 'This is paragraph and I am writing this.',
    currentYear : new Date().getFullYear()
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle :'About Page',
    mainHeading : 'About Page',
    currentYear : new Date().getFullYear()
  })
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage : "Bad Request"
  });
});

app.listen(3000,()=>{
  console.log('Server is listening at port 3000');
});
