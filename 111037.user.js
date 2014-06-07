// ==UserScript==
// @name	Left-right Click Refreshing
// @namespace	http://userscripts.org/
// @author	Lacek
// @description	Left click then right click to refresh
// @include    http://*/*
// @version	20110822
// ==/UserScript==

var leftClicked = false;

document.addEventListener("mousedown", function(e) {
	if (e.which == 1 && !leftClicked) {
		leftClicked = true;
		window.setTimeout(function() {
			if (leftClicked)
				leftClicked = false;
		}, 300);
	}
	else if(e.which == 3 && leftClicked) {
		leftClicked = false;
		document.location.reload();
		document.oncontextmenu = function() {
			return false;
		};
	}
}, false);