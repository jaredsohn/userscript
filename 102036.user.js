// ==UserScript==
// @name Android
// @namespace IrRox
// @include http://old.casualcollective.com/
// @include old.casualcollective.com/*
// @exclude old.casualcollective.com/radio
// @resource header http://img576.imageshack.us/img576/1852/headerfj.png
// ==/UserScript==

GM_addStyle('#header, #topmenu ul li a, #loginbox, #userbox, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} ');