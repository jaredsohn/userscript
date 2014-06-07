// iFilm Launcher
// Version: 0.11
// Release: 04.03.2005
// Contact: justin.j.novack at acm dot org
// License: http://creativecommons.org/licenses/by-sa/2.0/
//
// Like my script? Found a bug? Email me...
//
// Changes: javascript:launchPlayer('#######', 'default','default','ifilm');
//      to: http://www.ifilm.com/media/getmetafile.asx?pinfo=ipt:viral|fid:#######|mt:asf|bw:200
//
//     and: javascript:top.playFilm(#######,200,5);
//      to: http://www.ifilm.com/media/getmetafile.asx?pinfo=ipt:viral|fid:#######|mt:asf|bw:200
//
// Changelog:
//  0.11 - 04/03/2005
//         Minor cosmetic updates
//  0.1  - 03/26/2005
//         Initial version
//
// ==UserScript==
// @name       	iFilmLauncher
// @namespace   http://scripts.slightlyinsane.com/
// @description (v0.11) Rewrites iFilm hrefs to bypass javascript player.  Makes link to direct ASX stream for playing in your favorite player.
// @include     http://www.ifilm.com/*
// ==/UserScript==


(function() {
    for (var i=1; i<document.links.length; i++) {
	sLink = document.links[i].href;
	iFound = sLink.lastIndexOf('avascript:');
     	if (iFound > 0) { 
		// If "avascript" is found in the link
		var myRegEx = /(\d){7}/;
		iFound = sLink.search(myRegEx);
		if (iFound > 0) {
			// Replace all javascript links with 7 numbers with the direct link
			iPos = sLink.search(myRegEx);
			// alert(sLink.substring(iPos, iPos+7));  // To test, prints 7-digit film ID
			sURL = sLink.substring(iPos, iPos+7);
			document.links[i].href = unescape("http://www.ifilm.com/media/getmetafile.asx?pinfo=ipt:viral|fid:"+sURL+"|mt:asf|bw:200");
		}
	}
    }
})();
