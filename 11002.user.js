// ==UserScript==
// @name           Del.icio.us Disable Enter
// @namespace      http://www.elijahlofgren.com
// @description    Disables the Enter key from submitting the form in the "tag this" popup from the "del.icio.us buttons" extension.
// @include        http://del.icio.us/*
// ==/UserScript==
// Notes:
// 	Code adapted from the following pages:
// 	http://www.codingforums.com/showthread.php?t=17516
// 	http://www.arraystudio.com/as-workshop/disable-form-submit-on-enter-keypress.html
// 	http://www.briandonovan.info/articles/public/greasemonkey-pitfalls-2007/pf-02-event-handlers/index.html
// As per http://greasemonkey.mozdev.org/authoring.html "call your code in response to the load event"
window.addEventListener("load", function(e) {
	// Only run if the <input id="tags" ... /> element exists on the page
	if (unsafeWindow.document.getElementById("tags")) {
		unsafeWindow.document.getElementById("tags").onkeypress = function(e)
		{
			// evaluate existing function call
			eval(document.getElementById("tags").getAttribute("tags"));

			// Return false if Enter key was pressed to prevent form submission
			if (e.which == 13) {
				return false;
			} else {
				return true;
			}
		}
	}
	if (unsafeWindow.document.getElementById("description")) {
		unsafeWindow.document.getElementById("description").onkeypress = function(e)
		{
			// evaluate existing function call
			eval(document.getElementById("description").getAttribute("onkeypress"));

			// Return false if Enter key was pressed to prevent form submission
			if (e.which == 13) {
				return false;
			} else {
				return true;
			}
		}
	}
	if (unsafeWindow.document.getElementById("url")) {
		unsafeWindow.document.getElementById("url").onkeypress = function(e)
		{
			// evaluate existing function call
			eval(document.getElementById("tags").getAttribute("tags"));

			// Return false if Enter key was pressed to prevent form submission
			if (e.which == 13) {
				return false;
			} else {
				return true;
			}
		}
	}
}, false);