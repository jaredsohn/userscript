// ==UserScript==
// @name          IMDB Anti-Click-Tracking
// @namespace     erosman
// @description   Remove IMDB Click Tracking
// @updateURL     https://userscripts.org/scripts/source/168360.meta.js
// @downloadURL   https://userscripts.org/scripts/source/168360.user.js
// @include       http://*.imdb.com/*
// @include       https://*.imdb.com/*
// @grant         none
// @author        erosman
// @version       1.4
// ==/UserScript==

/* --------- Note ---------
  Simple Script that removes 'onclick' Tracking of links on IMDB
  It can work on other sites too but some site use onclick event for other 
  necessary functions (not for tracking) and removing them will affect page operations. 
  


  --------- History ---------
  
  1.4 Code Improvement document.links is faster
  1.3 Code Improvement document.querySelectorAll('a[onclick]')
  1.2 Code Improvement
  1.1 Minor changes to the code & include pattern
  1.0 Initial release
  
*/



(function() { // anonymous function wrapper, used for error checking to end execution
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame

var lnk = document.links;
if (!lnk[0]) { return; } // end execution if not found

for (var i = 0, len = lnk.length; i < len ; i++) {
  lnk[i].removeAttribute('onclick');
}

})(); // end of anonymous function