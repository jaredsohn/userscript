// ==UserScript==
// @name			Fix boards.ign.com keyboard scrolling
// @namespace		vestitools.pbworks.com
// @description		Sets contenteditable to false on the "What are you playing?" input so that you can scroll with buttons on the keyboard
// @include			http://boards.ign.com/*
// @include			http://forums.ign.com/*
// @include			http://betaboards.ign.com/*
// @version			1.0.0
// ==/UserScript==

/*
Scrolling with buttons on the keyboard on boards.ign.com has been broken since they
added the "What are you playing?" MyIGN status update thing.
The input uses contenteditable, which causes this bug in Firefox.
https://bugzilla.mozilla.org/show_bug.cgi?id=481626

This script will set contenteditable to false so that the bug is somewhat fixed.
You'll be able to scroll with Home/End/Page Up/Page Down buttons,
but the arrows are still broken for me.
*/

if(window.top != window) return;

const inputId = "userStatusUpdate";
const openButtonId = "upateStatus"; //intentional typo, that's what the id is
const closeButtonClass = "cancelBttn";
const att = "contenteditable";

function checkCE(el) {
	return el && el.hasAttribute(att) && 
			el.getAttribute(att)=="true";
	}

var input = document.getElementById(inputId);
if(!input || !checkCE(input)) return;

input.setAttribute(att, false);


//set contenteditable to true when the status updater is opened,
//false again when closed
//(doesn't entirely work because it will also close on a timer)

var openButton = document.getElementById(openButtonId);
if(!openButton) return;

openButton.addEventListener("click", function(e) {
	GM_log("open");
	if(input && !checkCE(input)) input.setAttribute(att, true);
	
	}, false);
	
var closeButton = document.getElementsByClassName(closeButtonClass);
if(closeButton && closeButton[0]) closeButton = closeButton[0];
else return;

closeButton.addEventListener("mousedown", function(e) {
	GM_log("close");
	if(input && checkCE(input)) input.setAttribute(att, false);
	
	}, false);
	