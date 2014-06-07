// ==UserScript==
// @name           Twitter Google Maps Link
// @namespace      http://www.sukechan.net/
// @description    Location is convert into the link to Google Maps.
// @include        http://twitter.com/*
// @version        1.0.2
// ==/UserScript==

(function() {
	var f = function() {
		var x = document.evaluate('//*[@class="entry-title entry-content"] | //*[@class="entry-content"] | //*[@class="entry_content"] | //div[@class="desc"]/descendant::p[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < x.snapshotLength; i++) {
			var idx = x.snapshotItem(i).textContent.indexOf("L:")
			if (idx >= 0) {
				loc = x.snapshotItem(i).textContent.substr(idx + 2).split(/\s+/)[0].replace(/[\n\r\s]/g, "");
				x.snapshotItem(i).innerHTML = x.snapshotItem(i).innerHTML.replace(loc, "<a href='http://maps.google.co.jp/maps?f=q&hl=ja&z=16&q=" + encodeURIComponent(loc) + "' target='_blank'>" + loc + "</a>");
			}
		}
	}
	f();
	addFilter(f);
	function addFilter(filter, i) {
		i = i || 4;
		if (window.AutoPagerize && window.AutoPagerize.addFilter) {
			window.AutoPagerize.addFilter(filter);
		}
		else if (i > 1) {
			setTImeout(arguments.callee, 1000, filter, i -1);
		}
	}
})();