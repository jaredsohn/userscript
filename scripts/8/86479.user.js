// ==UserScript==
// @name          Disallow stylesheets on r/Android
// @namespace     http://www.reaverxai.com/
// @description   
// @include       http://www.reddit.com/r/Android*
// @include       http://www.reddit.com/r/android*
// ==/UserScript==

document.styleSheets[1].disabled = true;