// ==UserScript==
// @name StupidMovingThingsRemover
// @namespace http://www.myvin.com.ua   
// @include http://www.myvin.com.ua/*
// ==/UserScript==

var marquee = document.getElementById("news_lenta_bottom");
marquee.parentNode.removeChild(marquee);

var movingBanner = document.getElementById("banner_extra");
movingBanner.parentNode.removeChild(movingBanner);