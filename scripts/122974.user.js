// ==UserScript==
// @name           Better IMO
// @namespace      http://isaacbythewood.com/
// @description    A better IMO interface.
// @include        https://imo.im/
// @include        https://imo.im/#
// @version        1.0.3
// ==/UserScript==

// -----------------------------------------------------------------------------
// Append our new and improved styles
var style = document.createElement('style');

style.innerHTML = " \
    div#imo div#body div#main { \
        background-color: #333; \
        right: 302px; \
    } \
    div#imo div#window_container div.floatingwindowholder div.floatingwindow { \
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.7); \
    } \
    div#imo div#footer { \
        display: none; \
    } \
    div#imo div#body { \
        bottom: 0; \
    } \
    div#imo div#window_container div.floatingwindowholder, \
    div#imo div#window_container div.floatingwindowholder div.floatingwindow { \
        border-radius: 5px; \
    } \
";

document.body.appendChild(style);
// -----------------------------------------------------------------------------
