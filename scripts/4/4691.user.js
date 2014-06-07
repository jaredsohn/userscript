// ==UserScript==
// @name          MeFi-Nocarets
// @namespace     http://fuyugare.org/mefi/
// @description	  Replace caret links to WP with a superscripted WP's favicon
// @include       http://*.metafilter.com/*
// @include       http://metafilter.com/*
// ==/UserScript==

(function () {
  ancs = document.getElementsByTagName ('a');
  for (var i = 0; i < ancs.length; i ++) {
    var a = ancs[i];
    if (a.textContent == '^' && a.href.search (/wikipedia.org/))
      a.innerHTML = '<sup><img src="http://en.wikipedia.org/favicon.ico" border="0" width="10px"/></sup>';
  }
})();
