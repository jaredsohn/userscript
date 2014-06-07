// ==UserScript==
// @name           Auto-clear DOM Storage
// @version        1.0
// @include        *
// ==/UserScript==

 document.getElementsByTagName("body")[0].addEventListener("DOMNodeInserted", function () {
	localStorage.clear();
	sessionStorage.clear(); 
}, false);