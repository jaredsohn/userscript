// ==UserScript==
// @name           Disable URLCash
// @namespace      http://greasemonkey.anmarmansur.com/
// @description    Prevent the URLCash frame from loading.
// @include        http://*.urlcash.net/
// ==/UserScript==

if (document.title) {
	location.href = document.title.slice(1, -1);
}
