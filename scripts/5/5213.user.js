// ==UserScript==
// @name            Myspace Auto-Login
// @description     Automatically logins in to MySpace if Firefox remembers your password.
// @include http://*.myspace.com/*
// @include http://myspace.com/*
// @include http://www.myspace.com
// ==/UserScript==
// Configured for Myspace by Brian Heberling
// Based off of Henrik Nyh's My eBay autologin script <http://www.userscripts.com/scripts/show/1766>

var timer = 1000;


var timo, maySubmit = true;


var form = document.forms.namedItem('theForm');
var uid = form.elements.namedItem('email');
var pw = form.elements.namedItem('password');

function doSignIn() {
	if(uid.value.length && pw.value.length) {
		form.submit();
	} else { 
		window.setTimeout(doSignIn, timer);
	}
}

doSignIn();
