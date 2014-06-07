// FSDaily Link Target Script
// version 0.1
// 2008-04-09
// Copyright (c) 2008, Joshua Rubin
// Released under the GPL license (v3 only)
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          FSDaily Link Target
// @namespace     https://rubixconsulting.com/greasemonkey/
// @description   Remove the annoying target="_blank" on FSDaily pages
// @include       http://fsdaily.com/*
// @include       http://www.fsdaily.com/*
// ==/UserScript==

var arr = document.getElementsByTagName("a");
for (i = 0; i < arr.length; i++) {
   arr[i].target = "_self";
}
