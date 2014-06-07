// ==UserScript==
// @name gmail-b2b-keyinput
// @description Keyboard input fix for the gmail-b2b userstyle
// @match http://mail.google.com/*
// @match https://mail.google.com/*
// ==/UserScript==
(function() {

var KeyCodes = {
	KEY_SPACE: 32,
	KEY_PAGE_UP: 33,
	KEY_PAGE_DOWN: 34,
	KEY_END: 35,
	KEY_HOME: 36,
	KEY_UP_ARROW: 38,
	KEY_DOWN_ARROW: 40,
};

var target = document.getElementById("canvas_frame").contentDocument.body;

target.onkeydown = function(event){
    var key = event.keyCode || event.which;
	switch(key) {
		case KeyCodes.KEY_DOWN_ARROW:
			target.scrollTop += 40;
			break;
		case KeyCodes.KEY_UP_ARROW:
			target.scrollTop -= 40;
			break;
		case KeyCodes.KEY_SPACE:
		case KeyCodes.KEY_PAGE_DOWN:
			target.scrollTop += target.clientHeight;
			break;
		case KeyCodes.KEY_PAGE_UP:
			target.scrollTop -= target.clientHeight;
			break;
		case KeyCodes.KEY_HOME:
			target.scrollTop = 0;
			break;
		case KeyCodes.KEY_END:
			target.scrollTop = target.scrollHeight;
			break;
	}
};

})();