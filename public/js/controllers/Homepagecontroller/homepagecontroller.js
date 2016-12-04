app.controller('homepagecontroller',function($scope,$http,$window,Getblocksdata,$location,$cookieStore,$modal,$log,$rootScope,$timeout,ModalService)
{
$scope.names = ["Prabhavathi bliss"];
$scope.blocks = ["Block-A","Block-B","Block-C"];
$scope.residency=["Owner","tenant"];
$scope.allItems=[{news:"news1"},{news:"news2"},{news:"news3"},{news:"news4"}];
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
var regfailure=function(){

  ModalService.showModal({
            templateUrl: 'modal31.html',
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
    console.log($scope.users);
     $window.sessionStorage.token = response.token;
     //console.log($window.sessionStorage.token);

    
	if(($scope.users==null) || ($scope.users.approvalstatus=="false") || ($scope.responcecode==1)){
	$scope.showMe=true;

               
	}
 else{
   decodeToken($window.sessionStorage.token);
      $scope.userfname=$scope.users.firstname;
      $rootScope.userfname=$scope.userfname;
      $cookieStore.put('username',$scope.userfname);
      $scope.userrole=$scope.users.role;
      //$scope.userid=$scope.users[0]._id;
			$rootScope.userrole=$scope.users.role;
      $rootScope.userid=$scope.users._id;

     
      $cookieStore.put('userrole1',$scope.userrole);
      $cookieStore.put('userid',$rootScope.userid)
      //$cookieStore.put('username',$scope.username);
      $location.path("dashboard");
		}
     });
};
$scope.emailid=false;
  
$scope.Reset=function(emailid){
  $scope.emailid=!$scope.emailid;
 
};


	$scope.open=function(){
  
  var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        data: function () {
          return $scope.data;
        },
        blockdata:function(){
          Getblocksdata.gatallblockdata().success(function(data){
          $scope.blocks=data.application;

              });
          return $scope.blocks;
        }
      }
    });
  modalInstance.result.then(function (data) {
    console.log(data);

      $scope.user = data;
     
    
      var i=1
    $http.get('/getemailid/'+$scope.user.email).success(function(responce){
      $scope.getdata=responce;
      if($scope.getdata==""){
      $http.post('/usersd',$scope.user).success(function(responce){
      $scope.rspnce=responce;
      //console.log($scope.rspnce);
      regsuccess();
     });

      }
      else{
        regfailure();
      }
    });
    
     // $scope.data.push({'id':$scope.data.id,'name':$scope.data.name});
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
       //$location.path('/welcome');
    });


};
});


app.controller('ModalInstanceCtrl', function ($scope,Getblocksdata,$modalInstance, data,$http) {
$scope.user = {};
$scope.names = ["Prabhavathi bliss"];
$scope.blocks = ["Block-A","Block-B","Block-C"];
$scope.residency=["Owner","tenant"];
var rand=Math.floor((Math.random() * 100) + 54);
//$scope.user.activatecode=rand;
//console.log($scope.user.activatecode);
Getblocksdata.gatallblockdata().success(function(data){

  //$scope.application = 
  $scope.blocks=data.application;

});
$scope.changefloor=function(selectedblock){
  $scope.floors=selectedblock.floors;
 $scope.user.block=selectedblock.name;
 console.log($scope.user.block);
  $scope.flats="";
};

$scope.flatchange=function(selectedfloor){
  
  $scope.flats=selectedfloor.flats;
  $scope.user.floornumber=selectedfloor.floornumber;
  console.log($scope.user.floornumber);
  
};
$scope.flatchagevalue=function(value){
  $scope.user.flatnumber=value.flatnumber;
  console.log($scope.user.flatnumber);
};
  $scope.ok = function () {
           
           $modalInstance.close($scope.user);

    //regsuccess(); 
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