// ==UserScript==
// @name        Stop Search Focus
// @description    Stop websites from focusing the search on every key press.
// @run-at         document-start
// @include     http*
// @grant       none
// ==/UserScript==

(window.opera ? document.body : document).addEventListener('keydown', function(e) {
    e.cancelBubble = true;
    e.stopImmediatePropagation();
    return false;
}, !window.opera);
