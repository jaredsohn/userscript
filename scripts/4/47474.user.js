// ==UserScript==
// @name           StraightToReader
// @namespace      http://www.strongasanox.co.uk/greasemonkey
// @description    Bypasses the Add to Google page when subscribing to a feed and adds the feed straight to Google Reader
// @include        http://www.google.com/ig/add*
// ==/UserScript==

// 	Version 1 (2009-04-24)
// 		Bypasses the 'Add to iGoogle' or 'Add to Reader' page when subscribing to an RSS or Atom Feed
// 		and goes straight to the 'Add to Reader' page.
//
// 	Version 1.1 (2009-06-23)
//		Fixed bug where the auto-forwarding was not working if the user was not currently
//		logged into their Google account
(function() {
	window.addEventListener('load', function() {
		var readerLinks = xpath('//a[starts-with(@href, "http://www.google.com/ig/addtoreader")]');
		if (readerLinks) {
			if (readerLinks.snapshotLength === 0) {
				readerLinks = xpath('//a[starts-with(@href, "https://www.google.com/accounts/ServiceLogin?service=reader")]');
			}
			
			if (readerLinks.snapshotLength === 1) {
				var item = readerLinks.snapshotItem(0);
				window.location = item.href;
			}
		}
	}, true);
	
	function xpath(query) {
	    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}
})();