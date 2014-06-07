// ==UserScript==
// @name        My Nuke Anything
// @namespace   tag:flitterio@gmail.com,2010:gm
// @description Hides DOM nodes using mouse clicks. Restores them with a keystroke.
// @author      Francis Litterio
// @include     *
// ==/UserScript==
//
// This script lets you hide any object on a page by pressing Ctrl-Alt-LeftMouse
// on the object.  Hidden objects remain in the DOM, they just have style
// "display=none".  Restore hidden objects by pressing Ctrl-/ once for each
// object to be restored.  Objects are restored in the reverse order that they
// were hidden.

var lastNukedNodes = [];

function nuke(event) {
    try {
        if (event.type == "mousedown" && event.ctrlKey && event.altKey && event.button == 0) {
            // Ctrl-Alt-LeftMousedown
            event.stopPropagation();
            event.preventDefault();

            event.target.style.display = "none";
            lastNukedNodes.push(event.target);
        }
        else if (event.type == "keydown" && event.ctrlKey && event.keyCode == 191) {
            // Ctrl-/
            event.stopPropagation();
            event.preventDefault();

            if (lastNukedNodes.length > 0)
                lastNukedNodes.pop().style.display = "";
        }
    }
    catch (e) {
        alert("EXCEPTION: " + e);
    }
}

function main() {
    // We assign an empty array to lastNukedNodes here to cover the case where
    // the user reloads the page after nuking some nodes.
    lastNukedNodes = [];
    window.addEventListener("mousedown", nuke, true);
    window.addEventListener("keydown", nuke, true);
}

function myOnload(event) {
    // Run just for the top-level window and not iframes.
    if (top != self)
        return;

    try { main(); } catch (e) { alert("EXCEPTION: " + e); }
}

// Changing the DOM after the load event fires is less likely to cause problems
// with Firefox rendering.

window.addEventListener("load", myOnload, false);
