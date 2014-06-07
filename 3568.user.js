// ==UserScript==
// @name           AlleenOpEen - IMDB Links
// @namespace      http://members.home.nl/trique/greasemonkey/
// @description    Dutch script for Film1/AlleenOpEen. Repace empty links with IMDB search result links.
// @include        http://www.alleenopeen.tv/film/Programmaoverzicht/
// ==/UserScript==

(function() {
  var filmLinks, filmLink;
  filmLinks = document.evaluate('//a[@class="title"]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for(var i = 0; i < filmLinks.snapshotLength; i++) {
    filmLink = filmLinks.snapshotItem(i);
    filmLink.title = 'IMDB Search';
    filmLink.href = filmLink.href.replace(/http:\/\/www.alleenopeen.tv\/film\/Programmaoverzicht\/#/, 'http://imdb.com/find?s=tt&q='+filmLink.firstChild.nodeValue);
  }
})();

