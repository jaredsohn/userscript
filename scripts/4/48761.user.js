// ==UserScript==
// @name           Kill IFrame & Embed
// @namespace      http://bd808.com/gm/iframe
// @description    remove iframe and embed elements
// @include        *
// ==/UserScript==


var allFrames, frame, frameSrc;
allFrames = document.evaluate('//iframe', document, null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allFrames.snapshotLength; i++) {
  frame = allFrames.snapshotItem(i);
  frameSource = frame.src;
  frame.parentNode.removeChild(frame);
  GM_log("iframe = "+frameSource+" removed");
}

var allEmb, emb, embSrc;
allEmb = document.evaluate('//embed', document, null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allEmb.snapshotLength; i++) {
  emb = allEmb.snapshotItem(i);
  embSrc = emb.src;
  emb.parentNode.removeChild(emb);
  GM_log("embed = "+embSrc+" removed");
}
