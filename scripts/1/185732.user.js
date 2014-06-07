// ==UserScript==
// @name       EksiBetaSpoilerGizleme
// @version    31.0
// @description  Spoiler Gizleme
// @match      http://userscripts.org/scripts/review/75945
// @copyright  2013+, emirwashere
// @include        http://www.eksisozluk.com/*
// @include        http://eksisozluk.com/*
// @include        https://www.eksisozluk.com/*
// @include        https://eksisozluk.com/*

// ==/UserScript==




window.addEventListener(
	'load',
	function() {
		var entries = document.evaluate("//li", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < entries.snapshotLength; i++) {
			if (entries.snapshotItem(i).innerHTML.match(/--- spoiler ---/)) {
				entries.snapshotItem(i).innerHTML = "<button class=\"but\" onclick=\"document.getElementById('" + entries.snapshotItem(i).id + "').innerHTML=unescape('" + escape(entries.snapshotItem(i).innerHTML) + "')\";>spoiler   -görmek için tıklayın-</button>";
			}
            else if (entries.snapshotItem(i).innerHTML.match(/>spoiler</)) {
				entries.snapshotItem(i).innerHTML = "<button class=\"but\" onclick=\"document.getElementById('" + entries.snapshotItem(i).id + "').innerHTML=unescape('" + escape(entries.snapshotItem(i).innerHTML) + "')\";>spoiler   -görmek için tıklayın-</button>";
			}
	 	}
	},
false);