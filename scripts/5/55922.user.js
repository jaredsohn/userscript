// ==UserScript==
// @name           Gmail Sponsored Links Removal
// @namespace      http://userscripts.org/users/104335
// @description    Removes the sponsored links
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/mail/*
// @attribution    Gmail Disable Sponsored Links (http://userscripts.org/scripts/show/52619)
// @copyright      Copyleft
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version        0.0.8
// @require        http://usocheckup.redirectme.net/55922.js
// ==/UserScript==

(function () {
	var interval;

	function removeSponsoredLinks() {
		var frame = document.getElementById("canvas_frame");
	
		if(frame)
		{
//			removeElementByClassName(frame.contentDocument, "u7");
			removeElementByClassName(frame.contentDocument, "u9");
		}
	}

	function removeElementByClassName(node, className) {
		var element = node.getElementsByClassName(className).item(0);

		if(element) {
			element.parentNode.parentNode.removeChild( element.parentNode );
		}
	}

	// Check for new spam every second
	interval = window.setInterval(function(){removeSponsoredLinks();}, 1 * 1000);

})();