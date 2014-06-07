// ==UserScript==
// @name			LibraryThing Talk link changer
// @namespace		LTLINK
// @description		changes LibraryThing's "Talk" links from JavaScript to real URLs
// @include			http://*.librarything.com/*
// @include			http://www.librarything.de/*
// ==/UserScript==


var ltlink = location.href;

var ltlang = ltlink.split('/');


var candidates = document.getElementsByTagName("a");

for (var cand = null, i = 0; (cand = candidates[i]); i++ ) {
	if (cand.href.match(/javascript:gototopic/i)) {
		cand.setAttribute("href", "http://" + ltlang[2] + "/talktopic.php?topic=" + cand.href.slice(21, -1));
		cand.setAttribute("onclick", ""); 
	}
}


// version 3.0
// 9 October 2006
// LT changed domains for Germany to www.librarything.de
// so had to change way domain is pulled


// version 2.0
// 6 October 2006
// circeus notes that script only works for English pages
// so added way to pull subdomain consistently
// ex: fr.librarything.com

// version 1.0
// 24-27 October 2006
// created quick GM script to change JavaScript links
// on "Talk" page to regular URLs