// ==UserScript==
// @name       Youtube Feather Beta Padding Fix
// @version    0.1
// @description  Attempts to fix an issue with Youtube's Feather beta which caused videos to be drawn outside the screen
// @include        http://*.youtube.*
// @include        https://*.youtube.*
// @exclude        http://*.youtube.*/embed/*
// @exclude        https://*.youtube.*/embed/*
// @run-at         document-end
// @copyright  2012+, You
// ==/UserScript==

var feather = document.getElementById('lc');
feather.setAttribute('style', '-webkit-transition: none; transition: none; padding-left: 0px;');
