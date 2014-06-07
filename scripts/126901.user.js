// ==UserScript==
// @name           Remove Google Chrome Banner
// @namespace      alecava
// @include        http://www.google.*
// @include        https://www.google.*
// ==/UserScript==

var banner = document.getElementById('pmocntr2');
banner.parentNode.removeChild(banner);