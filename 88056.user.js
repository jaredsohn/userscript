// ==UserScript==
// @name           rockmanpm.com oekaki porn viewer
// @include        http://rockmanpm.com/oekaki/*
// @include        http://oekaki.rockmanpm.com/*
// ==/UserScript==

var images = document.getElementsByTagName("img");

for(var i=0; i<images.length; i++) {
 var src = images[i].src;
 var srcMatch = src.match('pr0n.png');
 if (srcMatch != null) {
  var imagenumber = images[i].title.replace(/[^0-9]*/, '');
  imagenumber = parseFloat(imagenumber);
  images[i].src = "http://rockmanpm.com/oekaki/pictures/rpm" + imagenumber + ".png";
 }
}