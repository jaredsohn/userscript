// ==UserScript==
// @name           Highlight OP on 420chan
// @namespace      http://stupidkitties.com/
// @description    Highlights the OP's replies in 420chan comment threads
// @include        http://boards.420chan.org/*/res/*
// @version        1.0.3
// ==/UserScript==

// ================================================================================================
// This script highlights the OP's replies on 420chan comment pages (not the main board listings).
// It can be very easily adapted to function on other chan sites (in fact, all you should have to
// do for many of them is add the include), but:
// 
//  (1) I mainly read 420chan, so i wasn't really motivated to spend a lot of time on other sites;
// 
//  (2) several chan sites (including 4chan) use varying themes for different boards, which is
//      sort of irritating; and
// 
//  (3) i feel like 420chan's method of giving anonymous posters random names makes the script
//      work much better. Obviously highlighting every instance of 'Anonymous' isn't helpful.
// 
// That said, i have added some BASIC features that you can uncomment if you'd like to adapt this
// to other chan sites. I've noted them below (and they also use the multi-line comment things).
// 
// PS i'm not really a programmer at all, i'm only pretending, so don't make fun of me :(
// 
// PPS see bottom of file for licence
// 
//  ♥ ohkine
// ================================================================================================

// ================================================================================================
// CHANGE LOG:
// 1.0.3 — Re-versioned, minor documentation changes
// 1.0.2 — Initial public release
// 1.0.1 — NFR
// 1.0   — NFR
// ================================================================================================

// Get the OP's name from the first post and normalise spaces (useful for later).
var threadOPName = xpathToArray(xpath("//span[@class='postername']/text()"))[0].nodeValue.replace(/^\s*|\s(?=\s)|\s*$/g, "");

// Abort if the OP's name is 'Anonymous' and we're not on 420chan. Uncomment this if you're
// adapting the script for other chan sites that don't use 420chan's random-naming scheme.
/*
if ( (window.location.host != "boards.420chan.org") && (threadOPName == "Anonymous") ) { return; }
*/

// Create a CSS class for the OP's replies. Our 'highlighting' will be applied to this class.
// By default for 420chan this adds a (slightly) lighter background and a dark green border.
// *** CHANGE THIS IF YOU WOULD LIKE A DIFFERENT STYLE ***
if (window.location.host == "boards.420chan.org") {
	GM_addStyle(".opcomment { background-color: #555555 !important; border: 1px solid #1D855A !important; }");

// Uncomment the line(s) below and/or add your own if you're adapting this for other chan sites.
// You'll want to do this because obviously every board uses different colours, &c., and using
// the defaults will look ugly. (I just made up the ones below, you should change them.)
/*
} else if (window.location.host == "boards.4chan.org") {
	// tokenise the URL path
	boardPath = window.location.pathname.split( '/' );

	// Since 4chan uses different themes for 18+ boards, we'll probably want to apply different colours to them...
	if ( (boardPath[1] == 'b') || (boardPath[1] == 'gif') || (boardPath[1] == 'add more like this') ) {
		GM_addStyle(".opcomment { background-color: #FFFF00 !important; border: 1px solid #000000 !important; }");
	} else {
		GM_addStyle(".opcomment { background-color: #8090FF !important; border: 1px solid #000000 !important; }");
	}
*/
}

// XPath helper function
function xpath(path) {
	return document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Converts XPath snapshots (returned from the above helper function) to a standard array.
// If a function is provided for the second argument, it is processed on each snapshot
// before being entered into the array.
function xpathToArray(snapshots, process) {
	var xpathArray = [];
	for (var i = 0; i < snapshots.snapshotLength; i++) {
		xpathArray.push( process ? process(snapshots.snapshotItem(i)) : snapshots.snapshotItem(i) );
	}
	return(xpathArray);
}

// Find each instance of the OP's name in the comment headers, then add the CSS attribute from above to its 'grandparent'.
// (If we wanted to be super accurate about this, we would take the trip code into account as well,
//  but given how often people forget their trip codes or accidentally mistype them or whatever,
//  not to mention the added code complexity, i think this works well enough.)
xpathToArray(xpath("//span[@class='commentpostername' and normalize-space(text())='"+threadOPName+"']"),
	function(x) {
		if (window.location.host == "boards.420chan.org") {
			x.parentNode.parentNode.setAttribute("class", "reply opcomment");

		// Uncomment the line(s) below and/or add your own if you're adapting this for other chan sites and
		// the default doesn't look right. This works for 4chan:
		/*
		} else if (window.location.host == "boards.4chan.org") {
			x.parentNode.setAttribute("class", "reply opcomment");
		*/
		}
	}
);




/*
Copyright © 2010 ohkine

Re-distribution and use of this code in any form, with or without modification, are permitted,
with a VOLUNTARY Creative Commons 'Attribution' licence attached:

http://creativecommons.org/licenses/by/3.0/

What this means:

Feel free to use, re-use, re-distribute, modify, or sell this code — but please attribute it
to me (or to the URL you found it at) if you do. I won't get upset or come after you or anything
if you don't, but it'd be awfully nice of you!
*/
