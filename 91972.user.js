// ==UserScript==
// @name          Censored google images
// @namespace      Aaron Russell edited by yoshivb
// @include        http://*.google.*/images?hl=*
// ==/UserScript==

var pic = "http://censored.cc/styles/prosilver/imageset/censored.png";
var a = "-1";
while (a<document.images.length) {
a++;
document.images[a].src=pic;
}