// ==UserScript==
	// @name 				Subreddit filter for /r/all
	// @namespace 			http://www.github.com/kimagure
	// @description 		Filters out unwanted subreddits from /r/all
	// @include 			http://www.reddit.com/r/all*
// ==/UserScript==

bannedwords = [
	'porn',
	'craft'
];
horriblesubreddits = [
	'trees',
	'wtf',
	'politics',
	'gonewild',
	'todayilearned',
	'4chan',
	'pokemon',
	'reactiongifs',
	'fffffffuuuuuuuuuuuu',
	'atheism',
	'adviceanimals',
	'firstworldanarchists',
	'ImGoingToHellForThis',
	'TwoXChromosomes',
	'mildlyinteresting',
	'nsfw',
	'gentlemanboners',
	'RealGirls'
];

function DeleteorNot(word) {
	if (horriblesubreddits.indexOf(word) != -1)
		return true;
	for (var n = 0; n < bannedwords.length; n++) {
		if (word.search(bannedwords[n]) != -1)
			return true;
	}
	return false;
}

function main() {
	var elements = document.getElementsByClassName("link");
	for (var i = 0; i < elements.length; i++) {
		subreddit = elements[i].getElementsByClassName("subreddit");
		if (subreddit[0] != null) {
			var word = subreddit[0].innerHTML;
			DeleteorNot(word) ? elements[i].outerHTML = '' : '';
		}
	}
}

main();
