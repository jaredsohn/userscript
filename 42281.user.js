// ==UserScript==
// @name           Reddit Batch Link Opener
// @namespace      http://www.nivler.com/?greasemonkey
// @description    Opens all the links from a page in reddit in a new tab
// @include        http://www.reddit.com/r/*
// @exclude        http://www.reddit.com/r/*comments*
// ==/UserScript==

(
function()
{
	if (!confirm('Open all links in tabs?')) { 
		return;
	}
	var allEntries = document.getElementsByClassName('entry');
	for (var a = 0; a<allEntries.length; a++) {
		GM_openInTab(allEntries[a].getElementsByTagName('a')[0]);
	}
}
)();