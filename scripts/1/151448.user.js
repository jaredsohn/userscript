// ==UserScript==
// @name        Indian Express Single Page News Articles
// @namespace   -
// @description Load Single Page Format for News Articles
// @include     http://www.indianexpress.com/news/*
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==

var loc = window.location.href;
if(loc.substr(-1) != 0)
	window.location.href = loc.substr(-1) == "/" ? loc + "0" : loc + "/0";
