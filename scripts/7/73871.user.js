// ==UserScript==
// @name        Tom's Hardware Print View
// @namespace   http://elvencraft.com/greasemonkey
// @description Displays Tom's Hardware articles in print view.
// @include     http://*tomshardware.com*
// @version     2014.2.26
// Tested using Firefox, Chrome, Opera
// ==/UserScript==

(function ()
{
  var links, style;
  if (location.href.match('/print/')) {
    style = document.createElement('style');
    style.textContent = 'body {max-width: 64em; margin: 0em auto}';
    document.getElementsByTagName('head')[0].appendChild(style);
    window.print = function () {}; // disable window.print();
  }
  else {
    links = document.evaluate("//a[contains(@href, '/reviews/')]",
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var index = 0; index < links.snapshotLength; index++)
      links.snapshotItem(index).href = links.snapshotItem(index).href
      .replace('/reviews/', '/print/') .replace(',', ',reviews-');
  }
})();
