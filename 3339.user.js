// ==UserScript==
// @name            Kickme.to Frame Remover
// @namespace       http://www.nsaneproductions.com/
// @description     Removes the banner above 'stealthed' pages.
// @include         *
// ==/UserScript==

(function() {
  frameset = document.getElementsByTagName('frameset')[0];
  if (frameset) {
    frame = document.getElementsByTagName('frame')[1];
    if (frame && frame.name == 'REDIRECTION_MAIN') {
      top.location.href = frame.src;
    }
  }
})();

/*  CHANGELOG

   Version 0.3:
     - Fixed a bug that could backup the javascipt console pretty bad.

   Version 0.2:
     - Bug fixes.
     
   Version 0.1:
     - Initial release.

*/