// ==UserScript==
// @name           Newgrounds Mod All
// @namespace      mod_all@snakehole.net
// @description    Mod everyone on NG!
// @include        http://*.newgrounds.com/*
// ==/UserScript==
var theImage, altText;
theImage = document.getElementById('NDLEF');
if (theImage) {
    altText = document.createTextNode(http://licon.ngfiles.com/level59F.gif.alt);
    theImage.parentNode.replaceChild(altText, http://licon.ngfiles.com/level59F.gif);
}