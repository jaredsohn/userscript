// ==UserScript==
// @name        Tweets Ban
// @description Allow to hide tweets from a user you follow without unfollowing him
// @version     1.1.0
// @updateURL   http://userscripts.org/scripts/source/137072.user.js
// @author      Marco Seguri <marco dot seguri at gmail dot com>
// @include     http*://twitter.com/*
// ==/UserScript==

var hideTweets = function() {
	var userToHide = 'BillGates', // substitute with the user you want to hide
		divCollection = document.getElementsByTagName("div"),
		occurrences = 0,
		i,
		k;
	for (i = 0; i < divCollection.length; i++) {
		if (divCollection[i].getAttribute("class") === "js-stream-item stream-item stream-item expanding-stream-item") {
			var links = divCollection[i].getElementsByTagName("a"),
				re = new RegExp(".*" + userToHide + "$");
			for (k = 0; k < links.length; k++) {
				if (links[k].getAttribute("class") === "account-group js-account-group js-action-profile js-user-profile-link" && links[k].getAttribute("href").match(re)) {
					divCollection[i].style.display = "none";
					occurrences++;
				}
			}
		}
	}
	console.log("Hid " + occurrences + " tweets by " + userToHide);
}

var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        hideTweets();
        clearInterval(readyStateCheckInterval);
    }
}, 500);