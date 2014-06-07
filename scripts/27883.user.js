// ==UserScript==
// @name           del.icio.us character count
// @namespace      http://phiffer.org/
// @description    Adds a count to help you post within the 255 character limit
// @include        http://del.icio.us/*
// @include        https://del.icio.us/*
// ==/UserScript==

var td = xpath("//td[@class='rs']");
td.forEach(function(td) {
  if (td.innerHTML != 'notes') {
    return;
  }
  var sibling = td.parentNode.getElementsByTagName('td')[2];
  sibling.className = 'smaller';
  sibling.style.verticalAlign = 'bottom';
  var textarea = td.parentNode.getElementsByTagName('textarea')[0];
  setInterval(function() {
    sibling.innerHTML = (255 - parseInt(textarea.value.length)) + ' chars left';
  }, 100);
});

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