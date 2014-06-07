// ==UserScript==
// @name        Disable interceptions of Cmd+t, Cmd+w, Cmd+shift+] and Cmd+shift+[
// @namespace   http://userscripts.org/users/642403
// @description Stop websites from hijacking keyboard shortcuts
//
// @run-at         document-start
// @include        *
// @grant          none
// ==/UserScript==

// Keycode for 's' and 't'. Add more to disable other ctrl+X interceptions
// http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
shift_keycodes = [219, 221]; // [, ]
keycodes = [84, 87]; // t, w

(window.opera ? document.body : document).addEventListener('keydown', function(e) {
    // alert(e.keyCode ); //uncomment to find more keyCodes
    if (shift_keycodes.indexOf(e.keyCode) != -1 && e.metaKey && e.shiftKey) {
        e.cancelBubble = true;
        e.stopImmediatePropagation();
    // alert("Gotcha!"); //ucomment to check if it's seeing the combo
    }
    
    if (keycodes.indexOf(e.keyCode) != -1 && e.metaKey) {
        e.cancelBubble = true;
        e.stopImmediatePropagation();
    // alert("Gotcha!"); //ucomment to check if it's seeing the combo
    }
    
    return false;
}, !window.opera);