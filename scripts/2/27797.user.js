// ==UserScript==
// @name           BitScreen Semplify
// @namespace      bitschif
// @author	   Joe Slang
// @description    Go directly to bitscreen image
// @include        http://bitscreens.com/*viewer*
// ==/UserScript==


var allImages, thisImage,allBr,allCenter;

allImages = document.getElementsByTagName('img');

var href = window.location.href;
for (var i = 0; i < allImages.length; i++) {
    thisImage = allImages[i];

var title1,title2;

title1 = thisImage.title;
title2 = thisImage.src.substring(thisImage.src.lastIndexOf('/')+1);
if (title1 == title2){

window.location.href = thisImage.src;


}

}
