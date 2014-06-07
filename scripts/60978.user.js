// NK - Ukryj sledzika
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
// select "NK - Ukryj sledzika", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          NK - Ukryj sledzika
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Skrypt do ukrycia bloku sledzika
// ==/UserScript==

function init() {
document.getElementById('content_banner').style.display = "none";
document.getElementById('sledzik_box').style.display = "none";
document.getElementById('allegro_box').style.display = "none";
document.getElementById('bil_180x100').style.display = "none";
document.getElementById('test_ing').style.display = "none";
document.getElementsByClassName('partners_box').style.display = "none";
};


if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", init, false);
}

window.onload=init();
