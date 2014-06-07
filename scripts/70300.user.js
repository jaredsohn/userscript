// ==UserScript==
// @name           Auto scroll
// @namespace      http://userscripts.org/users/44573
// @description    Auto scroll page on Ctrl+Down. Escape to stop.
// @include        *
// ==/UserScript==

var u44573_go = false;
var u44573_speed = 100;

var DOM_VK_DOWN = 40;
var DOM_VK_UP = 38;
var DOM_VK_ESCAPE = 27;

window.addEventListener('keydown', u44573_handler, true);

function u44573_handler(e) {
	if(e.ctrlKey && ! u44573_go && (e.keyCode == DOM_VK_DOWN || e.keyCode == DOM_VK_UP)) { // Start
		u44573_go = true;
		u44573_speed = 200;
		u44573_goScroll();
	} else if(e.ctrlKey && u44573_go && (e.keyCode == DOM_VK_DOWN)) { // Speed up
		u44573_speed *= 0.80;
	} else if(e.ctrlKey && u44573_go && (e.keyCode == DOM_VK_UP)) { // Speed down
		u44573_speed *= 1.20;
	} else if (e.keyCode == DOM_VK_ESCAPE) { // Stop (ESCAPE)
		u44573_go = false;
	}
}

function u44573_goScroll() {
	if (u44573_go) {
		var s = u44573_getScrollPosition();
		unsafeWindow.scroll(s[0], s[1] + 1);
		setTimeout(u44573_goScroll, u44573_speed);
	}
}

function u44573_getScrollPosition()
{
    return Array((document.documentElement && document.documentElement.scrollLeft) || window.pageXOffset || self.pageXOffset || document.body.scrollLeft,(document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || self.pageYOffset || document.body.scrollTop);
}
