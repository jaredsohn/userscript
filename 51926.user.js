// ==UserScript==
// @name           Bux.to No Images
// @namespace      http://userscripts.org/users/95765
// @description    Doesn't show images on jokerbux.com (faster loading)
// @include        http://*bux.to/*
// @exclude        http://*bux.to/login.php
// @exclude        http://*bux.to/success.php
// @exclude        http://*bux.to/view.php?ad=*
// @copyright      Fenixto
// @version        1.2
// ==/UserScript==

var i, imgs, img, imgL;

imgL = document.images.length;

for(i=0; i<imgL; i++) {
img = document.images[i];
img.parentNode.removeChild(img);
}