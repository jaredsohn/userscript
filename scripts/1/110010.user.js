// ==UserScript==
// @name			Forrst Smooth Scroll
// @namespace		http://www.felixmc.com/
// @description		Makes scrolling to top in forrst smoother
// @homepage		http://www.felixmc.com/
// @version			0.1.1
// @include			http://forrst.com/*

// ==/UserScript==

	$("#back-to-top a").unbind('click').live('click', function() {
		var time = $(window).height() + $(window).scrollTop() * 0.3;
		$("html, body").animate({ scrollTop: 0 }, (time > 1000) ? 1000 : time, function(x, t, b, c, d) { return c * ((t = t / d - 1) * t * t * t * t + 1) + b; });
		return false;
	});
