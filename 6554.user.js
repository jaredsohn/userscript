// ==UserScript==
// @name          Amazon Flip
// @namespace     What is this
// @description   Flips amazon images
// @include       http://*.amazon.tld/*
// ==/UserScript==

var imgnodes, node, s;

imgnodes = document.evaluate(
              "//*[@src]",
               document,
               null,
               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
               null);

for (var i=0; i<imgnodes.snapshotLength; i++){
  node = imgnodes.snapshotItem(i);
  s = node.src;
  s = s.replace(new RegExp("_.jpg$"), "_PT-180_.jpg");
  s = s.replace(new RegExp("_.gif$"), "_PT-180_.gif");
  if (s.match(new RegExp("[^_].(jpg|gif)$")) &&
     !s.match(new RegExp("transparent-pixel"))){
    s = s.replace(new RegExp(".jpg$"), "._PT-180_.jpg");
    s = s.replace(new RegExp(".gif$"), "._PT-180_.gif");
  }
  node.src = s;
}