// ==UserScript==
// @name          Addons.Mozilla.org: Extensions - Display Max of 50 Results per Page *Updated*
// @namespace     JoshCOM (junkrelay@gmail.com)
// @description   Show maximum (50) results for each page of extensions, Posted on 5/3/06--Updated on 4/29/07
// @include       http*://addons.mozilla.org/*search?*
// @include       http*://addons.mozilla.org/*/firefox/browse/type:1/cat:all*
// ==/UserScript==

(function() {
  if (!(window.location.href.match(/\&perpage=/))) {
    window.location.replace(window.location + "&perpage=50&show=50");
  } else {
    if (!(window.location.href.match(/\&perpage=50/))) {
      if (window.location.href.match(/\&perpage=\d+/)) {
        window.location.replace(window.location.href.replace(/\&perpage=\d+/, "&perpage=50&show=50"));
      }
    }
  }

})();