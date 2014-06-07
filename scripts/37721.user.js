// (Better) Google Search Keyboard Shortcuts
// By Michael Griffith, http://open.bodyvisual.com/gm/bgsks/
// 
// Released under a Creative Commons Attribution-Noncommercial-Share Alike license
// http://creativecommons.org/licenses/by-nc-sa/3.0/us/
// 
// --
// 
// ==UserScript==
// @name			(Better) Google Search Keyboard Shortcuts
// @namespace		http://open.bodyvisual.com/gm/bgsks/
// @description		Gives Google Search some awesome keyboard shortcuts
// @include			http://google.tld/search*
// @include			http://www.google.tld/search*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require			http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js
// ==/UserScript==

$(function()
{
	var results = $('div#res p:contains("Did you mean"):first,div#res li'),
		pointer = $('<div />'),
		index = 0,
		keys_disabled = false;
	
	var ESC			= 27,
		KEY_H		= 72,
		KEY_I		= 73,
		KEY_J		= 74,
		KEY_K		= 75,
		KEY_M		= 77,
		KEY_N		= 78,
		KEY_O		= 79,
		KEY_Q		= 81,
		KEY_S		= 83,
		
		EASING		= 40,
		
		BORDER_SELECTED_HEX			= '#6B90DA',
		BORDER_DESELECTED_HEX		= '#fff',
		
		BACKGROUND_SELECTED_HEX		= '#EBEFF9',
		BACKGROUND_DESELECTED_HEX	= '#fff';
	
	function style_results()
	{
		results.css({
			paddingLeft: 20,
			border: '1px solid #fff'
		});
		
		$(results[0]).css({
			backgroundColor: BACKGROUND_SELECTED_HEX,
			borderColor: BORDER_SELECTED_HEX
		});
	}
	
	function style_pointer()
	{
		pointer.css({
			paddingRight: 4,
			paddingBottom: 2,
			backgroundColor: BORDER_SELECTED_HEX,
			color: BORDER_DESELECTED_HEX,
			position: 'absolute',
			left: 0,
			top: $(results[0]).find('a.p,h3').offset().top + 2,
			width: $(results[0]).offset().left + 12,
			textAlign: 'right'
		}).html('&raquo;').appendTo('body');
	}
	
	function select_result(old)
	{
		if (!old) old = 0;
		
		$(results[old]).animate({
			backgroundColor: BACKGROUND_DESELECTED_HEX,
			borderTopColor: BORDER_DESELECTED_HEX,
			borderRightColor: BORDER_DESELECTED_HEX,
			borderBottomColor: BORDER_DESELECTED_HEX,
			borderLeftColor: BORDER_DESELECTED_HEX
		}, EASING * 4);
		
		$(results[index]).animate({
			backgroundColor: BACKGROUND_SELECTED_HEX,
			borderTopColor: BORDER_SELECTED_HEX,
			borderRightColor: BORDER_SELECTED_HEX,
			borderBottomColor: BORDER_SELECTED_HEX,
			borderLeftColor: BORDER_SELECTED_HEX
		}, EASING);
	}
	
	function move_pointer(dir)
	{
		var old = index,
			top = 2,
			width = 12,
			offset = 0;
		
		index += dir;
		
		if (index < 0) index = results.length -1;
		index %= results.length;
		
		el = $(results[index]);
		
		top += el.find('a.p,h3').offset().top
		width += el.offset().left;
		
		pointer.animate({
			top: top,
			width: width
		}, EASING);
		select_result(old);
		scroll_to_result();
	}
	
	function scroll_to_result()
	{
		var html = $('html'),
			top = html[0].scrollTop,
			bottom = top + window.innerHeight,
			offset = $(results[index]).offset().top,
			height = $(results[index]).height();
		
		if (offset < top + 50 || offset > bottom - 50)
			html.animate({ scrollTop: offset - ((bottom - top) / 2) + (height / 2) }, EASING * 4);
	}
	
	$(window).keyup(function(e)
	{
		if (e.keyCode == ESC)
			$('input[name=q]:first')[0].blur();
		
		if (keys_disabled) return;
		
		switch(e.keyCode)
		{
			case KEY_J:
				move_pointer(1);
				break;
			case KEY_K:
				move_pointer(-1);
				break;
			case KEY_S:
			case KEY_Q:
				$('input[name=q]:first')[0].focus();
				break;
			case KEY_O:
				var h = $(results[index]).find('a:first').attr('href');
				
				if (e.shiftKey) GM_openInTab(h)
				else window.location = h;
				
				break;
		}
	}).blur(function()
	{
		keys_disabled = true;
	}).focus(function()
	{
		keys_disabled = false;
	});
	
	$('input[name=q]:first').focus(function()
	{
		keys_disabled = true;
	}).blur(function()
	{
		keys_disabled = false;
	});
	
	style_results();
	style_pointer();
	scroll_to_result();
});