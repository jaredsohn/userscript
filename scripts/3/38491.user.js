// ==UserScript==
// @name           Lazyassthing
// @namespace      myass
// @description    shows hidden comics for asp
// @include        *amazingsuperpowers.com/ComicArchive/*.htm
// ==/UserScript==

var fullUrl = document.location.href;
var re= /.*ComicArchive\/([0-9]+)\.htm/;
var comicID = fullUrl.replace(re, "$1");
var img = document.createElement('img');
img.setAttribute('src', 'http://www.amazingsuperpowers.com/etc/Hidden'+ comicID  + '.jpg');
document.getElementsByTagName("map")[0].appendChild(img);