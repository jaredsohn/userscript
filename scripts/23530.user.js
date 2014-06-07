// ==UserScript==
// @name        footerinfo div remover
// @namespace    jayfresh (with credit to Zorilla)
// @description    removes the div with id "footerinfo"
// ==/UserScript==

function xpathQuery(inputElements) {

    return document.evaluate(
          inputElements,
          document,
          null,
          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
          null);
    
}


// Remove ads
var elementsToRemove = xpathQuery('//div[@id="footerinfo"]');
for (var i = 0; i < elementsToRemove.snapshotLength; i++) {
    var currentElement = elementsToRemove.snapshotItem(i);
    currentElement.parentNode.removeChild(currentElement);
}