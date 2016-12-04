
var booksmodel=require('../models/booksmodel.js');

module.exports=function(app){

app.post('/books/addbooks', function(req, res){
  
  var book;
  
  book = new booksmodel({
  	name:req.body.name,
  	booktype:req.body.booktype,
  	author:req.body.author,
	quantity:req.body.quantity,
	status:req.body.status
  });
  
  book.save(function(err,books) {
    if (!err) {
       console.log("Book has been added");
       res.send(books);
    } else {
      return console.log(err);
    }
  }); 
});


//Get all books

app.get('/books/Getallbooks',function(req,res){

booksmodel.find({},function(err,books){
	if(err) {
		console.log(err);
		return next(err);
	}
	else{
		res.send(books);
	}
})

});

app.delete('/books/delete/:id',function(req,res){
	booksmodel.remove({_id:req.params.id},function(err,responce){
		if(err){
			console.log(err);
			
		}
		else{
			res.send(responce);
		}
	})

});

app.put('/books/updatequantity/:id/:quantity',function(req,res){
	console.log(req.params.quantity);
	var changedquantity=req.params.quantity-1;
	if(changedquantity>0){

     booksmodel.update(
	{_id:req.params.id},
	{$set:{
		'quantity':changedquantity
	}},function(err,result){
		if(err){
			console.log(err);
		}
		else{
			res.send(result);
		}
	});

	}
	else{
   console.log("triggered here")
    booksmodel.update(
	{_id:req.params.id},
	{$set:{
		'quantity':changedquantity,
		'status':'Unavailable'
	}},function(err,result){
		if(err){
			console.log(err);
		}
		else{
			res.send(result);
		}
	});

	}
});

app.put('/books/quantityupdate/:id',function(req,res){
	
		booksmodel.find({_id:req.params.id},function(err,result){
		if(err) {
			console.log(err);
		}
		else{
			var quantityvalue=result[0].quantity;
			booksmodel.update({_id:req.params.id},
				{$set:{
					'quantity':quantityvalue+1
				}},function(err,result){
					if(err){
						console.log(err);
					}
					else{
						res.send(result);
					}
				})
		}
	});

	
});
var callback=function(err,result){
	if(err){
		console.log(err);
	}
	else{
		res.send(result);
	}
}

app.get('/books/searchbook/:booktype/:status',function(req,res){
	booksmodel.find({'booktype':req.params.booktype,'status':req.params.status},function(err,result){
	if(err){
		console.log(err);
	}
	else{
		res.send(result);
	}
});

});

app.get('/books/searchbooks/availability/:status',function(req,res){
	booksmodel.find({'status':req.params.status},function(err,result){
	if(err){
		console.log(err);
	}
	else{
		res.send(result);
	}
});
});

app.get('/books/searchbooks/booktype/:booktype',function(req,res){
	booksmodel.find({'booktype':req.params.booktype},function(err,result){
	if(err){
		console.log(err);
	}
	else{
		res.send(result);
	}
});
});



}//Here module exports close