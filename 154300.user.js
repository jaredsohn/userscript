// ==UserScript==
// @name       IMDB Score Hider
// @namespace  http://cyph0n.tumblr.com/
// @version    0.0.1
// @description  Hides all TV and movie scores from IMDB.
// @match      http://www.imdb.com/title/*
// @copyright  2012+, Cyph0n
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

// If movie title is clicked, toggle the ratings.
$('h1.header').click(function() {
    toggleRatings();
});

function toggleRatings()
{
    $('.star-box-giga-star').toggle();
    $('.star-box-details').toggle();
}

// Hide rating on page load.
toggleRatings();