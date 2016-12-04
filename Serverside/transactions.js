
var booksmodel=require('../models/booksmodel.js');
var transactionmodel=require('../models/transactionalmodel.js');


module.exports=function(app){
app.post('/books/transaction', function(req, res){
  
  var transaction;
  
  transaction = new transactionmodel({
  	bookid:req.body._id,
  	username:req.body.username,
  	email:req.body.email,
	contact:req.body.contact,
	IssueDate:req.body.issuedate,
	DueDate:req.body.duedate
  });
  
  transaction.save(function(err,transaction) {
    if (!err) {
       console.log("transaction has been generated");
       res.send(transaction);
    } else {
      return console.log(err);
    }
  }); 
});

app.get('/books/transaction/data',function(req,res){
//Here we are populating book data from transaction schema
transactionmodel.find({})
.populate('bookid')
.exec(function(err,result){
	if(err) {
		console.log(err);
	}
	else{
		res.send(result);
	}
})
});
///transaction/returnupdate/'+tid
app.put('/transaction/returnupdate/:id',function(req,res){
 transactionmodel.update(
  {_id:req.params.id},
  {$set:{
    'status':"Returned"
  }},function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.send(result);
      console.log(result);
    }
  });

});


app.delete('/transactions/deleteitem/:id',function(req,res){
transactionmodel.remove({_id:req.params.id},function(err,result){
  if(err){
    console.log(err);
  }
  else{
    console.log('Record deleted'+req.params.id);
    res.send(result);

  }

});

});

app.get('/transactions/getstatusdata/:status',function(req,res){
  transactionmodel.find({'status':req.params.status},function(err,result){
    if(err){ console.log(err);}
    else{
      res.send(result);
    }

  });
})


}//module.exports close