// ==UserScript==
// @name           Fukung image first
// @namespace      http://www.latinsud.com
// @include        http://fukung.net/*
// @include        http://*.fukung.net/*
// @match	   http://fukung.net/*
// @match          http://*.fukung.net/*
// @version        1.0.1
// ==/UserScript==


img = document.getElementById('image');

if (img) {
	img.style.textAlign='center';
	document.body.insertBefore(img, document.body.childNodes[0]);
}

