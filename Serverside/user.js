/*
Here we can maintain user information and activities on server side
Authentication done by Json based web token
*/

var usersmodel=require('../models/usermodel.js');
var jsonwebtoken=require('jsonwebtoken');

var key = 'g5dH9giavdr4gPzdEDxk';

function createtoken(user){
  
  var token=jsonwebtoken.sign(user,key,{
    expiresIn:1440
 });
return token;
}



module.exports=function(app){

app.post('/usersd', function(req, res){
  
  var user;
  
  user = new usersmodel({
  	name:req.body.name,
  	username:req.body.username,
	password:req.body.password,
	email:req.body.email,
	contact:req.body.contact
  });
  
  user.save(function(err,users) {
    if (!err) {
       console.log("created");
       res.send(users);
    } else {
      return console.log(err);
    }
  }); 
});

//here admin creations
app.post('/createadmins', function(req, res){
  var secrete=req.body.secrete;
  if(secrete===key){
    console.log('key matched');
    var user;
  
  user = new usersmodel({
    name:req.body.name,
    username:req.body.username,
    password:req.body.password,
    email:req.body.email,
    contact:req.body.contact,
    role:'admin'
  });
   user.save(function(err,users) {
    if (!err) {
       console.log("created");
       res.send(users);
    } else {
      return console.log(err);
    }
  }); 
  
  }
  else{
    console.log("key doesnt match");
    res.send("Key Doesn't match");
  }

 
});


//here login 

app.get('/users/:mail/:password',function(req,res){
	
usersmodel.findOne({"email":req.params.mail,"password":req.params.password},function(err,users){
   
    if(err){
         console.log(err);
             return next(err);
    }
    if(users!=null){

      var token1=createtoken(users);
      res.json({
        status:0,
        success:true,
        Message:"successfully logining",
        data:users,
        token:token1

      });

    }
    else{
      res.json({status:1,statusText:"user is not registered in DB"});
     }
  })

});


}//Here module.exports closed