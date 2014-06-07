// ==UserScript==
// @name          Iskon AdRemover
// @author        numessiah@gmail.com
// @namespace     http://people.freenet.de/numessiah/iskon
// @description	  Remove the ads from Iskon pages
// @include       http://www.iskon.hr/*
// @include       http://iskon.hr/*
// ==/UserScript==

(function() {

  var elements=document.evaluate(
    "//tr/td/script[contains(@src,'ad.iskon.hr')]/ancestor::table[1]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  for(var i=0; i < elements.snapshotLength; i++){
    element=elements.snapshotItem(i);
    element.parentNode.removeChild(element);
  }

})();
