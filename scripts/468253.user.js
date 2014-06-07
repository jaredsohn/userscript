// ==UserScript==
// @name          fitshr Bypass
// @namespace     erosman
// @description   Bypass fitshr Ad Page
// @updateURL     https://userscripts.org/scripts/source/468253.meta.js
// @downloadURL   https://userscripts.org/scripts/source/468253.user.js
// @include       http://fit.sh/*
// @grant         none
// @author        erosman
// @version       1.0
// ==/UserScript==

/* --------- Note ---------
  This script bypasses fitshr ad page.
  This script works with JavaScript disabled.
  


  --------- History ---------
  

  1.0 Initial release
  
*/



(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict';

if (frameElement) { return; } // end execution if in a frame/object/embedding points


var token = getScript();
if(!token)  { return; } // end execution if not found

setTimeout(function(){ location.replace('http://fit.sh/go/' + token + '?a='); }, 4000);

function getScript() {

  var elem = document.scripts;
  var pat = /token="([^"]+)"/i;

  for (var i = 0, len = elem.length; i < len ; i++) {

    var m = elem[i].textContent.match(pat);
    if(m) { return m[1]; }
  }
}

})(); // end of anonymous function