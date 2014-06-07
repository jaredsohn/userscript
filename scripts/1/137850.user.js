// ==UserScript==
// @name          TheRegister Printer Friendly Articles
// @description   Redirect to the print friendly version of the current TheRegister article (Modified from http://userscripts.org/scripts/show/4350)
// @include       http://www.theregister.co.uk/*
// @include       http://www.reghardware.com/*
// ==/UserScript==

(function() {

// if page URL contains date, then we assume it's an article.
if ((window.location.href.match(/\d{4}\/\d{2}\/\d{2}/))) {
  // skip if already in print mode to avoid loops
  if (!(window.location.href.match(/print.html/))) {
    // if it's got a page with number replace with a print
    if (window.location.href.match(/page\d+.html/)) {
      window.location.replace(window.location.href.replace(/page\d+.html/, "print.html"));
    } else {
      window.location.replace(window.location + "print.html");
    }
  }
}

})();
