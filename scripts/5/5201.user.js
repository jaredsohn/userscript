// ==UserScript==
// @name            OfficeDebo Auto-Login
// @description     Automatically logins in to OfficeDebo if Firefox remembers your password.
// @include         http://officedebo.com/
// @include         http://www.officedebo.com/
// ==/UserScript==
// Configured for OfficeDebo by cbrian (4375) 
// Based off of Henrik Nyh's My eBay autologin script <http://www.userscripts.com/scripts/show/1766>

var timer = 1000;


var timo, maySubmit = true;


var form = document.forms.namedItem('log');
var uid = form.elements.namedItem('user');
var pw = form.elements.namedItem('pass');

function doSignIn() {
	if(uid.value.length && pw.value.length) {
		form.submit();
	} else { 
		window.setTimeout(doSignIn, timer);
	}
}

doSignIn();