// ==UserScript==
// @name          OpenDNS search redirect
// @description   Redirects the default OpenDNS search page to Google's first search result.
// @include       *

// Author: christian
// Version: 1.0 - 12/nov/2006
// ==/UserScript==


var searchurl = 'http://www.google.com/search?btnI=I%27m+Feeling+Lucky&q=';
var allframes, thisframe;
allframes = document.evaluate('//frame[@name]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


  /* 1. looks for both of the frames in opendns search results page */
thisframe = allframes.snapshotItem(1);
if (thisframe.name == 'unused' && thisframe.src == 'http://search.opendns.com/blank.php') {
  thisframe = allframes.snapshotItem(0);
  if (thisframe.name == 'mainwindow' && thisframe.src.slice(0, 36) == 'http://search.opendns.com/search.php') {


  /* 2. if they're there, get the search word and redirect to google */
    var searchkey = thisframe.src.slice(39, thisframe.src.indexOf('&'));
    window.location.href = searchurl + searchkey;

  }
}