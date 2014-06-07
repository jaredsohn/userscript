// ==UserScript==
// @name            Godaddy login
// @description     Automatically logins in to godaddy if Firefox remembers your password.
// @include http://*.godaddy.com/*
// @include https://*.godaddy.com/*
// @include http://godaddy.com/*
// @include http://www.godaddy.com
// ==/UserScript==
// Configured for godaddy by Tyler

var timer = 1000;
var timo, maySubmit = true;
var form = document.forms.namedItem('form1');
var uid = form.elements.namedItem('Login_userEntryPanel2_UsernameTextBox');
var pw = form.elements.namedItem('Login_userEntryPanel2_PasswordTextBox');

function doSignIn() {
	if(uid.value.length && pw.value.length) {
		form.submit();
	} else { 
		window.setTimeout(doSignIn, timer);
	}
}

doSignIn();