// ==UserScript==
// @author		 vandalizmo
// @name         wpTV Filmweb
// @version		 0.11
// @namespace	 http://furorra.pl/scripts/gm/
// @require      http://code.jquery.com/jquery-latest.min.js
// @description  Adds link to Filmweb.pl on tv.wp.pl to films marked as 'Hit'
// @include      http://tv.wp.pl/*
// ==/UserScript==

(function() {
	$("img[src='http://i.wp.pl/a/i/program_tv/hit.gif']").each(function() {
		var search_query = "http://www.filmweb.pl/szukaj?q={film_title}";
		var film_title	 = encodeURI($(this).parent().parent().next().children("b").text());
		
		$(this).parent().parent().append('<span><a href="'+search_query.replace(/\{film_title\}/, film_title)+'"><img style="border: 0; width: 16px; height: 16px;" src="http://gfx.filmweb.pl/gf/favicon.ico" title="Filmweb.pl"/></a></span>');

	});
}());