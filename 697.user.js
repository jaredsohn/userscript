// ==UserScript==
// @name          eBay Hacks - Search in new window
// @namespace     http://www.ebayhacks.com
// @description	  Opens search links in a separate window
// @include       http://search.ebay*
// @include       http://search-completed.ebay*
// ==/UserScript==

(function() {
  for (var i=0; i < document.links.length; i++) {
    if (document.links[i].href.indexOf("ViewItem") > 0) {
      if (document.links[i].target != '') { break; }
      document.links[i].target = 'listing';
    }
  }
})();
