// ==UserScript==
// @name           Google-Tux
// @namespace      http://userscripts.org/scripts/show/75668
// @description    Replace Google Logo With Tux Image
// @include        http://*.google.com*
// @include        http://*.google.com/*
// @exclude        http://*.google.com*/search?*
// ==/UserScript==
var img = document.createElement('img');
	img.id = "Tux-Logo";
        img.href = "http://www.google.com/";
	img.src = 'http://www.google.com/intl/en//images/sitesearch/linux.gif';
var logo = document.getElementById('logo');
logo.parentNode.replaceChild(img, logo);