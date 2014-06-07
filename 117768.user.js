// ==UserScript==
// @name           FP Hot Girls Austin Powers Logo Replacement
// @namespace      http://www.userscripts.org
// @description    Replaces the facepunch logo with Austin while browsing the hot girls thread
// @include        http://www.facepunch.com/threads/1089192
// @include        http://www.facepunch.com/threads/1089192/*
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://www.facepunch.com/fp/navbar_inner.png")
{
images[x].src = "http://filesmelt.com/dl/austin1.png";
}
x=x+1;
}
