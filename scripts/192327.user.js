// ==UserScript==
// @name           Comicslate AutoLister
// @description    comicslate.org автолисталка комиксов
// @version        1.0
// @icon           http://comicslate.org/lib/tpl/tempe/logo/flo.png
// @include        http://comicslate.org/*
// ==/UserScript==

var timer = 30000, enabler = 1;
if (enabler == 1) {
setTimeout(function(){document.getElementById('navnext').click();},timer)
}