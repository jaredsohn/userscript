// ==UserScript==
// @name        Viadeo
// @description Viadeo tuning
// @namespace   chooz
// @author      chooz
// @version     1.1.201312
// @updateURL   http://userscripts.org/scripts/source/180459.user.js
// @include     http://*.viadeo.com/*
// ==/UserScript==

var buf;
if (buf = document.getElementById('content')) {
	buf.innerHTML = buf.innerHTML.replace(/blurry/g, "");
}
if (buf = document.getElementById('recapCallAction')) {
	buf.style.display = 'none';
}
if (buf = document.getElementById('modalbox')) {
	buf.style.display = 'none';
}
if (buf = document.getElementsByClassName('backgroundMask')[0]) {
	buf.style.display = 'none';
}
alert(document.getElementsByClassName('backgroundMask')[0].id + ' ' + document.getElementsByClassName('backgroundMask2990')[0].innerHTML);