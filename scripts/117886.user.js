// ==UserScript==
// @name           Wanderd
// @namespace      http://userscripts.org/users/101059
// @description    Road To Nowhere
// @include        *
// ==/UserScript==

var links=document.getElementsByTagName("a");
var rndm;

setTimeout(function() {
 if (links.length>0) {
  rndm=Math.floor(Math.random()*links.length);
  window.location.replace(links[rndm].href);
 }
}, 30000);
