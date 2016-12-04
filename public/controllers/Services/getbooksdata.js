app.factory('BooksService',function($http){

	return {

		gatallbooksdata:function(){
			return $http.get('/books/Getallbooks')
			.then(function(responce){
				return responce.data;
			},function(){

				throw "There was an error while getting data from DB";

			});
		},
		updatequantity: function(id) {
			//This service for updating quantity after returning book
                return $http.put('/books/quantityupdate/'+id)
                .then(function(response) {
                  return response.data;
                 }, function() {
                        throw 'There was an error getting data';
                    });
            },
         searchbooksdata:function(booktype,status){
        	return $http.get('/books/searchbook/'+booktype+'/'+status)
        	.then(function(response){
        		return response.data;
        	},function(){
        		throw "ERROR";
        	});
        },
        SearchbooksforAvailability:function(status){
        	
        	return $http.get('/books/searchbooks/availability/:status')
        	.then(function(response){
        		return response.data;
        	},function(){
        		throw "error";
        	});
        },
        Searchbooksforbooktype:function(booktype){
        	return $http.get('/books/searchbooks/booktype/:booktype')
        	.then(function(response){
        		return response.data;
        	},function(){
        		throw "error";
        	});

        }


	}

});

