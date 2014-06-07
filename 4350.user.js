// ==UserScript==
// @name          TheRegister Printer Friendly Articles
// @namespace     http://www.unixdaemon.net/gmscripts/
// @description   Redirect to the print friendly version of the current TheRegister article
// @include       http://theregister.co.uk/*
// @include       http://www.theregister.co.uk/*
// @include       http://channelregister.co.uk/*
// @include       http://www.channelregister.co.uk/*
// @include       http://regdeveloper.co.uk/*
// @include       http://www.regdeveloper.co.uk/*
// @include       http://reghardware.co.uk/*
// @include       http://www.reghardware.co.uk/*
// ==/UserScript==

(function() {

// if it's not the top level page.
if (!(window.location.href.match(/\.co\.uk\/$/))) {
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

// test data
// http://www.theregister.co.uk/2005/08/31/review_hitachi_7k500/page2.html
// http://www.theregister.co.uk/2005/08/31/review_hitachi_7k500/
