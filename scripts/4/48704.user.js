// ==UserScript==
// @name           LJTweetHider
// @namespace      http://praveengarlapati.blogspot.com
// @description    Hide Blogs which are Tweet Aggregators
// @include        http://*.livejournal.com/friends/*
// ==/UserScript==

var allLinks = document.getElementsByTagName('a');

var allLinksLength = allLinks.length;
	
	for (var i=0; i<allLinksLength; i++) {
	    if (allLinks[i].hostname == "www.loudtwitter.com"){
			allLinks[i].parentNode.parentNode.parentNode.style.display = 'none';
		}
	}
