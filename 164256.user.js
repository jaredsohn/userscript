// ==UserScript==
// @name         Youtube Auto Quick Buffer
// @namespace    http://userscripts.org/users/zackton
// @description  Quickens the bufferer on all Youtube videos
// @include      *.youtube.com/watch?v=*
// @updateURL    http://userscripts.org/scripts/source/164256.meta.js
// @run-at       document-end
// @grant        none
// @version      1.2
// ==/UserScript==

var add = document.URL.indexOf("&gl=CA");
if (add === -1) {
	window.location = document.URL + "&gl=CA";
}
