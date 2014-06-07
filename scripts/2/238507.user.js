// ==UserScript==
// @name                Hummingbird 10 Point Rating
// @description         Converts Hummingbird ratings to a 10 point scale
// @author              Tempest
// @version             1.0.2
// @require             https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require             https://gist.github.com/raw/2625891/waitForKeyElements.js
// @include             http*://hummingbird.me/anime/*
// @include             http*://hummingbird.me/users/*/library*
// @exclude             http*://hummingbird.me/anime
// @exclude             http*://hummingbird.me/anime/
// @exclude             http*://hummingbird.me/anime/*/quotes*
// ==/UserScript==

function convertRatings(element) {
	var rating = element.text().replace(/^\s+|\s+$/g,"");
	if (!isNaN(rating)) rating *= 2;
	element.empty();
	element.attr("align", "center");
	element.text(rating);
}

function convertAnimePage(element) {
	var community_rating = element.find(".sidebar-title");
	var old_rating = community_rating.text();
	var substr_offset = old_rating.indexOf(": ") + 2;
	var new_rating = old_rating.substring(substr_offset, old_rating.length);
	community_rating.empty();
	community_rating.text("Community Rating: " + (new_rating * 2));
	element.find(".rating-column").each(function() {
		var title = $(this).attr("title");
		var lastIndex = title.lastIndexOf(" ");
		var prefix = title.substring(0, lastIndex);
		var newTitle = title.substring(lastIndex + 1, title.length) * 2;
		$(this).attr("title", prefix + " " + newTitle)
	});
}

if (/^https?:\/\/hummingbird.me\/anime\//.test(document.URL)) {
	waitForKeyElements(".community-rating", convertAnimePage);
} else if (/^https?:\/\/hummingbird.me\/users\/.*\/library/.test(document.URL)) {
	waitForKeyElements(".list-item-score[data-reactid]", convertRatings);
}