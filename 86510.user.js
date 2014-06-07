// ==UserScript==
// @name           movielens NZBMatrix Link
// @namespace      http://jobson.us
// @description    Adds a link to search NZBMatrix for each movie.
// @include        http://movielens.umn.edu/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var url = 'http://nzbmatrix.com/nzb-search.php?cat=movies-all&search=';

$.each($('tr'),function() {
	if (! $(this).attr('id').match(/^row\d+$/)) return;
	var a = $(this).children('td.text').children('a');
		a = $(a)[$(a).length-1];
	var title = $($(this).children('td.text').children('a')[0]).contents()[0].textContent;
	var year  = title.match(/\((\d+)\)/)[1];
		title = title.replace(/\(.+?\)/g,'').replace(/\s+$/,'').replace(/(.+?), (The|An|A)$/,'$2 $1') +' '+ year;
	$(a).after('<span title="-1">|</span><a href="'+ url + encodeURI(title) +'"><span class="smallText">Search NZBMatrix</span></a>');
});
