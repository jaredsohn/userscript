// ==UserScript==
// @name           BrightKite Resolver
// @namespace      http://hahlo.com/
// @description    Resolving a bkite.com/* link to an link with its address.
// @include        http://hahlo.com/*
// @include        http://*twitter.com/*
// @author         YungSang
// @version        0.7
// ==/UserScript==
// v0.1 : 2008.05.06 : First Release
// v0.2 : 2008.05.07 : Add setInterval for Ajax
// v0.3 : 2008.05.07 : Support FireFox with GreaseMonkey
// v0.4 : 2008.05.07 : Fix a bit bug to support IE7 with IE7Pro
// v0.5 : 2008.05.08 : Add another tooltip to preview a BK photo
// v0.6 : 2008.05.08 : Fix a bug about duplicate requests
// v0.7 : 2009.02.10 : Support the new verson of jQuery in the twitter

(function(window) {
	var jquery_js = 'http://yungsang.com/js/jquery.js';
	var $ = null;

	var requests = 0;
	var selector = 'a[@href*=bkite.com]';

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
			if ($.fn.jquery >= 1.3) selector = 'a[href*=bkite.com]';
log($.fn.jquery);
			setInterval(check, 1000);
		}
	}, 250);

	function check() {
		if (requests) return;
 		$(selector).each(function() {
			if (!this.title) resolve(this);
		});
	}

	function resolve(a) {
		requests++;
log(a.href);
		var url = 'http://yungsang.com/bkite/';
		var params = {
			url: a.href
		};
		url += '?' + $.param(params) + '&callback=?';
		$.getJSON(url, function(json) {
log(json.place);
			a.title = json.place;
			if (json.photo) {
log(json.photo);
				$(a.parentNode).css({position: 'relative'});
				var $img = $('<img/>').appendTo(a.parentNode).css({
					position: 'absolute',
					top     : '30px',
					left    : 0,
					display : 'none',
					width  : '300px',
					height : 'auto',
					zIndex : 20000
				}).attr({
					src  : json.photo,
					alt  : ''
				});
				$(a).hover(function() {
					$img.fadeIn('slow');
				},
				function() {
					$img.fadeOut('slow');
				});
			}
			requests--;
		});
	}
//--============================================================================
//-- Logger
//--============================================================================
	function log(str) {
		if (typeof console != 'undefined') console.log(str);
	}
})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);