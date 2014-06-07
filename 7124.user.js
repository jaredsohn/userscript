// ==UserScript==
// @name            CCCCD Student Services Autologin
// @author          Phillip Beazley
// @namespace       
// @description     Auto-login to CCCCD Student Services page if Firefox has your username and password stored.
// @include         https://studentservices.ccccd.edu/ia-bin/tsrvweb.exe*
// ==/UserScript==

var pwFocus = false;

function autoLogin() {
	if(pwFocus==false) {
		if(document.forms[0].elements.namedItem("SID").value.length>1 & document.forms[0].elements.namedItem("PIN").value.length>1) { document.forms[0].submit(); }
		else { setTimeout(autoLogin,25); }
	}
}

function focusEvent() {
	pwFocus = true;
}

if(document.forms[0] && document.forms[0].elements.namedItem("SID") && document.forms[0].elements.namedItem("PIN")) {
	document.forms[0].elements.namedItem("SID").addEventListener("keypress", focusEvent, false);
	document.forms[0].elements.namedItem("PIN").addEventListener("keypress", focusEvent, false);
	window.addEventListener("load", autoLogin, false);
}
