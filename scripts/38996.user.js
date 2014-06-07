// ==UserScript==
// @name           /nmh/
// @namespace      http://4chan.org
// @description    change /mu/ to /nmh
// @include        http://*.4chan.org/*
// ==/UserScript==
var allElements, thisElement;
allElements = document.evaluate(
  '//*[@href]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

//replace the links in header and footer
for (var i = 0; i < allElements.snapshotLength; i++) {
  thisElement = allElements.snapshotItem(i);
  switch (thisElement.nodeName.toUpperCase()) {
  case 'A':
    // this is a link, do something
    if (thisElement.innerHTML == 'mu') {
      thisElement.innerHTML = 'nmh';
    }
    break;
  default:
    break;
  }
}

//change board title to /nmh/ - I LOVE YOU JESUS CHRIST
//delete the rest of this if you only want to change
//the board link in the header/footer
re = /\/mu\/ \- Music/;
var allDivs, thisDiv, ih;
allDivs = document.evaluate(
  "//div[@class='logo']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for (var j = 0; j < allDivs.snapshotLength; j++) {
  thisDiv = allDivs.snapshotItem(j);
  ih = thisDiv.innerHTML;
  ih = ih.replace(re, "/nmh/ - I LOVE YOU JESUS CHRIST");
  thisDiv.innerHTML = ih;
}
