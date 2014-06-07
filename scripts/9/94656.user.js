// ==UserScript==
// @name           Flick
// @namespace      http://www.flickr.com/photos/*
// @include        http://www.flickr.com/photos/*
// ==/UserScript==

a=document.getElementsByTagName("img")[4].src;
document.getElementById("head").innerHTML+="<a href='"+a+"'> Stiahni obrazok </a>";