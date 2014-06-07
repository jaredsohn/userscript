// ==UserScript==
// @name           Scrub Google Redirect Links
// @namespace      http://www.zooomr.com/photos/ping/
// @description    Removes the Google redirect in search result links.
// @include        http://www.google.com/search?*
// @include        https://www.google.com/search?*
// @include        https://encrypted.google.com/search?*
// @include        http://*.google.*/*q=*
// @include        https://*.google.*/*q=*
// ==/UserScript==
(function() {

	// add timeout to delay scrubs, Google seems to be using script to load those mousedowns -- sneaky!
	setTimeout(function() {

		// kill off the rwt for good so that it will work with Google Instant
		unsafeWindow.rwt = function() {
			return true;
		}

		// otherwise, wipe mousedowns
		var redirectLinks = document.evaluate(
			"//a[@class='l']"
			, document
			, null
			, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
			, null);
		
		if (typeof redirectLinks != 'undefined' && redirectLinks.snapshotLength > 0) {
			for (var i = 0; i < redirectLinks.snapshotLength; i++) {
				redirectLinks.snapshotItem(i).setAttribute('onmousedown','');
			} 
		}
		
	}, 500);
	
})()