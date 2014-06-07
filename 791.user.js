/*
 Roger Ebert Reviews

 Version 0.02
 (C) 2005 Jesse Andrews - Licensed under the GPL v2 or later

 log
 0.02 - fixedo use (function() { .. })();

 REQUESTED: This will save having to wait for the first review page to load so you can click through to the print version.

*/

// ==UserScript==
// @name          Roger Ebert
// @namespace     http://overstimulate.com/userscripts/
// @description   Rewrite links to movies to go directly to the review
// @include       http://rogerebert.suntimes.com*
// ==/UserScript==

(function(){
  links = document.getElementsByTagName('A');
  for (i=0; i<links.length; i++) {
    link = links[i];
    if (link.href.match("/REVIEWS/")) {
      link.href = link.href + "&template=printart";
    }
  } 
})();
