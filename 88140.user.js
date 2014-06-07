// ==UserScript==
// @name          Disallow stylesheets on r/Nosleep
// @namespace     http://www.reaverxai.com/
// @description   
// @include       http://www.reddit.com/r/nosleep*
// @include       http://www.reddit.com/r/Nosleep*
// ==/UserScript==

document.styleSheets[1].disabled = true;