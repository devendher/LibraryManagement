app.factory('TransactionService',function($http){

	return {

		gatalltransactions:function(){
			return $http.get('/books/transaction/data')
			.then(function(responce){
				return responce.data;
			},function(){

				throw "There was an error while getting data from DB";

			});
		},
	  updatetransaction:function(id){

	  	return $http.put('/transaction/returnupdate/'+id)
	  	       .then(function(responce){
	  	       	   return responce.data;
	  	       },function(){
	  	       	throw "Error";
	  	       });

	  },
	  searchtransactions:function(status){
	  	return $http.get('/transactions/getstatusdata/'+status)
	  	.then(function(responce){
	  		return responce.data;
	  	},function(){
	  		throw "ERROR";
	  	});
	  }
	}

});

