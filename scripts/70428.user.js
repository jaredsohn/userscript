// ==UserScript==
// @name           youtube: focus search box
// @namespace      http://twoday.tuwien.ac.at/pub/
// @description    automatically focuses the search box on youtube.com
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// ==/UserScript==

document.getElementById("masthead-search-term").focus();
