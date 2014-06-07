// ==UserScript==
// @name        FlickrDivertLinks
// @namespace   vispillo
// @description Redirect to date-posted
// @include     http://www.flickr.com/*
// @require        http://userscripts.org/scripts/source/78952.user.js
// @grant		none
// @version     1
// ==/UserScript==

var old = "http://www.flickr.com/photos/saintseminole/";
var newurl = "http://www.flickr.com/photos/saintseminole/archives/date-posted/";

jQuery('a').each( function (i) {
	if (this.href == old) {
		this.href = newurl;
	}
});