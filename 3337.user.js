// ==UserScript==
// @name            Geocities Ad Remover
// @namespace       http://www.nsaneproductions.com/
// @description     Breaks the frame and closes the Yahoo! skyscraper.
// @include         http://geocities.*
// @include         http://*.geocities.*
// @exclude         http://geocities.*/js_source*
// @exclude         http://*.geocities.*/js_source*
// @exclude         http://geocities.yahoo.*
// @exclude         http://*.geocities.yahoo.*
// @exclude         http://visit.geocities.*
// @exclude         http://*.visit.geocities.*
// ==/UserScript==

(function() {
  if (self != top) {
	top.location.href = self.location.href;
  } else {
	y_gc_div_adcntr.innerHTML = '';
	y_gc_div_mast.innerHTML = '';
	y_gc_div_au1.innerHTML = '';
  }
})();

/*  CHANGELOG

   Version 0.5:
     - Changes the Yahoo! ads innerHTML to null, so they're not even loaded now. 

   Version 0.4:
     - Removes the Yahoo! ads, not just hide them. Fixes the horizontal scrollbar problem.

   Version 0.3:
     - Stability and speed boosts.

   Version 0.2:
     - Bug fixes.

   Version 0.1:
     - Initial release.

*/