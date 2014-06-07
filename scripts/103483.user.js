// ==UserScript==
// @name           Hide "YouTube" from page title
// @namespace      http://userscripts.org/users/zachisokay
// @include        http://www.youtube.com/*
// ==/UserScript==

var str=document.title.split("YouTube - ");
document.title = str[1];