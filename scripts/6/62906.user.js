// ==UserScript==
// @name           SecureFB
// @namespace      http://userscripts.org/users/119420 
// @description    Forces FB to use https: session
// @include        *
// ==/UserScript==
if (window.location.hostname == "www.facebook.com") {
	if (window.location.protocol == "http:") {
		var stri = window.location.href;
		var stro = stri.replace(/^http:/, 'https:');
		window.location = stro;
	}
}
