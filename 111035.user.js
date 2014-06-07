// ==UserScript==
// @name	Hold Left for Next Page
// @namespace	http://userscripts.org/
// @author	Lacek
// @description	Hold the left button of your mouse for half a second to jump to next page
// @include	http://*/*
// version	20110823
// ==/UserScript==

var next = document.evaluate("//a[text()='下一页'] | //a[text()='下一頁'] | //a[contains(translate(text(),'NEXT','next'),'next')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
if(next.singleNodeValue) {
	const HOLD_TIME = 500;
	var holding = false;
	var leftUp = true;
	var leftX, leftY;
	document.addEventListener("mousedown", function(e) {
		if (e.which == 1) {
			holding = leftUp = false;
			leftX = e.clientX;
			leftY = e.clientY;
			setTimeout(function() {
				if (!leftUp)
					holding = true;
			}, HOLD_TIME);
		}
	}, false);
	document.addEventListener("mouseup", function(e) {
		if (e.which == 1) {
			leftUp = true;
			if (holding && e.clientX == leftX && e.clientY == leftY) {
				holding = false;
				window.location = next.singleNodeValue;
			}
		}
	}, false);
}