// ==UserScript==
// @name          	Facebook URL Cleaner
// Last Edited		December 2013

// @include       	http*://*.facebook.com/*
// ==/UserScript==

/*
This script was modified in December 2013.
While the original version is I do not know anymore who the creator.
I'm Sorry...!
*/


var enableInGalleries = false;

function checkURL(event) {
   if (reg.test(location.href)) {
      if (!(/photo\.php.*#.*photo\.php/i.test(location.href)) || enableInGalleries) { // thanks, discrete structures
         document.removeEventListener('DOMNodeInserted', checkURL, true); // we need to remove the event listener or we might cause an infinite loop apparently
         location.replace(location.href.replace(reg, '$1$3'));
      }
   }
}

if (top.location == location && /\.facebook\.com$/i.test(location.hostname)) {
   var reg = /^(https?:\/\/([-a-z0-9]+\.)*facebook\.com)\/[^#]*#!(\/.*)/i;
   document.addEventListener('DOMNodeInserted', checkURL, true);
}
