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
// select "Onion skip ads", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Onion skip ads
// By Improve The Net - http://www.improvethenet.org
// version 0.1
// 2005-12-5
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Onion ad eliminator
// @namespace     http://www.improvethenet.org
// @description   Eliminate many ads from The Onion.
// @include       http://*.theonion.com/*
// ==/UserScript==

var x,i;
x=document.links; //Get all the links in the page

for(i=0;i<x.length;++i) {		//Go through every link on the page
	if (/Skip\s+This\s+Ad/i.test(x[i].innerHTML)) {	//find the right link
		window.location.href = x[i].href;		// Go to the href
	} 
}

// we also remove the featured sponsors element
var div = document.getElementById('sponsors');
div.parentNode.removeChild( div );