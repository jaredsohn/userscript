// ==UserScript==
// @name           Idol Nacije
// @namespace      www.erepublik.com
// @description    Tribute to Brdar Dragan!
// @include		   http://ww*.erepublik.com/*
// @include		   http://*.erepublik.com/*
// @exclude		   http://ads.erepublik.com
// ==/UserScript==

var allImages, thisImage;
allImages = document.getElementsByTagName('img');
for (var i = 0; i < allImages.length; i++) {
    thisImage = allImages[i];
    thisImage.src = "http://img255.imageshack.us/img255/4397/brdar4.png";
}