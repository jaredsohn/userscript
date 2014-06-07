// ==UserScript==
// @name           MyCubie Bandwidth Saver
// @namespace      http://www.cool-bux.co.cc
// @description    Saves bandwidth by loading google
// @include        *mycubie.net/cks.php?k=*
// ==/UserScript==

//load google in the iframe
var ifr = document.getElementsByTagName('iframe');

for(i=0;i<ifr.length;i++)
{
	ifr[i].src = "http://www.google.com";
}