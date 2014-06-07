// ==UserScript==
// @name           Show YouTube comment 'Show' buttons
// @namespace      http://polsy.org.uk
// @description    Display the 'Show' buttons that should be on YouTube video comments but aren't due to malformed CSS
// @include        http://*youtube.com/*
// ==/UserScript==

document.addEventListener('load', 
  function (e) {
    var alist = document.evaluate('//a[@style]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for(i=0; i<alist.snapshotLength; i++) {
      var ay = alist.snapshotItem(i);
      if(ay.style.cssText == '"visibility:visible"') {
        ay.style.cssText = 'visibility:visible';
      }
    }
  }, false
);