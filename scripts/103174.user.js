// ==UserScript==
// @name          Convert new Twitter links to old Twitter links
// @namespace     http://www.manuelseeger.de
// @description   Reverts new Twitter links back to their better, old version
// @license       GPL version 2; http://www.gnu.org/licenses/gpl-2.0.html
// @version       1.0
// ==/UserScript==

for (var i in document.links) {
	try {
		document.links[i].href = document.links[i].href.replace(new RegExp('^http(s?)://twitter\\.com/#!/'), 'http$1://twitter.com/');
	}
	catch (e) {
		// Uncaught TypeError: Cannot call method 'replace' of undefined
	}
}