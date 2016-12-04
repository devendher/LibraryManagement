/**
 * TokenInterceptor.js
 *
 * Factory used for catching whether or not a user is logged in via headers
 */
// init our factors
app.factory('tokenInterceptor', ['$q', '$window', '$location','$rootScope', function($q, $window, $location, $rootScope) {
   // our outward facing interface
   return {
      // our http request interceptor
      request: function(config) {
         //console.log("Executing before executing request");
         config.headers = config.headers || {}; // if the headers don't exist, set to empty object
         if ($window.sessionStorage.token) { // if we have a session token
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token; // set it in the headers
          //  console.log("Token here");
         }
         return config;
      },
      // request error interceptor
      requestError: function(rejection) {
         return $q.reject(rejection); // send a rejection if there was an error
      },
      // our http response interceptor
      response: function(response) {
         // return response || $q.when(response);
         return response;
      },
      // response on error
      responseError: function(rejection) {
         if (rejection !== null && rejection.status === 401) {
        	delete $window.sessionStorage.token; 
            $location.path('homepage/home'); // redirect to 401 view
         }
         return $q.reject(rejection);
      }
   };
}]);
app.config(['$httpProvider', function($httpProvider) {
   $httpProvider.interceptors.push('tokenInterceptor');
}]);