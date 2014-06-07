// ==UserScript==
// @name           TwitterFilter
// @namespace      fixnum.org
// @include        http://twitter.com/
// ==/UserScript==

var noRetweets = ['Starbucks', 'dopekidshon']
var noTweets = ['Starbucks']

// Block retweets
var stati = document.getElementsByClassName("status");
for(var i = 0; i < stati.length; i++) {
	var status = stati.item(i);
	
	var retweets = status.getElementsByClassName("shared-content");
	if(retweets.length == 1) {
		var first_retweet = retweets.item(0);
		
		for(var j in noRetweets) {
			if(first_retweet.getElementsByTagName("a").item(0).href == "http://twitter.com/"+noRetweets[j])
				status.style.display = "none";
		}
	}
}

// Block tweets
for(var j in noTweets) {
	var stati = document.getElementsByClassName("u-" + noTweets[j]);
	for(var i in stati) {
		stati.item(i).style.display = "none";
	}
}