// ==UserScript==
// @name           Hide Flickr pro Links
// @namespace      http://userscripts.org/users/bananastalktome
// @description    Removes annoying double-red underlined "pro" links (which look irritatingly like misspelled words in Microsoft Word) from next to users names
// @include        *flickr.com*
// @grant          none
// @downloadURL    https://userscripts.org/scripts/source/158608.user.js
// @updateURL      https://userscripts.org/scripts/source/158608.meta.js
// @version        1.1
// ==/UserScript==

(function(){
  var proLinks = document.evaluate('//a[@class="pro-link"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
      i,
      proLinksCount = proLinks.snapshotLength;
  
  for (i = 0; i < proLinksCount; i++)
    proLinks.snapshotItem(i).parentNode.removeChild(proLinks.snapshotItem(i));
})();