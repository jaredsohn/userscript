// ==UserScript==
// @name           FBADA
// @namespace      com.Isham.googleplus.hidetrends
// @description    FBADA
// @version        1.0
// @include        https://plus.google.com/*
// ==/UserScript==

var trendsDOM = document.querySelector('div[class="k-B-yd-nb"]');

if (trendsDOM) {
  trendsDOM.style.backgroundImage="url('http://www.zingerbugimages.com/backgrounds/light_blue_retro_circles.jpg')";
}