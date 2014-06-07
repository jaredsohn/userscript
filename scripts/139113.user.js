// ==UserScript==
// @author         Nate Sisk 
// @version        1.0
// @name           Old District Chat Color
// @namespace      http://example.com
// @description    Use to automatically color your text in the chatbox.
// @include        http://olddistrict.co.uk/forum.php
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==
	
	var defaultColor = 'red';
	
	var closeColor = '[/color]';
	
	var openBold = '[b]';
	var closeBold = '[/b]';
	
	var openItalics = '[i]';
	var closeItalics = '[/i]';

	var openUnderline = '[u]';
	var closeUnderline = '[/u]';
	
	
	
$(function()
{
	
	var target = $('.controls.add');
	
	if (target)
	{
		newHtml = $(target).html();
		newHtml = newHtml.substring(0, newHtml.indexOf('<div style="clear:both;"></div>')) + '<label class="tool label">Text Color:</label><input class="tool textcolor" type="text" id=testcolor value="' + defaultColor +'" /><div style="clear:both;"></div>';
		$(target).html(newHtml);
	}	

	$('.controls_send').bind('click', function()
	{
		var text = $('.controls.add').children('.controls_message').val();
		if (text != '')
		{
			$('.controls.add').children('.controls_message').val(formatText(text));
		}
		
		text = $('.controls.edit').children('.controls_message').val()
		if (text != '')
		{
			$('.controls.edit').children('.controls_message').val(formatText(text));
		}
	});
});



	function getOpenColorBBCode(color)
	{
		return color != '' ? '[color=' + color + ']' : '';
	}

	function formatText(text)
	{
		var openColor = getOpenColorBBCode($('.tool.textcolor').val());
		return  openColor + text + (openColor != '' ? closeColor : '');
	}