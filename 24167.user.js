// ==UserScript==
// @name           Allegro SSL redirector
// @description    Redirects all Allegro.pl pages to its secure (SSL) versions.
// @author         Patryk Szczyglowski <jid:psz@chrome.pl>
// @version        1.0
// @namespace      http://xmlns.patryk.net.pl/greasemonkey/allegro-ssl
// @include        http://*allegro.pl/*
// ==/UserScript==

(function() {
	const urlRegex = /http:\/\/.*allegro\.pl\/(.*)/i;
	var match = window.location.href.match(urlRegex);

	if (match != null) {
		window.location = "https://ssl.allegro.pl/"+match[1];
	}

})();
