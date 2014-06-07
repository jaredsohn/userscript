// ==UserScript==
// @name        c_ute_twitter
// @namespace   http://www.helloproject.com
// @include     https://twitter.com/*
// @version     1
// @grant       none
// ==/UserScript==

(function() {
	if (window.location.search.indexOf(encodeURI('ute')) != -1) {
		var f = function() {
			$('#stream-items-id > li').each(function() {
				if ($(this).attr('data-item-type') == 'tweet') {
					var p, t;
					p = $(this).find('p.tweet-text');
					if (!p) {
						return;
					}
					t = p.text();
					if (t.indexOf('c_ute') == -1 && t.indexOf('℃') == -1 && t.indexOf('-ute') == -1) {
						$(this).slideUp(2500);
					}
				}
			});
		};
		f();
		window.setInterval(f, 5000);
	}
})();
