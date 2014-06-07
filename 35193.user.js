// ==UserScript==
// @name           Yahoo Login
// @namespace      https://login.yahoo.com
// @description    Automate login in yahoo mail
// @include        https://login.yahoo.com/config*
// ==/UserScript==
(function(){
	var userName = '<USER_NAME>';				// your username goes here
	var userPwd = '<USER_PASSWORD>';		// your password goes here

	document.getElementById('username').value  =userName;
	document.getElementById('passwd').value  =userPwd;

	var inputs = document.getElementsByTagName('input');
	
	for(var i=0; i<inputs.length; i++){
		if(inputs[i].name=='.save') {
			inputs[i].click();
			//inputs[i].focus();
			}
	}
})();