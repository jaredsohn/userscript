// ==UserScript==
// @name           The Nation signup ad jumper
// @namespace      thenation
// @description    Jumps past The Nation signup ads, + always full page version
// @include        *thenation.com*
// @version        1.0
// ==/UserScript==

var url = window.location.href;

if (/\/signup\//.test(url)) {

   var token = 'destination=';
   var pos = url.search(token);
   
   if (pos >= 0) {
   
      pos += token.length;
      
      var newUrl = 'http://www.thenation.com/' + url.substr(pos, url.length - pos) + '?page=full';
      
      if (newUrl.length > 0)
         window.location.href = newUrl;
   }
}