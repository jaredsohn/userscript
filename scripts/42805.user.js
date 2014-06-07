// Convert dA outbound links
// version 0.1 BETA
// Copyright (c) 2009, Mazakala
// Released under the GPL license
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
//
// Notice:
//
// By using this script you're bypassing deviantART's security measures. 
// The author of this script doesn't take any responsibility for
// the viruses you catch or the scams you fall for while using this script. 
//  
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Convert dA outbound links
// @namespace     http://mazakala.deviantart.com/
// @description   skips the annoing outbound link nagscreen by converting "outbound links" to normal links
// @include       http://*.deviantart.com*
// ==/UserScript==


// collect teh mudkips
var allLinks = document.getElementsByTagName('a');

// fap fap fap
for(var i=0; i < allLinks.length; i++) {
    // check and replace bad mudkips with nothingness
        allLinks[i].href = allLinks[i].href.replace('http://www.deviantart.com/users/outgoing?','');
}

// Peace & love! ~ mazakala