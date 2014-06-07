// ==UserScript==
// @name        AnandTech Print View
// @namespace   http://elvencraft.com/greasemonkey
// @description Displays AnandTech articles in print view.
// @include     http://*anandtech.com*
// @version     2014.2.26
// Tested using Firefox, Chrome, Opera
// ==/UserScript==

(function ()
{
  var links;
  links = document.evaluate("//a[contains(@href, '/show/')]",
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var index = 0; index < links.snapshotLength; index++)
    links.snapshotItem(index).href = links.snapshotItem(index).href
    .replace('/show/', '/print/');
})();
