// ==UserScript==
// @name           Smileter icontitles
// @namespace      http://projects.kain-haart.info/userscripts
// @description    Adds titles for emotion icons on Smileter
// @include        http://smileter.com/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

$(function()
	{
	$("span.emoticon")
		.removeClass("emoticon")
		.each(function(){$(this).attr("title",$(this).attr("class"));})
		.addClass("emoticon")
		;
	$("#emoticon-current").mouseover(function()
		{
		$(this)
			.removeClass("emoticon")
			.attr("title",$(this).attr("class"))
			.addClass("emoticon")
			;
		});
	});