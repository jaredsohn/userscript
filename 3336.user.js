// ==UserScript==
// @name            CJB.net Frame Remover
// @namespace       http://www.nsaneproductions.com/
// @description     Removes the banner above 'stealthed' pages.
// @include         http://*.cjb.net*
// @include         http://cjb.net*
// @exclude         http://www.cjb.net*
// @exclude         http://users.cjb.net*
// ==/UserScript==

(function() {
  frame = document.getElementsByTagName('iframe')[0];
  if (top != frame.src) {
	top.location.href = frame.src;
  }
})();

/*  CHANGELOG

    Version 0.3:
      - Stability and speed boosts.

    Version 0.2:
      - Bug fixes.

    Version 0.1:
      - Initial release.

*/

