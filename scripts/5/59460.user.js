// ==UserScript==
// @name          YouTube Channel Playlist Linkifier
// @namespace     http://github.com/uky/greasemonkey
// @description   Changes plain text playlist names to link to their classic playlist pages.
// @version       0.2.6
// @author        Uky
// @include       http://www.youtube.com/*
// @match         http://www.youtube.com/*
// @exclude       http://www.youtube.com/watch?*
// @exclude       http://www.youtube.com/results?*
// ==/UserScript==

// A nice wrapper for XPath queries. Defaults to document root node.
function xpath(query, node) {
	return document.evaluate(query,
			typeof(node) !== 'undefined' ? node : document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
}

// Find playlist names and linkify them.
function linkify(event) {
	if (!event.target.id) {
		return;
	}

	// Only check relevant DOM updates otherwise the script can
	// become very slow.
	if (!event.target.id.match('-playlist-')) {
		return;
	}
	
	var title_nodes = xpath("//div[@class='playnav-playlist-header']/div[@class='title']");
	for (var i = 0; i < title_nodes.snapshotLength; ++i) {
		var node = title_nodes.snapshotItem(i);
		if (node.getElementsByTagName('a').length === 0) {
			var playlist_id = node.getAttribute('id').match('playnav-playlist-([0-9A-F]+)-title')[1];
			var playlist_name = xpath(".//text()", node).snapshotItem(0).nodeValue;
			node.innerHTML = "<a href='http://www.youtube.com/view_play_list?p=" + playlist_id + "'>" + playlist_name + "</a>";
		}
	}
}

// Install event listeners if we're on a user channel.
var channel_check = document.getElementById("channel-body");
if (channel_check) {
	document.addEventListener('DOMNodeInserted', linkify, false );
}
