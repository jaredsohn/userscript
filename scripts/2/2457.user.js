// ==UserScript==
// @name           Weblabor.hu link jumper
// @namespace      tag:sessy@citromail.hu,2005-12-24:weblaborGM
// @description    Atugorja a Weblabor.hu link vegoldalt, azonnal a bekuldott URL-re visz. // Skip the link-comment page on weblabor.hu
// @include        *weblabor.hu/linkek/*
// @include        *weblabor.hu/blogmarkok/*
// ==/UserScript==

// v2, 2006.01.19.
if (window.location.href.match(/linkek\/\d+/)) {
	window.location.href = window.location.href.replace(/linkek/, 'linkek/latogatas');
}

if (window.location.href.match(/blogmarkok\/\d+/)) {
	window.location.href = window.location.href.replace(/blogmarkok/, 'blogmarkok/latogatas');
}
