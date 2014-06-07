// ==UserScript==
// @name deviantArt Outgoing Link redirector
// @description Skips the "Outgoing Link" page when opening external links on deviantArt
// @version 1.0
// @icon http://andse.heliohost.org/userscripts/dA-OLR/icon.png
// @include *://www.deviantart.com/users/outgoing?*
// @namespace http://andse.heliohost.org/userscripts/
// @run-at document-start
// ==/UserScript==

var url=location.search.substr(1);
if (url.substr(0, 5)!="http:" && url.substr(0, 6)!="https:")
	url="http://"+url;
location.replace(url);
