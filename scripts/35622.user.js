// ==UserScript==
// @name            Facebook Auto-Login
// @description     Automatically logins in to Facebook if Firefox remembers your password.
// @include http://*.facebook.com/*
// ==/UserScript==
// Configured for Facebook by Shayne Scovill
// Based off of Jamison Fitzgerald and Brian Heberling's MySpace autologin script
//(http://userscripts.org/scripts/show/28504)
//Just updating so it shows up in the searches 9/29/11

var timer = 1000;


var timo, maySubmit = true;


var form = document.forms.namedItem('login_form');

var uid = form.elements.namedItem('email');
var pw = form.elements.namedItem('pass');

function doSignIn() {
	if(uid.value.length && pw.value.length) {
		form.submit();
	} else { 
		window.setTimeout(doSignIn, timer);
	}
}

doSignIn();
