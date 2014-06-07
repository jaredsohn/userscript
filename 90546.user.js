// Pa - Assembla prioryty
// version 0.1 BETA!
// 2009-10-01
// Copyright (c) 2009, Pawel Jendrusik
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Pa - Assembla prioryty", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Pa - Assembla prioryty
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Skrypt do normalizacji priorytetów
// ==/UserScript==

function init() {
document.getElementsByClassName('color3-even').style.display = "none";
};


if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", init, false);
}

window.onload=init(); 
