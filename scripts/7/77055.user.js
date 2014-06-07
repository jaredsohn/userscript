// A little script to get turn the XXX on the post numbers back into 
// the actual post numbers on 4chan.
//
// Author:  Spick and Span/ other internet d00dz
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
// select "4Chan remove XXX firefox or chrome", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          4Chan remove XXX firefox or chrome
// @namespace     http://boards.4chan.org/*
// @description   Turn the XXX on the post numbers back into the actual post numbers on 4chan.
// @include       http://boards.4chan.org/*
// ==/UserScript==

var allSpans, thisSpan;
allSpans = document.getElementsByTagName('span');
for (var i = 0; i < allSpans.length; i++) {
    thisSpan = allSpans[i];
    if (thisSpan.id.length > 5)
    {
	  if (thisSpan.id.substr(0,8)=="nothread")
	    {
		thisSpan.childNodes[1].innerHTML = thisSpan.id.substr(8);
	    }

    	  if (thisSpan.id.substr(0,5)=="norep")
	    {
		thisSpan.childNodes[1].innerHTML = thisSpan.id.substr(5);
	    }
	}
}

