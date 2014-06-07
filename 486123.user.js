// ==UserScript==
// @name          Image alt2title
// @namespace     erosman
// @description   Adds Image's Alt to its Title
// @updateURL     https://userscripts.org/scripts/source/486123.meta.js
// @downloadURL   https://userscripts.org/scripts/source/486123.user.js
// @exclude       *
// @grant         none
// @author        erosman
// @version       1.0
// ==/UserScript==

/* --------- Note ---------
  This script adds image ALT value to its TITLE attribute if there isn't a TITLE attribute.
  Per request: http://userscripts.org/topics/215280
  
  This script can run on any page but that adds unnecessary load to your computer.
  I have set it not to run on any page for now.
  Go to Add-ons - User Scripts ('Ctrl+ Shift + a' on Firefox)
  Click on the Script's Option
  Under User Settings Tab, Add Included/Excluded Pages that you want the script to run on
  Click OK 


  --------- History ---------
  

  1.0 Initial release
  
*/



(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict'; // ECMAScript 5

if (frameElement) { return; } // end execution if in a frame/object/embedding points

// get all images (faster than querySelectorAll with many selectors)
var img = document.images;
if (!img[0]) { return; } // end execution if not found

for (var i = 0, len = img.length; i < len; i++) {
  if (img[i].alt && img[i].alt.trim() !== '' && (!img[i].title || img[i].title.trim() === '')) { 
    img[i].title = img[i].alt; 
  }
}


})(); // end of anonymous function