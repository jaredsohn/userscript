// ==UserScript==
// @name           OpenDNS Feeling Lucky Redirect
// @namespace      http://www.andrealazzarotto.com/
// @description    A fixer that redirects all OpenDNS guide pages to the appropriate site using Google "I'm feeling lucky".
// @include        http://guide.opendns.com/?url=*
// by Andrea Lazzarotto - based on a script by Anders Markström
// Version 1.0
// ==/UserScript==

(function() {
	window.location.href = "http://www.google.com/search?btnI=I%27m+Feeling+Lucky&q=" + unescape(location.href.replace(/^.+\?url\=(.+)$/, "$1"))
})();

