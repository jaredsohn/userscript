// ==UserScript==
// @name           Paidtoclick.co.in Bandwidth Saver
// @namespace      http://www.cool-bux.co.cc
// @description    Saves Bandwidth by loading google
// @include        *paidtoclick.co.in/cks.php?k=*
// ==/UserScript==

//load google in the iframe
var ifr = document.getElementsByTagName('iframe');

for(i=0;i<ifr.length;i++)
{
	ifr[i].src = "http://www.google.com";
}