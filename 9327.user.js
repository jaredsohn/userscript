// ==UserScript==
// @name				1mh comic
// @description			Say goodbye to annoying ads ever. (v1.1)
// @include				http://www.1mh.org/html/*
// @include				http://www.5d5m.com/html/*
// @exclude				http://www.1mh.org/*/index.html
// @exclude				http://www.5d5m.com/*/index.html
// ==/UserScript==

var adContainer = document.getElementsByTagName('table')[0];
if (adContainer)
  adContainer.parentNode.removeChild(adContainer);

adContainer = document.getElementsByTagName('table')[1];
if (adContainer)
  adContainer.parentNode.removeChild(adContainer);

adContainer = document.getElementsByTagName('table')[2];
if (adContainer)
  adContainer.parentNode.removeChild(adContainer);

adContainer = document.getElementsByTagName('table')[5];
if (adContainer)
  adContainer.parentNode.removeChild(adContainer);

adContainer = document.getElementsByTagName('table')[6];
if (adContainer)
  adContainer.parentNode.removeChild(adContainer);

