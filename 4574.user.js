// Marquee Remover
// version 0.1
// 2006-10-15
// Copyright (c) 2006, Vasco Flores
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Myspace Marquees Remover
// @namespace     http://vasco.flores.googlepages.com/
// @include       http://myspace.com/*
// @include       http://*.myspace.com/*
// @description   Removes stupid marquees that do disabling some buttons below
// @exclude

// ==/UserScript==
(function() {

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

// remove all marquees
forEachMatch(
	"//marquee",
	function(e){e.parentNode.removeChild(e);});
})();

