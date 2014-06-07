// ==UserScript==
// @name          Artima Printer Redirect
// @namespace     http://www.unixdaemon.net/gmscripts/
// @description   Redirect Artima articles to single page versions
// @include       http://www.artima.com/*/articles/*
// ==/UserScript==

(function() {
  if (!(window.location.href.match(/P\.html/))) {
//    window.location.replace(window.location + "&n=100");
    window.location.replace(window.location.href.replace(/\.html$/, "P.html"));
  }

})();
