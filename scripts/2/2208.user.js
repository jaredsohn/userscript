// ==UserScript==
// @name           Bookmark/quick search combo
// @namespace      http://henrik.nyh.se
// @description    Allows the combination of quick search and bookmark in one. Simply install the script and then add bookmarks like http://example.com/find?q=%s#http://www.example.com. That is: the quick search URL, then a #, then the regular URL. Bookmarks/quick searches can still contain "#" parts (hashes); the script splits at the first "#http" only.
// @include        *#http://*
// @include        *#https://*
// ==/UserScript==

const delimiter = "#http";

var parts = location.href.split(delimiter);
var search = parts[0];
var bookmark = "http" + parts.slice(1).join(delimiter);

if (search.indexOf("%s") != -1) 
	location.replace(bookmark);
else
	location.hash = location.hash.split(delimiter)[0];
