// ==UserScript==
// @name           IMDb Rating Hider
// @description    Hides the user ratings from IMDb title pages.
// @include        http://*.imdb.com/title/*
// @include        http://imdb.com/title/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(function() {

var ratings = $("#tn15rating");
var ratingsShow = $("<div/>");
ratingsShow.append($('<a href="#">Show</a>').click(function(event) {
	ratings.css("display", "block");
	ratingsShow.remove();
	event.preventDefault();
}));
ratings.css("display", "none");
ratingsShow.insertBefore(ratings);

});
