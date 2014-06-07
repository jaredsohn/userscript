// ==UserScript==
// @name           Stack Overflow header layout bug fix
// @include        http://stackoverflow.com/*
// ==/UserScript==

/* Fix for Firefox 3.0.5—may be against the CSS 2.0 specification,
 * but that doesn't matter here. (The 2.1 specification allows it anyway.)
 */
document.getElementById("hlinks").style.width = "auto";
