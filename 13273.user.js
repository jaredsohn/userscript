// ==UserScript==
// @name            BYOBanner
// @include         http://forums.somethingawful.com/*
// ==/UserScript==

var content, banner;


// is this BYOB?  Look for BYOB stylesheet to find out
var isBYOB = document.evaluate(
    "//link[@href='/css/byob.css']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


if (isBYOB.snapshotLength) {
   content = document.getElementById('content');
   if (content) {
      banner = document.createElement('div');
      banner.innerHTML = '<center><img src=http://pix.cowfight.com/files/friggle/img/toucananimation.gif></img></center>';
      content.parentNode.insertBefore(banner, content);
   }


}