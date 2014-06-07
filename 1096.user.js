/*
 Bloglines Fark Comments
 version 0.1
 2005-04-08
 Copyright (c) 2005, Steven Chai (email: gm AT yankovic DOT org )
 Released under the GPL license
 http://www.gnu.org/copyleft/gpl.html

 This is a Greasemonkey user script.
 http://greasemonkey.mozdev.org/

*/

// ==UserScript==
// @name          Bloglines Fark Comments
// @description   Add links to the fark comments as [c] next to the titles
// @include       http://bloglines.com/myblogs_display*
// @include       http://www.bloglines.com/myblogs_display*
// @include       http://bloglines.com/preview*
// @include       http://www.bloglines.com/preview*
// ==/UserScript==

(function() {
	var xpath = "//a[starts-with(@href, 'http://go.fark.com/cgi/fark/go.pl?')]";
	var as = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for ( var i=0, a=null; a=as.snapshotItem(i); i++ ) {
		var result = a.search.match( /IDLink=(\d+)/ );
		if (result != null) {
			var idLink = result[1];
			var c = document.createElement('a');
			c.setAttribute('href', 'http://forums.fark.com/cgi/fark/comments.pl?IDLink='+idLink);
			c.setAttribute('target', a.target);
			c.setAttribute('title', 'Fark Comments');
			c.appendChild(document.createTextNode('[c]'));
			a.parentNode.insertBefore(c, a.nextSibling);
			a.parentNode.insertBefore(document.createTextNode(' '), a.nextSibling);
		}
	}
})();


