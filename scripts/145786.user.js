// ==UserScript==
// @name        Ylilauta-fixes
// @namespace   spurdo123
// @grant	none
// @include     http*://ylilauta.org/*
// @include     http*://boards.ylilauta.org/*
// @include     http*://ylilauta.fi/*
// @include     http*://boards.ylilauta.fi/*
// @version     1.3
// ==/UserScript==

$(document).ready(function()
{
	// Allows to expand images in long threads too
	$('.thread').each(function()
	{
		if ($(this).find('.threadcontent > .expandall').length === 0 && $('#thread').val() != 0)
		{
			$(this).find('.threadcontent > .answers').before('<p class="expandall"><a href="javascript:expandAllImages();">Laajenna kaikki kuvat<\/a><\/p>');
		}
	});
	
/* 	// Vinkki.org tracker
	$('a.openblank').each(function()
	{
		$(this).attr('href', $(this).attr('href').replace(/^http:\/\/vinkki.org\/\?/, ''));
	}); */
});