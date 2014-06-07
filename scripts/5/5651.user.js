// ==UserScript==
// @name           No ads in Syria-News, Cham press and Syria Steps
// @namespace      http://kassaralzabadi.googlepages.com/greasemonkey
// @description    Remove all advertising from Syria-News, Champress, and Syriasteps, updated Nov 2006
// @include        http://*.syria-news.com/*
// @include        http://*.syria-news.tv/*
// @include        http://syriasteps.com/*
// @include        http://champress.net/*
// ==/UserScript==

var s = document.body.innerHTML;
s = s.replace(/(src=.+banner[^ ]+)/ig,' style=\"display:none\" ');
s = s.replace(/(src=.+paner[^ ]+)/ig,' style=\"display:none\" ');
document.body.innerHTML = s;


