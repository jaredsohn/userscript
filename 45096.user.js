// ==UserScript==
// @name           PLC grading server enhancements
// @namespace      http://freecog.net/2009/
// @description    Automatically logs you in to the PLC grading server.
// @include        https://plc.cs.rose-hulman.edu/*
// @include        https://plc.csse.rose-hulman.edu/*
// ==/UserScript==

function get_el(el) {
	return (typeof el == 'string') ? document.getElementById(el) : el;
}

// Try to automatically log in.  Return true if successful,
// else false (meaning this page isn't a login page).
function login() {
	var uname = get_el('user_username');
	var pwd = get_el('user_password');
	if (uname && pwd && uname.value && pwd.value) {
		uname.form.submit();
		return true;
	}
	return false;
}

login();
