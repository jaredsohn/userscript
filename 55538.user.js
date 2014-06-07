// ==UserScript==
// @name			Userscripts.org Profile Stats Fix
// @author			Erik Vergobbi Vold
// @namespace		userscriptsOrgProfileStatsFix
// @include			http://userscripts.org/users/*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-11
// @lastupdated		2009-08-11
// @description		This userscript fixes the stats box for userscript.org user profiles, adding links, and correcting numbers.
// ==/UserScript==

var assumeProfileCountsAreCorrect = false;

var userscriptsOrgProfileStatsFix = function(){
	var pageLinks = document.getElementsByTagName("a");
	var userID = "";
	var parentNode = "";
	var itemCount = "";
	var favoritesFound = false;
	var favoritesCount = 0;
	var commentsCount = 0;
	var temp = "";
	var additionalSummaryHTML = "";
	var favoritesHeader = "";
	var commentsHeader = "";
	var currentNode = "";

	for (var i = pageLinks.length - 1; i > -1; i--) {
		if (userID == "") {
			var matchAttempt = pageLinks[i].href.match(/\/users\/\d+\//gi);
			if (matchAttempt) {
				userID = (matchAttempt + "").match(/\d+/gi);
			}
		}

		if (pageLinks[i].href.match(/\/users\/\d+\/favorites$/gi)) {
			favoritesCount = pageLinks[i].parentNode.parentNode.getElementsByTagName("li").length * 1;
			temp = pageLinks[i].innerHTML.match(/\d+\s+more/gi) + "";
			favoritesCount += temp.match(/\d+/gi) * 1;
			favoritesFound = true;
		}
	}

	if (userID == "") {
		return false;
	}

	var summaryDT = document.evaluate("//div[@class='summary']/dl", document, null, 9, null).singleNodeValue;

	if (!summaryDT) {
		return false;
	}

	var summaryAreaDTs = document.evaluate("//div[@class='summary']/dl/dt", document, null, 7, null);

	if (summaryAreaDTs.snapshotLength == 0) {
		return false;
	}

	var boxHeaders = document.evaluate("//div[@class='box']/h4", document, null, 7, null);

	for (var i = boxHeaders.snapshotLength - 1; i >= 0; i--) {
		temp = boxHeaders.snapshotItem(i).innerHTML;
		if (temp == "Comments posted") {
			commentsHeader = boxHeaders.snapshotItem(i);
		}

		if (!favoritesFound && temp == "Favorite scripts") {
			favoritesHeader = boxHeaders.snapshotItem(i);
		}

		if (commentsHeader != "" && (favoritesFound || favoritesHeader != "")) {
			break;
		}
	}

	if (!favoritesFound) {
		if (favoritesHeader != "") {
			favoritesCount = favoritesHeader.parentNode.getElementsByTagName("li").length * 1;
			favoritesFound = true;
		}
	}

	if (commentsHeader != "") {
		temp = document.evaluate("//p[@class='subtitle']", commentsHeader.parentNode, null, 9, null).singleNodeValue;
		commentsCount = (temp.innerHTML.match(/^\s*\d+/gi) + "").match(/\d+/gi) * 1;
		commentsFound = true;
	}

	for (var i = summaryAreaDTs.snapshotLength - 1; i >= 0; i--) {
		currentNode = summaryAreaDTs.snapshotItem(i);
		switch (currentNode.innerHTML) {
			case "Reviews Posted":
				currentNode.innerHTML = '<a title="Reviews Posted" href="/users/' + userID + '/reviews">Reviews Posted</a>';
				break;
			case "Forum Posts":
				currentNode.innerHTML = '<a id="forumPostsSummaryLinkID" title="Forum Posts" href="/users/' + userID + '/posts">Forum Posts</a>';
				break;
			case "Jetpacks":
				break;
			case "UserScripts":
				currentNode.innerHTML = '<a title="UserScripts" href="/users/' + userID + '/scripts">UserScripts</a>';
				break;
		}
	}

	additionalSummaryHTML = '<dt><a title="Favorites" href="/users/' + userID + '/favorites">Favorites</a></dt><dd id="favoritesDDID">' + favoritesCount + '</dd>';
	additionalSummaryHTML += '<dt><a title="Comments" href="/users/' + userID + '/comments">Comments</a></dt><dd id="commentsDDID">' + commentsCount + '</dd>';

	summaryDT.innerHTML += additionalSummaryHTML;

	if( !assumeProfileCountsAreCorrect ) {
		// fix fourm posts number
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://userscripts.org/users/" + userID + "/posts",
			onload: function(response) {
				var temp = response.responseText.match( /\d+\s+posts\s+found\s*<\/p>/i );
				var trueNumberOfPosts = (temp+"").match( /\d+/i )*1;
				document.getElementById("forumPostsSummaryLinkID").parentNode.nextSibling.nextSibling.innerHTML = trueNumberOfPosts;
				return true;
			}
		});
		// fix favorites number
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://userscripts.org/users/" + userID + "/favorites",
			onload: function(response) {
				var temp = response.responseText.match( /\d+\s+scripts\s*<\/p>/i );
				var trueNumberOfFavorites = (temp+"").match( /\d+/i )*1;
				if( favoritesCount == trueNumberOfFavorites ) {
					return true;
				}
				document.getElementById("favoritesDDID").innerHTML = trueNumberOfFavorites;
				return true;
			}
		});
		// fix comments number
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://userscripts.org/users/" + userID + "/comments",
			onload: function(response) {
				var temp = response.responseText.match( /\d+\s+posts\s*<\/p>/i );
				var trueNumberOfComments = (temp+"").match( /\d+/i )*1;
				if( commentsCount == trueNumberOfComments ) {
					return true;
				}
				document.getElementById("commentsDDID").innerHTML = trueNumberOfComments;
				return true;
			}
		});
	}

	return true;
};
userscriptsOrgProfileStatsFix();