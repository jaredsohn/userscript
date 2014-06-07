// ==UserScript==
// @name                Hummingbird 10 Point Rating
// @description         Converts Hummingbird ratings to a 10 point scale
// @author              Adrien Pyke
// @version             1.2.1
// @updateURL           https://userscripts.org/scripts/source/177333.meta.js
// @downloadURL         https://userscripts.org/scripts/source/177333.user.js
// @require             https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require             https://gist.github.com/raw/2625891/waitForKeyElements.js
// @include             http*://hummingbird.me/anime/*
// @include             http*://hummingbird.me/users/*/library*
// @include             http*://hummingbird.me/users/*/reviews*
// ==/UserScript==
$.fn.mytext = function() {
	var str = '';

	this.contents().each(function() {
		if (this.nodeType == 3) {
			str += this.textContent || this.innerText || '';
		}
	});

	return str;
};

function convertRatingsList(element)
{
	element = element.parent();
	var rating = element.children("span:eq(1)").text();
	element.find("i.fa-star").remove();
	element.children().hide();
	element.html(element.html() + "<span class='10point'>" + parseInt(rating * 2) + "</span>");
	element.children("span:eq(1)").bind("DOMSubtreeModified", function()
	{
		rating = element.children("span:eq(1)").text();
		element.find(".10point").text(parseInt(rating * 2));
	});
}

function convertRatingsAnime(element)
{
	var rating = element.mytext().substring(element.mytext().indexOf(":") + 1).replace(/^\s+|\s+$/g,"");//get text after colon, remove spaces.
	if (!isNaN(rating))
	{
		var newrating = rating * 2;
		element.html(element.html().replace(rating, (parseFloat(Math.round(newrating * 100) / 100).toFixed(2))));
	}
	element.bind("DOMSubtreeModified", function()
	{
		element.unbind("DOMSubtreeModified");
		setTimeout(function(){convertRatingsAnime(element);}, 100);//needs a small timeout or else it just duplicates the rating of the previous anime
	});
}

function convertRatingsColumn(element)
{
	var title = element.attr("title").split(" ");
	var rating = title[title.length - 1];
	if (!isNaN(rating))
	{
		title[title.length - 1] = parseInt(rating * 2);
	}

	element.attr("title", title.join(" "));
}

function convertRatingsReviews(element)
{
	var rating = element.children("i.fa-star").length * 2 + element.children("i.fa-star-half-o").length;
	element.html("<strong>" + rating + "</strong>");
}

function convertRatingsBreakdown(element)
{
	var score = element.find("h1.score");
	score.children().remove();
	var decimal = element.find("h5.decimal-score");
	decimal.children().remove();
	var rating = parseInt((parseFloat(score.text()) + parseFloat(decimal.text())) * 2);
	element.html("<h1 class='score' style='font-size:160px; line-height: 200px'>" + rating + "</h1>");
}

function convertRatingsVerdict(element)
{
	element.children().remove();
	element.text(parseInt(element.text() * 2));
}

waitForKeyElements("div.community-rating h5.sidebar-title", convertRatingsAnime, false);
waitForKeyElements("ul.community-rating-wrapper li.rating-column", convertRatingsColumn, false);
waitForKeyElements("span.review-stars", convertRatingsReviews, false);
waitForKeyElements("div.score-block", convertRatingsBreakdown, false);
waitForKeyElements("div.dec-score strong", convertRatingsVerdict, false);
waitForKeyElements("div.list-item-score span i.fa-star", convertRatingsList, false);
