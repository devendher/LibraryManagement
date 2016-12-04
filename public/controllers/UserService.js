app.factory('UserService',function(){
	var obj={};
	obj.loginuser=function(user){
		if((user.name=="macha") && (user.password="macha"))
		{
			var islogin=true;
			console.log(islogin);
			return islogin;
		}
		else {
			var islogin=false;
			console.log(islogin);
			return islogin;
		}
	}
	return obj;

});