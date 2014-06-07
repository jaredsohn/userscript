// ==UserScript==
// @name           IMDB Actor Title Ratings
// @version        1.0.1
// @license        GPL
// @description    Adds ratings & vote counts with sorting ability to a person's movie/TV show lists
// @namespace      http://userscripts.org/users/518906
// @icon           http://www.imdb.com/favicon.ico
// @author         Nonya Beesnes
// @match          http://www.imdb.com/name/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        https://datejs.googlecode.com/files/date.js
// @grant          none
// ==/UserScript==

// add css
var css = '<style type="text/css"> \
             .votes_column, .rating_column, .year_column{padding-left: 15px;} \
             .votes_column, .rating_column{float: right;width:65px} \
             .header .votes_column a, .header .rating_column a, .header .year_column a{cursor:pointer} \
             .votes_column a:hover, .rating_column a:hover, .year_column a:hover{text-decoration:none !important;color:inherit} \
             .year_column{width:40px;text-align:inherit} \
             .header .sorted{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAYUlEQVQoz2NgQAKSaZs2APF/KN7AgAtQRyFQoB+qAISfIyl8jiTeC1JoCsQ/kRSgY5CcMczUHDwKc9CdsAaLovVAzIiukB+I7yIpug/Egrh8bQx10y8gNmPAB6DuLUAXBwDx5XOePVdilwAAAABJRU5ErkJggg==) left no-repeat} \
             .header .sortedDesc{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAXElEQVQoz2NgQAOSaZtygLiAAR8AKjAG4p9A/AuITXAp4gfiu0D8H4pBbH5sCtcgKYLhNdjc9R8HzkF3Fy6FIDljkMJeIN4Axc+RFDxHEu9Fd8IGJIUb8AUP5QoBYK5yX24/ZOIAAAAASUVORK5CIIA=) left no-repeat} \
          </style>';
$(css).appendTo('head');

// add headers (Rating, Votes, Year)
$('.filmo-category-section').prepend('<div class="filmo-row header"><div class="year_column sorted"><a title="Sort">Year</a></div><div class="votes_column mellow"><a title="Sort">Votes</a></div><div class="rating_column"><a title="Sort">Rating</a></div><br></div>');

//  add the rating & votes to the movie/TV show
function addData(yearSpan, rating, votes, released) {
    'use strict';
    $(yearSpan).attr('title', released);
    $(yearSpan).after('<span class="votes_column mellow"><small>' + votes + '</small></span><span class="rating_column">' + rating + '</span>');
}

// iterate through the movies/TV shows in the passed section and lookup the rating & vote count via omdbApi.com
//   if the section doesn't already have ratings added and is visible.
function addRatingsToSection(filmoCategorySection) {
	'use strict';
	if (!$(filmoCategorySection).hasClass('hasRatings') && $(filmoCategorySection).is(':visible')) {
		$(filmoCategorySection).addClass('hasRatings');
		$(filmoCategorySection).find('.filmo-row:not(.header)').each(function() {
			var imdbId = $(this).attr('id').split('-')[1];
			var omdbUrl = 'http://www.omdbapi.com/?i=' + imdbId;
			var yearSpan = $(this).find('span.year_column');
			$.getJSON(omdbUrl, function( data ) {
				if (data.Response === 'True') {
					addData(yearSpan, data.imdbRating, data.imdbVotes, data.Released);
				} else {
					addData(yearSpan, 'N/A', 'N/A', yearSpan.text().trim().slice(0,4));
				}
			});
		});
	}
}

// from https://github.com/Teun/thenBy.js
firstBy=(function(){function e(f){f.thenBy=t;return f}function t(y,x){x=this;return e(function(a,b){return x(a,b)||y(a,b)})}return e})();

// calculates sort order
function calcSort(a, b, sortProperty, direction) {
	'use strict';
	var opA, opB, selector;
	switch (sortProperty) {
		case 'Rating':
			selector = '.rating_column';
			break;
		case 'Votes':
			selector = '.votes_column';
			break;
		case 'Year':
			var aval = $(a).find('.year_column').attr('title');
			if (aval === 'N/A') {aval = $(a).find('.year_column').text().trim().slice(0,4);}
			var bval = $(b).find('.year_column').attr('title');
			if (bval === 'N/A') {bval = $(b).find('.year_column').text().trim().slice(0,4);}
			return Date.parse(aval) < Date.parse(bval) ? (1 * direction) : (-1 * direction);
			//selector = '.year_column';
			//break;
		default:
			break;
	}
	opA = Number($(a).find(selector).text().replace(',','').replace('N/A', '0'));
	opB = Number($(b).find(selector).text().replace(',','').replace('N/A', '0'));
	return opA < opB ? (1 * direction) : (opA > opB ? -1 * direction : 0); 
}

// sorts the list of movies/TV Shows
function sortCategory(sectionDiv, sortBy, direction) {
	'use strict';
	var rows = $(sectionDiv).children('div').not('.header').remove();
	var secondSortProperty, thirdSortProperty;
	switch (sortBy) {
		case 'Rating':
			secondSortProperty = 'Votes';
			thirdSortProperty = 'Year';
			break;
		case 'Votes':
			secondSortProperty = 'Rating';
			thirdSortProperty = 'Year';
			break;
		case 'Year':
			secondSortProperty = 'Rating';
			thirdSortProperty = 'Votes';
			break;
	}
	
	var s = firstBy(function (a, b) {return calcSort(a, b, sortBy, direction);})
		.thenBy(function (a, b) {return calcSort(a, b, secondSortProperty, direction);})
		.thenBy(function (a, b) {return calcSort(a, b, thirdSortProperty, direction);});
	rows.sort(s);
	
    // add class odd or even
	rows.each(function(index) {
		$(this).removeClass('odd even');
		if (index % 2 === 0) {$(this).addClass('odd');}
		else                 {$(this).addClass('even');}
	});
	$(sectionDiv).append(rows);
}

//add click event handlers to the headers (Rating, Votes, Year)
$('.filmo-row.header div a').click(function () {
	'use strict';
	var linkDiv = $(this).parent('div');
	var direction = 1;
	if (linkDiv.hasClass('sorted')) {
		direction = -1;
		linkDiv.addClass('sortedDesc');
		linkDiv.removeClass('sorted');
	}
	else {
		linkDiv.addClass('sorted');
		linkDiv.removeClass('sortedDesc');
	}
	sortCategory($(this).parents('.filmo-category-section'), $(this).text(), direction);
    linkDiv.siblings('div').removeClass('sorted sortedDesc');
});

// watch for changes to the category sections' style attribute, add ratings when made visible (cut down on hits to omdbApi.com)
var observer = new MutationObserver(function(mutations) {
	'use strict';
    addRatingsToSection(mutations[0].target);
});

$('.filmo-category-section').each(function () {
	'use strict';
	observer.observe(this, { 
		attributes: true, 
		attributeFilter: ["style"]
	});
});

// initially add ratings only to the sections that aren't collapsed (cut down on hits to omdbApi.com)
addRatingsToSection($('.filmo-category-section:visible'));