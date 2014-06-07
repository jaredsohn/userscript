// ==UserScript==
// @name           Disable Ctrl+T interceptions
// @description    Stops websites from using Javascript to hijack Ctrl+F, Ctrl+N, ... in Firefox.
//
// @run-at         document-start
// @include        *
// @grant          none
// ==/UserScript==

// Keycode for f, n, s, and and t. Add more to disable other ctrl+X interceptions
keycodes = [70, 78, 83, 84];  

// Reminder for self:
// In Firefox, use the error console (Ctrl+Shift+K) to see the output of 
// unsafeWindow.console.log("Hello");
// If nothing shows up, just replace the unsafeWindow.console.log() with 
// alert("Hello");

(window.opera ? document.body : document).addEventListener('keydown', function(e) {
    // unsafeWindow.console.log(e.keyCode ); //uncomment to find more keyCodes
    if (keycodes.indexOf(e.keyCode) != -1 && e.ctrlKey) {
        e.cancelBubble = true;
        e.stopImmediatePropagation();
        // unsafeWindow.console.log("Gotcha!"); //check if the script sees this combination.
    }
    return false;
}, !window.opera);