// Free NYT Greasemonkey script
// version 0.2
// 2005-08-31
// 
// Copyright 2005, Richard Gibson
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Changelog:
// 0.2 (2005-08-31)
// 	changed registration-free link source to nytimes.blogspace.com (k0nrad.sobertillnoon.com was
// 		broken)
// 	added a userscripts.org namespace
// 0.1 (2005-08-15)
// 	original release
// 
// -------------------------------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// -------------------------------------------------------------------------------------------------
//
// ==UserScript==
// @name           Free NYT
// @namespace      http://userscripts.org/people/336
// @description    Redirects to free New York Times articles (but only when you are asked to login)
// @include        http://*.nytimes.com/*
// @include        http://nytimes.blogspace.com/genlink*
// @include        http://k0nrad.sobertillnoon.com/genlink/*
// ==/UserScript==

(function() {
	try {
		var loc = location.href.replace(/[%]3A/ig, ":").replace(/[%]2f/ig, "/");
		var i = loc.lastIndexOf("URI=");
		
		// navigate to the target if this is a NYT login page
		if (location.hostname.match(/nytimes\.com$/) != null && loc.indexOf("login") != -1 &&
				i != -1) {
			// http://nytimes.blogspace.com/genlink?redirect=1&q=
			// http://k0nrad.sobertillnoon.com/genlink/genlink.php?redirect=1&q=
			location.replace("http://nytimes.blogspace.com/genlink?redirect=1&q=" +
					encodeURIComponent(loc.substring(i + 4, ((loc.indexOf("&", i + 4) + 1) || Infinity)
					- 1)));
		}
		else if (location.hostname == "nytimes.blogspace.com" ||
				location.hostname == "k0nrad.sobertillnoon.com") {
			// navigate to the first "nytimes.com/yyyy/mm/dd/*" link
			var NYTLinks = document.evaluate("//a[contains(@href, 'nytimes.com')]", document, null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (i = 0; link = NYTLinks.snapshotItem(i); i++) {
				if (link.href.match(/nytimes\.com\/\d{4}\/\d{2}\/\d{2}\/./) != null) {
					location.replace(link.href);
					return;
				}
			}
		}
	} catch (ex) {}
})();
