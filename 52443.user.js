// ==UserScript==
// @name           Dehashtag
// @namespace      http://userscripts.org/users/96892
// @description    Makes Twitter posts readable by removing hashtags: hash signs are removed from the middle of tweets, and hashtags at the end of tweets are made smaller so they don't appear to be part of the sentence. Far from perfect (for example, in "post with #hashtag" the word "hashtag" will become smaller)... I fully admit that this is a dirty hack that tries to treat the symptom rather than the problem.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

var entries, entry;

entries = document.evaluate(
		"//*[@class='entry-content']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

for (var i = 0; i < entries.snapshotLength; i++) {
	entry = entries.snapshotItem(i);
	// remove hashes from tags in the middle of tweet (with space after them)
	entry.innerHTML = entry.innerHTML.replace(/#(\S+\s)/g, '$1');
	// make tag at the end of tweet smaller
	entry.innerHTML = entry.innerHTML.replace(/#(\S+)<\/a>$/,
			'<span style="font-size:.8em;">$1</span></a>');
}

