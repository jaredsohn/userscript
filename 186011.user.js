// ==UserScript==
// @name        しぃアンテナUrlAddAll
// @namespace   http://dic.nicovideo.jp/u/13793317
// @include     http://2ch-c.net/*
// @version     1.0
// @grant       none
// ==/UserScript==

var prev = document.getElementsByClassName("prev-link")[0];
var url = prev.attributes.getNamedItem("href").nodeValue;

if (url.indexOf("?") == -1) {
    url += "?all=true";
} else {
    url += "&all=true";
}
prev.attributes.getNamedItem("href").nodeValue = url;


var next = document.getElementsByClassName("next-link")[0];
var url = next.attributes.getNamedItem("href").nodeValue;

if (url.indexOf("?") == -1) {
    url += "?all=true";
} else {
    url += "&all=true";
}
next.attributes.getNamedItem("href").nodeValue = url;