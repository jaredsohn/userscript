// ==UserScript==
// @name Direct torrent download from extratorrent.com 
// @namespace http://
// @include http://extratorrent.com*
// ==/UserScript==

	var links = document.evaluate(
	"//a[contains(@href, 'torrent_download')]",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < links.snapshotLength; i++) 
	{
		var link = links.snapshotItem(i);
		link.href = link.href.replace("torrent_download","download");
	}