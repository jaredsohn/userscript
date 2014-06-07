// ==UserScript==
// @name	Double Click for Next Page (for Discuz! based forums)
// @namespace	http://userscripts.org/users/126938
// @author	Angle
// @include	http://*/forumdisplay.php*
// @include	http://*/viewthread.php*
// @include	http://*/forum-*-*.html
// @include	http://*/thread-*-*-*.html
// @version	2010-05-01
// ==/UserScript==

var next = document.evaluate("//a[@class='next']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
if(next.singleNodeValue) {
document.addEventListener("dblclick", function() {
	window.location = next.singleNodeValue;
}, false);
}