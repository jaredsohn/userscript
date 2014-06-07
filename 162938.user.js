// ==UserScript==
// @name        Vokker Check By Enter Key
// @namespace   de.mann.greasemonkey.vokker
// @description Enables the enter key - the current version of vokker.net just provides a button which can be annoying!
// @include     http://www.vokker.net/*/lernen/
// @version     1
// ==/UserScript==

// Whenever a key is pressed
window.onkeypress = function(e) {
    // Only react if enter was pressed
    if (e.which == 13) {
        var field = document.getElementById('ein');
        // If the textarea was loaded and NOT shift key is pressed (we want to allow a like break)
        if (field != undefined && !e.shiftKey) {
            // Simulate the on click event of the button which checks
            document.getElementById('tamtam').click();
        }
    }
}
