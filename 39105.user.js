// ==UserScript==
// @name		Yahoo Mail Classic Dock Badge
// @namespace   http://fluidapp.com
// @description Display a dock badge for Yahoo Mail when using Fluid. Be sure to turn off Preferences --> General --> Fluid attempts to show Dock badge labels
// @include	 *mail.yahoo.com*
// @author	  Kevin Ashworth
// ==/UserScript==

// based on this typical html from view source: unread messages in parens
// <li id="inbox" title="Inbox contains 5 messages"><a href="x" title="Inbox contains 5 messages"><em>Inbox <b>(2)</b></em></a></li>


(function () {
	if (!window.fluid) {
		return;
	}
	if (window.fluid) {
		try { 
			updateBadge();
		} catch(e) { 
			window.console.log(e);
		}
	}
})();

function updateBadge() {
	inbox_tag = document.getElementById("inbox").getElementsByTagName('b');
	if (inbox_tag.length > 0) {
		inbox_tag_html = inbox_tag[0].innerHTML;
		count = /(\d+)/.exec(inbox_tag_html)[0];
		window.fluid.dockBadge = count;
	} else {
		window.fluid.dockBadge = "";
	}
}

