// ==UserScript==
// @name           Disable context Menu changes

// @description    Prevents sites from changing or disabling the context menu (the right-cklick menu)
// @run-at         document-start
// @include        *
// @version        1
// ==/UserScript==


// Reminder for self:
// In Firefox, use the error console (Ctrl+Shift+K) to see the output of 
// unsafeWindow.console.log("Hello");
// If nothing shows up, just replace the unsafeWindow.console.log() with 
// alert("Hello");


/*
// First try: Intercepting mouse events does work for this task.
(window.opera ? document.body : document).addEventListener('mousedown', function(e) {
	// unsafeWindow.console.log(e.button);  // uncomment to see the event properties
	if (e.button == 2) {
		e.cancelBubble = true;
		e.stopImmediatePropagation();
		// unsafeWindow.console.log("saw rightcklick"); 
	}
	return false;
}, !window.opera);
*/

// Instead: Need to intercept contextmenu events!
(window.opera ? document.body : document).addEventListener('contextmenu', function(e) {
	// unsafeWindow.console.log(e);  // uncomment to see the event properties
	e.cancelBubble = true;
	e.stopImmediatePropagation();
	// unsafeWindow.console.log("blocked contextmenu event"); 
	return false;
}, !window.opera);