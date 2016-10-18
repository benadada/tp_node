angular.module('authService',[]).service('auth',authFnc);

function authFnc(){

	var userMap={};

	userMap['jdoe']='jdoepwd';
	userMap['psmith']='psmithpwd';
	userMap['tp']='tp';

	var fncContainer={checkUser:checkUser,userList:userList};

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

	return fncContainer;
}
