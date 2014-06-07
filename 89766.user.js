// ==UserScript==
// @name           MTS
// @namespace      MyTempusSelect - Remove Flash Gallery
// @description    Remove animations for VPN
// @include        http://*.mytempusselect.com/*
// @include 	   https://*.mytempusselect.com/*
// @include        http://*.tempusselect.com/*
// @include        https://mytempusselect.com/*
// ==/UserScript==
var slideshow = document.getElementById('slideshow');
if (slideshow) {
    slideshow.parentNode.removeChild(slideshow);
}