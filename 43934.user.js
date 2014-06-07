// ==UserScript==
// @name           ČSFD procentuální hodnocení oblíbených uživatelů
// @include        http://www.csfd.cz/film/*
// ==/UserScript==

function addFavoriteUsersRating() {

	var voteList = document.evaluate("//div[@id='ratings']/descendant::li[@class='favorite']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var voteCount = voteList.snapshotLength;
	var voteSum = 0;

	for (var i = 0; i < voteCount; ++i)
	{
		var image = voteList.snapshotItem(i);
		var vote = document.evaluate(".//img/@width", image, null, XPathResult.STRING_TYPE, null).stringValue;
		if (vote) {
			voteSum += parseInt(vote) / 8;
		}
	}

	if (voteCount > 0)
	{
		var result = Math.round(voteSum * 20 / voteCount);

		var ratingHeadings = document.evaluate("//div[@id='rating']/h2[@class='average']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		ratingHeading = ratingHeadings.snapshotItem(0);
		ratingHeading.innerHTML = ratingHeading.innerHTML + " <span style=\"font-size: 50%; min-height: 0px;\">( " + result + "% )</span>";
	}
}

addFavoriteUsersRating();