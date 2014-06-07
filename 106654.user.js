// ==UserScript==
// @name           Slashdot RSS - Full Comments
// @namespace      http://interneta.org
// @description    Displays full comments (well, up to 420 chars or so) instead of a single line in Slashdot's RSS, eliminating the need to click to expand them (and the subsequent loading wait).  The comments appear embedded in readers with IFRAME support, like Goo^H^H^H <a href="http://cloud.feedly.com/#subscription%2Ffeed%2Fhttp%3A%2F%2Frss.slashdot.org%2FSlashdot%2Fslashdot">Feedly</a> (which added IFRAME support recently).  You can test it <a href="http://slashdot.org/slashdot-it.pl?op=discuss&id=2315532&smallembed=1">here</a>.
// @icon           http://slashdot.org/favicon.ico
// @include        http://slashdot.org/*&smallembed=1*
// @include        https://slashdot.org/*&smallembed=1*
// @include		   http://cloud.feedly.com/*
// @include		   http://cloud.feedly.com/#subscription%2Ffeed%2Fhttp%3A%2F%2Frss.slashdot.org%2FSlashdot%2Fslashdot
// @grant	       GM_addStyle
// @grant          GM_log
// @version        1.2 - 2013-08-28

/* Revision history
	1.0 - 2011-07-11 Chemtox <chemtox.slfc@interneta.org>
		 * Initial release.

	1.1 - 2013-08-17 Chemtox <chemtox.slfc@interneta.org>
		* Shed one last tear for Google Reader.
		* Increased IFRAME size in Feedly.

	1.2 - 2013-08-17 Chemtox <chemtox.slfc@interneta.org>
		* Applied IFRAME size to all of Feedly to avoid having to reload if you don't open Slashdot's feed directly (damn ninjas and their AJAX loading), or if you read Slashdot in a Category view.

*/
// ==/UserScript==
GM_log(document.location.host);

(function() {
	var css = '';

	if (document.location.host.indexOf("feedly.com") >= 0) {
		// Increase the IFRAME size in Feedly
		css = ".entryBody iframe { height: 400px; width: 100%; }\n";

	} else {
		css = 
			// Remove the height limit and improve appearance
			"body.slashdot-it #commentlisting > li.oneline {\n"+
			"    height: auto !important;\n"+
			"    padding: 5px !important;\n"+
			"    line-height: 20px !important;\n"+
			"}\n"+
			// Highlight hyperlinks
			".oneline > div > .commentBody a { color: #006666 !important; }\n";
	}

	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}
})();
