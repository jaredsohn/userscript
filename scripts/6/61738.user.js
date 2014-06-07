// ==UserScript==
// @name          My Script
// @namespace     http://www.example.com/gmscripts/
// @description   Scripting is fun
// @include       *
// @resource      prototype http://www.chaudron-empoisonne.fr/site-tron.txt
// ==/UserScript==

(function() {
  // some code

  alert(GM_getResourceText("prototype"));

  // some code
})();
