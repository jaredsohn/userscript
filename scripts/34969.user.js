// ==UserScript==
// @name           Crewbux Image Remover
// @namespace      Image Remover
// @description    Crewbux Image Remover, Thanks Joe Simmons, Znerp 
// @include        http://www.crewbux.com/*
// ==/UserScript==

var img = document.images[1];
img.parentNode.removeChild(img);