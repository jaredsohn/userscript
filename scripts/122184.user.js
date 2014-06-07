// ==UserScript==
// @name          Flickr DMU Stupidity filter v2.2
// @description	  removes stupid comments by stupid people - updated w/ xdrei's trolls
// @namespace     http*://www.flickr.com/photos/blogdog/
// @include       http*://*flickr.com/groups/d_m_u/*
// @exclude       http*://*flickr.com/messages_write.gne*
// ==/UserScript==

function init() {
	//add to the list below with commas, 
	//eg var	ignorelist='http://www.flickr.com/photos/60053005@N00/,http://www.flickr.com/photos/eschimmel/,etc.'
	var	ignorelist='http://www.flickr.com/photos/harborcaroline/,http://www.flickr.com/photos/casiocasiocasio/,http://www.flickr.com/photos/x3l/,http://www.flickr.com/photos/73534571@N06/,http://www.flickr.com/photos/xdrei/'
	
	var comments = document.evaluate("//td[@class='Who']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);

	for (i=0; i< comments.snapshotLength; i++) {
		var who = comments.snapshotItem(i);
		var shutup = who.getElementsByTagName('a')[0].href;

		if (ignorelist.search(shutup) > -1) {	
			who.parentNode.parentNode.removeChild(who.parentNode);
		}
	}

	var threads = document.evaluate("//table[@class='TopicListing']//img[@class='absmiddle']/parent::*",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);

	for (i=0; i< threads.snapshotLength; i++) {
		var who = threads.snapshotItem(i);
		var shutup = who.href;
		if (ignorelist.search(shutup) > -1) {
			who.parentNode.parentNode.parentNode.removeChild(who.parentNode.parentNode);
		}
	}
}

init();