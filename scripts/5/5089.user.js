// ==UserScript==
// @name			magnolia_blank
// @namespace		magnolia_blank.user.js
// @description	Adds a target_blank to links so that they can open in a new tab and in the background (tabbrowser set appropriately)
// @include		http://ma.gnolia.com/*
//
//	This is a port of "delicious_blank" by Peter Sziebig (sziebig@gmail.com) for ma.gnolia.
//
// ==/UserScript==
(function () {
var domain = 'gnolia.com';
var re = new RegExp('^http://(ma.)?'+domain);
var divTags = document.getElementsByTagName("a");
for (i=0; i<divTags.length; i++) { 
		if(divTags[i].href && !divTags[i].href.match(re)){
			divTags[i].target = "_blank";
		}
}
})();