// ==UserScript==
// @name           BottomBar
// @namespace      http://centsports.com/
// @description    Gets rid of the bottom black bar
// @include        http://*centsports.com/*
// @exclude        http://*centsports.com/forum/*
// ==/UserScript==

var bottom = document.getElementById('bottom_fixed');
bottom.style.height = '0px';
