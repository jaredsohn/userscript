// ==UserScript==
// @run-at document-start
// @name NoSpeedDial
// @author Charles
// @description Start Chrome and open each new tab with a clean blank page
// @namespace http://www.adsweep.org/NoSpeedDial.user.js
// @include chrome://newtab/
// @include chrome-ui://newtab/
// @version 1.2
// ==/UserScript==

document.documentElement.style.display='none';

// Thanks to Andrey Shef