// ==UserScript==
// @name          YouTube Show Users Video Page
// @namespace     erosman
// @description   Links to Users Video Page instead of their Home Page
// @updateURL     https://userscripts.org/scripts/source/400665.meta.js
// @downloadURL   https://userscripts.org/scripts/source/400665.user.js
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// @grant         none
// @author        erosman
// @version       1.1
// ==/UserScript==

/* --------- Note ---------
  This script changes the links to point to the Users' Video Page instead of their Home Page
  (per request: http://userscripts.org/topics/199268)


  --------- History ---------


  1.1 Added Playlist processing
  1.0 Initial release

*/



(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame

var elem = document.querySelectorAll('a[href*="/user/"]');
if (!elem[0]) { return; }  // end execution if not found


for (var i = 0, len = elem.length; i < len; i++) {

  switch (true) {

    case elem[i].href.indexOf('/playlists')!== -1:
      elem[i].href = elem[i].href.replace(/(\/playlists.*|\?.+)$/, '/playlists?view=1&flow=grid');
      break;

    default:
      elem[i].href = elem[i].href.replace(/(\/videos.*|\?.+)$/, '/videos?view=0&flow=grid');
  }
}


})(); // end of anonymous function
