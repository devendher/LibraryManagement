app.controller('dashboardcontroller',function($scope,$http,$location,$cookieStore,$modal,$log,$rootScope,ModalService)
{
var getuser=$cookieStore.get('username');
var getuserid=$cookieStore.get('userid');
var getuserrole=$cookieStore.get('userrole1');
if(!getuser){
$location.path("homepage/home");
}
$scope.username=getuser;
$scope.logout=function(){
	$cookieStore.remove('username');
	$cookieStore.remove('userrole1');

	$location.path("homepage/home");
};
//here start for administration controllers
$scope.roles=["user","admin"];


$rootScope.accesrole=$rootScope.userrole;
$scope.userrole11=getuserrole;


if(($rootScope.accesrole=="admin") && ($scope.userrole11=="admin") )
{
	$scope.onlyowner=true;
}

if($scope.userrole11=="admin"){
	$scope.onlyowner=true;

}

});
