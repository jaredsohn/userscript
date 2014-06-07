// ==UserScript==
// @name           Facepunch avatar timestamp fix
// @namespace      
// @description    Fixing timestamp in avatar urls on page load
// @version        1.0.0
// @include        http://facepunch.com/*
// @include        https://facepunch.com/*
// @include        http://www.facepunch.com/*
// @include        https://www.facepunch.com/*
// ==/UserScript==

(function() {
	var embedMe = function() {
			
		$(function() {
			$('.LastPostAvatar').each(function() {
				var style = $(this).attr('style');
				if (style == null) {
					return;
				}
			
				$(this).attr('style', style.replace(/^(background.+?url.+?image\.php?.*?dateline=)[0-9]+(.*?)$/i, '$1' + parseInt(new Date().getTime() / 1000) + '$2'));
			});
			$('img').each(function() {
			var src = $(this).attr('src');
				if (src == null) {
					return;
				}
			
				$(this).attr('src', src.replace(/^(.*?image\.php?.*?dateline=)[0-9]+(.*?)$/i, '$1' + parseInt(new Date().getTime() / 1000) + '$2'));
			});
		});

	};

	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.appendChild(document.createTextNode('('+ embedMe +')();'));
	(document.head || document.body || document.documentElement).appendChild(script);
})();
