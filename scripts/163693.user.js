// ==UserScript==
// @name			HF Scripts - Down To Bottom
// @namespace 		xerotic/downtobottom
// @description 	Easily go to the bottom of the page.
// @include  		*hackforums.net/showthread.php*
// @version  		1.0.1
// ==/UserScript==

var tcats = document.getElementsByClassName('tcat');
var bottom = "<strong><a href='#copyright'>Down</a></strong> - "

for(var i = 0; i < tcats.length; i++) {
	tcats[i].childNodes[5].firstChild.firstChild.innerHTML = bottom + tcats[i].childNodes[5].firstChild.firstChild.innerHTML;
}