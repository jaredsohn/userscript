// ==UserScript==
// @name           swinguru_noframe_links
// @namespace      http://night.fears.org/swinguru
// @description    makes links point to swinguru pages without banner
// @include        http://forum.swinguru.co.il/*
// @include        http://www.forum.swinguru.co.il/*
// ==/UserScript==
(function () {	var xpath = "//a[starts-with(@href, 'http://www.forum.swinguru.co.il/link.php?url=') or starts-with(@href, 'link.php?url=') or starts-with(@href, 'http://forum.swinguru.co.il/link.php?url=')]";
	var as = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	
	for(var i=0; i<as.snapshotLength; i++) {
		var a = as.snapshotItem(i);
		var link = a.href.match(/^(?:http:\/\/(?:www\.)?forum\.swinguru\.co\.il\/|\/?)link\.php\?url=(.*)$/);		a.href = link[1];
	}
})();