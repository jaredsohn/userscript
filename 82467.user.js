// ==UserScript==
// @name           Mother Jones interstitial ad jumper
// @namespace      mojo
// @description    Jumps past Mother Jones interstitial ads
// @include        *motherjones.com*
// @version        1.1
// ==/UserScript==

var url = window.location.href;

if (/inter[0-9]*\.php/.test(url)) {

   var token = 'dest=';
   var pos = url.search(token);
   
   if (pos >= 0) {
   
      pos += token.length;
      
      var newUrl = url.substr(pos, url.length - pos);
      
      if (newUrl.length > 0)
        if (newUrl.substr(0, 7) == 'http://')
          window.location.href = newUrl;
   }
}