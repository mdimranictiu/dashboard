const express = require('express');
var router = express.Router();
const credential ={
    email : 'admin@imran.com',
    password: 'admin',
}
// login user
router.post('/login',(req,res)=>{
 if(req.body.email == credential.email && req.body.password == credential.password){
  req.session.user = req.body.email;
 res.redirect('/route/dashboard');
  //res.end('login successfully');
 }
 else{
    res.end('Inavlid Username or Password');
 }
});
// route for dashboard
router.get('/dashboard',(req,res)=>{
if(req.session.user){
    res.render('dashboard',{user:req.session.user,title:"Dashboard"});

}
else{
    res.send("Unauthorize user")
}
})
// route forlogout
router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
     if(err){
        console.log(err);
        res.send("Error");
     }
     else{
        res.render('home',{title:'login',logout:"logout successfully "})
     }
    })
})
module.exports =router;