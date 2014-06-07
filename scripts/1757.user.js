/*
 Bloglines Fark Linker
 version 2
 2005-04-08
 Copyright (c) 2005, Steven Chai (email: gm AT yankovic DOT org )
 Released under the GPL license
 http://www.gnu.org/copyleft/gpl.html

 This is a Greasemonkey user script.
 http://greasemonkey.mozdev.org/

 2009-06-08 - Now works with new fark links
 
*/

// ==UserScript==
// @name          Bloglines Fark Linker
// @description   Add links to the article as [g] next to the titles
// @include       http://bloglines.com/myblogs_display*
// @include       http://www.bloglines.com/myblogs_display*
// @include       http://bloglines.com/preview*
// @include       http://www.bloglines.com/preview*
// ==/UserScript==

// old: http://forums.fark.com/cgi/fark/comments.pl?
//  new: http://www.fark.com/cgi/comments.pl?

(function() {	
	var xpath = "//h3/a[starts-with(@href, 'http://fk.com/')]";
	var as = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for ( var i=0, a=null; a=as.snapshotItem(i); i++ ) {
		
		var idLink = a.pathname.substr(1);
		if (idLink != null) {
			var g = document.createElement('a');
			g.setAttribute('href', 'http://www.fark.com/cgi/go.pl?i='+idLink);

			g.setAttribute('target', a.target);
			g.appendChild(document.createTextNode('[g]'));
			a.parentNode.insertBefore(g, a.nextSibling);
			a.parentNode.insertBefore(document.createTextNode(' '), a.nextSibling);
		}
	}
})();


