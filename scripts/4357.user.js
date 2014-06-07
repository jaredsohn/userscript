// ==UserScript==
// @name          Streetmap 5x5 Map Grid
// @namespace     http://www.unixdaemon.net/gmscripts/
// @description   Show a larger than usual, 5x5 grid on streetmap
// @include       http://streetmap.co.uk/newmap.srf*
// @include       http://www.streetmap.co.uk/newmap.srf*
// ==/UserScript==

// this forces all maps to size 2. if you don't like this tweak the code.

(function() {
  if (!(window.location.href.match(/\&z=/))) {
    window.location.replace(window.location + "&z=2");
  } else {
    if (!(window.location.href.match(/\&z=2/))) {
      if (window.location.href.match(/\&z=\d+/)) {
        window.location.replace(window.location.href.replace(/\&z=\d+/, "&z=2"));
      }
    }
  }

})();
