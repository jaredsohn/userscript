// ==UserScript==
// @name           Next page via keyboard
// @namespace      oglaf
// @description    Bored of clicking? Just use the right arrow to go to the next page.
// @include        http://oglaf.com/*
// ==/UserScript==

function rightArrowHandler (e) {
	// if right arrow key (keycode 39)
	if (e.keyCode == 39) {
		// nab the "next page" div
		nextPageDiv = document.getElementById ('nx');
		
		// check that we got something (if there's no next, then it won't exist)
		if (!nextPageDiv) {
			alert ("You've read everything! Come back Sunday.");
			return;
		} else {
			// follow the anchor (which is above this div)
			window.location = nextPageDiv.parentNode.getAttribute ("href");
		}
	}
}

// bind the above function to onkeypress
window.addEventListener('keypress',rightArrowHandler,false);