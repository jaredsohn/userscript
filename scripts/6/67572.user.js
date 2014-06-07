// ==UserScript==
// @name         Fatwallet Redirect
// @namespace	 none
// @description	 Fixup fatwallet redirects.
// @include	 http://www.fatwallet.com/*
// ==/UserScript==

const pattern = /http:\/\/www.fatwallet.com\/redirect\/bounce.php\?.+url=(.+)/;
var links = document.getElementsByTagName("a");

for (var link = null, i = 0; (link = links[i]); i++) {
     var match = pattern.exec(links[i].href);
     if (match != null) { link.href = match[1]; }
}
