app.controller('bookcontroller',['$scope','$http','$location','$cookieStore','$modal','$log','$rootScope','ModalService','toastr','BooksService','$timeout','$state',function($scope,$http,$location,$cookieStore,$modal,$log,$rootScope,ModalService,toastr,BooksService,$timeout,$state)
{

var getuser=$cookieStore.get('username');
var getuserid=$cookieStore.get('userid');
var getuserrole=$cookieStore.get('userrole1');
if(!getuser){
$location.path("homepage/home");
}

$scope.username=getuser;
$rootScope.accesrole=$rootScope.userrole;
$scope.userrole11=getuserrole;


if(($rootScope.accesrole=="admin") && ($scope.userrole11=="admin") )
{
  $scope.onlyowner=true;
}

if($scope.userrole11=="admin"){
  $scope.onlyowner=true;

}



$scope.block_table_show=false;

$scope.predicate = 'name';  
       $scope.reverse = true;  
       $scope.currentPage = 1;  
       $scope.order = function (predicate) {  
         $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;  
         $scope.predicate = predicate;  
       };  

$scope.booktypes=[
{name:'Science fiction'},{name:'Drama'},{name:'Horror'},{name:'Romance'},{name:'Action and Adventure'},{name:'Self help'},{name:'others'}
];
$scope.status=[{name:'Available'},{name:'Unavailable'}];


$scope.searchbooks=function(booktype,Availablitystatus){
  $scope.curPage = 0;
$scope.pageSize =5;
if((angular.isUndefined(booktype)) && (angular.isUndefined(Availablitystatus))){

    toastr.success('Please!', 'select appropriate Options', {
                    closeButton: true,
                    closeHtml: '<button> <span class="glyphicon glyphicon-remove"></span></button>'
                  });

  }
  else if((!angular.isUndefined(booktype)) && !(angular.isUndefined(Availablitystatus))){

     BooksService.searchbooksdata(booktype,Availablitystatus).then(function(result){
     $scope.books=result;
     $scope.block_table_show=true;
    });
  }
else if((angular.isUndefined(booktype)) && !(angular.isUndefined(Availablitystatus))){
    $scope.block_table_show=true;
    BooksService.SearchbooksforAvailability(Availablitystatus).then(function(result){
     $scope.books=result;

    });
}
else if((!angular.isUndefined(booktype)) && (angular.isUndefined(Availablitystatus))){
$scope.block_table_show=true;
  BooksService.Searchbooksforbooktype(booktype).then(function(result){
     $scope.books=result;
    });

  }
 $scope.numberOfPages = function() {
     //console.log($scope.books.length / $scope.pageSize);
        return Math.ceil($scope.books.length / $scope.pageSize);
       };


};

$scope.Addbooks=function(){

var modalInstance = $modal.open({

      templateUrl: 'addbooks.html',
      controller: 'addbookcontroller',
     resolve: {
        data: function () {
          return $scope.data;
        }
      }
    });
  modalInstance.result.then(function (data) {
      $scope.books = data;
      $scope.block_table_show=false;
     // console.log($scope.books);

      $http.post('/books/addbooks',$scope.books).success(function(responce){
  
     $scope.rspnce=responce;
     // console.log($scope.rspnce);
       toastr.success('Added!', 'Record has been added', {
                    closeButton: true,
                    closeHtml: '<button> <span class="glyphicon glyphicon-remove"></span></button>'
                  });
      
     });
    }, function () {

      $log.info('Modal dismissed at: ' + new Date());
       
    });  
}

//get all books from service

$scope.Getallbooks=function(){

BooksService.gatallbooksdata().then(function(data){
	$scope.block_table_show=true;
	$scope.books=data;
	$scope.curPage = 0;
$scope.pageSize =5;
if($scope.books.length<0){
   toastr.success('No Record!', 'Sorry No Record found!', {
                    closeButton: true,
                    closeHtml: '<button> <span class="glyphicon glyphicon-remove"></span></button>'
                  });
      


}


  $scope.numberOfPages = function() {
        return Math.ceil($scope.books.length / $scope.pageSize);
       };

});
};

$scope.Getallbooks();

  $scope.paginate = function (value) {  
         var begin, end, index;  
         begin = ($scope.currentPage - 1) * $scope.numPerPage;  
         end = begin + $scope.numPerPage;  
         index = $scope.books.indexOf(value);  
         return (begin <= index && index < end);  
       };  


//Delete book

$scope.deletebook=function(id){
  $scope.rents_table=false;

  ModalService.showModal({
            templateUrl: 'modal.html',
            controller: "ModalController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.message = "You said " + result;
                if(result=='Yes'){
                  $http.delete('/books/delete/'+id).success(function(responce){
    
             toastr.success('Deleted!', 'Record has been Deleted successfully', {
                    closeButton: true,
                    closeHtml: '<button> <span class="glyphicon glyphicon-remove"></span></button>'
                  });
             }); 
              $timeout(function(){
                  $scope.$apply();
                },0);
             $timeout(function(){
                  $state.reload();
                },1000);

                }
            });
        });

};





//Barrow books

$scope.open = function (id) {

    var modalInstance = $modal.open({
      templateUrl: 'barrowbooks.html',
      controller: 'barrowbookscontroller',
      resolve: {
        data: function () {
         
          return  $scope.books[id];
        } 
      }
    });

    modalInstance.result.then(function (data) {
      $scope.transaction= data;

      $http.put('/books/updatequantity/'+$scope.transaction._id+'/'+$scope.transaction.quantity).success(function(responce){
        $scope.booksupdate=responce;
        toastr.success('Thank you!', 'Record Updated Successfully!', {
                    closeButton: true,
                    closeHtml: '<button> <span class="glyphicon glyphicon-remove"></span></button>'
                  });
      });


      $http.post('/books/transaction',$scope.transaction).success(function(responce){
        $scope.result=responce;

      });

       $scope.spinnershow=true;

       $timeout(function(){
        $scope.spinnershow=false;
       },15000);

        $timeout(function(){ 
          $scope.$apply(); 
          $state.reload();
        });
       $scope.statusshow=true;
    

       $scope.Getallbooks();

   
     // angular.extend($scope.rents[id],$scope.rent);
     

      
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };





}]);


