// ==UserScript==
// @name            Myspace Auto-Login
// @description     Automatically logins in to MySpace if Firefox remembers your password. Works with new MySpace changes unlike all the others.
// @include 		http://*.myspace.com/*
// @include 		http://myspace.com/*
// @include 		http://www.myspace.com
// @include 		http://login.myspace.com/index.cfm?fuseaction=login.process*

// ==/UserScript==

var timer = 1000;
var timo, maySubmit = true;
var form = document.forms.namedItem('aspnetForm');
var uid = form.elements.namedItem('ctl00$Main$SplashDisplay$ctl00$Email_Textbox');
var pw = form.elements.namedItem('ctl00$Main$SplashDisplay$ctl00$Password_Textbox');

function doSignIn() {
	if(uid.value.length && pw.value.length) {
		form.submit();
	} else { 
		window.setTimeout(doSignIn, timer);
	}
}

doSignIn();
