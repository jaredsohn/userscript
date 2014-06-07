// ==UserScript==
	// @name Web Bug Detector
	// @namespace http://diveintomark.org/projects/greasemonkey/
	// @description make web bugs visible
	// @include *
	// ==/UserScript==

	var snapImages = document.evaluate("//img[@width='1'][@height='1']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = snapImages.snapshotLength - 1; i >= 0; i--) 
		var elmImage = snapImages.snapshotItem(i);
		var urlSrc = elmImage.src;
		var urlHost = urlSrc.replace(/^(.*?):\/\/(.*?)\/(.*)$/, "$2");
		if (urlHost == window.location.host) continue;
		elmImage.width = '80';
		elmImage.height = '80';
		elmImage.title = 'Web bug detected! src="' + elmImage.src + '"';
		elmImage.src ="data:image/png;base64,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");

