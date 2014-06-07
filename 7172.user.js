// ==UserScript==
// @name            Remember The Milk + Google Homepage Autologin
// @author          Phillip Beazley
// @namespace       
// @description     Auto-login to RTM on Personalized Google Homepage.
// @include         *rememberthemilk.com/services/modules/*
// @include         *rememberthemilk.com/login/*
// ==/UserScript==

var pwFocus = false;

function autoLogin() {
	if(pwFocus==false) {
		if(document.forms[0].elements.namedItem("username").value.length>1 & document.forms[0].elements.namedItem("password").value.length>1) { document.forms[0].submit(); }
		else { setTimeout(autoLogin,25); }
	}
}

function focusEvent() {
	pwFocus = true;
}

if(document.forms[0] && document.forms[0].elements.namedItem("username") && document.forms[0].elements.namedItem("password")) {
	document.forms[0].elements.namedItem("username").addEventListener("keypress", focusEvent, false);
	document.forms[0].elements.namedItem("password").addEventListener("keypress", focusEvent, false);
	window.addEventListener("load", autoLogin, false);
}
