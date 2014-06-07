// ==UserScript==
// @name          test
// @namespace     http://www.specialx.com
// @description   test
// @include       http://www.torn.com/*
// ==/UserScript==

for (i=0; i<document.images.length; i++)
{
  string source = document.images[0].src;
  alert(source);
}