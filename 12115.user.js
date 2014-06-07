
// EUR2DKK
// version 1.0
// 2007-09-06
// Copyright (c) 2009, Jan Normann Nielsen
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Butler", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// Replaces all prices in EUR by approximate prices in DKK on
// all pages under www.axelmusic.com.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            AxelMusic EUR2DKK
// @namespace       http://www.videogramforeningen.org/
// @description     Replace EUR prices with approximate DKK prices on AxelMusic website. In your face, Dansk Videogram-Forening!
// @include         http://www.axelmusic.com/*
// ==/UserScript==
	

(function() {
	var node, s, match, dkk;

	var regexps = [ /\u20AC[^\d]+(\d+[\\.,]\d+)/, /(\d+[\\.,]\d+)[^\d]+\u20AC/, /(\d+[\\.,]\d+)[^\d]+EUR/, /EUR[^\d]+(\d+[\\.,]\d+)/ ];
	var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < textnodes.snapshotLength; i++) {
		node = textnodes.snapshotItem(i);
		s = node.data;
		for (var j = 0; j < regexps.length; j++) {
			match = s.match(regexps[j]);
			if (match != null) {
				dkk = parseFloat(match[1].replace(',','.')) * 7.45;
				node.data = "DKK " + dkk.toFixed(0);
				break;
			}
		
		}
	}

})();
