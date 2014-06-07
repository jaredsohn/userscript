// ==UserScript==
// @name	SpOn-direct-to-print
// @description Points Spiegel Online article links to the print version	
// @include	http://www.spiegel.de/*
// @include	http://spiegel.de/*
// ==/UserScript==

(function() {
  // starts-with function does not work like it's supoosed to
  var xpathspiegelanchors = "//a"; //[starts-with(@href,'http://www.spiegel.de/')]";
  // filter for article links
  // URL contains 4 numbers, second of which needs to start with '1'
  var articlelinkre = /(^.*\d+,1\d+,)(\d+,\d+\.html)/;

  var sp_a = document.evaluate(xpathspiegelanchors, document, null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var i, link;
  for (i = 0; link = sp_a.snapshotItem(i); i++) {
    if (index = link.href.search(articlelinkre) >= 0) {
      link.href=link.href.replace(articlelinkre,"$1druck-$2");
    }
  }
})();


