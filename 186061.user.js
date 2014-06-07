// ==UserScript==
// @name        Imdb show ages, searches and other goodies
// @namespace   imdb.com
// @description Adds ages to actors and movies, search buttons and some other goodies.
// @include     http://www.imdb.com/*
// @require     https://raw.github.com/cowboy/jquery-dotimeout/v1.0/jquery.ba-dotimeout.min.js
// @grant       none
// @version     1.6
// ==/UserScript==

// Brings focus to the search-bar on page load
$('#navbar-query').focus();

// This year and the current site's url
var curYear = new Date().getFullYear();
var url = location.href;

// The actor/actress page
if(url.indexOf('name') !== -1) {
	// Actor/actress name, year of birth and current age
	var actorName = (url.indexOf('reference') !== -1 ? $('h1').clone().children().remove().end().text().trim() : $('h1.header span.itemprop').text());
	var actorBirthYear = ($('time a').size() === 2 ? $('time a:nth-child(2)').text() : $('time a').text());
	var actorBirthYear = (url.indexOf('reference') !== -1 ? $('h5:contains("Date of Birth:")').next().find('a:nth-child(2)').text() : actorBirthYear);
	var actorAge = (actorBirthYear === '' ? '-' : (curYear - actorBirthYear));
	
	// Adds the actor/acress age after their name
	if(url.indexOf('reference') !== -1) {
	   var children = $('h1').children();
	   $('h1').empty().append(actorName + ', ' + actorAge + ' ').append(children);
	} else {
	   $('h1.header span.itemprop').append(', ' + actorAge);
    }
	
	// Boob search
	$('div#name-job-categories').append('<a id="boobsearch" target="_blank" href="https://www.google.se/search?q=' + actorName + ' nude">B-search</a>');
	// Hide the link by default
	$('#boobsearch').css('color', 'white');
	// Show the link when hovering, with a little delay
	$('#boobsearch').hover(function(){
		$(this).doTimeout( 'hover', 500, 'css', 'color', 'inherit' );
	}, function(){
		$(this).doTimeout( 'hover', 0, 'css', 'color', 'white' );
	});
	
	// Adds the actors age at the time when the movie was released to the Filmography list
	$('div.filmo-row span.year_column').each(function() {
		var movieListYear = parseInt($(this).text().trim());
		
		if(isNaN(movieListYear) === true) {
			console.log('NaN');
		} else {
			var actorMovieAge = (actorBirthYear === '' ? '-' : (movieListYear - actorBirthYear))
			$(this).text(movieListYear + ', ' + actorMovieAge);
		}
	});
}

// The movie page
else if(url.indexOf('title') !== -1) {
    // The movies title, year of production and how old it is
	var movieTitle = encodeURIComponent($('h1.header span.itemprop').text());
	var movieYear = (url.indexOf('title') !== -1 ? $('h1 > span > a').text() : $('h1.header span.nobr a').text());
	var movieAge = curYear - movieYear;
	
	// Adds how many years ago a movie was made or how many years to it's release
	if(movieAge === 0) {
		$('h1 > span > a').after(', ' + 'this year');
    } else if (movieAge === -1) {
		$('h1 > span > a').after(', in ' + -movieAge + ' year');
    } else if (movieAge < 0) {
		$('h1 > span > a').after(', in ' + -movieAge + ' years');
    } else if(movieAge === 1) {
		$('h1 > span > a').after(', ' + movieAge + ' year ago');
    } else {
		$('h1 > span > a').after(', ' + movieAge + ' years ago');
    }

	// Adds the search buttons
	var buttons = '<div id="search_buttons"><a href="http://torrentz.eu/search?f=' + movieTitle + '" target="_blank" title="Torrentz"><img height="16" src="http://www.google.com/s2/favicons?domain=www.torrentz.eu" witdh="16" title=""></a><a href="http://www.youtube.com/results?search_query=' + movieTitle + ' trailer" target="_blank" title="YouTube"><img height="16" src="http://www.google.com/s2/favicons?domain=www.youtube.com" witdh="16" title=""></a><a href="http://google.com/#q=' + movieTitle + '" target="_blank" title="Google"><img height="16" src="http://www.google.com/s2/favicons?domain=www.google.com" witdh="16" title=""></a></div>';
	$('.infobar').prepend(buttons);
	$('#search_buttons').css('margin-bottom', '3px').children().css('margin-right', '4px');
}

// The watchlist page
else if(url.indexOf('watchlist') !== -1) {
    // A empty array for the movie titles and the number of movies in the watchlist
    var movies = [];
    var nrMovies = $('div.header div.nav div.desc').attr('data-size');
    
    // Fills the array with the movie titles, one function for each watchlist view
    if(url.indexOf('view=detail') !== -1) {
        $('div.list div.list_item').each(function() {
            var title = encodeURIComponent($(this).find(':nth-child(3) > b > a').text());
            movies.push(title);
        });
    } else if(url.indexOf('view=compact') !== -1) {
        $('div.list table tbody tr.list_item:not(:first)').each(function() {
            var title = encodeURIComponent($(this).find('td.title > a').text());
            movies.push(title);
        });
    } else {
        $('div.list div.list_item').each(function() {
            var title = encodeURIComponent($(this).find(':nth-child(2) a').text());
            movies.push(title);
        });
    }
    
    // Adds the link element to the page
    $('div.see-more').prepend('<p style="float:right; text-align:right;"><a href="" class="torrentSearch">Search for each movie on torrentz.eu</a><br /><span style="color:grey;">(will open ' + nrMovies + ' new tabs)</span></p>');
    // When you click the link the default behaviour is stopped and a loop opens a new tab for all the movies in the array
    $('.torrentSearch').click(function(e) {
        e.preventDefault();
        for(i=0; i<movies.length; i++) {
            window.open('http://torrentz.eu/search?f=' + movies[i]);
            //console.log(i + '. ' + movies[i]);
        }
    });
}