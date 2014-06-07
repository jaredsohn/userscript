// ==UserScript==
// @name	NYT Spoof Links
// @namespace	http://shiwej.com/devcenter/
// @description	Rewrites New York Times links so that you don't need to login
// @include	*
// @exclude http://www.google.com/*
// @exclude http://news.google.com/*
// ==/UserScript==

(function() {
	if (document.domain == 'nytimes.com' | document.domain == 'www.nytimes.com' | document.domain == 'tech.nytimes.com') {
		var xpath = "//a[starts-with(@href,'/')] | //a[starts-with(@href,'http://www.nytimes.com/')] | //a[starts-with(@href,'http://tech.nytimes.com/')]";
	} else {
		var xpath = "//a[starts-with(@href,'http://www.nytimes.com/')] | //a[starts-with(@href,'http://nytimes.com/')]  | //a[starts-with(@href,'http://tech.nytimes.com/')]";
	}
	var res = document.evaluate(xpath, document, null,
	                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	var i, link;
	for (i = 0; link = res.snapshotItem(i); i++) {
		var lead_slashes = link.href.indexOf("//");
		if(lead_slashes > 0) {
			var domain_start = lead_slashes + 2;
			var without_resource = link.href.substring(domain_start, link.href.length);
			link.href = 'spoof://'+without_resource + ';ref://www.google.com';
		} else {
			var without_resource = link.href;
			link.href = 'spoof://www.nytimes.com'+without_resource + ';ref://www.google.com';
		}
	}
})();

// vim: set ts=2 sw=2 :