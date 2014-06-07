// ==UserScript==
// @name          Subscene Linkify Title
// @namespace     erosman
// @description   Linkify Subtitle Titles to go to other subtitles for that entry
// @updateURL     https://userscripts.org/scripts/source/159356.meta.js
// @downloadURL   https://userscripts.org/scripts/source/159356.user.js
// @include       http://subscene.com/subtitles/*
// @grant         none
// @author        erosman
// @version       1.1
// ==/UserScript==

/* --------- Note ---------
  This script changes a film Title on a page to a link which goes to other subtitles for that film.

  clicking « back to subtitle list does the same job so this script is not necessary. 
  It is useful only of you prefer to click the 'film Title' instead.


  --------- History ---------

  
  1.1 Code Improvement, querySelector 
  1.0 Initial release

*/



(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict'; // ECMAScript-5

if (frameElement) { return; } // end execution if in a frame, object or other embedding points

var a = document.querySelector('.bread a');
if (!a) { return; } // end execution if not found

var span = document.querySelector('span[itemprop="name"]');
if (!span) { return; } // end execution if not found

var a1 = a.cloneNode(false);
a1.textContent = span.textContent.trim();
span.textContent = '';
span.appendChild(a1);

})(); // end of anonymous function