app.controller('addbookcontroller', function ($scope, $modalInstance, data,$http) {
$scope.books = {};
$scope.booktypes=[
{name:'Science fiction'},{name:'Drama'},{name:'Horror'},{name:'Romance'},{name:'Action and Adventure'},{name:'Self help'},{name:'others'}
];
$scope.status=[{name:'Available'},{name:'Unavailable'}];
$scope.statuschanged=function(statuschanged){
	$scope.books.status=statuschanged.name;
}
$scope.booktypechanges=function(selectedbook){
	$scope.books.booktype=selectedbook.name;
	
}
  $scope.ok = function () {
           
           $modalInstance.close($scope.books);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});



app.controller('barrowbookscontroller', function ($scope,$modalInstance,data,$http) {
$scope.books = angular.copy(data);

$scope.booktypes=[
{name:'Science fiction'},{name:'Drama'},{name:'Horror'},{name:'Romance'},{name:'Action and Adventure'},{name:'Self help'},{name:'others'}
];
$scope.status=[{name:'Available'},{name:'Unavailable'}];
$scope.statuschanged=function(statuschanged){
  $scope.books.status=statuschanged.name;
}
$scope.booktypechanges=function(selectedbook){
  $scope.books.booktype=selectedbook.name;
  
}
  $scope.ok = function () {
           
           $modalInstance.close($scope.books);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});




//Pagination for books list


app.filter('pagination', function()
{
 return function(input, start)
 {
  if (!input || !input.length) { return; }
  start = +start;
  
  return input.slice(start);
 };
});


app.controller('ModalController', function($scope, close) {
  //$scope.message="Your complaint has been posted successfully. Thank You";
 $scope.close = function(result) {
  close(result, 500); // close, but give 500ms for bootstrap to animate
 };

});
