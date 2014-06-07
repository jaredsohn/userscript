// ==UserScript==
// @name           Google SearchWiki Comment View Link
// @namespace      http://hacsoft.org/projects/greasemonkey/
// @description    Adds a link to the TOP of Google searches to display the SearchWiki comments page for that search, instead of scrolling all the way to the bottom.
// @include        http://*google.com/search*
// ==/UserScript==

var results = document.getElementById('res');

if (results) {
	var loc = new String(document.location);
	if (loc.search("swm=2") == -1) {
		var comLink = document.createElement('div');
		comLink.innerHTML = "<small><a href='"+document.location +"&swm=2'>View SearchWiki Comments</a></small>";
		comLink.setAttribute('style', 'float:right');
		results.parentNode.insertBefore(comLink, results);
	}
}