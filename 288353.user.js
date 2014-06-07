// ==UserScript==
// @name        ytfull
// @namespace   http://userscripts.org/users/548715
// @description Opens a video on youtube full window, auto 1080p, with annotaions off
// @include     http://www.youtube.com/
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/
// @include     https://www.youtube.com/*
// @version     1
// @grant       none
// ==/UserScript==



var links = document.evaluate("//a[contains(@href, 'watch?v=')]", document, null, 
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (var i=0; i < links.snapshotLength; i++) 
{ 
  var thisLink = links.snapshotItem(i); 
  var linkText = thisLink.href;
  var urlBits = linkText.split('v=');
  var tag = urlBits[1].split('/')[0];
  var url = 'http://www.youtube.com/v/'.concat(tag).concat('&vq=hd1080&autoplay=1&iv_load_policy=3');
  thisLink.href = url; 
  thisLink.target = "_blank"
  thisLink.onclick="window.open(this.href); return false;" 
  thisLink.onkeypress="window.open(this.href); return false;"
} 
