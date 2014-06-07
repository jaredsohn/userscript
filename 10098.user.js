// ==UserScript==
// @name           View all comments on Digg  
// @namespace      digg.com
// @description    View all comments on Digg
// @include        http://digg.com/*/*
// @exclude        http://digg.com/*/*/all
// @exclude        http://digg.com/view/*
// @exclude        http://digg.com/*/upcoming
// ==/UserScript==

window.location = window.location + '/all';
