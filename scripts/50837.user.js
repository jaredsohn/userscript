// ==UserScript==
// @name Night Magma - CC Theme
// @namespace Xenite
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com/*
// @exclude http://www.casualcollective.com/radio
// @resource header http://img2.pict.com/22/c2/39/e6ecc13b4cd9e6600c6e140166/6v4CY/nightmagma.png
// ==/UserScript==

GM_addStyle('#header, #topmenu ul li a, #loginbox, #userbox, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} ');