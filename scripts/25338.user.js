// ==UserScript==
// @name           XPath function
// @namespace      http://phiffer.org/
// @description    Exposes a function xpath(path) that returns an array of DOM nodes.
// @include        *
// ==/UserScript==

function xpath(path) {
  var iterator = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
  var result = [];
  try {
    var node = iterator.iterateNext();
    while (node) {
      result.push(node)
      node = iterator.iterateNext();
    }	
  }
  catch (e) {
    console.log('Error: ' + e);
  }
  return result;
}

unsafeWindow.xpath = xpath;