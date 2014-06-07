// ==UserScript==
// @name           Block Images
// @namespace      http://userscripts.org/users/23652
// @description    Blocks images you blacklist in the source
// @include        http://*
// @include        https://*
// @include        file://*
// @copyright      JoeSimmons
// ==/UserScript==

var image, blacklist = new Array(
"/intl/en_ALL/images/logo.gif",
"/intl/en_ALL/images/logo2.gif"
);

for(var i=document.images.length-1; i>=0; i--) {
image = document.images[i];
for(var x=blacklist.length-1; x>=0; x--) {
if(image.src.indexOf(blacklist[x])!=-1) image.parentNode.removeChild(image);
}
}