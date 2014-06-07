// ==UserScript==
// @name        NOS Champions League - Only show Game Highlights and remove spoilers
// @description NOS Champions League - Only show Game Highlights and remove spoilers
// @namespace   nos
// @include     http://nos.nl/sport/voetbal/champions-league/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @grant       none
// ==/UserScript==

$(function()
{
	$('.img-list li').each(function()
	{
		$(this).css('min-height', '1px');
		$(this).find('.img-video').hide();
		$(this).find('em').hide();

		var is_game = $(this).text().indexOf('Samenvatting') > -1 || $(this).text().indexOf('samenvatting') > -1;

		if(is_game)
		{
			$(this).css('background-color', '#8CC63E');
			$(this).css('width', '315px');
			$(this).css('border', '1px dotted #000');
			$(this).css('padding', '10px');
			$(this).css('margin-bottom', '10px');
			$(this).css('margin-right', '10px');
		}
		else
		{
			$(this).addClass('spoilers').hide();
		}
	});
	$('#equalrows').append('<div class="show-hidden">Show hidden videos</div>');
	
	$('.show-hidden').css('cursor', 'pointer');
	$('.show-hidden').click(function(evt)
	{
		$('.spoilers').show();
		$(this).hide();
	});
});