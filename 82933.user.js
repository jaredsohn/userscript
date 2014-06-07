// removeAllFavorites.user.js
//
// Written by: Alex Reynolds
// Released to the public domain
//
// ==UserScript==
// @name		RemoveAllFavorites
// @namespace		NA
// @description		Quickly removes all favorites from a comments- or posts-favorites page in your Metafilter profile
// @include		http://*.metafilter.com/favorites/*
// ==/UserScript==
//

//
// Replace this number with your user number, which you can find by
// clicking on "My Profile" at the top of the Metafilter page and reading
// the URL, e.g. http://www.metafilter.com/user/30706
//
var userNumber = 30706;

function removeAllFavorites() {
    var xpath = "//A[@href='#' and starts-with(@title, 'Remove this')]";
    var actionNodes = document.evaluate(
					xpath,
					document,
					null,
					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
					null
					);
    var total = actionNodes.snapshotLength;

    var href = location.href;
    var needle = "http://www.metafilter.com/favorites/" + userNumber;
    var regExp = new RegExp(needle);

    if (href.match(regExp).length > 0) {
	if (confirm('Really unfavorite all the comments or posts on this page?')) {
	    for (var i = 0; i < total; i++) {
		var candidate = actionNodes.snapshotItem(i);
		candidate.onclick();
	    }
	}
    }

}

removeAllFavorites();