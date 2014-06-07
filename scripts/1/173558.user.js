// ==UserScript==
// @name        YouTube: Get Old Favicon
// @namespace   
// @description Replaces the new YouTube favicon with the old one.
// @include     http*://*.youtube.com*
// @include     http*://www.youtube.com*
// @version     1.0
// ==/UserScript==
function getElementByRel(rel) {
    aElements = document.getElementsByTagName("link");
    relElems = [];
    for (i = 0; i < aElements.length; i++) {
        if (aElements[i].hasAttribute("rel") && aElements[i].rel == rel) {
             return aElements[i];
        }
    }
}
var favilink = getElementByRel("shortcut icon");
favilink.setAttribute("href","//s.ytimg.com/yt/favicon-vfl147246.ico");