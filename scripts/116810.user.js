// ==UserScript==
// @name          IE Crome Banner Remover
// @namespace     http://www.google.com
// @description   Removes the "A faster way to browse the web", "Install Google Chrome" Ad (banner) displayed on non-Chrome browsers.
// @include       http://www.google.com/
// @include       https://www.google.com/
// ==/UserScript==

(function() {
	document.getElementById('pmocntr2').style.visibility = 'hidden';
})();