// Will-Get Widgets v0.1
// Made By Luke Stevenson {http://www.lucanos.com/}
// Distributed and Maintained via GMVC
// Last updated: 05 December 2005
//
//   After enduring the less-than-perfect interface provided by the Yahoo!
// Widgets Repository, (which involves a redirecting page to download the
// widget file, which invariably redirects you to the begining of the
// collection after each download) for more than I could handle (5
// minutes), I decided that a GreaseMonkey solution was warranted.
//   This script reads each of the links on any page within the Yahoo!
// Widgets gallery and, upon finding a link to the despised redirect
// page, changes it to point to the actual download page which the
// redirect page fires off.
//   As such, you now have one-click downloads of all your favourite
// widgets!!
//
// ==UserScript==
// @name              Will-Get Widgets
// @namespace         http://gmvc.lucanos.com/
// @description       (v0.1) Replaces the troublesome redirecting download links for Konfabulator Widgets with direct links
// @include           http://widgets.yahoo.com/gallery/*
// ==/UserScript==

(function () {
	
	var linkRegExp = /dl\_r.php?widget=([0-9]+)(&platform=([w]+))*/ig;
	var matchCount = 0;
	
	for ( a = 0 ; a < document.links.length ; a++ ) {
    	var match = linkRegExp.exec(document.links[a].href);
    	if ( match ) {
			matchCount++;
      		document.links[a].href = "http://pix2.search.mud.yahoo.com/dl_a.php?widget="+match[1]+"&platform="+(match[3]?match[3]:"");
    	}
 	}
	
	// alert(matchCount+" links modified");
	
})();