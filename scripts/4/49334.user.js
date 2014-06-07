// ==UserScript==
// @name Plum
// @namespace Xenite
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com/*
// @exclude http://www.casualcollective.com/radio
// @resource header http://img3.imageshack.us/img3/7756/plumm.png
// ==/UserScript==

GM_addStyle('#header, #topmenu ul li a, #loginbox, #userbox, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} ');