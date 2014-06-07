// ==UserScript==
// @name          Amazon Blur
// @namespace     What is this
// @description   Blurs amazon images
// @include       http://*.amazon.tld/*
// ==/UserScript==

var imgnodes, node, s;

var blur = "5";

imgnodes = document.evaluate(
              "//*[@src]",
               document,
               null,
               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
               null);

for (var i=0; i<imgnodes.snapshotLength; i++){
  node = imgnodes.snapshotItem(i);
  s = node.src;
  s = s.replace(new RegExp("_.jpg$"), "_BL"+blur+"_.jpg");
  s = s.replace(new RegExp("_.gif$"), "_BL"+blur+"_.gif");
  if (s.match(new RegExp("[^_].(jpg|gif)$")) &&
     !s.match(new RegExp("transparent-pixel"))){
    s = s.replace(new RegExp(".jpg$"), "._BL"+blur+"_.jpg");
    s = s.replace(new RegExp(".gif$"), "._BL"+blur+"_.gif");
  }
  node.src = s;
}