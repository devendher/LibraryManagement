app.controller('admincontroller',['$scope','$http','$location','$cookieStore','$modal','$log','$rootScope','ModalService','toastr','$timeout','$state',function($scope,$http,$location,$cookieStore,$modal,$log,$rootScope,ModalService,toastr,$timeout,$state)
{

	$scope.register=function(user){
		$http.post('/createadmins',user).success(function(responce){
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

		});
	}

	$scope.loginpage=function(){
		$location.path('/homepage/home');
	}

}]);
