// ==UserScript==
// @name          IIS-Resources Printer Friendly Articles
// @namespace     http://www.unixdaemon.net/gmscripts/
// @description   Redirect to the print friendly version of the current IIS-Resources article
// @include       http://iis-resources.com/*
// @include       http://www.iis-resources.com/*
// ==/UserScript==

(function() {

// kill the print dialog
self.onload = null;

// skip if already in print mode to avoid loops
if (!(window.location.href.match(/print.php/))) {

  if (window.location.href.match(/article.php/)) {
    window.location.replace(window.location.href.replace(/article.php/, "print.php"));
  }
}

})();
