// ==UserScript==
// @name        boerse.bz instant redirect
// @namespace   *
// @include     http://www.boerse.bz/out/*
// @version     1
// @grant       none
// ==/UserScript==
var curl = window.location.href;
var urlp = curl.split("=");
if(urlp.length > 1) {
	window.location.href=urlp[1];
}