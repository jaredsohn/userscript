// ==UserScript==
// @name          Rotten Tomatoes Decimal Rating
// @namespace     erosman
// @description   Change Base 5 Rating of Rotten Tomatoes to Base 10
// @updateURL     https://userscripts.org/scripts/source/407724.meta.js
// @downloadURL   https://userscripts.org/scripts/source/407724.user.js
// @include       http://www.rottentomatoes.com/*
// @grant         none
// @author        erosman
// @version       1.0
// ==/UserScript==

/* --------- Note ---------
  This script changes the Base 5 rating of Rotten Tomatoes to Base 10.
  (per request: http://userscripts.org/topics/205596)


  --------- History ---------
  

  1.0 Initial release
  
*/



(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame

var elem = document.getElementsByClassName('fan_side');
if (!elem[0]) { return; }  // end execution if not found

var help = elem[0].getElementsByClassName('help');
if (help[0]) {
  help[0].setAttribute('tip', 
  help[0].getAttribute('tip').replace(/([\d.]+) star/, function(m) { return 2*parseFloat(m)+ ' star'; }));
}

var critic = elem[0].getElementsByClassName('critic_stats');
if (critic[0]) {
  critic[0].innerHTML = critic[0].innerHTML.replace(/([\d.]+)\/5/, function(m) { return 2*parseFloat(m)+ '/10'; });
}


})(); // end of anonymous function