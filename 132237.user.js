// ==UserScript==
// @name           Google stop focus
// @description    Stop google from focusing the search input on every key press. Compatible with Firefox, Chrome, and Opera.
//
// @run-at         document-start
// @include        http://*.google.*
// @include        https://*.google.*
// ==/UserScript==

(window.opera ? document.body : document).addEventListener('keydown', function(e) {
    e.cancelBubble = true;
    e.stopImmediatePropagation();
    return false;
}, !window.opera);
