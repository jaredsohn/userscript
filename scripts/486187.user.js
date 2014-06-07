// ==UserScript==
// @name          Joplin Globe
// @namespace     erosman
// @description   Removes the Unwanted
// @updateURL     https://userscripts.org/scripts/source/486187.meta.js
// @downloadURL   https://userscripts.org/scripts/source/486187.user.js
// @include       http://www.joplinglobe.com/*
// @grant         none
// @author        erosman
// @version       1.2
// @run-at        document-start
// ==/UserScript==

/* --------- Note ---------
  This script removes some of the external JavaScript that cause the pop-ups.
  Per request: http://userscripts.org/topics/215312
  


  --------- History ---------
  
  1.2 Code Improvement
  1.1 Code Improvement, @run-at document-start 
  1.0 Initial release
  
*/



(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict'; // ECMAScript 5

if (frameElement) { return; } // end execution if in a frame/object/embedding points

// listening for the script execution
document.addEventListener('beforescriptexecute', removeJS, false);

function removeJS(e) {
  
  var uri = e.target.src;
  if(!uri) { return; } // end execution if not external script
  
  switch (true) {

    case uri.indexOf('newsmemory.com') !== -1:
    case uri.indexOf('neighborsink.com') !== -1:
      e.preventDefault();
      e.stopPropagation();
      break;
  }
}


})(); // end of anonymous function
