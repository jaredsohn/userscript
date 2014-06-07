// ==UserScript==
// @name          TorrentSpy.com Direct Torrent Links
// @include       http://torrentspy.com/*
// @include       http://www.torrentspy.com/*
// @include       http://ts.searching.com/*
// @description   This script looks at the list of torrents at Torrent Spy (whether it is a category listing or search results) and changes the icon next to the torrent's name to a link to download the acutal torrent. This is easier than clicking the torrents name, then clicking the 'Download Torrent' graphic.
// ==/UserScript==

(function() {
	var links = document.links;
	var torrentId;
	var torrentInfo;
	for(i = 0; i < links.length; i++) {
		link = links[i];
		if(link.href.match(/\/torrent\//) && link.getAttribute('title') == 'Download Torrent') {
			torrentInfo = /torrent\/(\d{1,9})/.exec(link.href);
			torrentId = torrentInfo[1];
			link.href = 'http://www.torrentspy.com/download.asp?id=' + torrentId;
		}
	}
})();
