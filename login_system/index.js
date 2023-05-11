const express = require('express');
const path = require('path');
const bodyparser =require('body-parser');
const session = require('express-session');
const {v4:uuidv4}=require("uuid");
const router =require('./router')
const app = express();
const ejs = require('ejs');
const port =3300;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use('/static',express.static(path.join(__dirname,'public')));
app.use(session({
  secret:uuidv4(),
  resave:false,
  saveUninitialized:true
}));
app.use('/route',router);
app.get('/',(req,res)=>{
  res.render('home',{title:"Login"});
  res.end();
});
app.get('/register',(req,res)=>{
res.render('reg',{title:'Register'});
res.end();
});
app.use((req,res,next)=>{
    res.status(404);
    res.write('not found');
    res.end();
   });
app.listen(port,()=>{
    console.log(`app installing on port ${port}`);
})


