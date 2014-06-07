copy this into commingsoon.net script

// ==UserScript==
// @name               Comingsoon.net Cleaner
// @namespace          ValleyBoy
// @description        Gets rid of DVD and Top Advert
// @include            http://*comingsoon.net/*
// ==/UserScript==

var Header, Slideshow, Right;
Header = document.getElementById('header_advertisement_top');
if (Header) {
Header.parentNode.removeChild(Header);
}


Slideshow = document.getElementById('header_slideshow');
if (Slideshow) {
Slideshow.parentNode.removeChild(Slideshow);
}

Right = document.getElementById('header_advertisement_right');
if (Right) {
Right.parentNode.removeChild(Right);
} 