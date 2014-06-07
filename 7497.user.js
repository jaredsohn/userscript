// GMailQuickLinks
// version 0.1
// 2007-2-12
// Copyright (c) 2007, Ben Beckwith
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
// --------------------------------------------------------------------
//
// Another keyboard junkie script.  This time for GMail.
// This script enumerates the links in gmail and allows you to
// use keyboard shortcuts to access them.
// The important keys are 'l' and '<0-9>'.
// Click 'l' once to active the commands, and then again to enumerate links
// Clicking 'l-<0-9>' will open up one of the links.
// The script uses GM_openInTab for the links.
// 
// --------------------------------------------------------------------
// Changelog
// 0.1
// Initial version
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GMail Quick Links
// @namespace     http://whitebucket.com/greasemonkey
// @description   Adds shortcut keys for links in the body of an item in GMail.
// @include	  http://mail.google.com/*
// @include	  https://mail.google.com/*
// ==/UserScript==

var controlkey = 0;

// Apply the numberical [X] to the links
function LabelLinks(links) {
    // Loop through the links, adding the identifier
    for(var i = 0; (i < links.length )&&(i<10); i++){
	links[i].innerHTML += " [" + i + "]";
    }
}

function GetVisibleMessageLinks() {
    msgs = document.getElementById("msgs");
    if(!msgs){ return msgs; } /* return immediately if null */
    var divs = msgs.getElementsByTagName('div');
    var links = new Array();
    for( var i = 0; i < divs.length; i++){
	if((divs[i].className == "mb") && (divs[i].style.display != 'none')){
	    var ll = divs[i].getElementsByTagName("A");
	    for( var m = 0; m < ll.length; m++){
		links[links.length] = ll[m];
	    }
	}
    }
    return links;
}

// Function to handle the keypress events
function LinkKey(event) {

    var links = GetVisibleMessageLinks();
    if(!links) { return; }

    // Get the key pressed in string format
    var k = String.fromCharCode(event.which);
    // Check to see if it fits our range
    if (k >= "0" && k <= "9" && controlkey){
	var link = links[k];
	if(link){
	    GM_openInTab(link.href);
	}
	event.stopPropagation();
    }
    if (k == "l"){
	if(controlkey){
	    LabelLinks(links);
	    controlkey = 0;
	}else{
	    controlkey = 1;
	}
    }
    if (k != "l" && controlkey){
	controlkey = 0;
    }
}

// Add listener for to handle the keypress events.
document.addEventListener("keypress", LinkKey, true);
