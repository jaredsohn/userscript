// ==UserScript==
// @name          Facebook URL Cleaner
// @version       1.0
// @date          2011-02-16
// @description   Cleans Facebook URLs that don't actually take you to a new page.
// @namespace     http://www.jamiejones.org/greasemonkey/
// @copyright     Modified by Jamie Jones. Original Copyright 2008-2010 Jordon Kalilich (http://www.theworldofstuff.com/)
// @license       GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @require       http://usocheckup.dune.net/97208.js?maxage=3
// @include       http*://*.facebook.com/*
// ==/UserScript==

// to enable when browsing photo galleries, change the following value to true:
var enableInGalleries = false;
var removeTheater = true;

function checkURL(event) {
   if (reg.test(location.href)) {
      if (!(/photo\.php.*#.*photo\.php/i.test(location.href)) || enableInGalleries || ( removeTheater && (/photo\.php.*#.*photo\.php.*theater/i.test(location.href))) ) { // thanks, discrete structures
         document.removeEventListener('DOMNodeInserted', checkURL, true); // we need to remove the event listener or we might cause an infinite loop apparently
         location.replace(location.href.replace(reg, '$1$3'));
      }
   }
}

if (top.location == location && /\.facebook\.com$/i.test(location.hostname)) {
   var reg = /^(https?:\/\/([-a-z0-9]+\.)*facebook\.com)\/[^#]*#!(\/.*)/i;
   document.addEventListener('DOMNodeInserted', checkURL, true);
}
