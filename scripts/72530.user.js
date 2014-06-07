// ==UserScript==
// @name           autologin google
// @namespace      -
// @include        https://www.google.com/accounts/ServiceLogin*
// @include        https://google.com/accounts/ServiceLogin*
// ==/UserScript==
var tries = 0;

function tryLogin() {
	var e = document.getElementById("Email");
	var p = document.getElementById("Passwd");
	tries++;
	
	if(e && p) {
		if(e.value.length && p.value.length) {
			document.getElementById("gaia_loginform").submit();
		}
		else {
			setTimeout(tryLogin, 500);
		}
	}
	else {
		if(tries < 10) {
			setTimeout(tryLogin, 500);
		}
	}
}
tryLogin();

