// ==UserScript==
// @name          Full articles on zeit.de
// @namespace     http://www.manuelseeger.de
// @description   Link and redirect to full articles on zeit.de
// @license       GPL version 2; http://www.gnu.org/licenses/gpl-2.0.html
// @include       http://*.zeit.de*
// @version       1.7
// ==/UserScript==

// Link for self: http://userscripts.org/scripts/show/101435
// Idea from: http://userscripts.org/scripts/review/3166
// This script adds the functionality that it will also redirect
// to full articles if you clicked on a external link

var validlink = /\.zeit\.de([\/\w-]+)?\/\d{4}[\/-]\d{2}\//; // these links only have a complete version available
var skipiftrue = /(\/(komplettansicht|seite-\d+)|\.pdf|[?&]page=(all|\d+))$|#|(quiz|fs)-|\/video\//; // a few exceptions (some for backwards compability)

if (validlink.test(document.location.href) && !skipiftrue.test(document.location.href)) {
	document.location.href += '/komplettansicht';
}

// Using this as a function with document.location.href = rewritelink(document.location.href)
// is annoying because it will, even if the location doesn't change, reload the page

for (var i in document.links) {
	// and the same in green...
	if (validlink.test(document.links[i].href) && !skipiftrue.test(document.links[i].href)) {
		document.links[i].href += '/komplettansicht';
	}
}