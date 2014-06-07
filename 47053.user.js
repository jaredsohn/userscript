// ==UserScript==
// @name Turquoise
// @namespace Xenite
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com/*
// @exclude http://www.casualcollective.com/radio
// @resource background http://img5.imageshack.us/img5/1867/turuoise2.png
// @resource header http://img14.imageshack.us/img14/1830/turquoise.png
// ==/UserScript==

GM_addStyle('body {background-image: url(\''+GM_getResourceURL('background')+'\');} #header, #logo a, #topmenu ul li a, #loginbox, #userbox, #loginbox .lb-content .lb-text, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} ');