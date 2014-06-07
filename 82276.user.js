// ==UserScript==
// @name           A Beacon.
// @namespace      reddit:akx
// @include        http://www.reddit.com/*
// ==/UserScript==

(function($) {
	if($) {
		var goldenEntries = $("a.subreddit:contains(lounge)").parents(".thing");
		if(goldenEntries.length) {
			goldenEntries.addClass("lounge-entry");
			$("head").append("<style type='text/css'>.lounge-entry{background:#fefade;border:1px solid #fbdb24;padding:5px 0}</style>");
		}
	}
})(unsafeWindow.jQuery);