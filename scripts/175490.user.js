// ==UserScript==
// @name         Story Scroll
// @namespace    http://ctrlc.123.st/
// @version      1.0
// @description  You can use the arrow keys to scroll up or down with a gap window height.
// @copyright    2013+, baivong
// @icon         http://i.imgur.com/BopDgV1.png

// ==/UserScript==

window.onkeyup = function (c) {
	switch (c.keyCode) {
	case 37:
		window.scrollTo(0, (window.pageYOffset - window.innerHeight + 20));
		break;
	case 39:
		window.scrollTo(0, (window.pageYOffset + window.innerHeight - 20))
	}
}