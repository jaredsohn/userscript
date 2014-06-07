// ==UserScript==
// @name          WBB Clean Thread Title
// @namespace     erosman
// @description   Removes Unwanted strings from Title URL
// @updateURL     https://userscripts.org/scripts/source/172351.meta.js
// @downloadURL   https://userscripts.org/scripts/source/172351.user.js
// @include       http://www.warez-bb.org/viewtopic.php?*
// @include       http://www.warez-bb.org/search.php?*
// @grant         none
// @author        erosman
// @version       1.2
// ==/UserScript==

/* --------- Note ---------
  This script removes extra strings from the title of posts like &highlight= , &start=0 , &sid=*****
  Tested on WBB3


  --------- History ---------
  
  1.2 Code Improvement querySelector
  1.1 Code Improvement
  1.0 Initial release
  
*/


(function name() { // anonymous function wrapper, used for error checking to end execution
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame

var thTitle = document.querySelector('.heading a');
if (!thTitle) { return; }  // end execution if not found

thTitle.href = thTitle.href.replace(/&start=0|&highlight=|&sid=[^&]+/g, '');

})(); // end of anonymous function