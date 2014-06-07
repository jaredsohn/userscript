// ==UserScript==
// @name           Google Image DirectLink
// @namespace      eagle
// @include        http://images.google.com/images?*
// @description    Goes directly to the real URL of an image
// @version        1.1
// ==/UserScript==

function getRgxSubstr(s, regex) {
  return regex.exec(s)[0];
};

function getFirstMatch(s, regex) {
  return regex.exec(s)[1];
};

function getRealLink(s) {
  return getFirstMatch(s, /imgurl=([^&]*)/i);
};

function getElement(s) {
  return document.getElementById(s);
}

var allLinks = document.evaluate('//a[contains(@href, "/imgres?imgurl=")]', document, null, 

XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (i = allLinks.snapshotLength - 1; i >= 0; i--) {
  /* make it so when you click on the image, it will go to the right link */
  var myLink = allLinks.snapshotItem(i);
  var originalLink = myLink.href;
  myLink.href = getRealLink(originalLink);

  /* make the url go to the original link */
  var s = myLink.parentNode.id + "";

  var elTd = getElement("tDataText" + getRgxSubstr(s, /\d+$/));
  var elFont = elTd.firstChild;
  var elFontUrl;

  /* fix the problem with "More From..." links (not always the last node) */
  for (var j = 1; j < elFont.childNodes.length; j++) {
    elFontUrl = elFont.childNodes[j];
    if (elFontUrl.nodeName == "FONT") {
      elFontUrl.innerHTML = '<a href="' + originalLink + '">' + elFontUrl.innerHTML + '</a>';
      break;
    }
  }
}