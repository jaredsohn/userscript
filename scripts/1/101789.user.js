// ==UserScript==
// @name           Yahoo Search Tracking Clean dirtyhref
// @description    Replaces tracking link (dirtyhref) with true link (href). v0.1.0 2011-04-25
// @version        0.1.0
// @namespace      JeffersonScher
// @include        http://search.yahoo.com/*
// @license        CC BY http://creativecommons.org/licenses/by/3.0/
// ==/UserScript==

function cleanDirtyHref(){
  var lset=document.links;
  for(var i=0;i<lset.length;i++) if(lset[i].href) lset[i].setAttribute("dirtyhref", lset[i].href);
}
window.setTimeout(cleanDirtyHref,500);  // wait 0.5 seconds