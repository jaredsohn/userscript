// ==UserScript==
// @name           4chan All Boards Post Number Fixer
// @namespace      http://pseudochron.com
// @description    Restore full post numbers on ALL boards of 4chan
// @include http://boards.4chan.org/*
// ==/UserScript==



if (String(window.location).match("/res") ) {
	var snapResults = document.evaluate("//a[@class='quotejs'][contains(@href, 'quote')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for ( var i=0 ; i < snapResults.snapshotLength; i++ ) {
		var a = snapResults.snapshotItem(i);
		var post_id = a.getAttribute("href").match(/quote\(\'(\d+)/)[1];
		a.textContent = post_id;
	}
	
} else {
	var snapResults = document.evaluate("//a[@class='quotejs'][contains(@href, '#q')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for ( var i=0 ; i < snapResults.snapshotLength; i++ ) {
		var a = snapResults.snapshotItem(i);
		var post_id = a.getAttribute("href").match(/#q(\d+)/)[1];
		a.textContent = post_id;
	}
}