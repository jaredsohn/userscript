// ==UserScript==
// @name        CA-Tools Version 2
// @namespace   castleage
// @description Another fine tool by Hoots
// @include     http://apps.facebook.com/castle_age/*
// @include     http://75.126.76.147/castle/*
// @include     http://web.castleagegame.com/castle/*
// @include     https://apps.facebook.com/castle_age/*
// @include     https://75.126.76.147/castle/*
// @include     https://web.castleagegame.com/castle/*
// @include     https://www.facebook.com/dialog/apprequests*
// @version     2.0.0
// ==/UserScript==

function injectJs() {
	var d = document
	var scr = d.createElement('script');
	scr.type="text/javascript";
	scr.src='http://testweb2.com/hoots/catools.js';
	d.getElementsByTagName('head')[0].appendChild(scr);
}

injectJs();