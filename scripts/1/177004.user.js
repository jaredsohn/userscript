// ==UserScript==
// @name        Watch all later
// @namespace   metaw3
// @include     /^https?://www\.youtube\.com/.*$/
// @version     1.5
// ==/UserScript==


GM_registerMenuCommand("Watch all later", function() {
	var timerId;
	var clickNext = function() {
		var button = document.getElementsByClassName('addto-watch-later-button').item(0);
		if (button) {
			button.click();
		} else {
			window.clearInterval(timerId);
		}
	};
	timerId = window.setInterval(clickNext, 250);
});