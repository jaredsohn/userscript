// ==UserScript==
// @name           NoEngadgetTopStories
// @version        0.1
// @description    Remove The top stories block at the beginning
// @include        *engadget*.com*
// ==/UserScript==

var classes = new Array("topstories");

for(var x = 0; x < classes.length;x++)
{

  var elements = document.evaluate("//*[contains(@id, '"+ classes[x] +"')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i = 0; i < elements.snapshotLength; i++) {
    var thisElement = elements.snapshotItem(i);
	thisElement.parentNode.removeChild(thisElement);
 }
}