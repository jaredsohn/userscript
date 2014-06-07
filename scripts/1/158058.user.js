// ==UserScript==
// @name        no-drag
// @namespace   localhost
// @description	prevent links and imgs from being drag around, also enables links to be text-selected
// @include     https://*
// @include     http://*
// @grant		none
// @version     2013.01.27
// ==/UserScript==

// unsets draggable property of links clicked
unsafeWindow.addEventListener("mousedown", function (ev) {
	var node = ev.target.nodeName.toUpperCase();
	if(node == "A") {
		ev.target.draggable = false;
	}
}, false);

// prevents link of being open if the click was
// triggered by mouseup of the text selection
unsafeWindow.addEventListener("click", function (ev) {
	var sel = unsafeWindow.getSelection();
	if(sel && sel.toString().length > 0) {
		ev.preventDefault();
		return false;
	}
}, false);

// prevents the drag to start on images and links
unsafeWindow.addEventListener("dragstart", function (ev) {
	var node = ev.target.nodeName.toUpperCase();
	if (node == "IMG" || node == "A") {
		ev.preventDefault();
		return false;
	}
}, false);

