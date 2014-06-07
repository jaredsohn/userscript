// ==UserScript==
// @name        Steam Scroll
// @description Adds mouse wheel support to the screenshot slider on Steam product pages.
// @namespace   Steam
// @include     http://store.steampowered.com/app/*
// @version     1
// @grant       none
// ==/UserScript==

window.setTimeout(function() {
	function hscroll(event) {
		event.preventDefault();
		
		var down = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail))) <= 0;
		var item = jQuery('.highlight_strip_screenshot.focus')[down ? 'next' : 'prev']('.highlight_strip_screenshot')[0];
		if (!item) {
			var items = jQuery('.highlight_strip_screenshot');
			item = items[down ? 0 : items.length-1];
		}
		g_player.HighlightItem(item);
		g_player.ClearInterval();
	}

	var scroller = jQuery('#highlight_strip')[0];
	if (scroller.addEventListener) {
		scroller.addEventListener('mousewheel', hscroll, false);
		scroller.addEventListener('DOMMouseScroll', hscroll, false);
	}
	scroller.attachEvent('onmousewheel', hscroll);
	
	g_player.ClearInterval();
},100);
