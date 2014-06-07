// ==UserScript==
// @name        FartScroll
// @namespace   http://userscripts.org/users/zackton
// @description  Fart as you scroll, no need to blame it on the dog anymore!
// @include     http://*
// @include     https://*
// @version     1.0
// @require       http://theonion.github.io/fartscroll.js/javascripts/fartscroll.js
// ==/UserScript==

document.addEventListener("DOMContentLoaded", function(){
	fartscroll();
},false);