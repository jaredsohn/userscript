// ==UserScript==
// @name           IMDB Hide Ad Banner
// @namespace      http://adamlc.co.uk
// @description    Hide the advert banner that appears on the top of IMDB
// @include        http://www.imdb.com/*
// ==/UserScript==
ads=document.getElementById('supertab');
ads.parentNode.removeChild(ads);