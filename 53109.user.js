// ==UserScript==
// @name          save-the-Internets
// @namespace     http://www.dailymail.co.uk/
// @description   fix retarded spelling of 'Internet'
// @include       *
// @exclude       
// ==/UserScript==

function xpath(query) {
  return document.evaluate(query, document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

(
function () {
  var allnodes = xpath("//p[contains(text(),'internet')]");

  for (var i = 0; i < allnodes.snapshotLength; i++)
  {
    var thisnode = xpathResult.snapshotItem(i);
    thisnode = thisnode.replace(/(internet)/g, 'Internet');
  }
}
alert('done');
)

