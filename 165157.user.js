// ==UserScript==
// @name        quickmeme
// @namespace   http://www.quickmeme.com
// @include     http://www.quickmeme.com/*
// @version     1
// ==/UserScript==

var allImages = document.getElementsByTagName("img");
for(var i = 0, max = allImages.length; i < max; i++)
    if (allImages[i].src === "http://static.quickmeme.com/media/social/qm.gif"){
       allImages[i].parentNode.removeChild(allImages[i]);
       break;
    }