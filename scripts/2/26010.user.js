// ==UserScript==
// @name           LJ AutoLogin
// @namespace      http://mitechki.net/
// @description    Login into LiveJournal automatically
// @include        http://*.livejournal.com/*
// @include        https://*.livejournal.com/*
// ==/UserScript==

var username = 'CHANGE_ME';
var password = 'CHANGE_ME';

var u_field = document.getElementById("xc_user");
var p_field = document.getElementById("xc_password");
var rem_check = document.getElementById("xc_remember");
var form = document.getElementById("login");

if (! u_field || ! p_field || ! rem_check) {
	var u_field = document.getElementById("login_user");
	for (var e in Iterator(document.getElementsByTagName("input"))) {
		if (e[1].className == "lj_login_password") {
				var p_field = e[1];
		}
	}
	var rem_check = document.getElementsByName("remember_me")[0];
}

// make sure we got all the right stuff
if (u_field.tagName.toLowerCase() == "input" && p_field.tagName.toLowerCase() == "input" && form.tagName.toLowerCase() == "form") {
	u_field.setAttribute("value", username);
	p_field.setAttribute("value", password);
	rem_check.setAttribute("value", "1");
	form.submit();
}