// Wikipedia blackout restore
// Copyright (c) 2012, Endre Fejes
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Wikipedia blackout restore
// @namespace     http://fejese.com
// @description   Restore wikipedia from blackout
// @include       http://*.wikipedia.org/wiki/*
// ==/UserScript==


document.getElementById("mw-page-base").style.display="block";
document.getElementById("mw-head-base").style.display="block";
document.getElementById("content").style.display="block";
document.getElementById("mw-head").style.display="block";
document.getElementById("mw-panel").style.display="block";
document.getElementById("footer").style.display="block";
document.getElementById("mw-sopaOverlay").style.display="hidden";

