// ==UserScript==
// @name        What.CD :: Full WhatIMG artist image
// @description Replaces the thumbnailed image on artist pages by the full image
// @namespace   Z4ppy.What.CD
// @include     https://ssl.what.cd/artist.php?id=*
// @include     https://what.cd/artist.php?id=*
// @updateURL   http://userscripts.org/scripts/source/138136.meta.js
// @downloadURL http://userscripts.org/scripts/source/138136.user.js
// @version     1.2.1
// @date        2012-08-27
// ==/UserScript==

var img = document.getElementsByClassName('sidebar')[0].getElementsByTagName('img')[0];
var whatimgr = /(https?:\/\/(www\.)?whatimg\.com\/i\/.*)_thumb(\.(jpe?g|gif|png))/;
var a = whatimgr.exec(img.src);
if(a != null) {
    img.src = a[1] + a[3];
}