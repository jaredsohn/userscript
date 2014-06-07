// ==UserScript==
// @name           Remove cookie advisor (UE Users) in Google Search
// @author         nitrus
// @namespace      http://userscripts.org/scripts/show/151429
// @description    This script remove Chrome ad window in Google Homepage, and skip the cookie advisor for UE users in google search.
// @icon           http://www.google.com/images/google_favicon_128.png
// @grant          none
// @updateURL      https://userscripts.org/scripts/source/151429.meta.js
// @include        http://www.google.*/*
// @include        https://www.google.*/*
// @run-at         document-start
// @require        https://code.jquery.com/jquery-1.11.0.min.js
// @version        1.3
// ==/UserScript==

//Remove chrome ad window.
{setInterval(function()
{
	var ids = ['pmocntr2'];
	
	for (var id in ids)
		document.getElementById(ids[id]).style.display = "none";
}, 1);}

//Remove blue bar, for windows 8 google app search - (Windows 8+ Users).
{setInterval(function()
{
	var ids = ['pushdown'];
	
	for (var id in ids)
		document.getElementById(ids[id]).style.display = "none";
}, 100);
}

//Skip cookie advisor for UE users.
{setInterval(function()
{
	var ids = ['epbar'];
	
	for (var id in ids)
		document.getElementById(ids[id]).style.display = "none";
}, 100);
}