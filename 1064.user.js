// ==UserScript==
// @name		IVLE Fix Insecure Login
// @namespace		http://www.stud.ntnu.no/~aase/
// @description		Fixes the warning about insecure posting of username/password on IVLE login page. Page is modified to post username and password via https instead of http.
// @include		https://ivle.nus.edu.sg/
// @include		https://ivle.nus.edu.sg/default.asp
// ==/UserScript==

(function() {
	document.myform.action = 'https://ivle.nus.edu.sg/account/login_verify.asp';
})();