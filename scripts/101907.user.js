// ==UserScript==
// @name           NYTimes - Hand Up the Paywall
// @namespace      http://
// @license        http://www.gnu.org/licenses/gpl-2.0.html
// @description    For New York Times, leap over the pay wall
// @version        1.0
// @include        http://www.nytimes.com/*
// ==/UserScript==

var watchBody = function() {
	//This is the correct way to do this-- only works for FF
	document.body.addEventListener('DOMAttrModified', function(e) {
		if (e.attrName === 'style') {
			document.body.style.overflow = 'scroll';
		}
	}, false);
	setInterval( function() { document.body.style.overflow = 'scroll'; }, 500 ); //This will at least do the trick for Chrome
}

//Remove elements we don't like if they come up
var removeUnsavoryElements = function(e, obj) {
	unsavoryElements = [ 'gatewayCreative', 'overlay' ]
	if (e.target && e.target.nodeName == 'DIV') {
		for (i = 0; i < unsavoryElements.length; i++) {
			if (e.target.querySelectorAll('#' + unsavoryElements[i]).length == 1) {
				e.target.querySelectorAll('#' + unsavoryElements[i])[0].style.display = 'none';
			}
		}
	}
};

window.addEventListener('load', watchBody, false);
window.addEventListener('DOMNodeInserted', removeUnsavoryElements, false);