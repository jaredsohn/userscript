// ==UserScript==
// @name           bing_cleaner
// @namespace      bing
// @include        http://www.bing.com/search*
// ==/UserScript==

// move the results against the left side
document.getElementById('sw_canvas').style.padding="8px";

// move the related searches, etc, to the right side of results
document.getElementById('sw_aside').style.position="absolute";
document.getElementById('sw_aside').style.left="875px";

// make the results not quite so wide
document.getElementById('sw_main').style.maxWidth="680px";
document.getElementById('content').style.padding="8px";

// move the ads below the results
document.getElementById('sidebar').style.cssFloat="none";
