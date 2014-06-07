// ==UserScript==
// @name           Remove My Yahoo Header Footer and Ads
// @namespace      http://www.flickr.com/photos/Archaeogenetics
// @description    Remove advertisements, headers, and footers from your My Yahoo Pages
// @include        http://my.yahoo.com/*
// ==/UserScript==

function removeElem(elem) {
  if (elem)
    elem.parentNode.removeChild(elem);
}

(function () {
  removeElem(document.getElementById('lrc'));
  removeElem(document.evaluate("//div[@class='tb']",
                               document, null,
                               XPathResult.FIRST_ORDERED_NODE_TYPE, 
                               null).singleNodeValue);
  removeElem(document.getElementById('sf1'));
  removeElem(document.evaluate("//div[@id='ymycpy']/div[1]",
                               document, null,
                               XPathResult.FIRST_ORDERED_NODE_TYPE, 
                               null).singleNodeValue);
}());
