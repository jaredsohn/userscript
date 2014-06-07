// ==UserScript==
// @name           Freenews Forums NoAds
// @namespace      https://freenews.fr/
// @include        http://forum.freenews.fr/*
// ==/UserScript==

var ads = document.getElementsByClassName('publicite_3');
for (i = 0; i < ads.length; i++) {
    ads[i].parentNode.style.display='none';
}