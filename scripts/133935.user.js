// ==UserScript==
// @name          Link to Danbooru Artist Page
// @namespace     http://www.funkafied-69.com/gmscripts
// @description   Changes artist tag '?' links on various sites to link to their respective Danbooru artist info page. 
// @include       http://konachan.com/post/show/*
// @include       https://yande.re/post/show/*
// @include       http://chan.sankakucomplex.com/post/show/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version       1.0
// ==/UserScript==

// Code for "tag-type-artist" class tags (Danbooru-like sites)
var artTags = $(".tag-type-artist a:first-child");

for (var i=0; i<artTags.length; i++) {
	var tag = $(artTags[i]).attr('href').split('=')[1];
	$(artTags[i]).attr('href', 'http://danbooru.donmai.us/artist/show?name='+tag);
}