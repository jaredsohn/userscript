// ==UserScript==
// @name           PVCS_Login
// @namespace      PVCS
// @description    keeps me logged into pcvs
// @include        
// ==/UserScript==

function login(){
	document.getElementById('nameField').value = 'username';
	document.getElementById('passwordField').value = atob('the result of btoa("your password")');
	document.getElementsByName('login')[0].click();
}

//slightly hacky timeout based approach
/*window.setTimeout(function(){
		login();
	}, 500);
*/

//slightly better event based approach. wait till page loads and then login
window.addEventListener('load', 
    function(){
		login();
	},
    true);