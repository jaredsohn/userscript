// ==UserScript==
// @name           SecureHM
// @namespace      http://userscripts.org/users/119420
// @description    Secure Hotmail session
// @include        *
// ==/UserScript==
if ((window.location.hostname == "www.hotmail.com") || (window.location.hostname == "login.live.com")) {
	if (window.location.protocol == "http:") {
		var stri = window.location.href;
		var stro = stri.replace(/^http:/, 'https:');
		window.location = stro;
	}
}
