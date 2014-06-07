// ==UserScript==
// @name        Full URLs for Twitter
// @namespace   http://userscripts.org/users/121120
// @description Replace t.co URLs with the orignal
// @include     twitter.com
// @match       *://*.twitter.com/*
// @version     1.3
// @grant       none
// ==/UserScript==
(function (win) {
	var main = function () {
		Array.prototype.slice.call(win.document.querySelectorAll('#page-container a.twitter-timeline-link[href*="t.co"]'), 0) .forEach(function (el) {
			if (el.dataset && el.dataset.expandedUrl) {
				el.href = el.dataset.expandedUrl;
			}
		});
	};
	main();
        win.onscroll = main;
}) (window);