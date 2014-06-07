// ==UserScript==
// @name        RYM Fixed Toolbar
// @namespace   http://userscripts.org/users/475859/
// @description Fixes the toolbar to the top of the viewport
// @include     http://rateyourmusic.com/*
// @version     1.2
// @copyright  2012+, rickdog
// ==/UserScript==

document.getElementById("navtop").style.position = "fixed";
document.getElementById("navtop").style.zIndex = 100;
document.getElementById("top").style.position = "fixed";