// ==UserScript==
// @name               CheatEngine Author Posts Links
// @description        Fix "next page" links
// @version            1.00
// @author             mgr.inz.Player
// @include            http://forum.cheatengine.org/search.php*
// ==/UserScript==

(function () {
  var links = document.evaluate("//a[contains(@href, 'search_id')]", document, null,
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  var author = window.location.href.match(/search_author=(\S+)[$|\/|&]?/i)[1];

  for (var i=0; i < links.snapshotLength; i++)
  {
    var thisLink = links.snapshotItem(i);
    thisLink.href = thisLink.href.replace(/search_id=\d+/, "search_author="+author);
  }

}());
