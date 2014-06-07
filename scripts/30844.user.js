// ==UserScript==
// @name            JustGuys Auto-Login
// @description     Automatically logins in to JustGuys if Firefox remembers your password.
// @author @ndrew
// @version 1.0
// @include http://*.justguys.net/*
// @include http://justguys.net/*
// @include http://www.justguys.net
// ==/UserScript==
// Configured for JustGuys by Andrew Hodges
// Based off of Henrik Nyh's My eBay autologin script <http://www.userscripts.com/scripts/show/1766>

var timer = 1000;


var timo, maySubmit = true;


var form = document.forms.namedItem('formLogin');

var uid = form.elements.namedItem('justguysusername');
var pw = form.elements.namedItem('password');

function doSignIn() {
	if(uid.value.length && pw.value.length) {
		form.submit();
	} else { 
		window.setTimeout(doSignIn, timer);
	}
}

doSignIn();