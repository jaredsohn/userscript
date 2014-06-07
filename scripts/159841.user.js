// ==UserScript==
// @name           EPFL Tequila autologin
// @namespace      http://userscripts.org/scripts/show/159841
// @description    Automatically log you in when EPFL's tequila login page is displayed.
// @include        https://tequila.epfl.ch/cgi-bin/tequila/*
// @version        0.4
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @grant          none
// @run-at         document-end
// ==/UserScript==


if (document.URL.indexOf('https://tequila.epfl.ch/cgi-bin/tequila/requestauth') === 0)
{
	var loginForm = document.getElementById('loginform');
	var username = document.getElementById('username');
	var password = document.getElementById('password');

	username.setAttribute("autocomplete", "On");
	password.setAttribute("autocomplete", "On");

	// If we arrived on a page via javascript we need to reload it to trigger
	// Firefox autocomplete. We add a hash to the page so that it is reloaded
	// only once.
	var hash = "gm_reload";
	if (window.location.hash.indexOf(hash) == -1) {
		window.location.href += "#" + "gm_reload";
		window.location.reload();
	}

	// Wait a bit so that the browser has the time to autocomplete.
	var tries = 20; // Number of tries
	var delta = 5; // Time between tries in ms

	var do_login = function() {
		if (username.value.length > 0 && password.value.length > 0) {
			loginForm.submit();
			return;
		}

		tries --;
		if (tries > 0) {
			setTimeout(do_login, delta);
		}
	};

	do_login();
}
