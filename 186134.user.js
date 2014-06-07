// ==UserScript==
// @name			Xerotic's View Thread Ratings Average
// @namespace		xerotic/vtra
// @description		Allows you to see thread rating average.
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include			*hackforums.net/forumdisplay.php*
// @include			*hackforums.net/showthread.php*
// @version			1.1
// ==/UserScript==

if($(location).attr('href').indexOf("showthread.php") >= 0) {
	var rating = $(".current_rating").html();
	$(".current_rating").siblings().each(function() {
		$(this).children().attr("title", rating);
	});
} else {
	$(".current_rating").each(function() {
		var rating = $(this).html();
		$(this).siblings().each(function() {
			$(this).children().attr("title", rating);
		});
	});
}