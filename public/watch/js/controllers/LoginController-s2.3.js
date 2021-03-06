
angular.module('loginApp').controller('loginCtrl',loginCrtFnt);

loginCrtFnt.$inject=['$scope','$log','$window','auth'];
 
function loginCrtFnt($scope,$log,$window,auth){
    $scope.logAuth = function(){
        $log.info('user login',$scope.user.login);
        $log.info('user pwd',$scope.user.pwd);
        
    };
    $scope.logAuthObject = function(user){
 	if(typeof(user)!=="undefined")
    {
        $log.info('user login', user.login);
        $log.info('user pwd',user.pwd);

        var result =auth.localAuthAsk(user.login,user.pwd);
		result.then(
	  	function(payload){
			 if(payload.ValidAuth = true && payload.user.role == "watcher")
				$window.location.href='loginSuccessWATCHER.html';
				
			if(payload.ValidAuth = true && payload.user.role == "admin")
				$window.location.href='loginSuccessADMIN.html';
				}
				   
				   );
				   }

    };
}
