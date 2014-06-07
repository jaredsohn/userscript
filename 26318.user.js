// ==UserScript==
// @name           TwitPic Previewer
// @namespace      http://twitpic.com/
// @description    Previewing twitpic.com/* links on Twitter.
// @include        http://hahlo.com/*
// @include        http://twitter.com/*
// @author         YungSang
// @version        0.2
// ==/UserScript==
// v0.1 : 2008.05.10 : First Release
// v0.2 : 2008.05.11 : Add borders

(function(window) {
	var jquery_js = 'http://yungsang.com/js/jquery.js';
	var $ = null;

log('start');

	function loadScript(url) {
		var script     = document.createElement('script');
		script.type    = 'text/javascript';
		script.charset = 'utf-8';
		script.src     = url;

		document.getElementsByTagName('head')[0].appendChild(script);
	}

	if (typeof window.jQuery == 'undefined') {
		loadScript(jquery_js);
	}

	var loadCheckTimer = setInterval(function() {
		if (typeof window.jQuery != 'undefined') {
			clearInterval(loadCheckTimer);
			$ = window.jQuery;
			setInterval(check, 1000);
		}
	}, 250);

	function check() {
		$('a[@href*=twitpic.com]').each(function() {
			if (!this.title) resolve(this);
		});
	}

	function resolve(a) {
log(a.href);
		a.title = 'resolved';
		image = a.href + '-thumb.jpg';
		$(a.parentNode).css({position: 'relative'});
		var $img = $('<span/>').appendTo(a.parentNode).css({
			position: 'absolute',
			top     : '30px',
			left    : 0,
			display : 'none',
			width  : '150px',
			height : '150px',
			border : '5px #333 solid',
			backgroundImage: 'url(' + image + ')',
			zIndex : 20000
		});
		if ($.browser.safari) {
			$img.css({
				'border-radius': '8px',
//				'-moz-border-radius': '8px',
				'-webkit-border-radius': '8px'
			});
		}
		$(a).hover(function() {
			$img.fadeIn('slow');
		},
		function() {
			$img.fadeOut('slow');
		});
	}

//--============================================================================
//-- Logger
//--============================================================================
	function log(str) {
		if (typeof console != 'undefined') console.log(str);
	}
})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);
