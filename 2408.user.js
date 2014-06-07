// ==UserScript==
// @name          Real Punk MP3s
// @namespace     http://www.minitru.org/gm/
// @include       http://*.punkmusic.com/mp3s/*
// @description   Change the cumbersome download to something more sane.
// ==/UserScript==

/* This is a Greasemonkey script. It should work on pretty much any
   version of GM, but it's only been tested on the 0.6.x series for
   Firefox 1.5. You should upgrade.
   
   Version 0.1: Rewriting the URL from HTTP to FTP.
   
*/
   
/* Punkmusic.com tries to enforce that you understand you shouldn't be
   downloading MP3s without at least considering supporting the bands. Which
   is great and everything, but in the meantime, they've too many clicks
   to get the the wareezzzz.

   Note that many, many songs punkmusic.com claims to have aren't
   actually there, no matter how many clicks you save.
*/
   

(function() {
	var xpath = "//a[contains(@href,'showReleasemp3s')]";
  var regex = /http:\/\/www(.*)showReleasemp3s\.cfm\?iSongID=(\d+).*$/i;
	var allLinks, thisLink;
	
  allLinks = document.evaluate(
  	xpath,
   	document,
   	null,
   	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
   	null
   );
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i)
		// allLinks.snapshotItem(i) = 'http://www.example.com';
		thisLink.href = thisLink.href.replace(regex, "ftp://ftp$1$2.mp3");
		
		// thisLink.href.replace(regex, "$1");
		//GM_log('Saw: '+thisLink.href);
	}
})();