// ==UserScript==
// @name           Facebook Auto-Login
// @namespace      http://freecog.net/2007/
// @description    Clicks the "Login" button automatically.  (Firefox must be set to remember your login information.)
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

var DEBUG = false;

function get(id) {
	return document.getElementById(id);
}

var email_field = get('email');
var pass_field = get('pass');
var login_button = get('login') || get('doquicklogin');

// Detect the password reset/update form
var pass_update = !!get('newpass1');

function check_failure() { // Detect failed login attempts
	if (get('error')) {
		return true;
	}
	var text = document.body.textContent || document.body.innerText; // IE compat
	return (text.indexOf("Incorrect email/password combination") > -1);
}

function do_login() {
	if (check_failure()) {
		if (DEBUG) alert("Login failure detected.  Aborting.");
		return false;
	}
	if (login_button && email_field && email_field.value && pass_field && pass_field.value) {
		login_button.click();
		return true;
	}
	return false;
}

if (!pass_update) {
	if (!do_login()) {
		// Try again onload
		document.addEventListener('load', do_login, false);
	}
}