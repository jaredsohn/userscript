// ==UserScript==
// @name           DIYAudio.ru links corrector
// @namespace      DIYAudioruLinks
// @description    Correct those stupid forum links
// @include        http://www.diyaudio.ru/forum/*
// ==/UserScript==

	var links = document.evaluate("//a[contains(@href, 'http://www.diyaudio.ru/forum/go.php?url=')]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = links.snapshotLength - 1; i >= 0; i--) {
		var a = links.snapshotItem(i);
		a.href = a.href.replace('http://www.diyaudio.ru/forum/go.php?url=', '');
	}
