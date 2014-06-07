// ==UserScript==
// @name           playing.poka64spoiler
// @namespace      www.boomie.se
// @include        http*playing.se/*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$(".viewTspoiler").click(function()
{
	$(this).parents('.vRRCBox:first').find('.viewTspoiler').css('color', '#212121').css('background-color', 'transparent');
});