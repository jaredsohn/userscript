// favicious
// version 2.1
// 2006-10-15
// Copyright (c) 2006, Vasco Flores
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
 // based on John Morton's fav.icio.us
//
// ==UserScript==
// @name fav.icio.us2
// @namespace	http://vasco.flores.googlepages.com/
// @description	A script to add favicons next to posted links on del.icio.us 
// @include	http://del.icio.us/*
// @exclude	http://del.icio.us/rss/*
// ==/UserScript==


/* based in fav.icio.us 2006-02-02 by John Morton
 * namespace http://angrymonkey.net.nz/
 */

(function(){

// apply the function to each element matched by the path
function forEachMatch(path, f, root) {
	var el;
	var root = (root == null) ? document : root;
	var matches = root.evaluate(
		path, root, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; el=matches.snapshotItem(i); i++)
		f(el);
}

// adds the link favicon before itself
function add_favicon(link) {
	var favicon = document.createElement('img');
	favicon.src = "http://" + link.hostname + "/favicon.ico";
	favicon.width = 16;
	favicon.style.marginRight = "1ex";
	link.parentNode.insertBefore(favicon, link);
}

// apply to all recent links, popular and your bookmarks
forEachMatch(
	"//li[contains(@class, 'post')]/h4[@class='desc']/a | "+
	"//div[@id='curated']/ol/li/ol/li/a",
	add_favicon);
}())
