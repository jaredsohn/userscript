// ==UserScript==
// @name           ZDF without flash
// @namespace      binfalse.de
// @description    zdf mediathek is contaminated with f**king flash..
// @include        http://www.zdf.de/ZDFmediathek/*
// ==/UserScript==

if (!document.URL.match (/flash=off/))
{
	var raute = document.URL.indexOf ('#');
	if (raute == -1) raute = document.URL.length;
	
	window.location.href = document.URL.substring(0,  raute) + "?flash=off";
}
