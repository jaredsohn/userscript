// ==UserScript==
// @name           eMule Link Cleaner
// @namespace      DrP
// @description    eMule Link Cleaner
// @include        http://tvu.org.ru/index.php?show=ed2k*
// @include        http://tvunderground.org.ru/index.php?show=ed2k*
// @include        http://sharethefiles.com/forum/*
// @include        http://www.tvu.org.ru/index.php?show=ed2k*
// @include        http://www.tvunderground.org.ru/index.php?show=ed2k*
// @include        http://www.sharethefiles.com/forum/*
// ==/UserScript==

var x

x= document.body.innerHTML.replace(/\.\[tvu\.org\.ru\]\./g,'.').replace(/\.\%5Bsharethefiles\.com\%5D\./g,'.').replace(/\.\%5Btvu\.org\.ru\%5D\./g,'.');
document.body.innerHTML = x;

