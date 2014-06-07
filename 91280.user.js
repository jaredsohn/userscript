// ==UserScript==
// @name          URL Cleaner
// @version       1.0
// @date          2010-11-25
// @description   Cleans Urls And Speeds Up Page Loading Time
// @copyright     Copyright 2008-2010 Tony White
// @include       http://*
// @include       https://*
// ==/UserScript==

// to enable when browsing photo galleries, change the following value to true:
var enableInGalleries = true;

function checkURL(event) {
   if (reg.test(location.href)) {
      if (!(/photo\.php.*#.*photo\.php/i.test(location.href)) || enableInGalleries) { // thanks, discrete structures
         document.removeEventListener('DOMNodeInserted', checkURL, true); // we need to remove the event listener or we might cause an infinite loop apparently
         location.replace(location.href.replace(reg, '$1$3'));
      }
   }
}

if (top.location == location && /\.facebook\.com$/i.test(location.hostname)) {
   var reg = /^(https?:#\#/#\#/#(#[#-#a#-#z#0#-#9#]#+#\#.#)#*facebook\.com)#\#/#[#^#]*#!##!!(\/.*)/i;
   document.addEventListener('DOMNodeInserted', checkURL, true);