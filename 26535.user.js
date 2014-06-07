// ==UserScript==
// @name           Google Reader: Auto Refresh
// @namespace      http://norman.rasmussen.co.za/googlereader
// @description    Automatically refreshes the feed list when new items appear
// @include        htt*://www.google.*/reader/view*
// ==/UserScript==

(function() {

	var intervalID;
	var lastUnread = 0;
	var reCount = /\((\d+)\)/;

	function checkReadCount()
	{
		var unread = document.getElementById('reading-list-unread-count').textContent;
		unread = reCount.exec(unread);
		if (unread != null)
			unread = parseInt(unread[1]);
		else
			unread = 0;
		if (unread != lastUnread)
		{
			var entries = document.getElementById('entries');

			var unreadEntries = document.evaluate(
				"count(div[contains(@class,'entry') and not(contains(@class,'read'))])",
				entries,
				null,
				XPathResult.NUMBER_TYPE,
				null).numberValue;

			if (unread != unreadEntries)
			{
				var e = document.createEvent('MouseEvents');
				e.initEvent('click', true, false);
				document.getElementById('viewer-refresh').dispatchEvent(e);
			}
		}
		lastUnread = unread;
	}

	if (window.top == window) {
		intervalID = window.setInterval(checkReadCount, 2000);
	}

})();
