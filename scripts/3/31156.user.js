// ==UserScript==
// @name fav.icio.us3
// @namespace	http://straylight.cz/userscripts/
// @description	A script to add favicons next to posted links on delicious.com
// @include	http://delicious.com/*
// @include http://www.delicious.com/*
// @version	3.0.1
// @date	
// ==/UserScript==
// Copyright (c) 2008, Vasco Flores, syntax
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// based on John Morton's fav.icio.us
//

/* based on fav.icio.us2 from 2006-10-15 by Vasco Flores
 * namespace http://vasco.flores.googlepages.com/
 */
/* based on fav.icio.us 2006-02-02 by John Morton
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
	favicon.setAttribute("style", "float: left; margin-right: 1ex; border: 0;");
	link.parentNode.insertBefore(favicon, link);
}

// apply to all recent links, popular and your bookmarks
forEachMatch(
	"//li[contains(@class, 'post')]//h4/a[1]",
	add_favicon);
}())
