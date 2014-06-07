// JavaScript Document
// ==UserScript==
// @name           Ikariam 0.5.0 resize window
// @autor          roselan
// @version        0.1.2
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @namespace      ikariamScript
// @description    allows you to resize any "pop-up" window in ikariam
// @downloadURL    https://userscripts.org/scripts/source/133248.user.js
// @updateURL      https://userscripts.org/scripts/source/133248.meta.js
// @include        http://s*.*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @require        http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

$(document).ready( function () {
	var resizing = false;	
	var boxHeight;
	var mainContentScrollHeight;
	var scrollerHeight;
	//var scrollerPercent;
	//var initialHeight;
	
	$(document).on('click', 'a', function () {
		console.log('yo');
		setTimeout( function () {
			if (!$('#frame-grip').length) {
				$('div.mainContentBox').append('<span id="frame-grip" style="display: block; width: 100%; height: 16px; background: #7E4A21"></span>');
				//scollerPercent = $('div.scroller').height() / $('div.mainContentScroll').height();				
				//initialHeight = $('div.mainContentScroll').height();
			}
		}, 300);
	});
	$(document).mouseup(function(e) {
        resizing = false;
    });

    $(document).mousedown(function(e) {
		if (e.target.id == 'frame-grip') {
			e.preventDefault();
			resizing = e.pageY;
			boxHeight = $('div.mainContentBox').height();			
			mainContentScrollHeight = $('div.mainContentScroll').height();
			scrollerHeight = $('div.scroller').height();
		}
    });

    $(document).mousemove(function(e) {
		
        if(resizing) {			
			$('div.mainContentBox').height(boxHeight + e.pageY - resizing);
			$('div.mainContentScroll').height(mainContentScrollHeight + e.pageY - resizing);
			//$('div.scroll_arrow_bottom').css('top', scroll_arrow_bottomTop + e.pageY - resizing);
			//$('div.scroller').height((mainContentScrollHeight + e.pageY - resizing -($('div.scroll_arrow_top').height()*2))*scollerPercent);
			$('div.scroller').height(scrollerHeight + e.pageY - resizing);
        }
    });
	
});