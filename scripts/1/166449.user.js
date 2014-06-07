// ==UserScript==
// @name        Duolinguo - Language navigation
// @namespace   duolinguo
// @description disables language navigation dropdown
// @grant       none
// @include     http://duolingo.com/*
// @version     1
// ==/UserScript==

window.onload=function () {
	document.getElementsByClassName('user-nav language-switcher')[0].style.display = 'none';
	}