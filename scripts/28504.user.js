// ==UserScript==
// @name            Myspace Auto-Login
// @description     Automatically logins in to MySpace if Firefox remembers your password.
// @include http://*.myspace.com/*
// @include http://myspace.com/*
// @include http://www.myspace.com
// ==/UserScript==
// Configured for Myspace by Jamison Fitzgerald and Brian Heberling
// Based off of Henrik Nyh's My eBay autologin script <http://www.userscripts.com/scripts/show/1766>

var timer = 1000;


var timo, maySubmit = true;


var form = document.forms.namedItem('LoginForm');

var uid = form.elements.namedItem('ctl00_cpMain_LoginBox_Email_Textbox');
var pw = form.elements.namedItem('ctl00_cpMain_LoginBox_Password_Textbox');

function doSignIn() {
	if(uid.value.length && pw.value.length) {
		form.submit();
	} else { 
		window.setTimeout(doSignIn, timer);
	}
}

doSignIn();
