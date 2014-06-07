// ==UserScript==
// @name          ReduceLnk Bypass
// @namespace     erosman
// @description   Bypass ReduceLnk
// @updateURL     https://userscripts.org/scripts/source/173251.meta.js
// @downloadURL   https://userscripts.org/scripts/source/173251.user.js
// @include       http://rdlnk.co/*
// @grant         none
// @author        erosman
// @version       1.0
// ==/UserScript==


/* --------- Note ---------
  Script made for ReduceLnk (rdlnk.co) 
  You should have JavaScript disabled on that page (ie with NoScript Addon)


  --------- History ---------
  
  
  1.0 Initial release
  
*/


(function() { // anonymous function wrapper, used for error checking to end execution
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame

var targetURL = document.getElementById('urlholder').getAttribute('value');

if (targetURL) {
    window.location = targetURL;
}

})(); // end of anonymous function