// Tin Foil Hat
// version 0.2
// 2007-08-14
// Copyright (c) 2006, Albert Bachand
// Copyright (c) 2007, Yoan Blanc
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Tin Foil Hat", and click Uninstall.
//
// ----------------------------------------------------------------------------
//
// ==UserScript==
// @name          Tin Foil Hat
// @namespace     http://fivethreenine.blogspot.com/2006/03/tin-foil-hat.html
// @description   Reveals destination URLs hidden by TinyURL
// @include       *
// @exclude       http://tinyurl.com/*
// ==/UserScript==

links = document.evaluate(
	'//a[starts-with(@href,"http://tinyurl.com/")]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for(var i = 0; i < links.snapshotLength; i++) {
	(function(){
		var link = links.snapshotItem(i);
		GM_xmlhttpRequest({
			method:'GET',
			url:'http://remysharp.com/tinyurlapi?callback=&url=' + link.href,
			onload: function(o) {
				var new_href = o.responseText.substring(2,o.responseText.length-3);
				link.innerHTML = new_href
					.split("&").join("&amp;&#8203;")
					.split("%").join("%&#8203;")
					.split("/").join("/&#8203;");
				link.href = new_href;
			}
		});
	})();
}
