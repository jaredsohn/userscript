// ==UserScript==
// @namespace     http://c.partiot.free.fr/
// @name          Google in Wikipedia
// @description   Inserts links to Google searches related to the Wikipedia Articles
// @include       http://*.wikipedia.org/wiki/*
// ==/UserScript==

var balise=document.getElementsByTagName('h1');
var titre=balise[0].innerHTML;
balise[0].innerHTML=titre+'<p style="font-size:10px;"><a href="http://www.google.com/search?q='+titre+'">Google</a></p>'
