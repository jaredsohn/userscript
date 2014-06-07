// ==UserScript==
// @name           Remove Advertisements
// @namespace      /
// @description    Removes ads 
// @include        *

// ==/UserScript==



var adSidebar = document.getElementByClass("largefield blockwidthmargin topmargin7");
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}