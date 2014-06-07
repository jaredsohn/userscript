// ==UserScript==
// @name            Facebook Auto-Login
// @description     Automatically logins in to Facebook if Firefox remembers your password.
// @include http://www.facebook.com/
// @include http://facebook.com/

// ==/UserScript==
// Configured for Facebook by Brian Heberling

var timer = 1000;


var timo, maySubmit = true;


var form = document.forms.namedItem('loginform');
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