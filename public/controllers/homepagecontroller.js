app.controller('homepagecontroller',function($scope,$http,$window,$location,$cookieStore,$modal,$log,$rootScope,$timeout,ModalService,toastr)
{

var regsuccess=function(){

  ModalService.showModal({
            templateUrl: 'modal3.html',
            controller: "ModalController3"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.message = "You said " + result;
                //$scope.message1=input;
                if(result=='Yes'){
                
                 
                }
            });
        });

};

$scope.Adminpage=function(){
  $location.path('/Admintask');
}

var decodeToken = function(token) {
      if (token) {
         // get our token parts
         var parts =token.split('.');
         // convert our token back from base64 encoding
         var str = parts[1];
         switch (str.length % 4) {
            case 0:
               {
                  break;
               }
            case 2:
               {
                  str += '==';
                  break;
               }
            case 3:
               {
                  str += '=';
                  break;
               }
            default:
               {}
         }
         str = parts[1].replace(/-/g, '+').replace(/_/g, '/');
         var user = JSON.parse((atob(str)));
           //console.log("this is from token...."+user);
         return user;
         
      }
   };

   
	 
$scope.login=function(username,password)
   {
  
  $scope.email=username;
  $scope.password=password;
  $timeout(function(){
          $scope.showMe = false;
       }, 10000);
  $http.get('/users/'+$scope.email+'/'+$scope.password).success(function(response){
   
   $scope.users=response.data;
    $scope.responcecode=response.status;
    
     $window.sessionStorage.token = response.token;
     

    
	if(($scope.users==null) || ($scope.responcecode==1)){
	 toastr.success('Please!', 'Check your credentials!', {
                    closeButton: true,
                    closeHtml: '<button> <span class="glyphicon glyphicon-remove"></span></button>'
                  });
	}
 else{

  toastr.success('success!', 'Login Success!', {
                    closeButton: true,
                    closeHtml: '<button> <span class="glyphicon glyphicon-remove"></span></button>'
                  });

   decodeToken($window.sessionStorage.token);
      $scope.userfname=$scope.users.name;
      $rootScope.userfname=$scope.name;
      $cookieStore.put('username',$scope.userfname);
      $scope.userrole=$scope.users.role;
      //$scope.userid=$scope.users[0]._id;
			$rootScope.userrole=$scope.users.role;
      $rootScope.userid=$scope.users._id;

     
      $cookieStore.put('userrole1',$scope.userrole);
      $cookieStore.put('userid',$rootScope.userid)
      //$cookieStore.put('username',$scope.username);
      $location.path("/dashboard/dashhome");
		}
     });
};
$scope.emailid=false;


  
$scope.Reset=function(emailid){
  $scope.emailid=!$scope.emailid;
 
};

//Here admin registration pannal

$scope.Adminregistration=function(){

  var modalInstance = $modal.open({
      templateUrl: 'adminregistration.html',
      controller: 'adminregistrationcontroller',
      resolve: {
        data: function () {
          return $scope.data;
        }
      }
    });
  modalInstance.result.then(function (data) {
      $scope.user = data;
      
     $http.post('/createadmins',$scope.user).success(function(responce){
      //console.log(responce);
      if(responce!="Key Doesn't match"){
        toastr.success('Added!', 'Admin has been created!', {
                    closeButton: true,
                    closeHtml: '<button> <span class="glyphicon glyphicon-remove"></span></button>'
                  });
      }
      else{
        toastr.success('Please!', 'Check your secret code!', {
                    closeButton: true,
                    closeHtml: '<button> <span class="glyphicon glyphicon-remove"></span></button>'
                  });

      }
      $timeout(function(){
        $state.reload();
        $scope.$apply();

      },0)

    });
     
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
       
    });

}

//Here registration module
$scope.open=function(){
  
  var modalInstance = $modal.open({
      templateUrl: 'registration.html',
      controller: 'registrationcontroller',
      resolve: {
        data: function () {
          return $scope.data;
        }
      }
    });
  modalInstance.result.then(function (data) {
      $scope.user = data;
      
     $http.post('/usersd',$scope.user).success(function(responce){
  
     $scope.rspnce=responce;
     });
     regsuccess();

     
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
       
    });


};
});


app.controller('registrationcontroller', function ($scope, $modalInstance, data,$http) {
$scope.user = {};
  $scope.ok = function () {
           
           $modalInstance.close($scope.user);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

app.controller('adminregistrationcontroller', function ($scope, $modalInstance, data,$http) {
$scope.user = {};
  $scope.ok = function () {
           
           $modalInstance.close($scope.user);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});



app.controller('ModalController3', function($scope,close) {
  
 $scope.close = function(result) {
  close(result, 500); // close, but give 500ms for bootstrap to animate
 };

});