app.controller('passwordcontroller',
	function($scope,$http,$location,$cookieStore,$modal,$log,$rootScope, $window,$timeout)
{
	$scope.id=$rootScope.userid;
	$scope.statusshow=false;
	
  $scope.changepassword=function(password){


  	
  	$scope.password=password;
    
  	$http.put('/passwordchange/'+$scope.id+'/'+$scope.password).success(function(responce){
  		$scope.statusshow=true;

  		$scope.status="Your password has been changed successfully";

  	});
  	$timeout(function(){
          $scope.statusshow = false;
       }, 5000);


  }
});