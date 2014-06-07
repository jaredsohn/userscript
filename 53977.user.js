// ==UserScript==
// @name           Mytvshows Rapidshare
// @namespace      http://mytvshows.org/
// @copyright      2009+, Adapted by Ivan Pereira (http://zivan.org) from Ruben Fonseca (http://0x82.com).
// @version        0.0.2
// @description    Provides links to newzbin.com for episodes in mytvshows.org
// @include        http://*.mytvshows.org/unseen/
// @include        http://mytvshows.org/unseen/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

GM_addStyle(".rs { right: -25px; position: absolute; z-index: 200; link-decoration: none; }");

var rs = "http://rapidshare-search-engine.com/index-s_submit=Search&sformval=1&s_type=0&what=1&s="

$(document).ready(function() {
	$('#main3 .item').each(function(i) {
		h3 = $($(this).parent().parent().prevAll("h3")[0]);
		series = h3.html();
		
		season = /(\d+)$/($('.season_nr', $(this)).html());
		season = season[1];
		
		number = $('.nr', $(this)).html();
		
		querystring = series + " s" + format_number(season) + "e" + format_number(number); 
        link = rs + querystring + "&start=0.html";
		
		$(".ratings", $(this)).after('<span class="rs"><a href="' + link + '" target="_blank" rel="external"><img src="http://free-brushes.com/uploads/tutorials/rapidshare_icon.gif" alt="rapidshare download" /></a></span>');
	});
	
	$(".rs a").click(function() {
		window.open($(this).attr('href'));
		return false;
	});

//To fold episodes
$("#main3").before('<h1 id="fold" style="font-size:16px;color:red">To fold ALL episodes please click here</h1><h1>To fold/unfold a specific serie, click on the image</h1>');
$("#fold").click(function(){$("#main3 h3").next().next().hide();});
$("#main3 img").click(function(){$(this).parent().next().slideToggle(600);});

});

function format_number(number) {
	n = parseInt(number);
	if(n < 10)
		return "0" + n;
	else
		return number;
}
