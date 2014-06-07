// ==UserScript==
// @name           Reditt Redirect
// @namespace      http://dy-verse.blogspot.com
// @description    Redirects Reditt Links opened from Google RSS reader to location of artivle
// @include        http://www.reddit.com/*comments/*
// ==/UserScript==

if (document.referrer == "http://www.google.com/reader/view/")
{
	var start = document.location.href.indexOf("comments/") + "comments/".length
	var end = document.location.href.indexOf("/", start);
	document.location = document.getElementById("title_t3_"+ document.location.href.substring(start,end)).href

}