// FaceBook profile AIM status icon
// Copyright (c) 2006
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Offsite Blank", and click Uninstall.
//
// --------------------------------------------------------------------
//	
// ==UserScript==
// @name          facebook aim status icon
// @description   facebook aim status icon
// @include       *facebook.com/profile.php*
// ==/UserScript==

//get all links
var a, links;
links = document.getElementsByTagName('a');

//create regexp for "screenname"
var re = /screenname/;

//look through all links for one containing "screenname"
for (var i = 0; i < links.length; i++) {
    var a = links[i];
    if (a.href.search(re) !== -1) {

	//extract screenname and append that to AIM user status img src
	var snLength = (a.href.length);
	var sn = a.href.substring(20,snLength);
	//it seems like I can use this key for this according to TOS, but if it
	//stops working, you might try getting your own key from developer.aim.com
	var link0 = "http://api.oscar.aol.com/SOA/key=je1ZtapBUYJngcu0/presence/";
	var link = link0.concat(sn);

	//add a space
    var newText = document.createTextNode(" \t ");
    a.appendChild(newText);

	//add the user status icon (w/ its height reduced)
	newElement = document.createElement('img');
	newElement.src = link;
	newElement.height = '11';
    a.parentNode.insertBefore(newElement, a.nextSibling); 
	
	//enjoy expanded facebook stalking abilities!
    }
}