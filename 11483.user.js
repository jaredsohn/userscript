// ==UserScript==
// @name           ShowTitle
// @namespace      showTitle
// @description    Show the title of the image in xkcd.com pages
// @include        http://xkcd.com/*
// ==/UserScript==

var images = document.getElementsByTagName('img');
var img = null;

for (var i in images) {
 if (images[i].src && images[i].src.match("/comics/")) {
  img = images[i];
  break;
 }
}


if (img) {
 var div = img.parentNode;
 var title = document.createElement('div');
 title.innerHTML = img.title;
 div.insertBefore(title, img.nextSibling);
}