const express = require('express');
const hbs = require('hbs')
const fs = require('fs')
var app = express();
const port = process.env.PORT || 3110


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs')
app.use(express.static(__dirname + '/public/public'))
app.use((req, resp,next)=>{
    var now = new Date().toString()
    var log = `${now}: ${req.url} ${req.method}`
    console.log(log)
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){console.log('unable to append to server.log')}
    })
    next()
})
// app.use((req,resp, next)=>{
//     resp.render('maintainance.hbs')
// })
hbs.registerHelper('currentYear',()=>{
    return new Date().getFullYear()
})
app.get('/',(req,res)=>{
    // res.send('<h1>hello express</h1>');
    res.render('home.hbs',{
        welcomeMessage:"welcome to a stupid webpage",
        pageTitle:'Home page',
      
        })
  
}) ;
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About page',
       

    })
})
app.get('/bad',(req,res)=>{
    res.send( ({errorMessage:'something went wrong'}))
})
app.get('/project',(req,res)=>{
    res.render('project.hbs',{
        pageTitle:"Projects page"
    })
})
app.listen(port);
console.log(`listening on port ${port}`)