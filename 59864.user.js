// 
// version 0.3 BETA!
// 2009-10-14
// Copyright (c) 2009, Splitted-Desktop Systems
// Author Frederic Lepied <frederic.lepied@splitted-desktop.com>
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Touchscreen
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   always find a link to follow
// @include       *
// ==/UserScript==

//GM_log('Touchscreen gm script loaded');

document.addEventListener('click', function(event) {
	GM_log('Type name: '+event.target.tagName);
	switch (event.target.tagName) {
	case 'A':
	case 'INPUT':
	case 'TEXTAREA':
	case 'SELECT':
	case 'OPTION':
	    break;
	default:
	    {
	    var allAnchors, theURL, object, oRect, x, y, max, dist;

	    max = 100000000;
	    theURL = location.href;
	    
	    allAnchors = document.getElementsByTagName('A');
	    //GM_log('number links '+allAnchors.length);
	    for (var i = 0; i < allAnchors.length; i++) {
		object = allAnchors[i];
		oRect = object.getBoundingClientRect();

		x = (oRect.right + oRect.left) / 2;
		y = (oRect.bottom + oRect.top) / 2;

		dist = (event.clientX - x) * (event.clientX - x) + (event.clientY - y) * (event.clientY - y);

		if (dist < max) {
		    max = dist;
		    theURL = object.href;
		}
	    }
	    //GM_log('end loop ' + theURL);
	    window.location.href = theURL;
	    return false;
	    }
	}
    }, false);
