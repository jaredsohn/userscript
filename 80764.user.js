// ==UserScript==
// @name [Demoinoid] Auto-Sort by seeders
// @namespace http://userscripts.org/scripts/show/80764
// @description Automatically sort by seeders instead of by date uploaded. Slight modification on spider1163's TPB sort script. This does prevent you from manually sorting by another field...
// @include http://*.demonoid.com/files/*
// ==/UserScript==

(function() {
  if (document.location.search.length > 0) {
    if (!document.location.search.match(/sort/i)) {
      //No sort
      document.location.search = document.location.search + "&sort=S";
    }
    else if (!document.location.search.match(/sort=S/i)) {
      //Not sorting by seeders
      document.location.search = document.location.search.replace(/sort=[^S]?/i, "sort=S");
    }
  }
})();
