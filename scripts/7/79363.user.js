// ==UserScript==
// @name           FBAutoLogin
// @namespace      Elie
// @description    Automatically login FB
// @include        http://www.facebook.com/login.php*
// @include        http://www.facebook.com//login.php*
// ==/UserScript==

var loginForm = document.getElementById('login_form');

if ( loginForm == null || loginForm == undefined ) {
	alert('No form');
}
else {
	self.setTimeout(function() {loginForm.submit();}, 10000);

}