// ==UserScript==
// @name           mailto GMail Popup
// @namespace      KHMI - Greasemonkey
// @include        *
// @description	   changes all mailto links to open in a GMail popup window
// ==/UserScript==

/*
This requires GMail set as the default email app (Firefox 3).
This script makes all mailto links open in a popup window for GMail.
Popup window is dynamically sized and centered according to user screen dimensions.

*/

var height = parseInt(screen.height*0.755);
var width = parseInt(screen.width*0.39);

var top = (screen.height-height)/2;
var left = (screen.width-width)/2;

var links, link;   
links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    link = links[i];
	if(link.href.indexOf("mailto:")==0) {
		link.setAttribute("onclick","window.open('"+ link.href +"','_blank','toolbar=no, location=yes, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, height="+ height +", width="+ width +", top="+ top +", left="+ left +"');");
		link.setAttribute("href", "");		
	}
}