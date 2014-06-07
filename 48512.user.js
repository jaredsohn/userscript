// ==UserScript==
// @name           ngs.ru ad-remover
// @namespace      dipp
// @description    removes advert
// @include        http://ngs.ru/*
// @include        http://*.ngs.ru/*
// ==/UserScript==

var advert = document.getElementById('top-news-articles');
if (advert)
	advert.parentNode.removeChild(advert);

advert = document.getElementById('td_header_right');
if (advert)
	advert.parentNode.removeChild(advert);
