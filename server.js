const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port =  process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
    var now= new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n',(err) =>{
        if(err){
            console.log('unable to append to server.log');
        }
    });
    next();
    
});

// app.use((req,res,next)=>{
//     res.render('maintanence.hbs');
// });

hbs.registerHelper('getTitle',(text) =>{
    return text.toUpperCase();
});

app.get('/',(req,res) =>{
    res.render('home.hbs',{
        pageTitle:'HOME PAGE',
        welcomeMsg:'HIE WELCOME'
    })
});

app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        pageTitle: 'About page',
        year: new Date().getFullYear()
    })
});

app.get('/project',(req,res) =>{
    res.render('project.hbs',{
        pageTitle:'project page'

    })
});

app.get('/bad',(req,res) => {
    res.send({
        errorMessage: 'error has occured'
    });
});

app.listen(port,()=>{
    console.log(`port : ${port}`);
    
});