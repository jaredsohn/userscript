// ==UserScript==
// @name        Battlelog Item Hider
// @namespace   BIH
// @include     http://battlelog.battlefield.com/bf4/*
// @version     1-central
// @grant       none
// ==/UserScript==

var sc = document.createElement('script');
	sc.type = 'text/javascript';
	sc.src = 'http://www.timmaeh.de/bih/script.js';
	document.body.appendChild(sc);