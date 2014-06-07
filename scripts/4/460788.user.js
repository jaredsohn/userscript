// ==UserScript==
// @name        Quibblo Improved Photo Viewer 
// @namespace   quibbloalbumviewer
// @description Displays all photos from a user's photo album on one page and opens photos in a new tab when clicked 
// @include     http://www.quibblo.com/user/*/photoalbum*
// @exclude     http://www.quibblo.com/user/*/photoalbum/*
// @version     1.0
// @grant       none
// ==/UserScript==

if (document.location.href.indexOf("&per_page=1000") === -1) {
	document.location.href += "?page=2&per_page=1000";
}

var photos = document.getElementsByClassName("hit");

for (var i = 0; i < photos.length; i++) {
	photos[i].setAttribute("target", "_blank");
}