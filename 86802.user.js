// ==UserScript==
// @name           flickrAllowSaveAs
// @description    for logged in flickr users - removes spaceball div
// @copyright      2010, Hasan Tayyar BEŞİK (http://hasantayyar.com)
// @license        LGPL 
// @include        http://www.flickr.com/*
// ==/UserScript==

function removeDivL1(){
 pl1 = document.getElementById("liquid-photo");
 imgUrl = i.getAttribute("src");
 window.open(imgUrl);
}
removeDivL1();