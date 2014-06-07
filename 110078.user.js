// ==UserScript==
// @name				Youtube Search Focus
// @version				2011 Aug 13th
// @author				XFox Prower
// @namespace			http://www.TailsArchive.net/
// @description			Focuses the search form on Youtube pages.
// @include				http://*.youtube.com/*
// @exclude				http://*.youtube.com/
// ==/UserScript==

X=document.getElementById('masthead-search-term');
if(X){window.addEventListener('load',function(){X.focus();},false)}