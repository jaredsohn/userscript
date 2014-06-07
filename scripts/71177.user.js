// ==UserScript==

// @name        WykopaliskoToiletFlushv2
// @author 	wykop_veteran

// @description   Usuwa linki z wykopaliska o stosunku wykopow do zakopow mniejszym niz zadane, a takze te, ktore juz zakopalismy.
// @namespace     wykop.pl

// @include       *wykop.pl/wykopalisko*

// ==/UserScript==

var ratio = 3;
var minimum = 3;

$ = unsafeWindow.jQuery;
$(document).ready(function()
{
	$('li.sponsoredby').remove();
	$('.entry > li').each(function()
	{
		//wykopy
		var wykopy = parseInt($(this).find('.votecount').text());
		//zakopy
		var zakopy = parseInt($(this).find('em').find('strong').text());
		if ((wykopy < 100 && (zakopy >= minimum && wykopy < ratio*zakopy)) || ($(".user-panel").length>0 && $(this).find('.digin').length==0))
		{
			$(this).remove();
		}
	});
});
