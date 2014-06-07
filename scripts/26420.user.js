// Redirect to Powerset
// version 0.4

// Redirects to the Powerset version of any en.wikipedia.org article. 

// This is a Greasemonkey user script. 
// 
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/ 
// Then restart Firefox and revisit this script. 
// Under Tools, there will be a new menu item to "Install User Script". 
// Accept the default configuration and install. 
// 
// 
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− 
// 
// ==UserScript== 
// @name          Redirect to Powerset
// @namespace     http://www.powerset.com
// @description   Redirects Wikipedia articles to Powerset 
// @include       http://en.wikipedia.org/wiki/*
// @exclude       http://en.wikipedia.org/wiki/Main_Page
// @exclude       http://en.wikipedia.org/wiki/Talk:*
// @exclude       http://en.wikipedia.org/wiki/Special:*
// @exclude       http://en.wikipedia.org/wiki/Portal:*
// @exclude       http://en.wikipedia.org/wiki/Help:*
// @exclude       http://en.wikipedia.org/wiki/Wikipedia:*
// @exclude       http://en.wikipedia.org/wiki/Category:*
// ==/UserScript== 

var href = document.location.href.split('?')[0]

if (!document.referrer.match('www.powerset.com') && !document.location.search.match(/\?powerset/) && href.match(/\/([^/]+)$/))
	document.location = "http://www.powerset.com/explore/semhtml/" + href.match(/\/wiki\/([^/]*)/)[1]