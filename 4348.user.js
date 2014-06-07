// ==UserScript==
// @name          SecurityFocus PrinterFriendly Articles
// @namespace     http://www.unixdaemon.net/gmscripts/
// @description   Redirect to the print friendly version of the current SecurityFocus article
// @include       http://securityfocus.com/*
// @include       http://www.securityfocus.com/*
// ==/UserScript==

// notes:
// not finished.

(function() {
  var xpath = "//a[starts-with(@href,'/print/')]";
  var res = document.evaluate(xpath, document, null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                              null);

  if (res.snapshotLength == 2) {
    document.location.href = res.snapshotItem(0);
  }
})();
