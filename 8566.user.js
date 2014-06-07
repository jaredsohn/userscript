// ==UserScript==
// @name          flickr remove cho image from roanoke.com
// @description	  removes the nasty image of cho from roanoke times articles
// @namespace	  http://www.flickr.com/photos/swfbuilder/
// @include       http://roanoke.com/*
// @include       http://www.roanoke.com/*
// ==/UserScript==

// v0.1 - April 18th 2007: changes to roanoke.com

GM_addStyle("#story-add img { display: none; }");