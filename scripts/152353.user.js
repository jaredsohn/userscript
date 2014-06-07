// ==UserScript==
// @name           Remove inline lyrics protection (metrolyrics,etc.)
// @version        1.0
// @include        http://www.metrolyrics.com/*
// @include        http://www.lyricsfreak.com/*
// @include        http://www.lyricsmode.com/*
// ==/UserScript==

	var snapshot;
	
	var metrolyrics = document.evaluate('//span[contains(@style, "888888")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<metrolyrics.snapshotLength; i++) {
		snapshot = metrolyrics.snapshotItem(i);
		snapshot.parentNode.removeChild(snapshot); }
	
	var lyrics_freakmode = document.evaluate('//span[@class="b-lyrics-from-signature"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<lyrics_freakmode.snapshotLength; i++) {
		snapshot = lyrics_freakmode.snapshotItem(i);
		snapshot.parentNode.removeChild(snapshot); }