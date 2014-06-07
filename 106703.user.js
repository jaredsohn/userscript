// ==UserScript==
// @name		Google+ Notifications mod
// @description	        Thanks to imwill for the original code
// @license		Creative Commons Attribution 3.0 Unported License http://creativecommons.org/licenses/by/3.0/
// @version		0.01
// @include		http://*.google.com/*
// @include		https://*.google.com/*
// @exclude		http://plus.google.com/*
// @exclude		https://plus.google.com/*

// @history		0.01 Initial release

// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = 'span#gbgs1.gbts{display: none;}';
document.documentElement.appendChild(styleEl);


//trying to modify background but can't get it to work yet
//#gbi1a {background-position: -30px -274px;} // not working, need to try something else