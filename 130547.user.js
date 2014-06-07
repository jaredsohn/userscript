// ==UserScript==
// @name          ???
// @namespace     http://www.specialx.com
// @description   ???
// @include       http://www.torn.com/*
// ==/UserScript==

var imgs = document.images[];
for (i=0; i<imgs.length; i++)
{
  string source = imgs[i].src;
  alert(source);
}