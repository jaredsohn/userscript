// ==UserScript==
// @name          Basecamp Quick Save
// @namespace     http://almaer.com/firefox/userscripts/
// @description   Allow a user to shift+enter/return to save an entry
// @include       http://*.seework.com/*
// @include       http://*.grouphub.com/*
// @include       http://*.projectpath.com/*
// @include       http://*.updatelog.com/*
// @include       http://*.clientsection.com/*
// ==/UserScript==

// Capture the keystroke
document.addEventListener("keypress", function(e) {
        if (e.shiftKey && e.keyCode == 13) {
                var theForm = e.target.parentNode.parentNode;
                var theButton = theForm.getElementsByTagName('input')[1];
                simulateClick(theButton, "click");
        }
        return false;
}, false);


// Utility functions
function simulateClick(node, eventType) {
    var event = node.ownerDocument.createEvent("MouseEvents");
    event.initMouseEvent(eventType,
                         true, // can bubble
                         true, // cancellable
                         window,
                         1, // clicks
                         50, 50, // screen coordinates
                         50, 50, // client coordinates
                         false, false, false, false, // control/alt/shift/meta
                         0, // button,
                         null);
    node.dispatchEvent(event);
}
