// ==UserScript==
// @name           Safari Books Hotkeys
// @namespace      http://www.jga23.com
// @description    Adds hotkeys: j for next, k for previous and f to toggle full screen
// @include        http://my.safaribooksonline.com/*
// ==/UserScript==
// VERSION 1.0

var SafariBookHotkeys = function() {
	var DEBUG = false;
	var isFullScreen = false;
	var log = function(msg) {
		if (DEBUG) {
			unsafeWindow.console.log(msg);
		}
	};

	var keyDown = function(e) {
		log(e.which);
		switch(e.which) {
			case 74: //j
				next();
				break;
			case 75: //k
				prev();
				break;
			case 70: //f
				fullScreenToggle();
				break;
		}
	};

	var prev = function() {
		log("prev");
		var id = document.getElementById("leftNavTd1");
		if (id) {
			var parent = id.parentNode.parentNode.parentNode;
			var func = parent.getAttribute("onclick");
			eval("unsafeWindow."+func);
		}
	};

	var next = function() {
		log("next");
		var id = document.getElementById("rightNavTd1");
		if (id) {
			var parent = id.parentNode.parentNode.parentNode;
			var func = parent.getAttribute("onclick");
			eval("unsafeWindow."+func);
		}
	};

	var fullScreenToggle = function() {
		if (isFullScreen) {
			log("leave full screen");
			isFullScreen = false;
			fullScreen("block");
		} else {
			log("view full screen");
			isFullScreen = true;
			fullScreen("none");
		}
	};

	var fullScreen = function(display) {
		var top = document.getElementsByTagName("table")[0];
		top.firstChild.firstChild.firstChild.firstChild.style.display = display;

		var leftMenu = document.getElementById("HiddenLeftMenu");
		leftMenu.parentNode.parentNode.parentNode.parentNode.style.display = display;

		var bottom = document.getElementById("Bottom");
		bottom.style.display = display;
	};

	window.addEventListener("keydown", keyDown, true);
}

new SafariBookHotkeys();
