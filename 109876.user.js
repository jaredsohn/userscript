// ==UserScript==
// @name	Tweetscroll
// @namespace	http://labs.rbardini.com/
// @description	Automatically show new tweets on Twitter web interface
// @author	Rafael Bardini
// @version	1.1
// @include	http://twitter.com/*
// @include	https://twitter.com/*
// ==/UserScript==

(function tweetscroll() {
	var _window = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
	if (typeof _window.jQuery === 'undefined') {
		window.setTimeout(tweetscroll, 200);
	} else {
		var $ = jQuery = _window.jQuery,
			hasFocus = true,
			isEnqueued = false;
		
		function show(el) {
			el.click();
			isEnqueued = false;
		}
		
		$('head').append('<style>.new-tweets-bar {display:none !important}</style>');

		$(window).on({
			'blur': function() { hasFocus = false; },
			'focus': function() { hasFocus = true; }
		});
		
		$(document).on('DOMNodeInserted', function(event) {
			var el = $(event.target);
			if (el.hasClass('stream-item')) {
				bar = el.children('.new-tweets-bar');
				if (bar.length) {
					if (hasFocus) { show(bar); }
					else if (!isEnqueued) {
						$(window).one('focus', function() { show(bar); });
						isEnqueued = true;
					}
				}
			}
		});
	}
})();
