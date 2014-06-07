// ==UserScript==
// @name	MAL One CSS
// @namespace	MAL
// @description	Overrides users' list CSS with your own
// @include	http://myanimelist.net/animelist/*
// @include	http://myanimelist.net/mangalist/*
// ==/UserScript==

var type = /\/mangalist\//.test(document.URL)?'manga':'anime';
var css = document.getElementsByTagName('style')[0];

if (/You are viewing your (anime|manga) list/.test(document.body.innerHTML)) {
	GM_setValue(type, css.innerHTML);
} else {
	css.innerHTML=GM_getValue(type, css.innerHTML);
}