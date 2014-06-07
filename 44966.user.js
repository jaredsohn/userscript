// ==UserScript==
// @name        Reddit Zebra Stripes
// @namespace   http://uzimonkey.blogspot.com/
// @description Highlight alternate rows on reddit.com
// @creator     Michael Morin <uzimonkey@gmail.com>
// @include     http://reddit.com
// @include     http://*.reddit.com
// @include     http://reddit.com/
// @include     http://*.reddit.com/
// @include     http://reddit.com/*
// @include     http://*.reddit.com/*
// @namespace   http://uzimonkey.blogspot.com/
// @version     0.1
// @date        2008-3-22
// ==/UserScript==

// Changelog
// ==========
// 0.1 - Initial version.  There are gaps between the stripes, need to fix that.

(function() {
  var color = '#e0e0e0';
  var zebraHeight = 3;
  
  var allDivs = document.evaluate(
    "//div[@id='siteTable']//div[contains(@class,'thing')]",
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  
  var zebra = true;
  var zebraCount = 0;
  
  for( var i = 0; i < allDivs.snapshotLength; i++ ) {
    thisDiv = allDivs.snapshotItem(i);
    
    if(zebra) {
      thisDiv.style.backgroundColor = color;
    }
    
    zebraCount++;
    if( zebraCount >= zebraHeight ) {
      zebra = !zebra;
      zebraCount = 0;
    }
  }
})();