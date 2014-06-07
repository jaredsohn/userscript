// ==UserScript==
// @name           No Images
// @namespace      http://userscripts.org/users/467850
// @description    Doesn't show images
// @include        http://ck101.com/*
// @copyright      Heiyangz
// @version        1.0
// ==/UserScript==

var i, imgs, img, imgL;

imgL = document.images.length;

for(i=0; i<imgL; i++) {
img = document.images[i];
img.parentNode.removeChild(img);
}