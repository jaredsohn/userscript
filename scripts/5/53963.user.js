// ==UserScript==
// @name           Mytvshows newzbin
// @namespace      http://mytvshows.org/
// @copyright      2009+, Ruben Fonseca (http://0x82.com)
// @version        0.0.2
// @description    Provides links to newzbin.com for episodes in mytvshows.org
// @include        http://*.mytvshows.org/unseen/
// @include        http://mytvshows.org/unseen/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

GM_addStyle(".newzbin { right: -25px; position: absolute; z-index: 200; link-decoration: none; }");

$(document).ready(function() {
	$('#main3 .item').each(function(i) {
		h3 = $($(this).parent().parent().prevAll("h3")[0]);
		series = h3.html();
		
		season = /(\d+)$/($('.season_nr', $(this)).html());
		season = season[1];
		
		number = $('.nr', $(this)).html();
		
		querystring = series + "+" + season + "x" + format_number(number);
		link = "http://www.newzbin.com/search/query/?q=" + querystring + "&area=-1&fpn=p&searchaction=Go&areadone=-1";
		
		$(".ratings", $(this)).after('<span class="newzbin"><a href="' + link + '" target="_blank" rel="external"><img src="http://www.newzbin.com/m/i/i/download.png" alt="newzbin download" /></a></span>');
	});
	
	$(".newzbin a").click(function() {
		window.open($(this).attr('href'));
		return false;
	});
});

function format_number(number) {
	n = parseInt(number);
	if(n < 10)
		return "0" + n;
	else
		return number;
}