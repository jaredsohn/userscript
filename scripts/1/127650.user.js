// ==UserScript==
// @name           Google+ Auto-More
// @namespace      https://plus.google.com/
// @include        https://plus.google.com/
// @include        https://plus.google.com/u/0/
// @description    Automatically clicks the 'More' button on left hand to open complete list of circles.			
// @version        0.2
// ==/UserScript==

// Class Name for "More" button on left navigation bar
var buttonName = 'c-C ob9CH Ku eYNw4c ZY7LHe';

var evt = document.createEvent ("MouseEvents");
evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);

if(document.getElementsByClassName){
	var elemlist = document.getElementsByClassName(buttonName);
	elemlist[0].dispatchEvent(evt);
}