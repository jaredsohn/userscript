// ==UserScript==
// @name            Invisionize Auto-Agree for Downloads
// @namespace       http://www.nsaneproductions.com/
// @description     I already agreed once, leave me the fuck alone already.
// @include         http://mods.invisionize.com/db/index.php/*/download/*/*
// ==/UserScript==

(function() {

  agree = document.getElementsByName("agreed")[0];
  agree.click();

})();

/*  CHANGELOG

   Version 0.1:
     - Initial release.

*/

