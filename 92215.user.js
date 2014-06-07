// ==UserScript==
// @name           Twitter AutoScroll
// @description    Automatically get new tweets on Twitter
// @author         Chris Bouchard
// @include        http://twitter.com/
// @include        http://twitter.com/*
// @version        1.0
// ==/UserScript==

(function () {
	document.addEventListener('DOMNodeInserted', function (event) {
		if (/(^|\\s)new-tweets-bar(\\s|$)/.test(event.srcElement.className)) {
			var evt = event.srcElement.ownerDocument.createEvent('MouseEvents');
			evt.initMouseEvent('click', true, true, event.srcElement.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			event.srcElement.dispatchEvent(evt);
		}
	}, false);
})();