// ==UserScript==
// @name        PTPFavoriteCriticReviews
// @namespace   kannibalox
// @description Display your favorite critic reviews if found on IMDb 
// @include    http*passthepopcorn.me/torrents.php?id=*

// @version     0.3
// @grant       GM_getValue
// @grant       GM_setValue
// @grant		GM_xmlhttpRequest
// @grant		GM_registerMenuCommand
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var critics = $.parseJSON(GM_getValue("critic_list", "[]"));

function addLinkToRatings(text, url) {
	var n = $("<a href='" + url + "'>" + text + "</a>");
	var node = $('span:contains("Ratings")')
	node.append(" | ", n);
}

function getAllLinks() {
	link = $("a[href^='http://www.imdb.com/title/']").attr('href') + "externalreviews";
	GM_xmlhttpRequest({
		method: "GET",
		url: link,
		onload: function(response) {
			var review_box = $(response.responseText).find("#external_reviews_content");
			addLinkToRatings("All Reviews (" + review_box.find("li").length + ")", link);
			$.each(critics, function(index, value) {
				review_box.find('a:contains("' + value + '")').each(function (i, v) {
					addLinkToRatings(value, "http://www.imdb.com" + $(this).attr("href"));
				});
			});
		}
	});
}

function rmCritic() {
	var critic = prompt("Please enter critic name/text");
	var index = $.inArray(critic, critics);
	if (critic != null && index > -1) {
		critics.splice(index, 1);
	}
	GM_setValue("critic_list", JSON.stringify(critics));
	location.reload();
}

function addCritic() {
	var critic = prompt("Please enter critic name/text");
	if (critic != null) {
		critics.push(critic);
	}
	GM_setValue("critic_list", JSON.stringify(critics));
	location.reload();
}

function lsCritic() {
	alert(critics.join());
}

GM_registerMenuCommand("Add Critic", addCritic);
GM_registerMenuCommand("Remove Critic", rmCritic);
GM_registerMenuCommand("List Critics", lsCritic);

getAllLinks();

