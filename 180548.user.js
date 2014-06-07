// ==UserScript==
// @name	BBCodeinator
// @namespace	DutchSaint
// @description	Allows for keyboard shortcuts (CTRL+B for bold, CTRL+I for italic, etc)
// @include	http://nolinks.net/*
// @include	http://www.nolinks.net/*
// @version	0.3
// ==/UserScript==

// Version History
// 0.3 - Added support for the h tag
//       Changed the hotkey for [s] to d
// 0.2 - Added support for the img tag
// 0.1 - Initial Version
//       Thanks to http://userscripts.org/scripts/review/76322 and the KeyboardEvent page on MDN
//       Based on LL Quick Keys by headbanger

// If the appropriate keyboard combination is pressed, add the bbcode to the textarea
// CTRL+B.........(66)...............bold
// CTRL+I.........(73).............italic
// CTRL+U.........(85)..........underline
// CTRL+S.........(83)............spoiler
// CTRL+D.........(68)......strikethrough
// CTRL+up........(38)........superscript
// CTRL+down......(40)..........subscript
// CTRL+Q.........(81)..............quote
// CTRL+SHIFT+C...(67)...............code
// CTRL+L.........(76)................URL
// CTRL+SHIFT+V...(86)..............video
// CTRL+M.........(77)................img
function getBBCode(e) {
	if (e.ctrlKey && e.which == 66) {
		addBBCode("b");
		e.preventDefault();
	}
	if (e.ctrlKey && e.which == 73) {
		addBBCode("i");
		e.preventDefault();
	}
	if (e.ctrlKey && e.which == 85) {
		addBBCode("u");
		e.preventDefault();
	}
	if (e.ctrlKey && e.which == 83) {
		addBBCode("spoiler");
		e.preventDefault();
	}
    if (e.ctrlKey && e.which == 68) {
        addBBCode("s");
        e.preventDefault();
	}
	if (e.ctrlKey && e.which == 38) {
		addBBCode("sup");
		e.preventDefault();
	}
    if (e.ctrlKey && e.which == 72) {
		addBBCode("h");
		e.preventDefault();
	}
	if (e.ctrlKey && e.which == 40) {
		addBBCode("sub");
		e.preventDefault();
	}
	if (e.ctrlKey && e.which == 81) {
		addBBCode("quote");
		e.preventDefault();
	}
	if (e.ctrlKey && e.shiftKey && e.which == 67) {
		addBBCode("code");
		e.preventDefault();
	}
	if (e.ctrlKey && e.which == 76) {
		addBBCode("url");
		e.preventDefault();
	}
	if (e.ctrlKey && e.shiftKey && e.which == 86) {
		addBBCode("video");
		e.preventDefault();
	}
	if (e.ctrlKey && e.which ==77) {
		addBBCode("img");
		e.preventDefault();
	}
}

// Does the actual adding of the bbcode
// Shamelessly ripped from my spoiler tag button script
function addBBCode(tag) {
	var scrollX = textarea.scrollLeft;
	var scrollY = textarea.scrollTop;
	
	if (textarea.selectionStart || textarea.selectionStart == '0') {
		var startPos = textarea.selectionStart;
		var endPos = textarea.selectionEnd;
		textarea.value = textarea.value.substring(0, startPos)
			+ "["+tag+"]" + textarea.value.substring(textarea.selectionStart, textarea.selectionEnd)
			+ "[/"+tag+"]" + textarea.value.substring(endPos, textarea.value.length);
	}
	
	textarea.focus();
	textarea.scrollLeft = scrollX;
	textarea.scrollTop = scrollY;
}

// The main part of the code
var textarea = document.getElementById("req_message");
textarea.addEventListener('keydown', getBBCode);