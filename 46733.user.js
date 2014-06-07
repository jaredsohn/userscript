// ==UserScript==
// @name Fun Edition V1
// @namespace Ididapoo
// @include http://www.casualcollective.com/*
// @exclude http://www.casualcollective.com/radio*
// @resource header http://i44.tinypic.com/1fk1a1.png
// ==/UserScript==

GM_addStyle('#header, #logo a, #topmenu ul li a, #loginbox, #userbox, #loginbox .lb-content .lb-text, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} ');