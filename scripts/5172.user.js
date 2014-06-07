// ==UserScript==
// @name            HoboWars Auto-Login
// @description     Automatically logins in to HoboWars if Firefox remembers your password.
// @include         http://hobowars.com/
// @include         http://www.hobowars.com/
// ==/UserScript==
// Configured for Hobowars by cbrian (2527) 
// Based off of Henrik Nyh's My eBay autologin script <http://www.userscripts.com/scripts/show/1766>

var timer = 1000;


var timo, maySubmit = true;


var form = document.forms.namedItem('login');
var uid = form.elements.namedItem('username');
var pw = form.elements.namedItem('password');

function doSignIn() {
	if(uid.value.length && pw.value.length) {
		form.submit();
	} else { 
		window.setTimeout(doSignIn, timer);
	}
}

doSignIn();