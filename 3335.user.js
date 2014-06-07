// ==UserScript==
// @namespace     http://www.nsaneproductions.com/
// @name          AOL Hometown Ad Remover
// @description   Hides the ads on AOL Hometown sites.
// @include       http://hometown.aol.*
// ==/UserScript==

(function() {
  table1 = document.getElementsByTagName("table")[1];
  table2 = document.getElementsByTagName("table")[2];

  if (table1 && table2) {
    table1.innerHTML = '';
    table2.innerHTML = '';
  } else if (table1) {
    table1.innerHTML = '';
  }
})();

/*  CHANGELOG

   Version 0.2:
     - Changes the ads innerHTML to null, so they're not even loaded any more.

   Version 0.1:
     - Initial release.

*/