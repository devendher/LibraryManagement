var app=angular.module("myapp",['ui.bootstrap','ui.router','ngAnimate','ngCookies','angularModalService','smart-table','ngJsonExportExcel','toastr']);

app.config(function($stateProvider,$urlRouterProvider,$locationProvider){

	$urlRouterProvider.otherwise('/homepage/home');


	$stateProvider
	        
	        .state('mainpage',{
	        	url:"/mainpage",
	        	templateUrl:"views/mainpage.html",
	        	controller:"homepagecontroller"
	        })
	        .state('homepage',{
	        	url:'/homepage',
	        	templateUrl:"views/header.html",
	        	controller:"homepagecontroller"
	        })
	        .state('homepage.home',{
	        	url:'/home',
	        	templateUrl:"views/home.html",
	        	controller:"homepagecontroller"
	        })
	        
	        .state('Admintask',{
	        	url:'/Admintask',
	        	templateUrl:"views/Admin/admin.html",
	        	controller:"admincontroller"
	        })
	        .state('dashboard',{
	        	url:'/dashboard',
	        	templateUrl:"views/Dashboard/dashboard.html",
	        	controller:"dashboardcontroller"
	        })
	        .state('dashboard.changepassword',{
	        	url:'/changepassword',
	        	templateUrl:"views/changepassword.html",
	        	controller:"passwordcontroller"
	        })
	        .state('dashboard.transaction',{
	        	url:'/transaction',
	        	templateUrl:"views/transactions/transactions.html",
	        	controller:"transactioncontroller"
	        })
	        .state('dashboard.books',{
	        	url:'/books',
	        	templateUrl:"views/books/books.html",
	        	controller:"bookcontroller"
	        })
	        

});


app.config(['$httpProvider', function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);


app.run(function($rootScope,$location){

	console.log("App is running........");

	$rootScope.$on("$stateChangeStart", 
                 function (event, current, previous, rejection) {
    //console.log($rootScope,$location);
  });      
  $rootScope.$on("$stateChangeSuccess", 
                 function (event, current, previous, rejection) {
   // console.log($rootScope, $location);
  });

 // $window.ga('send', 'pageview', {page: $location.url()});

});