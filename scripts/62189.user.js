// ==UserScript==
// @name           pogdesign
// @namespace      http://www.pogdesign.co.uk
// @copyright      2009+, Ruben Fonseca (http://0x82.com)
// @version        0.0.1
// @include        http://www.pogdesign.co.uk/cat/index.php
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

GM_addStyle(".newzbin { float:right; link-decoration: none; }");

$(document).ready(function() {
  $('.eplink').each(function(i) {
    series = $(this).html();

    quote = $($(this).nextAll('span')[1]).html();
    s = /S: (\d+) - Ep: (\d+)/(quote);
    season = s[1];
    episode = s[2];

    querystring = series + "+" + season + "x" + format_number(episode);
    link = "http://www.newzbin.com/search/query/?q=" + querystring + "&area=-1&fpn=p&searchaction=Go&areadone=-1";

    $($(this).nextAll('span')[1]).after('<span class="newzbin"><a href="' + link + '" target="_blank" rel="external"><img src="http://www.newzbin.com/m/i/i/download.png" alt="newzbin download" /></a></span>');
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
