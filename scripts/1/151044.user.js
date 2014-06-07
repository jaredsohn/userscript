// ==UserScript==
// @name           Google Real Links
// @namespace      JaHIY
// @description    remove 'onmousedown' attribute of all link tags on Google Search.
// @match          http://*.google.com/search?*
// @match          https://*.google.com/search?*
// @version        1.0
// @author         JaHIY
// @license        MIT license
// ==/UserScript==

"use strict";

function check_element() {
    if (document.querySelector('#ires')) {
        document.removeEventListener('DOMNodeInserted', check_element, false);
        document.addEventListener('DOMNodeInserted', real_links, false);
    }
}

function real_links() {
    var items = document.querySelectorAll('a[onmousedown]');
    if (items) {
        Array.prototype.forEach.call(items, function(e, i) {
            e.removeAttribute('onmousedown');
        });
    }
}

document.addEventListener('DOMNodeInserted', check_element, false);
