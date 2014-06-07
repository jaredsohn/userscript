// ==UserScript==
// @name           Remove YouTube Chrome Ad
// @version        1.1.1
// @namespace      Techjar
// @description    Removes Chrome AD from YouTube! It's very simple, yet works very well.
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// ==/UserScript==

var ChromePromo1 = document.getElementById('chrome-promo');
var ChromePromo2 = document.getElementsByClassName('homepage-chrome-promo-content');


if(ChromePromo1) {
	ChromePromo1.parentNode.removeChild(ChromePromo1);
}

if(ChromePromo2 && ChromePromo2[0]) {
	ChromePromo2[0].parentNode.parentNode.removeChild(document.getElementsByClassName('side-announcement-box yt-rounded')[0]);
}