// ==UserScript==
// @name eBay Feedback: DSR value next to stars
// @namespace http://userscripts.org/users/85302 
// @include        http://feedback.ebay.com/*
// ==/UserScript==

var t = document.getElementsByClassName('dsrRatingContent')[0].getElementsByTagName('tr');

for(i = 0; i < t.length; i++) {
	t[i].childNodes[1].appendChild(document.createTextNode(' ' + t[i].childNodes[1].childNodes[0].title.replace(' / 5.0', '')));
}