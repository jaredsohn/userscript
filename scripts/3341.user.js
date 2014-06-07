// ==UserScript==
// @name            DotTK Ad Remover
// @namespace       http://www.nsaneproductions.com/
// @description     Removes all 3 DotTK ad types.
// @include         http://*.tk*
// @exclude         http://*.dot.tk*
// @exclude         http://dot.tk*
// @exclude         http://ftfakes.tk*
// @exclude         http://*.ftfakes.tk*
// @exclude         http://kanat.tk*
// @exclude         http://*.kanat.tk*
// @exclude         http://nsane.tk*
// @exclude         http://*.nsane.tk*
// @exclude         http://nsaneforums.tk*
// @exclude         http://*.nsaneforums.tk*
// @exclude         http://kazupernodes.tk*
// @exclude         http://*.kazupernodes.tk*
// ==/UserScript==

(function() {
  link = document.getElementsByTagName('a')[1].href;
  frame = document.getElementsByTagName('frame')[1];
  content = document.getElementsByTagName('meta')[0].content.replace(/^15\;\ url\=(.+)/, '$1');

  if (content == link) {
    top.location.href = link;
  }
  else if (frame.name == 'dot_tk_frame_content') {
    top.location.href = frame.src;
  }
})();

/*  CHANGELOG

   Version 0.4:
     - No longer effects regular TK domains, just the free redirects.
     - Removed a frame check, wasn't needed since the link check's ran on frame sources too.

   Version 0.3:
     - Stability and speed boosts.

   Version 0.2:
     - Bug fixes.

   Version 0.1:
     - Initial release.

*/

