// ==UserScript==
// @name           Yahoo omg spacer
// @description    Hides spacer
// @include        http://omg.yahoo.com/*
// ==/UserScript==

var spaceball = document.evaluate('//img[contains(@src, "/omg-spacer-1.0.0.gif")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if(spaceball) {
  spaceball.src = spaceball.style.backgroundImage.substring(4,spaceball.style.backgroundImage.length-1);
}

