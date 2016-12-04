app.controller('transactioncontroller',['$scope','$http','$location','$cookieStore','$modal','$log','$rootScope','ModalService','toastr','BooksService','$timeout','$state','TransactionService',function($scope,$http,$location,$cookieStore,$modal,$log,$rootScope,ModalService,toastr,BooksService,$timeout,$state,TransactionService)
{
$scope.spinnershow=false;
$scope.status=[{name:'Borrowed'},{name:"Returned"}];
var getuser=$cookieStore.get('username');
var getuserid=$cookieStore.get('userid');
var getuserrole=$cookieStore.get('userrole1');
if(!getuser){
$location.path("homepage/home");
}

$scope.username=getuser;
$rootScope.accesrole=$rootScope.userrole;
$scope.userrole11=getuserrole;


if((($rootScope.accesrole=="admin") && ($scope.userrole11=="admin")) || ($scope.userrole11=="admin") )
{
  $scope.onlyowner=true;
}
else{
	$location.path("homepage/home");
}

	
	$scope.searchtransactions=function(status){
		if(angular.isUndefined(status)){
			toastr.success('Please!', 'Select Appropriate Option', {
                    closeButton: true,
                    closeHtml: '<button> <span class="glyphicon glyphicon-remove"></span></button>'
                  });


		}
		else{
			TransactionService.searchtransactions(status).then(function(data){
				$scope.transactions=data;

			});
		}

	};

$scope.getalltransactions=function(){
	$scope.spinnershow=true;
	TransactionService.gatalltransactions().then(function(data){
	$scope.transactions=data;
	$scope.curPage = 0;
    $scope.pageSize =5;
    if($scope.transactions.length<0){
    	toastr.success('No Data found!', 'Sorry!', {
                    closeButton: true,
                    closeHtml: '<button> <span class="glyphicon glyphicon-remove"></span></button>'
                  });

    }
$scope.spinnershow=false;

  $scope.numberOfPages = function() {
        return Math.ceil($scope.transactions.length / $scope.pageSize);
       };
});

};

$scope.getalltransactions();

$scope.Returned=function(tid,bid){
	//update status of transaction and update quantity in books data base
	//TransactionService.updatetransaction(tid)
$http.put('/transaction/returnupdate/'+tid).success(function(data){
console.log(data);
$timeout(function(){
			$scope.$apply();
			$state.reload();
		},0);
		toastr.success('Returned!', 'Record has been Returned successfully', {
                    closeButton: true,
                    closeHtml: '<button> <span class="glyphicon glyphicon-remove"></span></button>'
                  });
		$timeout(function(){
			$scope.getalltransactions();
       },1000)

});

BooksService.updatequantity(bid).then(function(data){
	console.log(data);
})



}

$scope.deletetransaction=function(id){

	$http.delete('/transactions/deleteitem/'+id).success(function(responce){
		$timeout(function(){
			$scope.$apply();
			$state.reload();
		},0);
		toastr.success('Deleted!', 'Record has been Deleted successfully', {
                    closeButton: true,
                    closeHtml: '<button> <span class="glyphicon glyphicon-remove"></span></button>'
                  });
		$timeout(function(){
			getalltransactions();
       },1000)


    });

}


}]);


app.filter('pagination', function()
{
 return function(input, start)
 {
  if (!input || !input.length) { return; }
  start = +start;
  
  return input.slice(start);
 };
});