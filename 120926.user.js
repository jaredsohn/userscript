// Updated by http://userscripts.org/users/463844 to avoid lots of history entries among other things. Thanks!
// ==UserScript==
// @name           Always HD
// @namespace      http://userscripts.org/users/425546
// @description    Automatically enables 720p on YouTube
// @include        http*://*youtube.com/watch*
// @run-at         document-start
// ==/UserScript==

if (window.location.href.indexOf("&hd=1") === -1) {
	window.location.replace(window.location + "&hd=1");
}