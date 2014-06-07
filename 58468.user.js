// ==UserScript==
// @name           Flickr - Yahoo!
// @namespace      reality.hk
// @description    remove Yahoo! logo from flickr
// @include        http://www.flickr.com/*
// @include        https://www.flickr.com/*
// ==/UserScript==
// version: 0.1.0

fixFlickr();

function fixFlickr() {
	var logo = document.getElementById("FlickrLogo");
	logo.style.position = 'absolute';
	logo.style.clip = 'rect(0px,100px,30px,0px)';
	logo.style.margin = '0 0 0 -130px';

	var spacer = document.createElement('img');
	spacer.setAttribute('src', 'http://l.yimg.com/g/images/spaceout.gif');
	spacer.setAttribute('width', '130');
	spacer.setAttribute('height', '30');
	logo.parentNode.appendChild(spacer);
	return false;
}