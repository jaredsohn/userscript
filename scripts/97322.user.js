// ==UserScript==
// @name			boring IT chula
// @author			protoad56
// @namespace		ITChula
// @include			https://netauth.it.chula.ac.th/user/Logon.do
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		auto form.
// ==/UserScript==

var deliciousLoginAutocompleteOn = function(){
	var loginForm = document.getElementById('logon');
	var loginUsername = document.getElementById('userName');
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