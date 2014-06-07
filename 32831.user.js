// ==UserScript==
// @name           OpenDNS Google Redirect
// @namespace      http://www.unbrown.com/
// @description    If you get a OpenDNS Error page, this UserScript will redirect you to a Google search
// @include        http://guide.opendns.com/?url=*
// by Anders Markström
// Version 1.0
// ==/UserScript==

(function() {
	window.location.href = "http://google.com/search?q=" + unescape(location.href.replace(/^.+\?url\=(.+)$/, "$1"))
})();

