// ==UserScript==
// @name Focus ixquick Query Bar On Load
// @namespace http://draconx.ca
// @description Focuses the ixquick query bar on page load even when javascript is disabled by NoScript.
// @include http*://*ixquick.com/
// ==/UserScript==

(function () {
	var query = document.getElementsByName('query')[0];
	query.focus();
})();
