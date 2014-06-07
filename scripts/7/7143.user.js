// ==UserScript==
// @name	Fotobilder Downloader
// @namespace	http://vinnietesla.com/amusements
// @description	Changes Fotobilder gallery HTML links to direct image links
// @include	http://pics.livejournal.com/*
// ==/UserScript==


if (location.pathname.indexOf("gallery") > -1){
  for (var i=0; i<document.links.length; i++) {
    link = document.links[i];
	   if (document.links[i].pathname.indexOf("pic/") > -1) {
      document.links[i].pathname = document.links[i].pathname.replace(/\/[^\/]+$/, "");
    }
 }
 }
