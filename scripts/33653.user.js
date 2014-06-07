// ==UserScript==
// @name           Google Reader Star Opener
// @namespace      http://www.sukechan.net/
// @description    Starred item open in a lump for Google Reader.
// @include        http://www.google.co.jp/reader/view/*
// @include        http://www.google.com/reader/view/*
// @version        1.0.2
// ==/UserScript==

(function() {
	var MAX_WINDOW_OPEN = 5;
	
	var onKeyDown = function(event) {
		if(event.keyCode == 79 && !event.shiftKey) {
			var entries = document.evaluate('//div[contains(concat(" ", @class, " "), " entry ")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for(var i = 0, m = MAX_WINDOW_OPEN; i < entries.snapshotLength && m > 0; i++) {
				var entry = entries.snapshotItem(i);
				var stars = document.evaluate('.//div[contains(@class, "item-star-active")]', entry, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if(stars.snapshotLength > 0) {
					var star = stars.snapshotItem(0);
					var links = document.evaluate('.//h2[@class="entry-title"]/a | .//div[@class="entry-main"]/a', entry, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					if(links.snapshotLength > 0) {
						var link = links.snapshotItem(0);
						var win = window.open(link.href);
						if(win && !win.closed) {
							m--;
							var event = document.createEvent('MouseEvents');
							event.initEvent('click', true, true);
							star.dispatchEvent(event);
						}
					}
				}
			}
		}
	}
	
	document.addEventListener('keydown', onKeyDown, false);
})();