// ==UserScript==
// @name			IMGur redirect
// @namespace		http://userscripts.org/users/6623/scripts
// @description		Only show the image, not the rest of the junk
// @version			1.0
// @include			http://imgur.com/*
// ==/UserScript==

var imageLink = document.getElementById('large-image');
if(imageLink.href) {
	window.location = imageLink.href;
}