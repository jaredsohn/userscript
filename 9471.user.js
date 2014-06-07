// ==UserScript==
// @name           Herald
// @namespace      http://www.nzherald.co.nz
// @include        http://*nzherald.co.nz/*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
'//a[@href]',
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
  thisLink = allLinks.snapshotItem(i);
  var aregexp = /story/ ;
  if (thisLink.href.match(aregexp))
  {
    thisLink.href += '&pnum=0';
  
  }
}



