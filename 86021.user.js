// ==UserScript==
// @name           nyt_always_allpages
// @namespace      http://www.comedicironpyrite.com/021509INVALID
// @description    Redirects applicable NYTimes articles to their single page format
// @include        http://www.nytimes.com/*
// @include	   https://www.nytimes.com/*
// @match          http://www.nytimes.com/*
// @match	   https://www.nytimes.com/*
// @version        2.1 2012-05-12
// ==/UserScript==

/* Written 2009 by Gillelmus */
/* Updated 2012 by Gillelmus */
/* Added @match for Chrome users */

var myloc = window.location.href;
var myparam = "pagewanted=all";
var multiPage = document.getElementById("pageLinks");
if (!(myloc.match(myparam)) && (multiPage != null)) {
	var mylocSuffix=(myloc.match(/\?/))?"&pagewanted=all":"?pagewanted=all";
	window.location.replace(myloc + mylocSuffix);
}