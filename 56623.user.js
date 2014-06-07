// ==UserScript==
// @name			Turn Delicious Login Auto Complete On
// @author			Erik Vold
// @namespace		deliciousLoginAutocompleteOn
// @include			https://secure.delicious.com/login
// @include			https://secure.delicious.com/login#*
// @include			https://secure.delicious.com/login?*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-29
// @lastupdated		2009-08-29
// @description		This userscript turns on autocomplete for the Delicious login.
// ==/UserScript==

var deliciousLoginAutocompleteOn = function(){
	var loginForm = document.getElementById('login-form');
	var loginUsername = document.getElementById('username');
	var loginPassword = document.getElementById('password');
	
	if (loginForm) {
		loginForm.setAttribute("autocomplete", "on");
	}
	if (loginUsername) {
		loginUsername.setAttribute("autocomplete", "on");
	}
	if (loginPassword) {
		loginPassword.setAttribute("autocomplete", "on");
	}
	return true;
}
deliciousLoginAutocompleteOn();
