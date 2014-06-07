// HighlightCountries
// $Revision: 7 $
// 2005-05-22
// Copyright (c) 2005, Michael Strasser
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
// select "HighlightCountries", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          HighlightCountries
// @namespace     http://relativelyignorant.net
// @description   Highlight result lines that refer to riders from specified
//                countries in cyclingnews.com pages
// @include       http://*.cyclingnews.com/*
// ==/UserScript==
//
// --------------------------------------------------------------------
//
(function() {

	var prenodes, i, node, key, html;
	
	// Specify the country abbreviations and highlight CSS styles.
	var styles = {
		"Aus" : "background-color: #006600; color: #FFFFAA; font-weight: bold;",
		"USA" : "background-color: #FFCCCC; color: #000066;",
		"Ita" : "background-color: #99CCFF; color: #660000;",
		"NZl" : "background-color: #999999; color: #FFFFFF;"
	};
	// Create regular expressions for the same countries.
	// They search for whole lines that contain the country abbreviation
	// in parentheses, excluding the surrounding newline characters.
	// On Windows the lines are surrounded by \r\n sequences, so exclude both.
	var regex = {};
	for (key in styles) {
		regex[key] = new RegExp("[^\\n]+\\(" + key + "\\)[^\\r\\n]+", "ig");
	}
	
	// Result lines are all in <pre> nodes.
	prenodes = document.evaluate(
		"//pre",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);

	for (i = 0; i < prenodes.snapshotLength; ++i) {
		node = prenodes.snapshotItem(i);
		html = node.innerHTML;
		// Replace the searched-for line with a highlighted version of it.
		for (key in styles) {
			html = html.replace(
				regex[key],
				"<span style='" + styles[key] + "'>$&</span>"
			);
		}
		node.innerHTML = html;
	}

})();


