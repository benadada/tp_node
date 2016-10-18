angular.module('authService',[]).service('auth',authFnc);
authFnc.$inject=['$http','$q'];

function authFnc($http,$q){

	var userMap={};

	userMap['jdoe']= {pwd: 'jdoe', role: "watcher"};
	userMap['psmith']={pwd: 'psmith', role: "admin"};
	userMap['tp']={pwd: 'tp', role: "admin"};

	var fncContainer={checkUser:checkUser,userList:userList,localAuthAsk:localAuthAsk,createUser:createUser};

	function checkUser(userlogin,userpwd){
		if(typeof(userMap[userlogin]) !== 'undefined' && userMap[userlogin]==userpwd)
			return 'login success';
		return 'login failed';
	};

	function userList(){
		var keys='users :';
		angular.forEach(userMap, function(value, key) {
			keys=keys+'\n'+key;
		})
		return keys;
	};
	function localAuthAsk(login,pwd){
		var deferred = $q.defer();
		setInterval(function(login,pwd){
				if( pwd == userMap[login].pwd ){
					//TODO
					
					deferred.resolve({"user":createUser(login, pwd, userMap[login].role),"ValidAuth": true});
					
					
				}else{
					//TODO
					deferred.reject({"user":{},"ValidAuth": false});
					
					}
				clearInterval(this);
				},3000,login,pwd);

			return deferred.promise;

			}
		function createUser(login,pwd,role){
		return {login: login,pwd: pwd,role: role}

}
	return fncContainer;
}
