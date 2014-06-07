// ==UserScript==
// @name        Headlines URL fixer
// @description Headlines URL fixer
// @include     http://*.headlines.ru/*
// @version     1
// @grant       none
// ==/UserScript==

var links = document.getElementsByTagName("a"); //array

var regex = /^(http:\/\/www\.headlines\.ru\/gonews\.php\?f=)([^\&]+)\&t=(.+)$/i;

for (var i=0,imax=links.length; i<imax; i++) {
    links[i].href = links[i].href.replace(regex,"$3");
//    console.log (links[i].href);
}