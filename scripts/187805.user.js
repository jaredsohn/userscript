// ==UserScript==
// @name        meetupmaps
// @namespace   sershe
// @include     http://www.meetup.com/*
// @version     1
// @grant       none
// ==/UserScript==

var binglinks, lnk;
binglinks = document.evaluate("//a[contains(@href,'//www.bing.com')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (var i = 0; i < binglinks.snapshotLength; ++i) { 
  lnk = binglinks.snapshotItem(i);
  lnk.href = lnk.href.replace('//www.bing.com', '//www.google.com').replace(/([?&])where1=/, '$1q=').replace(/([?&])rtp=%7Epos.([-0-9.]+)_([-0-9.]+)[^?&]*/, '$1q=$2,$3');
} 