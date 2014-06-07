// ==UserScript==
// @name        Zero Punctuation HD
// @namespace   http://userscripts.org
// @description Automatically switches to the High Quality version of Zero Punctuation video's.
// @include     http://www.escapistmagazine.com/videos/view/zero-punctuation/*
// @version     1
// @grant       none
// ==/UserScript==

var url = window.location;
var pos = String(url).indexOf("?hq=1");

if (pos == -1)
{
location.replace (url + '?hq=1');
}