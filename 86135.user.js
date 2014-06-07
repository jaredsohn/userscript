// ==UserScript==
// @name           Autokadabra YouTube Fullscreen
// @namespace      kadabra
// @include        http://autokadabra.ru/*
// @include        http://*.autokadabra.ru/*
// ==/UserScript==
var elems = document.getElementsByTagName('object')
for(var i=0; i<elems.length; i++)  elems[i].innerHTML = elems[i].innerHTML.replace('<embed','<param name="allowFullScreen" value="true"></param><embed').replace('type="application/x-shockwave-flash"','type="application/x-shockwave-flash" allowfullscreen="true" ').replace('hl=en','hl=en&amp;fs=1').replace('hl=en" type','hl=en&amp;fs=1" type');
return true;