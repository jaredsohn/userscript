// ==UserScript==
// @name        No More Gif
// @namespace   Abex
// @description Hides the kink to /gif/
// @include     http://boards.4chan.org/*
// @version     1
// ==/UserScript==
document.getElementsByTagName("a")[7].style.display = 'none';