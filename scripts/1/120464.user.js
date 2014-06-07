// ==UserScript==
// @name          Flickr DMU Stupidity filter v3
// @description	  Removes comments and threads by stupid people at Flickr DMU group.
// @namespace     http://www.flickr.com/photos/good-karma/
// @include       http*://*flickr.com/groups/censorshipsucks/*
// @exclude       http*://*flickr.com/messages_write.gne*
// ==/UserScript==

(function(){
	
	function evaldoc(value) {
		return document.evaluate(value,
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null); 
	}

	//add to the list below with commas, 
	//eg var	ignorelist='http://www.flickr.com/photos/60053005@N00/,http://www.flickr.com/photos/eschimmel/,etc.'
	var	ignorelist = 'http://www.flickr.com/photos/harborcaroline/,http://www.flickr.com/photos/casiocasiocasio/,http://www.flickr.com/photos/60053005@N00/'
	
	var comments = evaldoc("//td[@class='Who']");

	for (i=0; i< comments.snapshotLength; i++) {
		var who = comments.snapshotItem(i);
		var shutup = who.getElementsByTagName('a')[0].href;

		if (ignorelist.search(shutup) > -1) {	
			who.parentNode.parentNode.removeChild(who.parentNode);
		}
	}

	var threads = evaldoc("//table[@class='TopicListing']//img[contains(@class,'absmiddle')]/parent::*");

	for (i=0; i< threads.snapshotLength; i++) {
		var who = threads.snapshotItem(i);
		var shutup = who.href;
		if (ignorelist.search(shutup) > -1) {
			who.parentNode.parentNode.parentNode.removeChild(who.parentNode.parentNode);
		}
	}

})();

