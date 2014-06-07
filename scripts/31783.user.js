// ==UserScript==
// @name			Bypass YouTube Censor
// @namespace		http://userscripts.org/scripts/show/31783
// @description		Bypasses the YouTube Censor for anonymous users
// @version			0.2
// @copyright		2008 DarkJedi613
// @include			*.youtube.com/verify_age?*
// ==/UserScript==

function insertAfter(newElement, precedingElement) {
	if (precedingElement) {
		precedingElement.parentNode.insertBefore(newElement, precedingElement.nextSibling);
	}
}

function getURLParameter(name, url) {
	if (url == null) {
		url = document.URL;
	}
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regex = new RegExp("[\\?&]"+name+"=([^&#]*)");
	var results = regex.exec(url);
	if (results == null) {
		return null;
	} else {
		return results[1];
	}
}

function embedPlayer(video_id) {
	var playerDiv = document.createElement('div');
	playerDiv.id = "watch-player-div";
	playerDiv.class = "flash-player";
	var player = document.createElement('embed');
	player.height = "344px";
	player.width = "425px";
	player.flashvars = "video_id=" + video_id +"&amp;enablejsapi=1&amp;jsapicallback=gsPlayerReady";
	player.allowscriptaccess = "always";
	player.allowfullscreen = "true";
	player.quality = "best";
	player.bgcolor = "#FFFFFF";
	player.name = "movie_player";
	player.id = "movie_player";

	player.src = "http://www.youtube.com/v/" + video_id + "&hl=en&fs=1";
	player.type = "application/x-shockwave-flash";
	playerDiv.appendChild(player);

	// This points to whatever is above the notice saying it can't be watched
	var previousElement = document.evaluate(
		"//div[@id='masthead']",
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null).singleNodeValue;
	previousElement.parentNode.removeChild(previousElement.nextSibling.nextSibling);

	insertAfter(playerDiv, previousElement);
}

embedPlayer(getURLParameter("v", unescape(document.URL)));