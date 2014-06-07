// ==UserScript==
	// @name		 Disable Targets For Downloads
	// @namespace	 http://www.rhyley.org/
	// @description  Don't open a new window on links to binary files
	// @include      http://*
	// ==/UserScript==

	// based on code by Jason Rhyley
	// and included here with his gracious permission

	// Add other file extensions here as needed
	var oExp = new RegExp("(\.zip|\.rar|\.exe|\.tar|\.jar|\.xpi|\.gzip|" +
	    "\.gz|\.ace|\.bin|\.ico|\.jpg|\.gif|\.pdf)$", "i");
	var snapLinks = document.evaluate("//a[@onclick] | //a[@target]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < snapLinks.snapshotLength; i++) {
		var elmLink = snapLinks.snapshotItem(i);
		if (elmLink.href && oExp.exec(elmLink.href)) {
			elmLink.target = '';
			elmLink.addEventListener('click', function(e) {
			    e.stopPropagation();
				e.preventDefault();
			}, true);
		}
	}