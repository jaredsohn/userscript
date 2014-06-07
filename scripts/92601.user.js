// ==UserScript==
// @name           Convert Quoted Images to Links
// @namespace      http://www.neogaf.com/
// @description	   Reduce your scrolling on the NeoGAF forums by converting quoted images into links. Does not affect quoted smileys.
// @include        http://www.neogaf.com/forums/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(function() {
	$('.quotearea img').each(function(index) {
		if(!$(this).attr('src').match(/^images\/smilies/))
		{
			$(this).before(document.createElement('a'));
			$(this).prev().attr('href', $(this).attr('src'));
			$(this).prev().click(function() { $(this).next().show().next().show(); return false;});
			$(this).prev().text('Show quoted image');
			$(this).before(document.createElement('br'));
			$(this).prev().hide();
			$(this).hide();
		}
	});
});