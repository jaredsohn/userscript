// ==UserScript==
// @name                Keyboard Shortcut for Google Reader with G+
// @version             v1.2 (2011/11/29)
// @namespace	        hecomi
// @require             https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @include		http*://www.google.*/reader/*
// @include		http*://plusone.google.com/*
// ==/UserScript==

(function(){
	if (location.href.indexOf('plusone.google.com') === -1) {
		$(window).bind('keydown', function(e) {
			if (e.keyCode == 187) {
				location.href = 'javascript:(' +
					(function(){
						var ce  = document.getElementById('current-entry');
						var ifr = ce.getElementsByTagName('iframe')[0];
						ifr.contentWindow.postMessage('TOGGLE_PLUSONE', '*');
					}).toString() + ')()';
			}
		});

		$('.keyboard-help-banner').live('DOMNodeInserted', function(e) {
			var target = $(e.target);
			if (target.attr('id') === 'keyboard-help-container') {
				$('<tr><td class="key">+:</td><td class="desc">Toggle +1</td></tr>').appendTo('.help-section:eq(7) tbody');
			}
		});
	} else {
		$(window).bind('message', function(e) {
			if (e.originalEvent.data == 'TOGGLE_PLUSONE') {
				var click    = document.createEvent("MouseEvents");
				click.initEvent("click");
				$('#button')[0].dispatchEvent(click);
			}
		});
	}
})();