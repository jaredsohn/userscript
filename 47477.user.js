// ==UserScript==
// @name Clear
// @namespace Zodiac
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com/*
// @exclude http://www.casualcollective.com/radio
// @resource header http://dl.getdropbox.com/u/914129/clear.png
// ==/UserScript==

GM_addStyle('#header, #logo a, #topmenu ul li a, #loginbox, #userbox, #loginbox .lb-content .lb-text, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} ');