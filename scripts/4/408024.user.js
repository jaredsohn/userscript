// ==UserScript==
// @name        Quickpost
// @author		Shadow Thief
// @namespace   DutchSaint
// @description Press ` to automatically go to the textarea at the bottom
// @include     http://*nolinks.net/boards/viewtopic.php*
// @version     0.1
// ==/UserScript==

// VERSION HISTORY
// ---------------
// 0.1 - (08 March 2014) Initial Version

// Uses code from http://stackoverflow.com/a/11715670 for scrolling to bottom of page
function showQuickpost(e) {
	var textarea = document.getElementById("req_message");
	
	if (e.which==192 & textarea != document.activeElement) {
		e.preventDefault();
		window.scrollTo(0, document.body.scrollHeight);
		textarea.focus();
	}
}

// Main function. Kind of important.
document.body.addEventListener('keydown', showQuickpost);