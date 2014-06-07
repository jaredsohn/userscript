// ==UserScript==
// @name        GoalsArena - Remove the scores from game hightlights
// @description GoalsArena - Remove the scores from game hightlights
// @namespace   goalsarena
// @include     http://*goalsarena.org*
// @version     1
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

$('#bg').hide();

$('.goalvideos a, h1, title, .titleinvideolist a').each(function()
{
	//barca
	if($(this).text().toLowerCase().indexOf("barcelona") >= 0)
	{
		$(this).css('background-color', '#114D95');
		$(this).css('color', '#fff');
	}

	//ajax
	if($(this).text().toLowerCase().indexOf("ajax") >= 0)
	{
		$(this).css('background-color', '#D2122E');
		$(this).css('color', '#fff');
	}

	//az
	if($(this).text().toLowerCase().indexOf("az alkmaar") >= 0)
	{
		$(this).css('background-color', '#89C4E3');
	}

	//remove scores
	var new_text = $(this).text().replace(/\s\d{1}-\d{1}\s/i, ' - ');
	$(this).text(new_text);
});

$("h3:contains('Latest Football News')").parent().find('iframe').remove();
$("#videodetailsarea").css('color', '#F2F4F3');
$("#bg").show().css('background-color', '#8CC63E');

