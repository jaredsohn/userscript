// ==UserScript==
// @name           pogdesign nzbmatrix
// @namespace      http://www.pogdesign.co.uk
// @description    adds links to nzbmatrix
// @include        http://www.pogdesign.co.uk/cat/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @version        0.0.2
// @copyright      2009+, Ruben Fonseca (http://0x82.com)
// ==/UserScript==

GM_addStyle(".nzbmatrix { float:right; link-decoration: none; }");

$(document).ready(function() {
  $('.eplink').each(function(i) {
    series = $(this).html();

    quote = $($(this).nextAll('span')[1]).html();
    s = /S: (\d+) - Ep: (\d+)/(quote);
    season = s[1];
    episode = s[2];

    querystring = series + "+S" + format_number(season) + "E" + format_number(episode);
    link = "http://nzbmatrix.com/nzb-search.php?search=" + querystring + "&cat=0";

    $($(this).nextAll('span')[1]).after('<span class="nzbmatrix"><a href="' + link + '" target="_blank" rel="external"><img src="http://www.newzbin.com/m/i/i/download.png" alt="nzbmatrix download" /></a></span>');
  });

  $(".nzbmatrix a").click(function() {
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
