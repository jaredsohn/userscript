// ==UserScript==
// @name          Rapidshare Download Link
// @namespace     erosman
// @description   Shows Rapidshare's Original Download Link in a popup Alert
// @updateURL     https://userscripts.org/scripts/source/154109.meta.js
// @downloadURL   https://userscripts.org/scripts/source/154109.user.js
// @include       https://*rapidshare.com/#!download|*
// @include       http://*rapidshare.com/#!download|*
// @grant         none
// @author        erosman
// @version       1.1.1
// ==/UserScript==

/* --------- Note ---------
  This script shows Rapidshare's Original Download Link in a popup Alert
  


  --------- History ---------

  1.1.1 Added @updateURL & @downloadURL
  1.1 Code Improvemnet
  1.0 Initial release
  
*/

'use strict';

(function name() { // anonymous function wrapper, used for error checking to end execution

if (window.self !== window.top) { return; } // end execution if in a frame

var thisLink = document.URL.match(/#!download\|[^|]+\|([^|]+\|[^|]+)\|/)[1];
var newLink = 'https://rapidshare.com/files/' + thisLink.replace('|','/');

alert (newLink);

})(); // end of anonymous function