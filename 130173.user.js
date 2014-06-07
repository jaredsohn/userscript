// ==UserScript==
// @name           Fontsize
// @namespace      http://www.warez-bb.org
// @description    A script that makes the font size bigger.
// @author         thecodingdude
// @version        1.0.1
// @license        Free to claim as yours, copy, redistribute...
// @include        http://www.warez-bb.org/*
// @include        http://www.warez-bb.org/index.php* 
// ==/UserScript==

/* Thanks to Belderan for help with this script <3 */


/* Change the font size here */
var font_size = "15px";


/* Ignore this */
var codeboxes = document.getElementsByClassName('code');
var quoteboxes = document.getElementsByClassName('quote');

for(i=0;i<codeboxes.length;i++) {
codeboxes[i].style.fontSize = font_size;
}

for(i=0;i<quoteboxes.length;i++) {
quoteboxes[i].style.fontSize = font_size;
}