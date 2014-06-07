// ==UserScript==
// @name           TV.com Rating Hider
// @description    Hides the user ratings from TV.com episode list pages.
// @include        http://www.tv.com/*/episode.html*
// @include        http://www.tv.com/*/episode_listings.html
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(function() {

var scoreCells = $("td.score,th.score");
scoreCells.css("display", "none");

var li = $("<li/>");
li.append($("<a>Show User Ratings</a>").click(function(event) {
	scoreCells.css("display", "table-cell");
	li.remove();
}));
$("ul.TAB_LINKS.more_links:first").append(li);

});
