// ==UserScript==
// @name           Google Reader Subscription FullFeed
// @namespace      http://userscripts.org/users/40991
// @include        http://www.google.co.jp/reader/view/feed/*
// @include        http://www.google.com/reader/view/feed/*
// @unwrap
// ==/UserScript==

(function() {
	var feed = document.getElementById('auto-discovery');
	var fullfeed_link = "http://fulltextrssfeed.com/" + escape(feed.attributes.href.value);
	var btn = document.createElement('span');
	btn.innerHTML = "<a href=http://www.google.com/reader/view/feed/" + fullfeed_link + ">FullTextFeedで登録</a>";
	var elm = document.getElementById('viewer-container');
	elm.parentNode.insertBefore(btn, elm);
})();
