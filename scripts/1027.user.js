// ==UserScript==
// @name		Disable Targets For Downloads
// @namespace		http://www.rhyley.org/
// @description		Disable target/onclick for any link to a binary file.
// @include		http://*
// ==/UserScript==

/** licenced under a Creative Commons Attribution-NonCommercial-ShareAlike 2.0
 ** http://creativecommons.org/licenses/by-nc-sa/2.0/
 **
 ** Code by:
 ** Jason Rhyley - jason AT rhyley DOT org - www.rhyley.org
 **
 ** This is a greasemonkey script, intended for use with the Firefox extension Greasemonkey.
 ** More info: http://greasemonkey.mozdev.org/
 **/

(function () {
	
	// Add new file extensions to this regex to disable targets for them
	var exp = new RegExp("(\.zip|\.rar|\.exe|\.tar|\.jar|\.xpi|\.gzip|\.gz|\.ace|\.bin|\.ico|\.jpg|\.gif|\.pdf)", "i");
	linksToFix = document.evaluate("//a[@onclick] | //a[@target]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	for (var i = 0; i < linksToFix.snapshotLength; i++) {
	    a = linksToFix.snapshotItem(i);
	    if (exp.exec(a.href)) {
		a.setAttribute("target", "");
		a.setAttribute("onclick", "");
	    }
	}

})();