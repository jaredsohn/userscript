// ==UserScript==
// @name        mytvshows - New Episodes - Download on Serienjunkies.org
// @namespace   http://mytvshows.org/
// @description Changes the Download-Link to serienjunkies.org/show-to-be-downloaded/
// @include     http://*mytvshows.org/new/
// @include     http://www.mytvshows.org/new/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @version     1.1
// ==/UserScript==

var provider = "http://serienjunkies.org"
$(document).ready(function() {
	$('.download a').each(function(i) {
        console.log(i);
		atag = $(this);
        series = $(this).closest(":has(form h3)").find("form h3");
        series = series[i].innerHTML.replace(/\s+/g, '-').replace('(', '').replace(')', '').toLowerCase(); // Remove brackets AND replace spaces with "-"
		downloadlink = $(this).attr('href').replace(/\s+/g, '-').replace('(', '').replace(')', '').toLowerCase().split("/");
		season 	= format_number(downloadlink[3]);
		episode = format_number(downloadlink[4]);
		downloadlink = series +"/#s"+ season +"e"+ episode;
		atag.attr("href", provider +"/"+downloadlink);
	});
});

function format_number(number) {
	n = parseInt(number);
	if(n < 10)
		return "0" + n;
	else
		return number;
}