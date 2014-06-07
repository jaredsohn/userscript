// ==UserScript==
// @name                del.icio.us Reader
// @namespace      		http://www.strongasanox.co.uk/greasemonkey
// @description       	Allows Google Reader items to be added to del.icio.us
// @include             http://google.*/reader/*
// @include             http://*.google.*/reader/*
// ==/UserScript==


// Adapted from Google Reader + del.icio.us (uses the 'nodeInserted' function from http://userscripts.org/scripts/show/7957).
// All bugs are mine, and not Jordan Brock's

// Version 1 (2007-08-07)
// 		When 'Add to del.icio.us' is clicked, a psuedo-window is opened allowing
//		the user to save the current item to their del.icio.us bookmarks.
// 		Stores/retrieves the user's del.icio.us username using GM_setValue/GM_getValue
//		@TODO put an overlay over the page before showing the iframe holder
//
// Version 1.1 (2007-08-09)
//		Overlay added behind the del.icio.us psuedo-window to 'grey out' the Google Reader
//		display.
//
// Version 2.0 (2007-12-18)
//		Overlay removed and no longer requires the user's del.icio.us username.
//		Now acts like the 'post to del.icio.us' bookmarklet for the currently-being-read item.
(function() {
	
	var entries=document.getElementById("entries");
	entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);}, true);
	
	function nodeInserted(event){	
		if (event.target.tagName=="DIV"){
			try {
				if (event.target.className!=""){
					var linkbar;
					if (event.target.className=="entry-actions"){
						linkbar=event.target;
					}
					else if (event.target.firstChild && event.target.firstChild.className=="card"){
						linkbar=event.target.firstChild.firstChild.childNodes[2].
							childNodes[1].firstChild;
					}
					else
						return;
					var deliciousLink = document.createElement("a");
					deliciousLink.className="item-star star link";
					deliciousLink.innerHTML="Add to del.icio.us";
					deliciousLink.addEventListener("click", postBookmark, false);
					linkbar.appendChild(deliciousLink);
				}
			}
			catch(e){
				//GM_log(e);
			}
		}
	}
	
	function postBookmark(event) {
		var deliciousWin = window.open(buildUrl(), "deliciousWindow");
		deliciousWin.focus();
	}
	
	// builds the URL used for the iframe's src attribute using the current
	// item's title and href and the del.icio.us username of the current user.
	function buildUrl() {
		var current = document.getElementById('current-entry');
		var title = document.evaluate("//div[@id='current-entry']/div[@class='entry-container']/div[@class='entry-main']/h2[@class='entry-title']/a[@class='entry-title-link']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
				
			if (title.snapshotLength == 1) { // && deliciousUser != 'post') {
			var link = title.snapshotItem(0);
			return 'http://del.icio.us/post?v=4&url=' + encodeURIComponent(link.href) + '&title=' + encodeURIComponent(link.childNodes[0].nodeValue);
		}
		return 'http://del.icio.us/post/';
	}
})();
