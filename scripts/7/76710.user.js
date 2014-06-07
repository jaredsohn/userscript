// ==UserScript==
// @name           Pivot
// @namespace      com.bentruyman
// @description    Rotates all sites -3 degrees
// @include        *
// ==/UserScript==

document.documentElement.style['transform'] = 'rotate(-3deg)';
document.documentElement.style['-moz-transform'] = 'rotate(-3deg)';
document.documentElement.style['-webkit-transform'] = 'rotate(-3deg)';